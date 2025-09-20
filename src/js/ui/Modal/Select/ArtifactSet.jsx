import React from "react";
import parse from 'html-react-parser';

import "../../../../css/Components/Modal/Select/ArtifactSet.css"

import { ArtifactSetIcon } from "../../Components/Icons";
import { Lang } from "../../Lang";
import { Modal } from "../../Modal";
import { ModalSelectBase, SearchInput } from "../Select";
import { ControlsBar } from "../../Components/ControlsBar";
import { DialogContainer } from "../../Components/Dialog/Container";
import { ConditionList } from "../../Components/ConditionList";

let lang = new Lang();

export class ModalSelectArtifactSet extends Modal {
    createContent() {
        return (
            <ArtifactSetSelectComponent
                ref={(obj) => this.modal = obj}
                addClass="artifactset-select-modal"
                title={lang.get('modal_window.select_artifact_set')}
            />
        );
    }
}

class ArtifactSetSelectComponent extends ModalSelectBase {
    getShowState(data) {
        this.needFiltering = true;

        return {
            minRarity: data.minRarity || 0,
            slot: data.slot || '',
        };
    }

    loadItems() {
        this.items = [];

        for (let set of DB.Artifacts.Sets.getList(1)) {
            this.items.push({
                item: set,
                id: set.getId(),
                title: lang.get(set.getName()).toUpperCase(),
                rarity: set.maxRarity,
                beta: set.isBeta(),
            });
        }
    }

    sortItems() {
        if (!this.needSorting) {
            return;
        }

        this.needSorting = false;

        this.items = this.items.sort((a, b) => {
            return b.rarity - a.rarity
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
                || this.state.minRarity && this.state.rarity < this.state.minRarity
                || this.state.slot && !item.item.canEquipSlot(this.state.slot)
                || item.beta && !showBeta
            ;
            item.filtered = filterString && !item.title.includes(filterString);
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

    handleShowInfo(set) {
        this.setInfo.show(set);
    }

    getContent() {
        return (
            <div className="object-select artifactset-select">
                <ArtifactSetList
                    items={this.items}
                    onSelect={(item) => this.handleItemSelect(item)}
                    onInfo={(set) => this.handleShowInfo(set)}
                />
                <SetInfoModal ref={obj => this.setInfo = obj} />
            </div>
        );
    }
}


function ArtifactSetList(props) {
    let items = [];

    for (let data of props.items) {
        let item = data.item;
        let classes = [];

        if (data.hidden || data.filtered) {
            classes.push('hidden');
        }

        if (data.selected) {
            classes.push('selected');
        }

        items.push(
            <div className={classes.join(' ')} key={item.getId()}>
                <ArtifactSetSelectItem
                    item={item}
                    onSelect={props.onSelect}
                    onInfo={props.onInfo}
                />
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

class ArtifactSetSelectItem extends React.PureComponent {
    render() {
        const item = this.props.item;

        let condData = item.getConditionsByPieces();
        let piecesInfo = []

        for (let i = 1; i <= condData.length; ++i) {
            let bonuses = condData[i];

            if (bonuses && bonuses.length) {
                for (const bonus of bonuses) {
                    let stats = bonus.getStats({});
                    let descr = bonus.getDescription(stats);

                    if (descr) {
                        piecesInfo.push(
                            <div className="bonus" key={'piece'+ i}>
                                {i}: {parse(descr)}
                            </div>
                        );
                        // '<div class="gi-window-artifact-set-bonus">'+ i +': '+ descr +'</div>';
                        break;
                    }
                }
            }

            if (piecesInfo.length >= 2) {
                break;
            }
        }

        return (
            <div
                className={'item border-rarity-'+ item.maxRarity}
                onClick={() => this.props.onSelect(item)}
            >
                <div className="line">
                    <ArtifactSetIcon size={40} set={item} />
                    <div className="name">{lang.get(item.getName())}</div>
                </div>
                <div className="line">
                    <div className="set-info">{piecesInfo}</div>
                    <div className="set-button" onClick={(e) => {
                        e.stopPropagation();
                        this.props.onInfo(item);
                    }}
                    >?</div>
                </div>
            </div>
        );
    }
}


class SetInfoModal extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            set: null,
        };
    }

    show(set) {
        this.setState({
            isVisible: true,
            set: set,
        });
    }

    handleClose() {
        this.setState({isVisible: false});
    }

    render() {
        let conditions = [];

        if (this.state.set) {
            conditions = this.state.set.getConditions(5);
        }

        return (
            <DialogContainer
                addClass="artifactset-info-modal"
                width={500}
                isVisible={this.state.isVisible}
                title={lang.get('modal_window.artifact_set_info')}
                closeCallback={() => this.handleClose()}
            >
                <ConditionList
                    items={conditions}
                    hideControls={true}
                    hideNoDescription={true}
                />
            </DialogContainer>
        )
    }
}
