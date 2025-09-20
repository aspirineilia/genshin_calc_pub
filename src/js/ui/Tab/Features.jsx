import React from 'react';
import parse from 'html-react-parser';
import "../../../css/Components/Tab/Features.css"

import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { Feature } from '../../classes/Feature';
import { FeatureTableHeader, FeatureTableValues } from '../Components/FeatureTable';
import { FeatureViewTree } from './Features/Tree';
import { FullHeight, FullHeightStatic, FullHeightFloatTitle, FloatTitleBlock, FullHeightScrollable } from '../Components/FullHeight';
import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";
import { Feature2 } from '../../classes/Feature2';
import { TitledButton } from '../Components/Inputs/Buttons';
import { BlockRemark } from '../Components/TextBlocks';

let lang = new Lang();

const REACTION_ITEMS = [
    {value: '', text: lang.get('feature_reaction.none')},
    {value: 'melt', text: lang.get('feature_reaction.melt')},
    {value: 'vaporize', text: lang.get('feature_reaction.vaporize')},
    {value: 'quicken', text: lang.get('feature_reaction.quicken')},
];

export class FeaturesTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'features';
        this.rightRab = false;
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
            <FeaturesView
                ref={element => { this.component = element }}
                app={this.app}
                feature={this.app.getFeature()}
                title={lang.get('tab_header.features')}
            />
        );
    }
}

class FeaturesView extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            view: '',
            feature: props.feature,
            reaction: '',
        };
    }

    getFeaturesDropdown() {
        return Feature2.buildDropdown(this.props.app.currentSet());
    }

    getFeaturesDetailsDropdown() {
        return Feature2.buildDropdown(this.props.app.currentSet(), {
            checkCallback: (f) => {return f.hasDetails()},
        });
    }

    getFeatureItems() {
        let build = this.props.app.currentSet();
        let buildData = build.getBuildData();
        let featuresHash = build.getFeaturesHash(buildData);
        let tree = Feature.getTree(featuresHash);
        let groups = [];

        for (const section in tree) {
            if (section == 'stats') {
                continue;
            }

            let rows = [];
            let blocks = tree[section];

            for (const block in blocks) {
                let featureName = section +'.'+ block;
                let feature = featuresHash[featureName];
                if (!feature || !feature.isActive(buildData)) {
                    continue;
                }

                let display = feature.getDisplaySettings(buildData);

                if (display) {
                    let total = 0;
                    for (let item of display) {
                        let localBuildData = buildData.clone();
                        if (item.settings) {
                            localBuildData.addSettings(item.settings);
                        }

                        if (this.state.reaction) {
                            localBuildData.settings.reaction = this.state.reaction;
                        }

                        let portion = 0;
                        let featureValue = feature.getResult(localBuildData)[featureName];
                        if (item.setTotal) {
                            total = featureValue.average;
                        } else if (item.getTotal && total) {
                            portion = 100 * featureValue.average / total;
                        }

                        rows.push({
                            id: item.id || featureName + (item.title ? '.' + item.title : ''),
                            subItemId: item.subItemId,
                            name: item.title || featureName,
                            hits: item.hits,
                            isChild: item.isChild,
                            feature: featureValue,
                            portion: portion,
                            icon: item.icon,
                        });
                    }
                } else {
                    let localBuildData = buildData.clone();

                    if (this.state.reaction) {
                        localBuildData.settings.reaction = this.state.reaction;
                    }

                    let result = feature.getResult(localBuildData);
                    for (let resultName of Object.keys(result)) {
                        rows.push({
                            name: resultName,
                            isChild: feature.getIsChild(),
                            hits: feature.getHits(),
                            feature: result[resultName],
                        });
                    }
                }
            }

            if (rows.length > 0) {
                groups.push({
                    name: section,
                    items: rows,
                });
            }

            delete tree[section];
        }

        return groups;
    }

    handleFeature(feature) {
        this.props.app.setFeature(feature);
        this.setState({feature: feature});
    }

    handleReaction(reaction) {
        this.setState({reaction: reaction});
    }

    handleViewChange(name) {
        this.setState({view: name});
    }

    getContentList() {
        let sections = this.getFeatureItems();
        let items = [];

        for (let section of sections) {
            items.push(
                <FloatTitleBlock key={section.name} title={lang.get('feature_section.'+ section.name)}>
                    <FeaturesTableBlock items={section.items} />
                </FloatTitleBlock>
            );
        }

        return (
            <>
                <FullHeightStatic>
                    <ControlsBar>
                        <Dropdown
                            barClass="resizable"
                            items={REACTION_ITEMS}
                            selected={this.state.reaction}
                            onChange={(item) => this.handleReaction(item.value)}
                        />
                        <TitledButton
                            icon="icon-ok"
                            title={lang.get('features_view.details')}
                            onClick={() => this.handleViewChange('detail')}
                        />
                    </ControlsBar>
                    <FeatureTableHeader />
                </FullHeightStatic>
                <FullHeightFloatTitle noPadding={true}>
                    {items}
                </FullHeightFloatTitle>
                {this.state.reaction ? <FullHeightStatic>
                    <BlockRemark>{parse(lang.getTalent('features_view.reaction_remark'))}</BlockRemark>
                </FullHeightStatic> : ''}
            </>
        );
    }

    getContentDetail() {
        let build = this.props.app.currentSet();
        let dropdownItems = this.getFeaturesDetailsDropdown();
        let feature = build.getFeatureByName(this.state.feature);
        let selectedFeature = this.state.feature;

        if (!feature.hasDetails()) {
            feature = null;

            for (let i of dropdownItems) {
                if (i.isCaption) continue;

                selectedFeature = i.value;
                feature = build.getFeatureByName(i.value);
                break;
            }
        }

        let item;
        if (feature) {
            item = <FeatureViewTree build={build} feature={feature} reaction={this.state.reaction} />
        }

        return (
            <>
                <FullHeightStatic>
                    <ControlsBar>
                        <Dropdown
                            barClass="resizable"
                            items={dropdownItems}
                            selected={selectedFeature}
                            onChange={(item) => this.handleFeature(item.value)}
                        />
                        <Dropdown
                            barClass="feature-type"
                            items={REACTION_ITEMS}
                            selected={this.state.reaction}
                            onChange={(item) => this.handleReaction(item.value)}
                        />
                    </ControlsBar>
                </FullHeightStatic>
                <FullHeightScrollable>
                    {item}
                </FullHeightScrollable>
            </>
        );
    }

    render() {
        return (
            <ReactTab
                title={this.props.title}
                backButton={this.state.view}
                backButtonCallback={() => this.handleViewChange('')}
            >
                <FullHeight>
                    {this.state.view == 'detail' ? this.getContentDetail() : this.getContentList()}
                </FullHeight>
            </ReactTab>
        );
    }
}

function FeaturesTableBlock(props) {
    let items = [];
    let index = 0;

    for (let item of props.items) {
        let classes = ['line'];

        if (++index % 2) {
            classes.push('odd');
        }

        let str = 'feature_'+ item.name;
        if (item.feature.title) {
            str = item.feature.title;
        }

        let title = lang.get(str);

        if (item.isChild) {
            classes.push('optional');
            title = '• '+ title;
        }

        if (item.hits && item.hits > 1) {
            title += ' ('+ item.hits +' '+ UI.Lang.get('feature_attack.hits') +')';
        }

        items.push(
            <div className={classes.join(' ')} key={item.subItemId || item.name}>
                <div className="title">
                    <span className="flex-spacer">{parse(title)}</span>
                    {item.portion ? <span>{item.portion.toFixed(1)}%</span> : ''}
                </div>
                <div className="icon"><div className={'stat-'+ (item.icon || item.feature.icon)} /></div>
                <FeatureTableValues
                    result={item.feature}
                />
            </div>
        );
    }

    return(
        <div className="features-table-block">
            {items}
        </div>
    );
}
