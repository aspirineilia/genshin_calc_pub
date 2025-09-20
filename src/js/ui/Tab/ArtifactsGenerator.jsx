import React from 'react';
import "../../../css/Components/Tab/ArtifactsGenerator.css"

import { ArtifactGeneratorModal } from '../Components/Dialog/ArtifactGenerator';
import { ArtifactsGeneratorResults } from './ArtifactsGenerator/Results';
import { Condition } from '../../classes/Condition';
import { ControlsBar } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { Feature2 } from '../../classes/Feature2';
import { FeatureTableHeader } from '../Components/FeatureTable';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { generatorSettings, getDefaultSettings } from '../Components/ArtifactGenerator';
import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { RoundButton } from '../Components/Inputs/Buttons';
import { Tab } from "../Tab";
import { WorkerFactoryArtifactsGenerator } from '../../classes/WorkerFactory/ArtifactsGenerator';

let lang = new Lang();

export class ArtifactsGeneratorTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'artifacts_gen';
        this.rightRab = false;
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
            <ArtifactsGeneratorView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
            />
        )
    }
}

export class ArtifactsGeneratorView extends React.Component {
    constructor(props) {
        super(props);

        this.settings = getDefaultSettings();
        this.settingsChanged = false;
        this.lastBuild = '';
        this.lastFeature = '';

        this.factory = new WorkerFactoryArtifactsGenerator({
            callback: (data) => this.generateCompleteCallback(data),
            progressCallback: (data) => this.generateProgressCallback(data),
        });

        this.state = {
            items: [],
            isLoading: false,
            feature: '',
            displayMode: '',
            baseFeature: null,
            progress: {},
        };
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(this.props.app.currentSet());
    }

    handleSettingsOpen() {
        this.generatorModal.show(
            this.settings,
            (data) => {this.handleSettingsChange(data)}
        );
    }

    handleSettingsChange(data) {
        this.settings = data;
        this.settingsChanged = true;
        this.triggerGenerate();
    }

    handleFeature(feature) {
        this.props.app.setFeature(feature);
        this.props.app.refresh();
    }

    handleDisplayMode(mode) {
        this.setState({displayMode: mode});
        this.props.app.setDisplayMode(mode);
    }

    makeBuildWithResults(data) {
        let build = this.props.app.currentSet().clone();
        for (let art of data) {
            build.setArtifact(art);
        }

        let artConditions = build.getConditions({objects: 'artifacts'});
        let allSettings = Condition.allConditionsOn(artConditions);
        if (this.settings.required_sets_settings) {
            allSettings = Object.assign(allSettings, this.settings.required_sets_settings);
        }
        build.setArtifactsSettings(allSettings);

        return build;
    }

    handleApplyResult(data) {
        let build = this.makeBuildWithResults(data);

        this.lastBuild = build.getHash();
        this.state.baseFeature = build.getFeatureResultByName(this.state.feature);

        this.props.app.replaceSet(build);
    }

    handleCompareResult(data) {
        let build = this.makeBuildWithResults(data);
        UI.CompareTab.addItem(build);
    }

    triggerGenerate(feature) {
        feature = feature || this.state.feature;
        let hash = this.props.app.currentSet().getHash();

        if (this.lastBuild == hash && this.lastFeature == feature && !this.settingsChanged) {
            return;
        }

        if (this.state.isLoading) {
            this.factory.terminate();
        }

        this.settingsChanged = false;
        this.lastBuild = hash;
        this.lastFeature = feature;

        this.setState({
            isLoading: true,
            feature: feature,
            progress: {},
        });

        this.factory.run({
            build: this.props.app.currentSet(),
            feature: feature,
            settings: generatorSettings(this.settings),
        });
    }

    generateCompleteCallback(result) {
        let baseFeature = this.props.app.currentSet().getFeatureResultByName(this.state.feature);
        let build = this.props.app.currentSet().clone();

        for (let item of result) {
            for (let art of item.artifacts) {
                build.setArtifact(art);
            }

            let artConditions = build.getConditions({objects: 'artifacts'});
            let allSettings = Condition.allConditionsOn(artConditions);
            if (this.settings.required_sets_settings) {
                allSettings = Object.assign(allSettings, this.settings.required_sets_settings);
            }
            build.setArtifactsSettings(allSettings);

            item.feature = build.getFeatureResultByName(this.state.feature);
        }

        this.setState({
            isLoading: false,
            items: result,
            baseFeature: baseFeature,
            progress: {},
        });
    }

    generateProgressCallback(data) {
        this.setState({
            isLoading: true,
            progress: data,
        });
    }

    componentDidUpdate() {
        this.triggerGenerate();
    }

    render() {
        return (
            <ReactTab title={lang.get('art_gen.title')}>
                <FullHeight>
                    <FullHeightStatic>
                        <ControlsBar>
                            <RoundButton
                                icon="icon-settings"
                                onClick={() => this.handleSettingsOpen()}
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
                        <FeatureTableHeader />
                    </FullHeightStatic>
                    <FullHeightScrollable
                        isLoading={this.state.isLoading}
                        loadingOverlay={!this.settings ? lang.get('art_gen.set_settings') : lang.get('art_gen.loading')}
                        loadingProgress={this.state.progress}
                        noPadding={true}
                    >
                        <ArtifactsGeneratorResults
                            items={this.state.items}
                            baseFeature={this.state.baseFeature}
                            displayMode={this.state.displayMode}
                            onApply={(data) => this.handleApplyResult(data)}
                            onCompare={(data) => this.handleCompareResult(data)}
                        />
                    </FullHeightScrollable>
                </FullHeight>
                <ArtifactGeneratorModal
                    ref={obj => this.generatorModal = obj}
                />
            </ReactTab>
        );
    }
}

