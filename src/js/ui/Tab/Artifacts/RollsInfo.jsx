import React from 'react';
import parse from 'html-react-parser';

import { GroupBox } from '../../Components/Inputs/GroupBox';
import { Lang } from '../../Lang';
import { substatCheck } from '../../../classes/SubstatCheck';
import { Stats } from '../../../classes/Stats';

let lang = new Lang();

export class RollsInfo extends React.Component {
    getSubstatRolls() {
        let sets = [];
        let artifacts = this.props.build.getArtifacts();

        for (let slot of Object.keys(artifacts)) {
            let art = artifacts[slot];
            if (art) {
                sets.push(art.getSet());
            }
        }

        let buildData = this.props.build.getBuildData();
        let feature = this.props.build.getFeatureByName(this.props.feature);
        let usefulSubstats = feature.getUsedStats(buildData);

        if (!usefulSubstats.includes('recharge')) {
            usefulSubstats.push('recharge')
        }
        usefulSubstats = usefulSubstats.filter((v) => {return v == 'atk' || v == 'def' || v == 'hp' ? false : true});

        let rolls = {};
        let rollsSum = {};
        let rollsMaxSum = {};

        for (let stat of usefulSubstats) {
            rolls[stat] = 0;
            rollsSum[stat] = 0;
            rollsMaxSum[stat] = 0;
        }

        for (let slot of Object.keys(artifacts)) {
            let art = artifacts[slot];
            if (!art) {
                continue;
            }

            for (let item of art.getSubStats()) {
                if (!usefulSubstats.includes(item.stat)) {
                    continue;
                }

                let data = substatCheck(item.stat, art.getRarity(), item.value);
                let statData = DB.Artifacts.Substats.get(item.stat)

                if (data && data.steps) {
                    rolls[item.stat] += data.steps.length;
                    rollsSum[item.stat] += statData.getPreciseValue(item.value, art.getRarity());
                    rollsMaxSum[item.stat] += data.maxValue;
                }
            }
        }

        let result = [];
        let total = 0;

        for (let stat of Object.keys(rolls)) {
            if (!rollsSum[stat]) {
                continue;
            }

            total += rolls[stat];
            result.push({
                stat: stat,
                count: rolls[stat],
                value: rollsSum[stat],
                efficency: rollsSum[stat] / rollsMaxSum[stat],
            });
        }

        return result.sort(function(a,b) {return b.count - a.count});
    }

    render() {
        let items = [];
        let total = 0;

        for (let item of this.getSubstatRolls()) {
            total += item.count;

            items.push(
                <div className="arifacts-stat-info-line" key={item.stat}>
                    <div className="si-name">{lang.get('stat.'+ item.stat)}</div>
                    <div className="si-value">
                        {item.count}
                        <span className="si-remark">
                            ({Stats.format('text_percent', item.efficency * 100)})
                        </span>
                    </div>
                </div>
            );
        }

        if (!total) {
            return null;
        }

        return (
            <GroupBox title={lang.get('artifact_view.useful_rolls')}>
                <div className="arifacts-stat-info-line">
                    <div className="si-name">{lang.get('stat_view.total')}</div>
                    <div className="si-value">{total}</div>
                </div>
                {items}
                <div className="feature-roll-remark">{lang.get('stat_view.for_feature')}: {parse(lang.get('feature_'+ this.props.feature))}</div>
            </GroupBox>
        );
    }
}
