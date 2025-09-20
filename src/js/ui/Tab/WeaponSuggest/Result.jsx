import React from 'react';
import "../../../../css/Components/Tab/WeaponSuggest/Result.css"
import { ArtifactList } from '../../Components/Artifact';

import { FeatureTableValues } from '../../Components/FeatureTable';
import { ResultTableButton } from '../../Components/Inputs/Buttons';
import { Lang } from '../../Lang';

let lang = new Lang();

export function WeaponSuggestResult(props) {
    let items = [];
    let counter = 0

    for (let item of props.items) {
        items.push(
            <WeaponSuggestItem
                key={item.weaponId +'_'+ item.refine +'_'+ item.suggestName}
                odd={++counter % 2 == 1}
                baseFeature={props.baseFeature}
                displayMode={props.displayMode}
                onApply={props.onApply}
                {...item}
            />
        );
    }

    return (
        <div className="weapon-suggest-result">
            {items}
        </div>
    );
}

export class WeaponSuggestItem extends React.Component {
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
        let weapon = DB.Weapons.getById(this.props.weaponId);

        return (
            <>
                <div className={'item' + (this.props.odd ? ' odd': '')}>
                    <div className="name">
                        {lang.get(weapon.getName())}<br/>
                        <span className="remark">{lang.get('object_view.weapon_refine')}: </span>
                        <span className="value">{this.props.refine}</span>
                        {this.props.suggestName ? <span className="remark">, {lang.get('weapon_settings.'+ this.props.suggestName)}</span> : ''}
                        {this.props.artifacts && this.props.artifacts.length > 0 ?
                            <div className="show-arts" onClick={() => this.handleToggleVisibility()}>
                                {this.state.showArtifacts ? lang.get('pool_view.hide_artifacts') : lang.get('pool_view.show_artifacts')}
                            </div>
                            : ''
                        }
                    </div>
                    <div className="button">
                        <ResultTableButton
                            icon="icon-load"
                            onClick={() => {this.props.onApply({
                                weaponId: this.props.weaponId,
                                suggestName: this.props.suggestName,
                                level: this.props.level,
                                ascension: this.props.ascension,
                                refine: this.props.refine,
                                artifacts: this.props.artifacts,
                            })}}
                        />
                    </div>
                    {/* <div className="button">
                        <ResultTableButton
                            icon="icon-compare"
                            onClick={() => this.props.onCompare(this.props.item.artifacts)}
                        />
                    </div> */}
                    <FeatureTableValues
                        result={this.props.result}
                        base={this.props.baseFeature}
                        displayMode={this.props.displayMode}
                    />
                </div>
                <div
                    className={
                        'art-item'
                        + (this.props.odd ? ' odd': '')
                        + (!this.state.showArtifacts || this.props.artifacts.length == 0 ? ' hidden': '')
                    }
                >
                    <ArtifactList items={this.props.artifacts} />
                </div>
            </>
        );
    }
}
