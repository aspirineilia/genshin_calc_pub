import React, { Fragment } from "react";
import "../../../../css/Components/Modal/Select/Enemy.css"

import { ControlsBar } from "../../Components/ControlsBar";
import { EnemyIcon } from "../../Components/Icons";
import { Lang } from "../../Lang";
import { Modal } from "../../Modal";
import { ModalSelectBase, SearchInput } from "../Select";
import { ResistanceBlockMini } from "../../Components/ResistanceBlock";

let lang = new Lang();

export class ModalSelectEnemy extends Modal {
    createContent() {
        return (
            <EnemySelectComponent
                ref={(obj) => this.modal = obj}
                width={1050}
                addClass="enemy-select-modal"
                title={lang.get('modal_window.select_enemy')}
            />
        );
    }
}

class EnemySelectComponent extends ModalSelectBase {
    loadItems() {
        this.items = [];

        for (let group of DB.Enemies.getKeys()) {
            let data = DB.Enemies.get(group);
            let groupItems = [];

            for (let enemy of data.getList()) {
                groupItems.push({
                    enemy: enemy,
                    id: enemy.getId(),
                    title: lang.get(enemy.getName()).toUpperCase(),
                });
            }

            this.items.push({
                title: lang.get('enemy_group.'+ group),
                id: group,
                visible: groupItems.length > 0,
                items: groupItems,
            });
        }
    }

    sortItems() {
        if (!this.needSorting) {
            return;
        }

        this.needSorting = false;
    }

    filterItems() {
        if (!this.needFiltering) {
            return;
        }

        this.needFiltering = false;
        let filterString = this.state.filterString.toUpperCase();

        for (let group of this.items) {
            let anyVisible = false;

            for (let item of group.items) {
                item.selected = this.state.selectedId == item.id;
                item.hidden = false;
                item.filtered = filterString && !item.title.includes(filterString);

                if (!item.hidden && !item.filtered) {
                    anyVisible = true;
                }
            }

            group.hidden = !anyVisible;
        }
    }

    getControls() {
        return (
            <>
                <ControlsBar>
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
            <div className="object-select enemy-select">
                <EnemyList
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


function EnemyList(props) {
    let groups = [];

    for (let group of props.items) {
        let items = [];

        for (let data of group.items) {
            let classes = [];

            if (data.hidden || data.filtered) {
                classes.push('hidden');
            }

            if (data.selected) {
                classes.push('selected');
            }

            items.push(
                <div className={classes.join(' ')} key={data.enemy.getId()}>
                    <EnemySelectItem enemy={data.enemy} onSelect={props.onSelect} />
                </div>
            );
        }

        if (group.title) {
            groups.push(
                <div key={'title' + group.id} className={'group' + (group.hidden ? ' hidden' : '')}>
                    {group.title}
                </div>
            );
        }

        groups.push(
            <div key={'list' + group.id} className="list">
                {items}
                <div /><div />
            </div>
        );
    }

    groups.push(
        <div key={'custom'} className="list">
            <div
                className={'item'}
                onClick={() => props.onSelect(null)}
            >
                <EnemyIcon size={60} enemy={null} />
                <div className="info">
                    <div className="name">{lang.get('modal_window.enemy_custom')}</div>
                </div>
            </div>
        </div>
    );

    return groups;
}

class EnemySelectItem extends React.PureComponent {
    render() {
        let enemy = this.props.enemy;
        let resistances = enemy.getResistances();
        let settings = {
            enemy_res_phys: resistances.phys || 0,
            enemy_res_anemo: resistances.anemo || 0,
            enemy_res_cryo: resistances.cryo || 0,
            enemy_res_geo: resistances.geo || 0,
            enemy_res_hydro: resistances.hydro || 0,
            enemy_res_pyro: resistances.pyro || 0,
            enemy_res_electro: resistances.electro || 0,
            enemy_res_dendro: resistances.dendro || 0,
        };

        Object.assign(settings, enemy.getSettings());

        return (
            <div
                className={'item'}
                onClick={() => this.props.onSelect(enemy)}
            >
                <EnemyIcon size={60} enemy={enemy} />
                <div className="info">
                    <div className="name">{lang.get(enemy.getName())}</div>
                    <ResistanceBlockMini settings={settings} stats={{}}/>
                </div>
            </div>
        );
    }
}
