import React from "react";

import { ControlsBar, ControlsBarDivider } from "../ControlsBar";
import { DialogContainer } from "../Dialog/Container";
import { Dropdown } from "../Inputs/Dropdown";
import { Lang } from "../../Lang";
import { TitledButton } from "../Inputs/Buttons";
import { Rotation } from "../../../classes/Rotation";
import { ConditionList } from "../ConditionList";
import { Condition } from "../../../classes/Condition";

let lang = new Lang();

const sections = ['char', 'weapon', 'artifacts', 'enemy', 'buffs'];
const condSections = ['char', 'weapon', 'artifacts', 'enemy', 'party', 'buffs'];

export class RotationConditionModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.conditionItems = [];

        this.state = {
            isVisible: false,
            showDropdown: true,
            selected: '',
            conditions: [],
            value: '',
            subtype: '',
            itemId: 0,
            conditionId: 0,
        };
    }

    show(data, saveCallback) {
        data = Object.assign({}, data);

        this.state.conditions = [];
        this.charId = data.charId || 0;
        if (data.conditionId) {
            this.state.selected = [data.subtype, data.itemId, data.conditionId].join(':');
        } else {
            this.state.selected = '';
        }

        this.settings = this.props.build.getStats().settings;
        this.conditionItems = this.buildConditionsList();
        this.saveCallback = saveCallback;

        let showDropdown = true;
        if (this.state.conditions.length == 0 && data.conditionId) {
            let condData = Rotation.getConditionData(data);
            if (condData) {
                showDropdown = false;
                this.state.conditions = [condData.cond];
            }
        }

        let value = data.value || '';
        if (this.state.conditions.length) {
            let cond = this.state.conditions[0];
            let type = cond.getType();

            if (type == 'dropdown' || type == 'dropdown_multiple') {
                value = cond.getValueById(data.value);
            } else {
                value ||= 0;
            }
        }

        let newState = {
            isVisible: true,
            showDropdown: showDropdown,
            value: value,
        }

        if (data.conditionId) {
            Object.assign(newState, {
                subtype: data.subtype,
                itemId: data.itemId,
                conditionId: data.conditionId,
            });
        }

        this.setState(newState);
    }

    handleSave() {
        if (this.saveCallback) {
            let item = {
                type: 'condition',
                subtype: this.state.subtype,
                itemId: this.state.itemId,
                conditionId: this.state.conditionId,
                value: this.state.value,
            };

            let itemData = Rotation.getConditionData(item);
            let type = itemData.cond.getType();
            if (type == 'dropdown' || type == 'dropdown_multiple') {
                let settings = {};
                settings[itemData.cond.getName()] = item.value;
                item.value = itemData.cond.getSelectedId(settings);
            }

            this.saveCallback(item);
        }

        this.setState({isVisible: false});
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    handleCondition(item) {
        this.setState({
            selected: item.value,
            subtype: item.data.subtype,
            itemId: item.data.itemId,
            conditionId: item.data.conditionId,
            conditions: [item.cond],
        });
    }

    handleSettingChange(name, value) {
        this.setState({value: value});
    }

    render() {
        let localSettings = Object.assign({}, this.settings);
        for (let cond of this.state.conditions) {
            localSettings[cond.getName()] = this.state.value;
        }

        let charId = this.state.subtype == 'party' ? this.state.itemId : 0;

        return (
            <DialogContainer
                addClass="rotation-feature-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={lang.get('modal_window.rotation_condition')}
                closeCallback={() => this.handleClose()}
            >
                {this.state.showDropdown ? <ControlsBar>
                    <Dropdown
                        barClass="resizable"
                        items={this.conditionItems}
                        selected={this.state.selected}
                        onChange={(item) => this.handleCondition(item)}
                    />
                </ControlsBar> : ''}
                <ConditionList
                    items={this.state.conditions}
                    charId={charId}
                    settings={localSettings}
                    ignoreSubconditions={true}
                    onChange={(name, value) => this.handleSettingChange(name, value)}
                />
                <ControlsBar>
                    <ControlsBarDivider />
                    <TitledButton
                        icon="icon-ok"
                        title={lang.get('modal_buttons.confirm')}
                        onClick={() => this.handleSave()}
                    />
                    <TitledButton
                        icon="icon-cancel"
                        title={lang.get('modal_buttons.cancel')}
                        onClick={() => this.handleClose()}
                    />
                </ControlsBar>
            </DialogContainer>
        )
    }

    buildConditionsList() {
        let result = [];
        let results = {};
        let build = this.props.build;

        for (const section of condSections) {
            results[section] = [];
        }

        for (const section of sections) {
            let items = [];

            for (const cond of Condition.unwrap(build.getConditions({objects:[section]}))) {
                let type = cond.getType();
                if (!type || type == 'static' || cond.isHidden(this.settings)) {
                    continue;
                }

                if (cond.params.hideInactive && !cond.checkSubconditions(this.settings)) {
                    continue;
                }

                if (section == 'buffs' && !cond.getBuffRotationSection()) {
                    continue;
                }

                items.push(cond);
            }

            if (!items.length) {
                continue;
            }

            let partId = 0;

            if (section == 'char') {
                let char = build.getChar();
                if (char && char.object) {
                    partId = char.object.getId();
                }
            } else if (section == 'weapon') {
                let weapon = build.getWeapon();
                if (weapon && weapon.object) {
                    partId = weapon.object.getId();
                }
            } else if (section == 'enemy') {
                let enemy = build.getEnemy();
                if (enemy && enemy.object) {
                    partId = enemy.object.getId();
                }
            }

            for (const cond of items) {
                let condSection = section;
                let icon;

                if (section == 'artifacts') {
                    let artSetId = Rotation.getArtSetByCondition(cond.getId());
                    if (artSetId) {
                        partId = artSetId;
                    }
                }

                let cSection = section;
                let cItemId = partId;
                let cCondId = cond.getId();

                if (section == 'buffs') {
                    let entityId = cond.getEntityId();

                    if (entityId) {
                        let char = DB.Chars.getById(entityId);
                        if (char) {
                            icon = char.getIcon();
                        }
                        condSection = 'party';
                    } else {
                        icon = cond.getIcon();
                    }

                    if (icon) {
                        icon = 'sprite sprite-24 '+ icon;
                    }

                    cSection = cond.getBuffRotationSection();
                    cItemId = cond.getEntityId();
                }

                let condId = cSection +':'+ cItemId +':'+ cCondId;
                if (!this.state.selected) {
                    this.state.selected = condId;
                }

                if (this.state.selected == condId) {
                    this.state.conditions = [cond];
                    this.state.subtype = cSection;
                    this.state.itemId = cItemId;
                    this.state.conditionId = cCondId;
                }

                let numberText = '';
                let rotationNumber = cond.params.rotationNumber;
                if (rotationNumber) {
                    numberText = ' ('+ rotationNumber +')';
                }

                results[condSection].push({
                    value: condId,
                    isSubitem: 1,
                    text: cond.getTitle() + numberText,
                    textIcons: icon ? [' '+ icon] : [],
                    cond: cond,
                    data: {
                        conditionId: cCondId,
                        itemId: cItemId,
                        subtype: cSection,
                    },
                });
            }
        }

        for (const section of condSections) {
            if (results[section].length) {
                result.push({
                    isCaption: true,
                    value: section,
                    text: lang.get('rotation_view.section_'+ section),
                });

                result = result.concat(results[section]);
            }
        }

        return result;
    }
}
