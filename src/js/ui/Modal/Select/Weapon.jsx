import React from "react";
import "../../../../css/Components/Modal/Select/Weapon.css"

import { ControlsBar } from "../../Components/ControlsBar";
import { Dropdown } from "../../Components/Inputs/Dropdown";
import { Lang } from "../../Lang";
import { Modal } from "../../Modal";
import { ModalSelectBase, SearchInput } from "../Select";
import { Stats } from "../../../classes/Stats";
import { ToggleRoundButton } from "../../Components/Inputs/Buttons";
import { WeaponIcon } from "../../Components/Icons";

let lang = new Lang();

export class ModalSelectWeapon extends Modal {
    createContent() {
        return (
            <WeaponSelectComponent
                ref={(obj) => this.modal = obj}
                addClass="weapon-select-modal"
                title={lang.get('modal_window.select_weapon')}
            />
        )
    }
}

class WeaponSelectComponent extends ModalSelectBase {
    constructor(props) {
        super(props);

        this.needUpdateFilter = true;
        this.statsFilter = [];
    }

    getShowState(data) {
        this.needUpdateFilter = true;
        this.needFiltering = true;
        this.needSorting = true;

        return {
            weaponType: data.weaponType || this.state.weaponType,
        };
    }

    loadItems() {
        this.items = [];

        for (let weapon of DB.Weapons.getList(1)) {
            let stats = new Stats();

            for (const stat of weapon.statTable) {
                let statName = stat.getName();
                if (statName != 'atk_base') {
                    statName = statName.replace('_base', '');
                }
                stats.add(statName, stat.getValue(90, 6));
            }

            this.items.push({
                weapon: weapon,
                id: weapon.getId(),
                title: lang.get(weapon.getName()).toUpperCase(),
                type: weapon.getType(),
                stats: stats,
                beta: weapon.isBeta(),
            });
        }
    }

    sortItems() {
        if (!this.needSorting) {
            return;
        }

        this.needSorting = false;
        let sortingStat = this.state.sortString;

        this.items = this.items.sort((a, b) => {
            return b.stats.get(sortingStat) - a.stats.get(sortingStat)
                || a.title.localeCompare(b.title)
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
            item.hidden = this.state.weaponType && this.state.weaponType != item.type
                || item.beta && !showBeta;
            item.filtered = filterString && !item.title.includes(filterString);
        }
    }

    buildStatsFilter() {
        if (!this.needUpdateFilter) {
            return;
        }

        let allStats = new Stats();
        this.needUpdateFilter = false;
        this.statsFilter = [];

        for (let data of this.items) {
            if (data.hidden) {
                continue;
            }

            allStats.concat(data.stats);
        }

        if (!allStats.get(this.state.sortString)) {
            this.state.sortString = '';
        }

        for (let stat of Object.keys(allStats)) {
            this.statsFilter.push({
                value: stat,
                text: lang.get('stat.'+ stat),
            });
        }

        this.statsFilter = this.statsFilter.sort((a, b) => {
            return a.text.localeCompare(b.text);
        });

        this.statsFilter.unshift({'value': '', text: lang.get('dropdown.title')});
    }

    handleTypeToggle(type) {
        this.needFiltering = true;
        this.setState({weaponType: type});
    }

    prepareItems() {
        super.prepareItems();
        this.buildStatsFilter();
    }

    // render

    getControls() {
        return (
            <>
                <ControlsBar>
                    {this.getTypeButtons()}
                    {this.statsFilter.length > 1 ? <Dropdown
                        barClass="weapon-stat-filter"
                        items={this.statsFilter}
                        textIcon="sort"
                        selected={this.state.sortString}
                        onChange={(item) => this.handleSortString(item.value)}
                    /> : <div />}
                    <SearchInput
                        barClass="resizable"
                        value={this.state.filterString}
                        onChange={(value) => this.handleFilterString(value)}
                    />
                </ControlsBar>
            </>
        );
    }

    getContent() {
        return (
            <div className="object-select weapon-select">
                <WeaponsList
                    weapons={this.items}
                    onSelect={(weapon) => this.handleItemSelect(weapon)}
                />
            </div>
        );
    }

    getTypeButtons() {
        let items = [];

        if (this.state.changeWeaponType) {
            for (let type of DB.Weapons.getKeys()) {
                type = type.toLowerCase();

                items.push(
                    <ToggleRoundButton
                        key={type}
                        icon={'weapon-types ' + type}
                        checked={this.state.weaponType == type}
                        tooltip={lang.get('weapon_type.'+ type)}
                        onChange={() => this.handleTypeToggle(type)}
                    />
                );
            }
        }

        return items.length ? items : <div />;
    }
}

function WeaponsList(props) {
    let items = [];

    for (let data of props.weapons) {
        let weapon = data.weapon;
        let classes = [];

        if (data.hidden || data.filtered) {
            classes.push('hidden');
        }

        if (data.selected) {
            classes.push('selected');
        }

        items.push(
            <div className={classes.join(' ')} key={weapon.getId()}>
                <WeaponSelectItem weapon={weapon} onSelect={props.onSelect} />
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

class WeaponSelectItem extends React.PureComponent {
    render() {
        const weapon = this.props.weapon;

        let stats = [];

        for (const stat of weapon.statTable) {
            let name = stat.getName();

            stats.push(
                <div key={stat.getName()} className="stat-line">
                    <div className="stat">{lang.getStat('stat_short.'+ name.replace('_percent', ''))}</div>
                    <div className="value">
                        {Stats.format(name, stat.getValue(1, 0))}
                        &nbsp;-&nbsp;
                        {Stats.format(name, stat.getValue(90, 6))}
                    </div>
                </div>
            );
        }

        return (
            <div
                className={'item '+ weapon.getType()}
                onClick={() => this.props.onSelect(weapon)}
            >
                <WeaponIcon size={60} weapon={weapon} />
                <div className="info">
                    <div className="name">{lang.get(weapon.getName())}</div>
                    {stats}
                </div>
            </div>
        );
    }
}
