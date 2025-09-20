import React from "react";

import { ArtifactPoolList } from "../../Components/Artifact";
import { ControlsBar, ControlsBarDivider } from "../../Components/ControlsBar";
import { Dropdown } from "../../Components/Inputs/Dropdown";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "../../Components/FullHeight";
import { Lang } from "../../Lang";
import { RoundButton, ToggleRoundButton } from "../../Components/Inputs/Buttons";

const lang = new Lang();

export class ArtifactStoragePool extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            isLoading: false,
            visibleSlots: {
                flower: true,
                plume: true,
                sands: true,
                goblet: true,
                circlet: true,
            },
            filterSet: '',
            selectedGroups: [],
        };

        this.itemsFiltered = [];
    }

    handleSlotChecked(slot) {
        let slots = {};
        for (let key of Object.keys(this.state.visibleSlots)) {
            slots[key] = slot == 'all' ? true : false;
        }

        if (slot != 'all') {
            slots[slot] = true;
        }

        this.setState({visibleSlots: slots});
    }

    handleShowGroups() {
        UI.WindowSelectGroupList.show((items) => {
            this.setState({selectedGroups: [].concat(items)});
        }, this.state.selectedGroups);
    }

    handleFilterSet(item) {
        this.setState({filterSet: item.value});
    }

    dataArtifactSets() {
        let setData = {};
        let result = [
            {
                value: '',
                text: lang.get('pool_view.all_sets'),
                number: this.state.items.length,
            }
        ];

        for (let item of this.state.items) {
            let set = item.getSet();
            if (!setData[set]) {
                setData[set] = 1;
            } else {
                ++setData[set]
            }
        }

        for (let setId of DB.Artifacts.Sets.getKeysSorted(null, 1)) {
            if (!setData[setId]) {
                continue;
            }

            let set = DB.Artifacts.Sets.get(setId);
            if (set) {
                result.push({
                    value: setId,
                    optionIcons: [' sprite sprite-artifact sprite-24 flower '+ set.getImage()],
                    text: lang.get(set.getName()),
                    number: setData[setId],
                });
            }
        }

        return result;
    }

    dataArtifactStats() {
        let result = [
            {value: '', text: lang.get('pool_view.upgrade_level')},
        ];

        let stats = [
            'atk', 'atk_percent', 'def', 'def_percent', 'hp', 'hp_percent',
            'crit_rate', 'crit_dmg', 'mastery', 'recharge', 'healing',
            'dmg_anemo', 'dmg_cryo', 'dmg_electro', 'dmg_geo', 'dmg_hydro', 'dmg_phys', 'dmg_pyro', 'dmg_dendro'
        ];

        for (let stat of stats) {
            result.push(
                {value: stat, text: lang.getStat('pool_stat.'+ stat)},
            )
        }

        return result;
    }

    filterArtifacts() {
        let result = [];

        for (let art of this.state.items) {
            let hidden = false;
            if (this.state.filterSet && this.state.filterSet != art.getSet()) {
                hidden = true;
            }

            if (!this.state.visibleSlots[art.getSlot()]) {
                hidden = true;
            }

            if (this.state.selectedGroups.length && !art.inGroups(this.state.selectedGroups)) {
                hidden = true;
            }

            result.push({
                hash: art.getHash(),
                art: art,
                hidden: hidden,
            });
        }

        this.itemsFiltered = result;
    }

    render() {
        this.filterArtifacts();
        UI.TooltipArtifact.hide();

        return (
            <FullHeight>
                <FullHeightStatic>
                    <ControlsBar>
                        <ToggleRoundButton
                            icon="icon-sort"
                            checked={this.props.sortByFeature}
                            tooltip={lang.get('tooltip.pool_sort')}
                            onChange={this.props.onFeatureSortChange}
                        />
                        <Dropdown
                            barClass="resizable"
                            items={this.props.features}
                            selected={this.props.feature}
                            onChange={this.props.onFeatureChange}
                        />
                    </ControlsBar>
                    <ControlsBar>
                        {this.slotButtons()}
                        <ControlsBarDivider />
                        <RoundButton
                            icon={'icon-groups'}
                            tooltip={lang.get('tooltip.pool_groups')}
                            onClick={() => this.handleShowGroups()}
                        />
                        <RoundButton
                            icon={'icon-add'}
                            tooltip={lang.get('tooltip.pool_add')}
                            onClick={this.props.onCreateArtifact}
                        />
                        <RoundButton
                            icon={'icon-lock'}
                            tooltip={lang.get('tooltip.pool_lock')}
                            onClick={this.props.onLockWindowOpen}
                        />
                        <RoundButton
                            icon={'icon-scan'}
                            tooltip={lang.get('tooltip.scan_artifact')}
                            onClick={this.props.onScannerOpen}
                        />
                    </ControlsBar>
                </FullHeightStatic>
                <FullHeightScrollable
                    isLoading={this.state.isLoading}
                    loadingOverlay={lang.get('pool_view.loading')}
                    maxHeight={UI.Layout.isMobile() ? UI.Layout.windowHeight() - 170 : null}
                >
                    <ArtifactPoolList
                        items={this.itemsFiltered}
                        highlightStat={this.props.sortByStat}
                        equippedHashes={this.props.equippedHashes}
                        savedHashes={this.props.savedHashes}
                        onClick={this.props.onArtifactClick}
                        onEdit={this.props.onArtifactEdit}
                        onDelete={this.props.onArtifactDelete}
                        onLock={this.props.onArtifactLock}
                        onOver={this.props.onArtifactOver}
                    />
                </FullHeightScrollable>
                <FullHeightStatic>
                    <ControlsBar>
                        <Dropdown
                            barClass="resizable"
                            items={this.dataArtifactSets()}
                            textIcon="filter"
                            selected={this.state.filterSet}
                            onChange={(value) => this.handleFilterSet(value)}
                        />
                        <Dropdown
                            barClass="stat-sort"
                            items={this.dataArtifactStats()}
                            textIcon="sort"
                            selected={this.props.sortByStat}
                            onChange={this.props.onStatSortChange}
                        />
                    </ControlsBar>
                </FullHeightStatic>
            </FullHeight>
        );
    }

    slotButtons() {
        let items = [];

        for (let slot of DB.Artifacts.Slots.getKeys()) {
            items.push(
                <ToggleRoundButton
                    key={slot}
                    icon={'icon-' + slot}
                    checked={this.state.visibleSlots[slot]}
                    tooltip={lang.get('tooltip.artifact_' + slot)}
                    onChange={() => this.handleSlotChecked(slot)}
                />
            );
        }

        items.push(
            <RoundButton
                key="all"
                icon={'icon-all-slots'}
                tooltip={lang.get('tooltip.artifact_all')}
                onClick={() => this.handleSlotChecked('all')}
            />
        );

        return items;
    }
}
