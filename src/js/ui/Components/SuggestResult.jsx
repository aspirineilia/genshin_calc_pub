import React from "react";
import "../../../css/Components/SuggestResult.css"

import { ArtifactList } from "./Artifact";
import { ArtifactSetIcon } from "./Icons";
import { ControlsBar, ControlsBarDivider } from "./ControlsBar";
import { formatNumber } from "../../Utils";
import { Lang } from "../Lang";
import { ResultTableButton, RoundButton } from "./Inputs/Buttons";
import { Dropdown } from "./Inputs/Dropdown";
import { Stats } from "../../classes/Stats";
import { FullHeight, FullHeightScrollable, FullHeightStatic } from "./FullHeight";
import { TabDisclaimer } from "./Tab";
import { FeatureTableValues } from "./FeatureTable";

export function SuggestResult(props) {
    let lang = new Lang();

    if (props.result.items.length == 0) {
        return (
            <TabDisclaimer>{lang.get('artifacts_ui.nothing_found')}</TabDisclaimer>
        );
    }

    let lines = [];
    let index = 0;
    let maxItem = props.result.items[0];
    let maxFeatures = maxItem.calcFeatures(1);

    for (let item of props.result.items) {
        index++;
        lines.push(
            <SuggestResultItem
                key={'set'+ (index)}
                mainFeature={props.result.feature}
                otherFeatures={props.otherFeatures}
                item={item}
                maxFeatures={maxFeatures}
                even={index % 2 == 0}
                onApply={props.onApply}
                onCompare={props.onCompare}
                displayMode={props.displayMode}
                savedHashes={props.savedHashes}
                onLock={props.onLock}
            />
        )
    }

    return (
        <FullHeight>
            <FullHeightStatic>
                <ControlsBar>
                    <RoundButton
                        icon="icon-settings"
                        onClick={props.onFeatureSelect}
                    />
                    <ControlsBarDivider/>
                    <Dropdown
                        barClass="feature-type"
                        items={[
                            {value: 'percent', text: lang.get('suggester.display_percent')},
                            {value: 'absolute', text: lang.get('suggester.display_absolute')},
                        ]}
                        selected={props.displayMode}
                        onChange={(item) => props.onDisplayModeChange(item.value)}
                    />
                </ControlsBar>
            </FullHeightStatic>
            <FullHeightScrollable noPadding={true}>
                {lines}
            </FullHeightScrollable>
        </FullHeight>
    );
}

export class SuggestResultItem extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();
        this.state = {
            showArtifacts: false,
        };
    }

    handleToggleVisibility() {
        this.setState({showArtifacts: !this.state.showArtifacts});
    }

    render() {
        let icons = getArtifactsIcons(this.props.item);
        let artifacts = [];
        let artObj = this.props.item.getArtifacts();

        for (let slot of Object.keys(artObj)) {
            let art = artObj[slot];
            if (art) {
                artifacts.push(art);
            }
        }

        return (
            <div className={'suggest-result-item' + (this.props.even ? ' even' : '')}>
                <div className="main line">
                    <div className="icons">
                        {icons[0] ? <SuggestSetIcon name={icons[0].name} count={icons[0].count} /> : ''}
                        {icons[1] ? <SuggestSetIcon name={icons[1].name} count={icons[1].count} /> : ''}
                        <div className="show-arts" onClick={() => this.handleToggleVisibility()}>
                            {this.state.showArtifacts ? this.lang.get('pool_view.hide_artifacts') : this.lang.get('pool_view.show_artifacts')}
                        </div>
                    </div>
                    <div className="button">
                        <ResultTableButton
                            icon="icon-load"
                            onClick={() => this.props.onApply(this.props.item.clone())}
                        />
                    </div>
                    <div className="button">
                        <ResultTableButton
                            icon="icon-compare"
                            onClick={() => this.props.onCompare(this.props.item.clone())}
                        />
                    </div>
                    <SuggesterFeatures
                        item={this.props.item}
                        maxFeatures={this.props.maxFeatures}
                        mainFeature={this.props.mainFeature}
                        otherFeatures={this.props.otherFeatures}
                        displayMode={this.props.displayMode}
                    />
                </div>
                <div className={'line' + (this.props.even ? ' even' : '')} style={this.state.showArtifacts ? {} : {display: 'none'}}>
                    <div className="artifacts">
                        <ArtifactList
                            items={artifacts}
                            onLock={this.props.onLock}
                            savedHashes={this.props.savedHashes}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function SuggestSetIcon(props) {
    return (
        <div className="icon">
            <ArtifactSetIcon set={props.name} size={60}/>
            <div className="number">x{props.count}</div>
        </div>
    )
}

function SuggesterFeatures(props) {
    let lang = new Lang();
    let features = props.item.calcFeatures(1);

    let items = [];
    for (let feat of props.otherFeatures) {
        if (feat == props.mainFeature) {
            continue;
        }

        items.push(
            <div className="value-line sub" key={feat}>
                <div className="value-name">{lang.get('feature_' + feat)}</div>
                <SuggesterFeaturesValues
                    item={features[feat]}
                />
            </div>
        );
    }

    return (
        <div className="values">
            <div className="value-line">
                <div className="value-name">{lang.get('feature_' + props.mainFeature)}</div>
                <SuggesterFeaturesValues
                    item={features[props.mainFeature]}
                    base={props.maxFeatures[props.mainFeature]}
                    displayMode={props.displayMode}
                />
            </div>
            {items}
        </div>
    );
}

function SuggesterFeaturesValues(props) {
    let format = props.item.format;
    let values = {};
    let percents = {};

    for (const field of ['normal', 'crit', 'average']) {
        let value   = props.item[field];
        let percent = 0;

        if (props.base && props.base[field]) {
            percent = formatFeatureDiff(value, props.base[field], {displayMode: props.displayMode});
        }

        if (format == 'percent') {
            value = formatNumber(value, {percent: true, digits: props.item.digits});
        } else if (format == 'decimal') {
            value = formatNumber(value, {digits: props.item.digits});
        } else {
            value = formatNumber(Math.round(value));
        }

        values[field] = value;
        percents[field] = percent;
    }

    return (
        <>
            <div className="value">{values.normal}{props.base ? <div>{percents.normal}</div> : ''}</div>
            <div className="value">{values.crit}{props.base ? <div>{percents.crit}</div> : ''}</div>
            <div className="value">{values.average}{props.base ? <div>{percents.average}</div> : ''}</div>
        </>
    );
}

function getArtifactsIcons(set) {
    let artSetsCount = {};
    let artSets = [];
    let arts = set.getArtifacts();
    let totalCount = 0;
    let totalArts = 0;

    for (const slot of Object.keys(arts)) {
        let art = arts[slot];
        if (!art) continue;

        ++totalArts;

        let setName = art.getSetName();
        if (!artSetsCount[setName]) {
            artSetsCount[setName] = 1;
        } else {
            ++artSetsCount[setName];
        }
    }

    for (const setName of Object.keys(artSetsCount)) {
        let setData = DB.Artifacts.Sets.get(setName);

        if (setData) {
            let count = artSetsCount[setName];
            if (count < 2) {
                continue;
            }

            let conds = setData.getConditions(count);

            if (conds.length) {
                totalCount += count;
                artSets.push({
                    name: setName,
                    count: count,
                });
            }
        }
    }

    if (artSets.length < 2 && totalArts - totalCount > 0) {
        artSets.push({
            name: '',
            count: totalArts - totalCount,
        });
    }

    return artSets;
}

function formatFeatureDiff(current, max, opts) {
    let result;

    if (opts.displayMode == 'absolute') {
        let rawDiff = Math.round(current - max, 5);
        let diff = Stats.format('', rawDiff, {signed: true, minimize: true}) || '-';
        let diffClass = rawDiff > 0 ? 'positive' : (rawDiff < 0 ? 'negative' : '');
        result = <span className={'remark '+ diffClass}>{diff}</span>;
    } else {
        let percent = Stats.format('text_percent', current / max * 100, {decimal_digits: 1, no_decimal_zero: 1});
        result = <span className="remark">{percent}</span>
    }

    return result;
}
