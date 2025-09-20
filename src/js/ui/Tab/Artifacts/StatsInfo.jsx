import React from 'react';
import parse from 'html-react-parser';
import "../../../../css/Components/Tab/Artifacts/StatsInfo.css"

import { Stats } from '../../../classes/Stats';
import { GroupBox } from '../../Components/Inputs/GroupBox';
import { Lang } from '../../Lang';
import { FeatureCompiler } from '../../../classes/Feature2/Compiler';
import { CBlock } from '../../../classes/Feature2/Compile/Types';

const statsList1 = ['hp', 'atk', 'def'];
const statsList2 = [
    'mastery', 'crit_rate', 'crit_dmg', 'crit_value_percent', 'healing', 'healing_recv', 'recharge', 'recovery', 'shield',
    'dmg_anemo', 'dmg_cryo', 'dmg_electro', 'dmg_geo', 'dmg_hydro', 'dmg_pyro', 'dmg_phys', 'dmg_dendro',
    'res_anemo', 'res_cryo', 'res_electro', 'res_geo', 'res_hydro', 'res_pyro', 'res_phys', 'res_dendro',
    'atk_speed_normal', 'atk_speed_charged', 'dmg_all', 'dmg_normal', 'dmg_charged', 'dmg_plunge', 'dmg_skill', 'dmg_burst',
];
let lang = new Lang();

export class StatsInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let build = this.props.build;

        let data = build.getBuildData();
        let stats = build.artifacts.getStats(data.settings).stats;
        let artCond = build.artifacts.getConditions();
        data.postEffects = build.artifacts.getPostEffects();

        for (const cond of artCond) {
            let art = cond.getData(data.settings);
            stats.concat(art.stats);
        }

        stats.processPercent();

        for (let treeItems of data.postEffectTreeByPriority()) {
            let compiler = new FeatureCompiler(new CBlock([]), treeItems);
            let statFunc = compiler.compilePostTree({dontProcessStats: true});

            if (statFunc) {
                stats.ensure(compiler.usedStats);
                stats.ensure(compiler.assignedStats);
                statFunc(stats);
            }
        }

        stats.revertPercent();

        let items = [];

        for (let stat of statsList1) {
            let flat = stats.get(stat);
            let base = data.stats.get(stat +'_base');
            let percent = stats.get(stat +'_percent');
            let total = flat + base * (percent / 100);

            if (!flat && !percent) continue;

            items.push(
                <StatLineWithBase
                    key={stat}
                    stat={stat}
                    total={total}
                    flat={flat}
                    percent={percent}
                />
            );
        }

        if (items.length == 0) {
            return null;
        }

        stats.add('crit_value_percent', stats.get('crit_value'))

        for (let stat of statsList2) {
            let value = stats.get(stat) + stats.get(stat +'_party');
            if (!value) continue;

            items.push(
                <StatLine
                    key={stat}
                    stat={stat}
                    value={value}
                />
            );
        }

        return (
            <GroupBox title={lang.get('artifact_view.total_stats')}>
                {items}
            </GroupBox>
        );
    }
}

export function StatLine(props) {
    return (
        <div className="arifacts-stat-info-line">
            <div className="si-name">{props.title || parse(lang.get('stat.'+ props.stat))}</div>
            <div className="si-value">
                {props.strValue || Stats.format(props.stat, props.value, {signed: props.unsigned ? false : true})}
            </div>
        </div>
    );
}

function StatLineWithBase(props) {
    return (
        <div className="arifacts-stat-info-line">
            <div className="si-name">{lang.get('stat.'+ props.stat)}</div>
            <div className="si-value">
                {Stats.format(props.stat, props.total, {signed: true})}
                <span className="si-remark">
                    (
                    {Stats.format(props.stat, props.flat, {zero: true})}
                    <span className="si-plus">+</span>
                    {Stats.format(props.stat +'_percent', props.percent, {zero: true})}
                    )
                </span>
            </div>
        </div>
    );
}
