import React from 'react';
import "../../../css/Components/Tab/ArtifactStorage.css"

import { ArtifactStoragePool } from './ArtifactStorage/Pool';
import { Condition } from '../../classes/Condition';
import { Feature2 } from '../../classes/Feature2';
import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { WorkerFactoryArtifactsSort } from '../../classes/WorkerFactory/ArtifactsSort';

let lang = new Lang();

export class ArtifactsStorageTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'artifacts-pool';
        this.rightRab = true;
        this.title = 'tab_header.artifact_pool';
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
            <ArtifactsPoolView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class ArtifactsPoolView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            feature: props.feature,
            sortByFeature: false,
            sortByStat: '',
        };

        this.lastResults = [];
        this.storage = props.app.storage.artifacts;
        this.factory = new WorkerFactoryArtifactsSort({
            callback: (data) => this.sortCompleteCallback(data),
        });
    }

    handleFeatureSort(checked) {
        this.setState({sortByFeature: checked});
    }

    handleFeature(item) {
        let feature = item.value;
        this.setState({feature: feature});
        this.props.app.setFeature(feature);
    }

    handleStatSort(item) {
        let value = item.value;
        this.setState({sortByStat: value});
    }

    handleArtifactClick(art) {
        let equipped = this.equippedHashes();

        if (equipped.includes(art.getHash())) {
            this.props.app.removeArtifact(art);
        } else {
            let settings = this.getSettingsForArt(art);
            this.props.app.currentSet().setArtifact(art);
            this.props.app.setArtifactsSettings(settings);
        }
    }

    handleArtifactEdit(art) {
        let hash = art.getHash();
        let item = this.storage.getByHash(hash);

        if (item) {
            UI.ArtifactWindow.show((result) => {
                result.setLocked(item.isLocked())
                this.storage.updateByHash(hash, result);
                this.props.app.refresh({
                    objects: ['storage.artifacts'],
                });
            }, item, undefined, {groups: this.storage.listGroups()});
        }
    }

    handleArtifactDelete(art) {
        UI.ConfirmWindow.show('modal.confirm', 'artifact_pool.confirm_delete_artifact', () => {
            this.storage.deleteByHash(art.getHash());
            this.props.app.refresh({
                objects: ['storage.artifacts'],
            });
        });
    }

    handleArtifactLock(art, value) {
        let hash = art.getHash();
        let item = this.storage.getByHash(hash);

        if (item) {
            item.setLocked(value);
            this.storage.updateByHash(hash, item);
            this.sortCompleteCallback(this.lastResults);
            this.props.app.queueUpdate();
        }
    }

    handleArtifactOver(art) {
        if (UI.Layout.isMobile()) {
            return;
        }

        let artSettings = this.getSettingsForArt(art);
        UI.TooltipArtifact.show(art, this.state.feature, artSettings);
    }

    handleCreateArtifact() {
        UI.ArtifactWindow.show((art) => {
            this.storage.add(art, {group: art.getGroups()})
            this.props.app.refresh({
                objects: ['storage.artifacts'],
            });
        }, undefined, undefined, {groups: this.storage.listGroups()});
    }

    handleScannerOpen() {
        UI.ArtifactScanner.show((art) => {
            if (art) {
                this.storage.addArtifacts([art]);
                this.props.app.refresh({
                    objects: ['storage.artifacts'],
                });
            }
        }, {groups: this.storage.listGroups()});
    }

    handleLockWindowOpen() {
        UI.LockArtifacts.show({
            closeCallback: () => {
                setTimeout(() => {
                    this.props.app.refresh({
                        objects: ['storage.artifacts'],
                    });
                }, 1);
            },
        });
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(this.props.app.currentSet());
    }

    allowedArtifactsList() {
        let result = [];
        let showBetaContent = this.props.app.showBetaContent();

        for (let item of this.storage.listDecoded()) {
            let setData = DB.Artifacts.Sets.get(item.data.getSet());
            if (!setData) {
                continue;
            }

            if (!showBetaContent && setData.isBeta()) {
                continue;
            }

            result.push({data: item.hash});
        }

        return result;
    }

    sortItems() {
        this.pool.setState({
            isLoading: true,
        });

        this.factory.run({
            artifacts: this.allowedArtifactsList(),
            sortByFeature: this.state.sortByFeature,
            sortByStat: this.state.sortByStat,
            feature: this.state.feature,
            featureType: 'average',
            calcSet: this.props.app.currentSet().serialize(),
        });
    }

    sortCompleteCallback(items) {
        let result = [];

        for (let hash of items) {
            result.push(this.storage.getByHash(hash));
        }

        this.lastResults = items;

        this.pool.setState({
            isLoading: false,
            items: result,
        });
    }

    componentDidUpdate() {
        this.sortItems();
    }

    equippedHashes() {
        let result = [];
        let artifacts = this.props.app.getArtifacts();

        for (let slot of Object.keys(artifacts)) {
            let art = artifacts[slot];
            if (art) {
                result.push(art.getHash())
            }
        }

        return result;
    }

    savedHashes() {
        return this.props.app.storage.char.savedHashes();
    }

    getSettingsForArt(art) {
        let build = this.props.app.currentSet().clone();
        let currentSettings = build.artifacts.getSettings();

        // Init all turned off existed settings
        let conditions = build.getConditions({objects: 'artifacts'});
        let result = Condition.allConditionsOff(conditions);
        Object.assign(result, currentSettings);

        // Turn on all new art settings
        build.setArtifact(art);
        conditions = build.getConditions({objects: 'artifacts'});
        let artSettingsOn = Condition.allConditionsOn(conditions);
        result = Object.assign({}, artSettingsOn, result);

        return result;
    }

    render() {
        return (
            <ReactTab title={lang.get(this.props.title)}>
                <ArtifactStoragePool
                    ref={obj => this.pool = obj}
                    feature={this.state.feature}
                    sortByFeature={this.state.sortByFeature}
                    sortByStat={this.state.sortByStat}
                    features={this.dataFeaturesItems()}
                    equippedHashes={this.equippedHashes()}
                    savedHashes={this.savedHashes()}
                    groups={this.storage.listGroups()}
                    onFeatureChange={(item) => this.handleFeature(item)}
                    onFeatureSortChange={(checked) => this.handleFeatureSort(checked)}
                    onStatSortChange={(item) => this.handleStatSort(item)}
                    onCreateArtifact={() => this.handleCreateArtifact()}
                    onScannerOpen={() => this.handleScannerOpen()}
                    onLockWindowOpen={() => this.handleLockWindowOpen()}
                    onArtifactClick={(art) => this.handleArtifactClick(art)}
                    onArtifactEdit={(art) => this.handleArtifactEdit(art)}
                    onArtifactDelete={(art) => this.handleArtifactDelete(art)}
                    onArtifactLock={(art, locked) => this.handleArtifactLock(art, locked)}
                    onArtifactOver={(art) => this.handleArtifactOver(art)}
                />
            </ReactTab>
        );
    }
}
