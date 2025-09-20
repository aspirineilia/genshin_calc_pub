import React from 'react';

import "../../../../css/Components/Tab/ArtifactsGenerator/Results.css"
import { ArtifactList } from '../../Components/Artifact';
import { FeatureTableValues } from '../../Components/FeatureTable';
import { ResultTableButton } from '../../Components/Inputs/Buttons';
import { Lang } from '../../Lang';

let lang = new Lang();

export function ArtifactsGeneratorResults(props) {
    let items = [];
    let index = 0;
    let baseFeature = props.baseFeature || (props.items.length ? props.items[0].feature : '');
    // let baseFeature = props.baseFeature || '';

    for (let item of props.items) {
        items.push(
            <ResultItem
                key={'item'+ (++index)}
                even={index % 2 == 0}
                item={item}
                displayMode={props.displayMode}
                baseFeature={baseFeature}
                onApply={(data) => props.onApply(data)}
                onCompare={(data) => props.onCompare(data)}
            />
        )
    }

    return (
        <div className="artifact-generator-results">
            {items}
        </div>
    )
}


class ResultItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showArtifacts: false,
        };
    }

    handleToggleVisibility() {
        this.setState({showArtifacts: !this.state.showArtifacts});
    }

    render() {
        let rollItems = [];

        let stats = Object.keys(this.props.item.rollsPerStat).sort((a, b) => {return this.props.item.rollsPerStat[b] - this.props.item.rollsPerStat[a]});
        for (let stat of stats) {
            rollItems.push(
                <RollItem
                    key={stat}
                    stat={stat}
                    value={this.props.item.rollsPerStat[stat]}
                />
            );
        }

        return (
            <div className={'item' + (this.props.even ? ' even' : '')}>
                <div className="line">
                    <MainStats
                        data={this.props.item.mainStats}
                    />
                    <div className="button">
                        <ResultTableButton
                            icon="icon-load"
                            onClick={() => {this.props.onApply(this.props.item.artifacts)}}
                        />
                    </div>
                    <div className="button">
                        <ResultTableButton
                            icon="icon-compare"
                            onClick={() => this.props.onCompare(this.props.item.artifacts)}
                        />
                    </div>
                    <FeatureTableValues
                        result={this.props.item.feature}
                        base={this.props.baseFeature}
                        displayMode={this.props.displayMode}
                    />
                </div>
                <div className="line-substats">
                    <div className="show-arts" onClick={() => this.handleToggleVisibility()}>
                        {this.state.showArtifacts ? lang.get('pool_view.hide_artifacts') : lang.get('pool_view.show_artifacts')}
                    </div>
                    <div className="flex-spacer" />
                    {rollItems}
                </div>
                <div className="line" style={this.state.showArtifacts ? {} : {display: 'none'}}>
                    <div className="artifacts">
                        <ArtifactList items={this.props.item.artifacts} />
                    </div>
                </div>
            </div>
        );
    }
}

function MainStats(props) {
    let items = [];

    for (let slot of ['sands', 'goblet', 'circlet']) {
        items.push(
            <div className="line" key={slot}>
                <div className={'slot '+ slot} />
                <div className="text">{lang.get('stat_short.'+ props.data[slot])}</div>
            </div>
        );
    }
    return (
        <div className="main-stats">
            {items}
        </div>
    );
}

function RollItem(props) {
    return (
        <div className="roll-item">
            <div className="roll-count">{props.value}</div>
            <div className="roll-stat">{lang.get('stat_short.'+ props.stat)}</div>
        </div>
    );
}
