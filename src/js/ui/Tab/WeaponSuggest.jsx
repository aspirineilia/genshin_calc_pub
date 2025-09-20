import React from 'react';

import "../../../css/Components/Tab/WeaponSuggest.css"

import { Condition } from '../../classes/Condition';
import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { Feature2 } from '../../classes/Feature2';
import { FeatureTableHeader } from '../Components/FeatureTable';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { generatorSettings, getDefaultSettings } from '../Components/ArtifactGenerator';
import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { RoundButton, TitledButton } from '../Components/Inputs/Buttons';
import { Tab } from "../Tab";
import { WeaponSuggestListModal } from './WeaponSuggest/ListModal';
import { WeaponSuggestResult } from './WeaponSuggest/Result';
import { WeaponSuggestSettingsModal } from './WeaponSuggest/Settings';
import { WorkerFactorySuggestArtifacts } from '../../classes/WorkerFactory/SuggestArtifacts';
import { WorkerFactorySuggestWeapons } from '../../classes/WorkerFactory/SuggestWeapons';


let lang = new Lang();

export class WeaponSuggestTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'suggest-weapon';
        this.rightRab = false;
        this.title = 'tab_header.weapon_suggest';
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            feature: this.app.getFeature(),
            displayMode: this.app.getDisplayMode(),
        });
    }

    createContent() {
        return (
            <WeaponSuggestView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class WeaponSuggestView extends React.Component {
    constructor(props) {
        super(props);

        this.settingsChanged = false;
        this.lastBuild = '';
        this.lastFeature = '';

        this.state = {
            feature: '',
            displayMode: '',
            isLoading: false,
            result: [],
            progress: {},
            subProgress: [],
            baseFeature: null,
            weaponList: {
                sword: {},
                polearm: {},
                claymore: {},
                bow: {},
                catalyst: {},
            },
            artifactMode: 'current',
            generatorSettings: getDefaultSettings(),
        };

        this.loadDefaultListSettings();

        this.factory = new WorkerFactorySuggestWeapons({
            callback: (data) => this.completeCallback(data),
            partialCallback: (data) => this.completePartialCallback(data),
            progressCallback: (data) => this.progressCallback(data),
            subProgressCallback: (items) => this.subProgressCallback(items),
        });

        this.suggestFactory = new WorkerFactorySuggestArtifacts({
            callback: (data) => this.storageCompleteCallback(data),
            progressCallback: (data) => this.subProgressSuggesterCallback(data),
        });
    }

    loadDefaultListSettings() {
        let savedSettings = this.loadWeaponSettings();
        let showBeta = this.props.app.showBetaContent();

        for (let type of DB.Weapons.getKeys(showBeta)) {
            let weapons = DB.Weapons.get(type);
            let settings = {};

            let defSettings = savedSettings[type];
            if (typeof defSettings !== 'object') {
                defSettings = {};
            }

            for (let weaponName of weapons.getKeys(showBeta)) {
                let weapon = weapons.get(weaponName);
                let rarity = weapon.getRarity();

                let suggestItems = weapon.getSuggesterSettings();
                let defaultRefine = {1: rarity == 5, 2: false, 3: false, 4: false, 5: rarity < 5};
                let items = {};

                let savedSettings = defSettings[weaponName];
                if (typeof savedSettings !== 'object') {
                    savedSettings = {};
                }

                if (suggestItems.length == 0) {
                    suggestItems = [{name: ''}];
                }

                for (let item of suggestItems) {
                    let itemSettings = savedSettings[item.name];
                    if (typeof itemSettings !== 'object') {
                        itemSettings = {refine: {}};
                    }

                    if (typeof itemSettings.refine !== 'object') {
                        itemSettings.refine = {};
                    }

                    let refine = {};
                    for (let r = 1; r <= 5; ++r) {
                        refine[r] = itemSettings.refine[r] == undefined ? defaultRefine[r] : !!itemSettings.refine[r];
                    }

                    items[item.name] = {
                        show: itemSettings.show === undefined ? rarity >= 4 : !!itemSettings.show,
                        refine: refine,
                    };
                }

                settings[weaponName] = items;
            }

            this.state.weaponList[type] = settings;
        }
    }

    getWeaponType() {
        return this.props.app.getChar().object.weapon;
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(this.props.app.currentSet());
    }

    dataWeaponList() {
        return []
    }

    loadWeaponSettings() {
        let result = {};
        try {
            result = JSON.parse(this.props.app.getSetting('suggester_weapon'));
            if (!Object.isObject(result)) {
                result = {};
            }
        } catch {}
        return result;
    }

    saveWeaponSettings() {
        this.props.app.setSetting('suggester_weapon', JSON.stringify(this.state.weaponList));
    }

    handleSettingsOpen() {
        this.settingsModal.show(
            {
                artifactMode: this.state.artifactMode,
                settings: this.state.generatorSettings,
            },
            (data) => {this.handleGeneratorSettingsChange(data)}
        );
    }

    handleListOpen() {
        let weaponType = this.getWeaponType();
        let showBeta = this.props.app.showBetaContent();

        this.listModal.show(
            {
                weaponType: weaponType,
                showBeta: showBeta,
                settings: this.state.weaponList[weaponType],
            },
            (data) => {this.handleListChange(data)}
        );
    }

    handleListChange(data) {
        let weaponType = this.getWeaponType();
        this.settingsChanged = true;

        if (data) {
            let settings = this.state.weaponList;
            settings[weaponType] = data;
            this.saveWeaponSettings();
            this.setState({weaponList: settings});
        } else {
            this.state.weaponList[weaponType] = {};
            this.saveWeaponSettings();
            this.loadDefaultListSettings();
            this.setState({weaponList: this.state.weaponList});
        }
    }

    handleGeneratorSettingsChange(data) {
        if (data.artifactMode != 'current' || data.artifactMode != this.state.artifactMode) {
            this.settingsChanged = true;
        }

        this.setState({
            artifactMode: data.artifactMode,
            generatorSettings: data.settings,
        });
    }

    handleFeature(feature) {
        this.props.app.setFeature(feature);
        this.props.app.refresh();
    }

    handleDisplayMode(mode) {
        this.setState({displayMode: mode});
        this.props.app.setDisplayMode(mode);
    }

    handleApplyWeapon(data) {
        let weapon = DB.Weapons.getById(data.weaponId);

        let build = this.props.app.currentSet();
        let settings = {};

        if (data.suggestName) {
            for (let item of weapon.getSuggesterSettings()) {
                if (item.name == data.suggestName) {
                    settings = item.settings;
                    break;
                }
            }
        } else {
            settings = Condition.allConditionsOn(weapon.getConditions());
        }

        build.setWeapon(weapon);
        build.setWeaponLevels({
            level: data.level,
            ascension: data.ascension,
            refine: data.refine,
        });
        build.setWeaponSettings(settings);
        build.replaceArtifacts(data.artifacts);

        if (this.state.artifactMode == 'generate') {
            let artConditions = build.getConditions({objects: 'artifacts'});
            let allSettings = Condition.allConditionsOn(artConditions);
            if (this.state.generatorSettings.required_sets_settings) {
                allSettings = Object.assign(allSettings, this.state.generatorSettings.required_sets_settings);
            }
            build.setArtifactsSettings(allSettings);
        }

        this.lastBuild = build.getHash();
        this.state.baseFeature = build.getFeatureResultByName(this.state.feature);

        this.props.app.refresh({objects: ['build']});
    }

    handleStartSuggest() {
        this.startGenerate();
    }

    handleStopSuggest() {
        if (this.state.isLoading) {
            this.factory.terminate();
            this.suggestFactory.terminate();
        }

        this.setState({
            isLoading: false,
            progress: {},
            subProgress: [],
        });
    }

    getWeaponsList() {
        let weaponType = this.getWeaponType();
        let weaponDb = DB.Weapons.get(weaponType);
        let items = [];
        let showBeta = this.props.app.showBetaContent();

        for (let weaponName of weaponDb.getKeys(showBeta)) {
            let weaponSettings = this.state.weaponList[weaponType][weaponName];
            let weapon = weaponDb.get(weaponName);
            let suggesterSettings = weapon.getSuggesterSettings();

            if (suggesterSettings.length == 0) {
                suggesterSettings = [{name: ''}];
            }

            for (let suggestItem of suggesterSettings) {
                let settings = weaponSettings[suggestItem.name];

                if (!settings.show) {
                    continue;
                }

                if (suggestItem.settings === undefined) {
                    suggestItem.settings = Condition.allConditionsOn(weapon.getConditions());
                }

                for (let refine = 1; refine <= 5; ++refine) {
                    if (settings.refine[refine]) {
                        items.push({
                            level: 90,
                            ascension: 6,
                            weaponId: weapon.getId(),
                            suggestName: suggestItem.name,
                            settings: suggestItem.settings,
                            refine: refine,
                        });
                    }
                }
            }
        }

        return items;
    }

    triggerGenerate() {
        if (this.state.artifactMode != 'current') {
            return;
        }

        let hash = this.props.app.currentSet().getHash();
        if (this.lastBuild == hash && this.lastFeature == this.state.feature && !this.settingsChanged) {
            return;
        }

        this.startGenerate();
    }

    startGenerate() {
        if (this.state.isLoading) {
            this.factory.terminate();
        }

        let build = this.props.app.currentSet();

        this.settingsChanged = false;
        this.lastBuild = build.getHash();
        this.lastFeature = this.state.feature;

        let weaponType = this.getWeaponType();
        let baseFeature = build.getFeatureResultByName(this.state.feature);

        this.state.baseFeature = baseFeature;
        this.state.result = [];
        this.state.progress = {};
        this.state.subProgress = [];

        let weapons = this.getWeaponsList();

        if (this.state.artifactMode == 'storage') {
            this.storageQueueWeapons = weapons;
            this.storageQueueWeaponsCompleted = 0;
            this.storageQueueWeaponsTotal = weapons.length;
            this.storageQueueSettings = UI.BestArtifactTab.getSuggestData();
            this.storageGenerateNext();
        } else {
            this.setState({
                isLoading: true,
            });

            let showBeta = this.props.app.showBetaContent();

            this.factory.run({
                build: this.props.app.currentSet(),
                feature: this.state.feature,
                weaponType: weaponType,
                showBeta: showBeta,
                items: weapons,
                artifactMode: this.state.artifactMode,
                generatorSettings: generatorSettings(this.state.generatorSettings),
            });
        }
    }

    completeCallback(result) {
        this.setState({
            isLoading: false,
            result: result,
            progress: {},
            subProgress: [],
        });
    }

    completePartialCallback(result) {
        let stateResult = this.state.result;
        stateResult.push(result);

        stateResult = stateResult.sort((a, b) => {return b.result.average - a.result.average});

        if (this.state.isLoading) {
            this.setState({
                result: stateResult,
            });
        }
    }

    storageGenerateNext() {
        let item = this.storageQueueWeapons.shift();
        if (!item) {
            this.setState({
                isLoading: false,
                progress: {},
                subProgress: [],
            });
            return;
        }

        this.setState({
            isLoading: true,
            progress: {
                completed: this.storageQueueWeaponsCompleted,
                total: this.storageQueueWeaponsTotal,
            },
        });

        this.suggestFactory.callback = (results) => {
            this.storageCompleteCallback(item, results);
        };

        let showBeta = this.props.app.showBetaContent();
        let build = this.makeBuildFromItem(item);

        this.suggestFactory.run({
            artifacts: this.storageQueueSettings.artifacts,
            settings: this.storageQueueSettings.settings,
            feature: this.state.feature,
            featureType: this.storageQueueSettings.featureType,
            calcset: build,
            maxThreads: this.storageQueueSettings.maxThreads,
            showBeta: showBeta,
        });
    }

    makeBuildFromItem(item) {
        let build = this.props.app.currentSet().clone();
        let weapon = DB.Weapons.getById(item.weaponId);

        build.setWeapon(weapon);
        build.setWeaponLevels({
            level: item.level,
            ascension: item.ascension,
            refine: item.refine,
        });
        build.setWeaponSettings(item.settings);

        return build;
    }

    storageCompleteCallback(item, results) {
        ++this.storageQueueWeaponsCompleted;

        if (results.length == 0) {
            this.storageGenerateNext();
            return;
        }

        let stateResult = this.state.result;
        let build = this.makeBuildFromItem(item);
        build.replaceArtifacts(results[0].artifacts);

        let result = build.getFeatureResultByName(this.state.feature);

        stateResult.push({
            weaponId: item.weaponId,
            suggestName: item.suggestName,
            level: item.level,
            ascension: item.ascension,
            refine: item.refine,
            value: results[0].value,
            result: result,
            artifacts: results[0].artifacts,
        });

        stateResult = stateResult.sort((a, b) => {return b.value - a.value});

        this.setState({
            result: stateResult,
        });

        this.storageGenerateNext();
    }

    progressCallback(data) {
        this.setState({progress: data});
    }

    subProgressCallback(items) {
        this.setState({subProgress: items});
    }

    subProgressSuggesterCallback(data) {
        let total = 0;
        let count = 0;

        for (let item of data.workers) {
            total += item.total;
            count += item.count;
        }

        this.setState({subProgress: [
            {
                total: total,
                completed: count,
            }
        ]});
    }

    componentDidUpdate() {
        this.triggerGenerate();
    }

    render() {
        return (
            <ReactTab
                title={lang.get(this.props.title)}
            >
                <FullHeight>
                    <FullHeightStatic>
                        <ControlsBar>
                            <RoundButton
                                icon="icon-settings"
                                onClick={() => this.handleSettingsOpen()}
                            />
                            <RoundButton
                                icon="icon-filter"
                                onClick={() => this.handleListOpen()}
                            />
                            <Dropdown
                                barClass="resizable"
                                items={this.dataFeaturesItems()}
                                selected={this.state.feature}
                                onChange={(item) => this.handleFeature(item.value)}
                            />
                            <Dropdown
                                barClass="feature-type"
                                items={[
                                    {value: 'percent', text: lang.get('suggester.display_percent')},
                                    {value: 'absolute', text: lang.get('suggester.display_absolute')},
                                ]}
                                selected={this.state.displayMode}
                                onChange={(item) => this.handleDisplayMode(item.value)}
                            />
                        </ControlsBar>
                        {this.state.artifactMode == 'current' ? '' :
                            <ControlsBar>
                                <ControlsBarDivider />
                                {this.state.isLoading ?
                                    <TitledButton
                                        icon="icon-cancel"
                                        title={lang.get('weapon_suggest.stop')}
                                        onClick={() => this.handleStopSuggest()}
                                    />
                                    :
                                    <TitledButton
                                        icon="icon-ok"
                                        title={lang.get('weapon_suggest.start')}
                                        onClick={() => this.handleStartSuggest()}
                                    />
                                }
                            </ControlsBar>
                        }
                        <FeatureTableHeader />
                    </FullHeightStatic>
                    <FullHeightScrollable
                        isLoading={this.state.isLoading}
                        loadingOverlay={lang.get('weapon_suggest.loading')}
                        loadingProgress={this.state.progress}
                        loadingSubProgress={this.state.subProgress}
                        noPadding={true}
                    >
                        <WeaponSuggestResult
                            items={this.state.result}
                            baseFeature={this.state.baseFeature}
                            displayMode={this.state.displayMode}
                            onApply={(data) => this.handleApplyWeapon(data)}
                        />
                    </FullHeightScrollable>
                </FullHeight>
                <WeaponSuggestListModal
                    ref={obj => this.listModal = obj}
                />
                <WeaponSuggestSettingsModal
                    ref={obj => this.settingsModal = obj}
                />
            </ReactTab>
        );
    }
}
