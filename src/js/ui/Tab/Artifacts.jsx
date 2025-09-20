import React from 'react';
import "../../../css/Components/Tab/Artifacts.css"

import { Stats } from '../../classes/Stats';
import { ConditionList } from '../Components/ConditionList';
import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { ArtifactIcon } from '../Components/Icons';
import { TitledButton } from '../Components/Inputs/Buttons';
import { ReactTab } from '../Components/Tab';
import { Lang } from '../Lang';
import { Tab } from "../Tab";
import { StatsInfo } from './Artifacts/StatsInfo';
import { RollsInfo } from './Artifacts/RollsInfo';

let lang = new Lang();

export class ArtifactsTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'artifacts';
        this.rightRab = true;
        this.title = 'tab_header.artifacts';
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            feature: this.app.getFeature(),
        });
    }

    createContent() {
        return (
            <ArtifactsView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class ArtifactsView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.strings = {
            title: lang.get(this.props.title),
            scan: lang.get('artifact_view.scan'),
            change: lang.get('artifact_view.change_set'),
            clear: lang.get('artifact_view.clear_artifacts'),
        };
    }

    render() {
        return (
            <ReactTab title={this.strings.title}>
                {this.tabContent()}
            </ReactTab>
        );
    }

    replaceArtifacts(arts) {
        for (let art of arts) {
            this.props.app.setArtifact(art, true);
        }
        this.props.app.refresh({objects: ['build']});
    }

    handleSettingChange(name, value) {
        let oldSettings = this.props.app.currentSet().artifacts.getSettings();
        oldSettings[name] = value;
        this.props.app.setArtifactsSettings(oldSettings);
    }

    handleScanClick() {
        UI.ArtifactScanner.show((art) => {
            if (art) {
                UI.ArtifactScanner.hide();
                this.props.app.setArtifact(art);
            }
        }, {ignoreStorage: true});
    }

    handleSwitchClick() {
        UI.ArtifactSetSelectReact.show({
            callback: (data) => {
                if (!data) {
                    return;
                }

                let maxLevel = DB.Artifacts.Rarity[data.maxRarity-1].maxLevel;
                let arts = this.props.app.getArtifacts();

                for (const slot of Object.keys(arts)) {
                    if (data.slots.length && !data.slots.includes(slot)) {
                        continue;
                    }

                    let art = arts[slot];
                    if (art) {
                        art = art.clone();

                        art.set    = data.key;
                        art.level  = Math.min(art.level, maxLevel);
                        art.rarity = Math.max(Math.min(art.rarity, data.maxRarity), data.minRarity);

                        this.props.app.currentSet().setArtifact(art);
                    }
                }

                this.props.app.refresh();
            },
        });
    }

    handleClearClick() {
        UI.ConfirmWindow.show('modal.confirm', 'artifact_view.clear_confirm', () => {
            this.props.app.currentSet().clearArtifacts();
            this.props.app.refresh();
        });
    }

    handleArtifactOpen(slot) {
        let art = this.props.app.getArtifacts()[slot];

        UI.ArtifactWindow.show((art) => {
            this.props.app.setArtifact(art);
        }, art, slot);
    }

    handleArtifactDelete(slot) {
        let art = this.props.app.getArtifacts()[slot];

        UI.ConfirmWindow.show('modal.confirm', 'artifact_pool.confirm_delete_artifact', () => {
            this.props.app.removeArtifact(art);
        });
    }

    handleArtifactStorage(slot) {
        let art = this.props.app.getArtifacts()[slot];

        if (art) {
            UI.ConfirmWindow.show('modal.confirm', 'artifact_pool.confirm_add_storage', () => {
                this.props.app.storage.artifacts.addArtifacts([art]);
                this.props.app.refresh({objects: ['storage.artifacts']});
            });
        }
    }

    tabContent() {
        let data = this.props.app.getStats();
        let conditions = this.props.app.getConditions({objects: ['artifacts']});

        let artifacts = [];
        let artData = this.props.app.getArtifacts();
        let storageHashes = this.props.app.storage.artifacts.storageHashes();

        for (let slot of Object.keys(artData)) {
            let artifact = artData[slot];
            artifacts.push({
                slot: slot,
                artifact: artifact,
                inStorage: artifact && storageHashes[artifact.getHash()],
            });
        }

        return (
            <FullHeight>
                <FullHeightStatic>
                    <ControlsBar>
                        <TitledButton
                            icon="icon-scan"
                            title={this.strings.scan}
                            onClick={() => this.handleScanClick()}
                        />
                        <TitledButton
                            icon="icon-replace"
                            title={this.strings.change}
                            onClick={() => this.handleSwitchClick()}
                        />
                        <ControlsBarDivider />
                        <TitledButton
                            icon="icon-delete"
                            title={this.strings.clear}
                            onClick={() => this.handleClearClick()}
                        />
                    </ControlsBar>
                </FullHeightStatic>
                <FullHeightScrollable>
                    <ArtifactsList
                        artifacts={artifacts}
                        onIconClick={(slot) => this.handleArtifactOpen(slot)}
                        onDeleteClick={(slot) => this.handleArtifactDelete(slot)}
                        onStorageClick={(slot) => this.handleArtifactStorage(slot)}
                    />
                    <ConditionList
                        items={conditions}
                        settings={data.settings}
                        onChange={(name, value) => this.handleSettingChange(name, value)}
                    />
                    <StatsInfo
                        build={this.props.app.currentSet()}
                    />
                    <RollsInfo
                        build={this.props.app.currentSet()}
                        feature={this.props.app.getFeature()}
                    />
                </FullHeightScrollable>
            </FullHeight>
        );
    }
}

function ArtifactsList(props) {
    let items = [];

    for (let item of props.artifacts) {
        items.push(
            <ArtifactBlock
                key={item.slot}
                artifact={item.artifact}
                slot={item.slot}
                showStorage={!item.inStorage}
                onIconClick={() => props.onIconClick(item.slot)}
                onDeleteClick={() => props.onDeleteClick(item.slot)}
                onStorageClick={() => props.onStorageClick(item.slot)}
            />
        );
    }

    return (
        <>
            {items}
        </>
    );
}

function ArtifactBlock(props) {
    let art = props.artifact;
    if (!art) {
        return (
            <EmptyArtifactBlock
                slot={props.slot}
                onClick={props.onIconClick}
            />
        )
    }

    let setData = DB.Artifacts.Sets.get(art.set);
    let substats = [];

    for (let subStat of art.getSubStats()) {
        substats.push(
            <div key={subStat.stat} className="value">
                <span className="stat-name">{lang.get('stat.'+ subStat.stat)} </span>
                {Stats.format(subStat.stat, subStat.value, {signed: true})}
            </div>
        );
    }

    // TODO
    // let errors = [];
    // for (let name of art.getErrors()) {
    //     errors.push(<p>{lang.get('artifact_error.'+ name)}</p>)
    // }

    return (
        <div className="artifact-big-block">
            <div className="line icon-line">
                <ArtifactIcon
                    size="60"
                    artifact={art}
                />
                {!art.isValid() ? <div className="invalid"></div> : null}
                <div className="names">
                    <div className="line">
                        <div className="buttons">
                            <ArtifactButton
                                icon="edit"
                                onClick={props.onIconClick}
                                tooltip={lang.get('tooltip.artifact_edit')}
                            />
                            <ArtifactButton
                                icon="delete"
                                onClick={props.onDeleteClick}
                                tooltip={lang.get('tooltip.artifact_delete')}
                            />
                            {props.showStorage ? <ArtifactButton
                                icon="storage"
                                onClick={props.onStorageClick}
                                tooltip={lang.get('tooltip.artifact_storage')}
                            /> : null}
                        </div>
                        <div className="name">{lang.get(setData.getName())}</div>
                    </div>
                    <div className="line main-stat">
                        <div className="level">+{art.getLevel()}</div>
                        <div className="value">
                            <span className="stat-name">({lang.get('stat.'+ art.getMainStat())} </span>
                            +{Stats.format(art.getMainStat(), art.getMainStatValue())}
                            <span className="stat-name">)</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="line sub-stat">
                {substats}
            </div>
        </div>
    );
}


function EmptyArtifactBlock(props) {
    return (
        <div className="artifact-big-block">
            <div
                className={'icon '+ props.slot}
                onClick={props.onClick}
            />
        </div>
    );
}


function ArtifactButton(props) {
    return (
        <div
            className={'button '+ props.icon}
            onClick={props.onClick}
            data-tooltip={props.tooltip}
        />
    );
}

