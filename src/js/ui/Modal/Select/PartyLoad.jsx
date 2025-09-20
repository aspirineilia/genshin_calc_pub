import React from "react";

import "../../../../css/Components/Modal/Select/PartyLoad.css"

import { CharInfo } from "../../Components/Character/Info";
import { ControlsBar } from "../../Components/ControlsBar";
import { Dropdown } from "../../Components/Inputs/Dropdown";
import { Lang } from "../../Lang";
import { Modal } from "../../Modal";
import { ModalSelectBase, SearchInput } from "../Select";

let lang = new Lang();

export class ModalPartyLoad extends Modal {
    createContent() {
        return (
            <PartyLoadComponent
                ref={(obj) => this.modal = obj}
                app={this.app}
                width={650}
                storage={this.app.storage.char}
                addClass="partyload-select-modal"
                title={lang.get('modal_window.buff_select_char')}
            />
        );
    }
}

class PartyLoadComponent extends ModalSelectBase {
    constructor(props) {
        super(props);

        this.needUpdateFilter = true;
        this.needLoadItems = false;

        this.items = [];
        this.statsFilter = [];
        this.state.displayedStats = [];
        this.state.displayedSettings = [];
    }

    getShowState(data) {
        return {
            displayedStats: data.stats || [],
            displayedSettings: data.settings || [],
            filterCharId: data.charId || 0,
        };
    }

    show(data) {
        this.needUpdateFilter = true;
        this.needLoadItems = true;
        super.show(data);
    }

    loadItems() {
        if (!this.needLoadItems) {
            return;
        }

        this.items = [];
        this.needLoadItems = false;

        let index = 0;
        let showBeta = this.props.app.showBetaContent();

        for (let item of this.props.storage.listDecoded(showBeta)) {
            let build = item.data;
            if (!build) {
                continue;
            }

            let char = build.char.object;
            let title = item.title || lang.get(char.getName());

            let data = build.getBaseStatsWithSets();
            let buildStats = data.stats;
            let buildSettings = data.settings;
            let buildValues = {};

            if (this.state.displayedStats) {
                for (let stat of this.state.displayedStats) {
                    let statTrim = stat.replace(/_total$/, '');
                    let value = statTrim != stat ? buildStats.getTotal(statTrim) : buildStats.get(stat);
                    buildValues[stat] = value;
                }
            }

            if (this.state.displayedSettings) {
                for (let setting of this.state.displayedSettings) {
                    buildValues[setting] = buildSettings[setting];
                }
            }

            this.items.push({
                id: 'save'+ (index++),
                build: item.data,
                title: item.title || '',
                charId: char.getId(),
                sortTitle: title.toUpperCase(),
                values: buildValues,
            });
        }

        this.needSorting = true;
    }

    sortItems() {
        if (!this.needSorting) {
            return;
        }

        this.needSorting = false;
        let sortingStat = this.state.sortString;

        this.items = this.items.sort((a, b) => {
            return (b.values[sortingStat] || 0) - (a.values[sortingStat] || 0)
                || a.title.localeCompare(b.title)
        });
    }

    filterItems() {
        if (!this.needFiltering) {
            return;
        }

        this.needFiltering = false;
        let filterString = this.state.filterString.toUpperCase();

        for (let item of this.items) {
            item.filtered = this.state.filterCharId && this.state.filterCharId != item.charId
                || filterString && !item.sortTitle.includes(filterString);
        }
    }

    buildStatsFilter() {
        if (!this.needUpdateFilter) {
            return;
        }

        this.needUpdateFilter = false;
        this.statsFilter = [];

        for (let stat of this.state.displayedStats) {
            this.statsFilter.push({
                value: stat,
                text: lang.getStatTotal('stat.'+ stat),
            });
        }

        for (let setting of this.state.displayedSettings) {
            this.statsFilter.push({
                value: setting,
                text: lang.get('stat_settings.'+ setting),
            });
        }

        this.statsFilter = this.statsFilter.sort((a, b) => {
            return a.text.localeCompare(b.text);
        });

        this.statsFilter.unshift({'value': '', text: lang.get('dropdown.title')});
    }

    handleLoadBuild(build) {
        if (this.callback) {
            this.callback(build.getBaseStatsWithSets());
        }

        this.handleClose();
    }

    prepareItems() {
        super.prepareItems();
        this.buildStatsFilter();
    }

    getControls() {
        return (
            <>
                <ControlsBar>
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
            <div className="object-select lockartifacts-select">
                <LockCharList
                    items={this.items}
                    onLoadBuild={(build) => this.handleLoadBuild(build)}
                    displayedStats={this.state.displayedStats}
                    displayedSettings={this.state.displayedSettings}
                />
            </div>
        );
    }

    render() {
        this.loadItems();
        return super.render();
    }
}

function LockCharList(props) {
    let items = [];

    let buttons = [
        {
            icon: 'icon-load',
            tooltip: lang.get('tooltip.share_load'),
            callback: (build) => props.onLoadBuild(build),
        },
    ];

    for (let data of props.items) {
        let classes = ['list-item'];

        if (data.hidden || data.filtered) {
            classes.push('hidden');
        }

        items.push(
            <div className={classes.join(' ')} key={data.id}>
                <CharInfo
                    title={data.title}
                    set={data.build}
                    buttons={buttons}
                    displayedStats={props.displayedStats}
                    displayedSettings={props.displayedSettings}
                />
            </div>
        );
    }

    return (
        <div className="list">
            {items}
        </div>
    );
}
