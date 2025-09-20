import React from "react";
import "../../../../css/Components/Tab/WeaponSuggest/ListModal.css"

import { ControlsBar, ControlsBarDivider } from "../../Components/ControlsBar";
import { DialogContainer } from "../../Components/Dialog/Container";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "../../Components/FullHeight";
import { WeaponIcon } from "../../Components/Icons";
import { TitledButton, ToggleRoundButton } from "../../Components/Inputs/Buttons";
import { Checkbox } from "../../Components/Inputs/Input";
import { Lang } from "../../Lang";

let lang = new Lang();

export class WeaponSuggestListModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            weaponType: '',
            settings: {},
        };
    }

    show(data, saveCallback) {
        this.saveCallback = saveCallback;

        this.setState({
            weaponType: data.weaponType,
            showBeta: data.showBeta,
            settings: cloneSettings(data.settings),
            isVisible: true,
        });
    }

    handleSave() {
        if (this.saveCallback) {
            this.saveCallback(cloneSettings(this.state.settings));
        }

        this.setState({
            isVisible: false,
        });
    }

    handleReset() {
        if (this.saveCallback) {
            this.saveCallback(null);
        }

        this.setState({
            isVisible: false,
        });
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleShowChange(weaponName, id, checked) {
        let settings = this.state.settings;
        settings[weaponName][id].show = checked;
        this.setState({settings: settings});
    }

    handleRefineChange(weaponName, id, refine, checked) {
        let settings = this.state.settings;
        settings[weaponName][id].refine[refine] = checked;

        let haveChecked = false;
        for (let r = 1; r <= 5; ++r) {
            if (settings[weaponName][id].refine[r]) {
                haveChecked = true;
                break;
            }
        }

        if (haveChecked) {
            if (!settings[weaponName][id].show) {
                settings[weaponName][id].show = true;
            }
        } else {
            settings[weaponName][id].show = false;
        }

        this.setState({settings: settings});
    }

    render() {
        let maxHeight = UI.Layout.windowHeight() - (UI.Layout.isMobile() ? 130 : 170);

        return (
            <DialogContainer
                addClass="weapon-suggester-list-modal"
                width={500}
                height={UI.Layout.windowHeight() - 50}
                isVisible={this.state.isVisible}
                title={lang.get('weapon_suggest.weapon_list')}
                closeCallback={() => this.handleClose()}
            >
                <FullHeight>
                    <FullHeightScrollable maxHeight={maxHeight}>
                        {this.weaponList()}
                    </FullHeightScrollable>
                    <FullHeightStatic>
                        <ControlsBar>
                            <TitledButton
                                icon="icon-delete"
                                title={lang.get('modal_buttons.reset')}
                                onClick={() => this.handleReset()}
                            />
                            <ControlsBarDivider />
                            <TitledButton
                                icon="icon-ok"
                                title={lang.get('art_gen.apply')}
                                onClick={() => this.handleSave()}
                            />
                            <TitledButton
                                icon="icon-cancel"
                                title={lang.get('modal_buttons.cancel')}
                                onClick={() => this.handleClose()}
                            />
                        </ControlsBar>
                    </FullHeightStatic>
                </FullHeight>
            </DialogContainer>
        );
    }

    weaponList() {
        let items = [];

        let weapons = DB.Weapons.get(this.state.weaponType);
        if (!weapons) {
            return items;
        }

        let weaponsSorted = [];
        for (let weaponName of weapons.getKeys(this.state.showBeta)) {
            let weapon = weapons.get(weaponName);

            weaponsSorted.push({
                name: weaponName,
                weapon: weapon,
                title: lang.get(weapon.getName()),
                rarity: weapon.getRarity(),
            });
        }

        weaponsSorted = weaponsSorted.sort((a, b) => {return b.rarity - a.rarity || a.title.localeCompare(b.title)});

        for (let item of weaponsSorted) {
            let key = item.name;
            items.push(
                <WeaponListItem
                    key={key}
                    settings={this.state.settings[item.name]}
                    onShowChange={(id, checked) => this.handleShowChange(item.name, id, checked)}
                    onRefineChange={(id, refine, checked) => this.handleRefineChange(item.name, id, refine, checked)}
                    {...item}
                />
            )
        }

        return items;
    }
}

function WeaponListItem(props) {
    return (
        <div className="weapon-suggester-list-item">
            <div className="icon">
                <WeaponIcon weapon={props.weapon} size={40} />
            </div>
            <div className="items">
                <div className="title">{props.title}</div>
                <WeaponListItemSettings {...props} />
            </div>
        </div>
    );
}

function WeaponListItemSettings(props) {
    let weaponSettings = props.weapon.getSuggesterSettings();
    let items = [];
    let settingIds = [];

    if (weaponSettings.length == 0) {
        settingIds = [''];
    } else {
        settingIds = weaponSettings.map((i) => {return i.name});
    }

    for (let id of settingIds) {
        let idSettings = props.settings[id] || {refine: {}};
        let refine = [];

        for (let r = 1; r <= 5; ++r) {
            refine.push(
                <div key={'refine' + r} className="refine">
                    <ToggleRoundButton
                        text={r}
                        addClass="small-number"
                        checked={idSettings.refine[r]}
                        onChange={(checked) => props.onRefineChange(id, r, checked)}
                    />
                </div>
            );
        }

        items.push(
            <div key={props.name + id} className="setting">
                <div className="name">{id ? lang.get('weapon_settings.'+ id) : ''}</div>
                <div className="show">
                    <Checkbox
                        checked={idSettings.show}
                        onChange={(checked) => props.onShowChange(id, checked)}
                    />
                </div>
                {refine}
            </div>
        );
    }

    return items;
}

function cloneSettings(data) {
    return JSON.parse(JSON.stringify(data));
}
