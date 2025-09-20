import React from "react";
import "../../../../css/Components/Modal/Select/Char.css"
import { ControlsBar, ControlsBarDivider } from "../../Components/ControlsBar";
import { CharIcon } from "../../Components/Icons";

import { Lang } from "../../Lang";
import { Modal } from "../../Modal";
import { ModalSelectBase } from "../Select";

let lang = new Lang();

export class ModalSelectChar extends Modal {
    createContent() {
        return (
            <CharSelectComponent
                ref={(obj) => this.modal = obj}
                addClass="char-select-modal"
                title={lang.get('modal_window.select_char')}
            />
        );
    }
}

export class CharSelectComponent extends ModalSelectBase {
    constructor(props) {
        super(props);

        this.state.element = '';
        this.state.weaponType = '';
        this.state.sortBy = 'name';
    }

    getShowState(data) {
        this.needFiltering = true;

        return {
            excludeIds: data.excludeIds || [],
            showEmpty: !!data.showEmpty,
            showReset: !!data.showReset,
        };
    }

    getCharList() {
        return DB.Chars.getList(1);
    }

    loadItems() {
        this.items = [];

        for (let char of this.getCharList()) {
            this.items.push({
                char: char,
                id: char.getId(),
                title: lang.get(char.getName()).toUpperCase(),
                element: char.getElement(),
                weapon: char.getWeapon(),
                beta: char.isBeta(),
            });
        }
    }

    sortItems() {
        if (!this.needSorting) {
            return;
        }

        this.needSorting = false;

        let element_index = {};
        let index = 0;
        for (let item of DB.Objects.Elements.getList()) {
            if (this.state.sortBy == 'name') {
                element_index[item.name] = 0;
            } else {
                element_index[item.name] = ++index;
            }
        }

        this.items = this.items.sort((a, b) => {
            return element_index[a.element] - element_index[b.element]
                || a.title.localeCompare(b.title);
        });
    }

    filterItems() {
        if (!this.needFiltering) {
            return;
        }

        this.needFiltering = false;
        let filterString = this.state.filterString.toUpperCase();
        let showBeta = this.settings.showBetaContent();

        for (let item of this.items) {
            item.selected = this.state.selectedId == item.id;
            item.hidden = this.state.weaponType && this.state.weaponType != item.weapon
                || this.state.element && this.state.element != item.element
                || this.state.excludeIds && this.state.excludeIds.includes(item.id)
                || item.beta && !showBeta
            ;
            item.filtered = filterString && !item.title.includes(filterString);
        }
    }

    handleSelectElement(value) {
        if (this.state.element == value) {
            value = '';
        }

        this.needFiltering = true;
        this.setState({element: value});
    }

    handleSelectWeaponType(value) {
        if (this.state.weaponType == value) {
            value = '';
        }

        this.needFiltering = true;
        this.setState({weaponType: value});
    }

    handleResetBuild() {
        UI.ConfirmWindow.show('modal.confirm', 'object_view.reset_confirm', () => {
            this.handleItemSelect(null);
        });
    }

    handleEmpty() {
        this.handleItemSelect(null);
    }

    getCharFilterButtons() {
        let buttons = [];

        for (let data of DB.Objects.Elements.getList()) {
            if (!data.isPlayable()) {
                continue;
            }

            let element = data.getName()
            let classes = ['filter', 'element', 'element-'+ element];

            if (this.state.element == element) {
                classes.push('active')
            }

            buttons.push(
                <div
                    key={element}
                    className={classes.join(' ')}
                    onClick={() => this.handleSelectElement(element)}
                />
            );
        }

        buttons.push(<div key="spacer" className="spacer" />)

        for (let data of DB.Objects.WeaponTypes.getList()) {
            let weaponType = data.getName()
            let classes = ['filter', 'weapon', 'weapon-type-'+ weaponType];

            if (this.state.weaponType == weaponType) {
                classes.push('active')
            }

            buttons.push(
                <div
                    key={weaponType}
                    className={classes.join(' ')}
                    onClick={() => this.handleSelectWeaponType(weaponType)}
                />
            );
        }

        return buttons;
    }

    getControls() {
        return (
            <>
                <ControlsBar>
                    <ControlsBarDivider />
                    {this.getCharFilterButtons()}
                    <ControlsBarDivider />
                </ControlsBar>
            </>
        );
    }

    getContent() {
        return (
            <div className="object-select char-select">
                <CharsList
                    items={this.items}
                    showEmpty={this.state.showEmpty}
                    showReset={this.state.showReset}
                    onSelect={(char) => this.handleItemSelect(char)}
                    onEmpty={() => this.handleEmpty()}
                    onReset={() => this.handleResetBuild()}
                />
            </div>
        );
    }
}


function CharsList(props) {
    let items = [];

    if (props.showEmpty) {
        items.push(
            <div key="empty">
                <EmptySelectItem onSelect={props.onEmpty} />
            </div>
        );
    }

    if (props.showReset) {
        items.push(
            <div key="reset">
                <ResetSelectItem onSelect={props.onReset} />
            </div>
        );
    }

    for (let data of props.items) {
        let char = data.char;
        let classes = [];

        if (data.hidden || data.filtered) {
            classes.push('hidden');
        }

        if (data.selected) {
            classes.push('selected');
        }

        items.push(
            <div className={classes.join(' ')} key={char.getId()}>
                <CharSelectItem char={char} onSelect={props.onSelect} />
            </div>
        );
    }

    return (
        <div className="list">
            {items}
            <div /><div /><div />
        </div>
    );
}

class ResetSelectItem extends React.PureComponent {
    render() {
        return (
            <div
                className={'item'}
                onClick={() => this.props.onSelect()}
            >
                <CharIcon size={60} resetIcon={true} />
                <div className="info">
                    <div className="name">{lang.get('char_name.reset_build')}</div>
                </div>
            </div>
        );
    }
}

class EmptySelectItem extends React.PureComponent {
    render() {
        return (
            <div
                className={'item'}
                onClick={() => this.props.onSelect()}
            >
                <CharIcon size={60} />
                <div className="info">
                    <div className="name">{lang.get('char_name.no_char')}</div>
                </div>
            </div>
        );
    }
}

class CharSelectItem extends React.PureComponent {
    render() {
        const char = this.props.char;

        return (
            <div
                className={'item'}
                onClick={() => this.props.onSelect(char)}
            >
                <CharIcon size={60} char={char} />
                <div className="info">
                    <div className="name">{lang.get(char.getName())}</div>
                    <div className="icons">
                        <div className={'element element-' + char.getElement()} />
                        <div className={'weapon weapon-type-' + char.getWeapon()} />
                    </div>
                </div>
            </div>
        );
    }
}
