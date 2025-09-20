import React from 'react';
import "../../../css/Components/Tab/Stats.css"

import { FeatureCompiler } from '../../classes/Feature2/Compiler';
import { FeatureMultiplierReactionAggravate } from '../../classes/Feature2/Multiplier/Reaction/Quicken/Aggravate';
import { FeatureMultiplierReactionAmplifying } from '../../classes/Feature2/Multiplier/Reaction/Amplifying';
import { FeatureMultiplierReactionQuicken } from '../../classes/Feature2/Multiplier/Reaction/Quicken';
import { FeatureMultiplierReactionSpread } from '../../classes/Feature2/Multiplier/Reaction/Quicken/Spread';
import { FeatureReactionBurning } from '../../classes/Feature2/Reaction/Transformative/Burning';
import { FeatureReactionCrystallize } from '../../classes/Feature2/Reaction/Crystallize';
import { FeatureReactionElectroCharged } from '../../classes/Feature2/Reaction/Transformative/ElectroCharged';
import { FeatureReactionHyperBloom } from '../../classes/Feature2/Reaction/Transformative/HyperBloom';
import { FeatureReactionHyperBurgeon } from '../../classes/Feature2/Reaction/Transformative/Burgeon';
import { FeatureReactionOverloaded } from '../../classes/Feature2/Reaction/Transformative/Overloaded';
import { FeatureReactionRupture } from '../../classes/Feature2/Reaction/Transformative/Rupture';
import { FeatureReactionSuperConduct } from '../../classes/Feature2/Reaction/Transformative/SuperConduct';
import { FeatureReactionSwirl } from '../../classes/Feature2/Reaction/Transformative/Swirl';
import { FeatureReactionTransformative } from '../../classes/Feature2/Reaction/Transformative';
import { FullHeight, FullHeightStatic, FullHeightFloatTitle, FloatTitleBlock } from '../Components/FullHeight';
import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { Stats, isPercent } from '../../classes/Stats';
import { Tab } from "../Tab";
import { FeatureMultiplierReactionVaporize } from '../../classes/Feature2/Multiplier/Reaction/Amplifying/Vaporize';
import { FeatureMultiplierReactionMelt } from '../../classes/Feature2/Multiplier/Reaction/Amplifying/Melt';
import { FeatureReactionLunarCharged } from '../../classes/Feature2/Reaction/Transformative/Lunar/Charged';
import { FeatureReactionLunar } from '../../classes/Feature2/Reaction/Transformative/Lunar';

let lang = new Lang();

const secondaryStatsList = [
    'recharge',
    'crit_rate', '!crit_rate_enemy', '!crit_rate_normal', '!crit_rate_charged', '!crit_rate_plunge',
    '!crit_rate_skill', '!crit_rate_burst', '!crit_rate_ganyu', '!crit_rate_nahida', '!crit_rate_freminet', '!crit_rate_charged_wriothesley',
    '!crit_rate_navia', '!crit_rate_gaming', '!crit_rate_normal_arlecchino', '!crit_rate_burst_arlecchino', '!crit_rate_sethos',
    '!crit_rate_amber', '!crit_rate_normal_mualani',
    'crit_dmg', '!crit_dmg_skill', '!crit_dmg_anemo', '!crit_dmg_cryo', '!crit_dmg_electro', '!crit_dmg_geo',
    '!crit_dmg_normal', '!crit_dmg_charged', '!crit_dmg_plunge', '!crit_dmg_neuvillette',
    '!crit_dmg_hydro', '!crit_dmg_pyro', '!crit_dmg_phys', '!crit_dmg_charged_wriothesley', '!crit_dmg_burst',
    '!crit_dmg_navia', '!crit_dmg_xianyun', '!crit_dmg_gaming', '!crit_dmg_normal_arlecchino', '!crit_dmg_burst_arlecchino',
    '!crit_dmg_skill_kinich', '!crit_dmg_normal_mualani', '!crit_dmg_chasca',
    'healing', 'healing_recv', 'recovery', 'shield',
];

const dmgStatsList = [
    'dmg_all',
    '!dmg_skill_ororon',
    'dmg_normal',
    '!dmg_normal_elemental', '!dmg_normal_ayato', '!dmg_normal_skirk',
    'dmg_charged',
    '!dmg_charged_tighnari', '!dmg_charged_wriothesley', '!dmg_charged_enemy', '!dmg_charged_elem_chasca',
    'dmg_plunge',
    '!dmg_plunge_shockwave',
    'dmg_skill',
    '!dmg_skill_nahida', '!dmg_skill_cyno', '!dmg_skill_albedo', '!dmg_skill_nilou', '!dmg_skill_layla',
    '!dmg_skill_sayu_press', '!dmg_skill_sayu_hold', '!dmg_skill_yaemiko', '!dmg_skill_traveler_dendro',
    '!dmg_skill_alhaitham', '!dmg_skill_dehya', '!dmg_skill_jean', '!dmg_skill_kirara', '!dmg_skill_xiao',
    '!dmg_skill_freminet', '!dmg_skill_furina', '!dmg_skill_navia', '!dmg_skill_gaming', '!dmg_skill_emilie',
    '!dmg_skill_kinich', '!dmg_skill_diona', '!dmg_skill_shenhe',
    'dmg_burst',
    '!dmg_burst_traveler_dendro', '!dmg_burst_tighnari', '!dmg_burst_layla', '!dmg_burst_wanderer',
    '!dmg_burst_alhaitham', '!dmg_burst_kirara', '!dmg_burst_lynette', '!dmg_burst_wriothesley', '!dmg_burst_mualani',
    '!dmg_burst_kinich', '!dmg_burst_clorinde', '!dmg_burst_varesa',
];

const reactionStatList = {
    'dmg_reaction_amplifying': FeatureMultiplierReactionAmplifying,
    '!dmg_reaction_vaporize': FeatureMultiplierReactionVaporize,
    '!dmg_reaction_melt': FeatureMultiplierReactionMelt,

    'dmg_reaction_transformative': FeatureReactionTransformative,
    '!dmg_reaction_swirl_pyro': FeatureReactionSwirl,
    '!dmg_reaction_swirl_hydro': FeatureReactionSwirl,
    '!dmg_reaction_swirl_electro': FeatureReactionSwirl,
    '!dmg_reaction_swirl_cryo': FeatureReactionSwirl,
    '!dmg_reaction_overloaded': FeatureReactionOverloaded,
    '!dmg_reaction_burning': FeatureReactionBurning,
    '!dmg_reaction_electrocharged': FeatureReactionElectroCharged,
    '!dmg_reaction_superconduct': FeatureReactionSuperConduct,
    '!dmg_reaction_burgeon': FeatureReactionHyperBurgeon,
    '!dmg_reaction_hyperbloom': FeatureReactionHyperBloom,
    '!dmg_reaction_rupture': FeatureReactionRupture,

    'dmg_reaction_additive': FeatureMultiplierReactionQuicken,
    '!dmg_reaction_aggravate': FeatureMultiplierReactionAggravate,
    '!dmg_reaction_spread': FeatureMultiplierReactionSpread,
    'dmg_reaction_lunar': FeatureReactionLunar,
    '!dmg_reaction_lunarcharged': FeatureReactionLunarCharged,

    'dmg_reaction_crystalize': FeatureReactionCrystallize,
};

export class StatsTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'stats';
        this.rightRab = false;
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({});
    }

    createContent() {
        return (
            <StatsView
                ref={element => { this.component = element }}
                app={this.app}
                title={lang.get('tab_header.stat_view')}
            />
        );
    }
}

class StatsView extends React.Component {
    getBaseStats(stats) {
        let rows = [];

        for (let stat of ['hp', 'atk', 'def', 'mastery']) {
            let base  = stats.get(stat +'_base');
            let bonus = stats.get(stat) + base * stats.get(stat +'_percent');
            let total = base + bonus;

            rows.push({
                stat: stat,
                icon: 'icon-'+ stat,
                title: lang.getStat('stat.'+ stat),
                base: Stats.format(stat, base, {zero: 1}),
                bonus: Stats.format(stat, bonus, {signed: 1, zero: 1}),
                total: Stats.format(stat, total, {zero: 1}),
            });
        }

        return rows;
    }

    getSecondaryStats(stats) {
        let rows = [];

        for (let stat of secondaryStatsList) {
            let optional = stat.search('!') >= 0 ? true : false;
            stat = stat.replace(/^\!/, '');

            let base  = stats.get(stat +'_base');
            let bonus = stats.get(stat) + stats.get(stat + '_party');

            if (isPercent(stat)) {
                base *= 100;
                bonus *= 100;
            }

            let total = base + bonus;

            if (optional && !total) {
                continue;
            }

            let title = lang.getStat('stat.'+ stat);
            if (optional) {
                title = '• '+ title;
            }

            let item = {
                stat: stat,
                optional: !!optional,
                icon: 'icon-'+ stat,
                title: title,
                base: '',
                bonus: '',
                total: '',
            };

            if (optional) {
                item.total = Stats.format(stat, total, {signed: 1, zero: 1});
            } else {
                item.base  = Stats.format(stat, base,  {zero: 1})
                item.bonus = Stats.format(stat, bonus, {signed: 1, zero: 1})
                item.total = Stats.format(stat, total, {zero: 1})
            }

            rows.push(item);
        }

        return rows;
    }

    getElementalStats(stats) {
        let rows = [];

        for (const stat of ['anemo', 'cryo', 'electro', 'geo', 'hydro', 'pyro', 'dendro', 'phys']) {
            for (const type of ['dmg_']) { // 'res_'
                let name  = type + stat;
                let base  = stats.get(name +'_base');
                let bonus = stats.get(name);

                if (isPercent(name)) {
                    base *= 100;
                    bonus *= 100;
                }

                let total = base + bonus;

                rows.push({
                    stat: stat,
                    icon: 'icon-'+ name,
                    title: lang.getStat('stat.'+ name),
                    base: Stats.format(name, base, {zero: 1}),
                    bonus: Stats.format(name, bonus, {signed: 1, zero: 1}),
                    total: Stats.format(name, total, {zero: 1}),
                });
            }
        }

        return rows;
    }

    getModifierStats(stats) {
        let rows = [];

        for (const stat of ['atk_speed_normal', 'atk_speed_charged']) {
            let value = stats.get(stat) + stats.get('atk_speed');

            if (isPercent(stat)) {
                value *= 100;
            }

            rows.push({
                stat: stat,
                title: lang.getStat('stat.'+ stat),
                base: Stats.format(stat, 0, {zero: 1}),
                bonus: Stats.format(stat, value, {signed: 1, zero: 1}),
                total: Stats.format(stat, value, {zero: 1}),
            });
        }

        for (let stat of dmgStatsList) {
            let optional = stat.search('!') >= 0 ? true : false;
            stat = stat.replace(/^\!/, '');

            let value = stats.get(stat)
            let title = lang.getStat('stat.'+ stat);
            if (optional) {
                title = '• '+ title;
            }

            if (optional && !value) {
                continue;
            }

            if (isPercent(stat)) {
                value *= 100;
            }

            rows.push({
                stat: stat,
                optional: !!optional,
                title: title,
                base: Stats.format(stat, 0, {zero: 1}),
                bonus: Stats.format(stat, value, {signed: 1, zero: 1}),
                total: Stats.format(stat, value, {zero: 1}),
            });
        }

        return rows;
    }

    getReactionStats(data) {
        let rows  = [];

        for (let [stat, featureClass] of Object.entries(reactionStatList)) {
            let optional = stat.search('!') >= 0 ? true : false;
            stat = stat.replace(/^\!/, '');

            let feature = new featureClass({});
            let base = 0;
            let bonus = 0;
            let title = lang.getStat('feature_reaction.'+ stat.replace('dmg_reaction_', ''));

            if (feature.getReactionMasteryBonus) {
                base = calcTreeValue(feature.getReactionMasteryBonus(data), data) * 100 || 0;
            } else if (feature.getMasteryMultiplier) {
                base = calcTreeValue(feature.getMasteryMultiplier(data), data) * 100 || 0;
            } else {
                console.log(feature)
            }

            if (feature.getReactionBonuses) {
                bonus = calcTreeValue(feature.getReactionBonuses(data), data) * 100 || 0;
            }

            if (optional) {
                if (!bonus) {
                    continue;
                }
                rows.push({
                    stat: stat,
                    optional: !!optional,
                    title: '• '+ title,
                    base: '',
                    bonus: Stats.format(stat, bonus, {signed: 1, zero: 1}),
                    total: Stats.format(stat, base + bonus, {zero: 1}),
                });
            } else {
                rows.push({
                    stat: stat,
                    optional: !!optional,
                    title: title,
                    base: Stats.format(stat, base, {zero: 1}),
                    bonus: Stats.format(stat, bonus, {signed: 1, zero: 1}),
                    total: Stats.format(stat, base + bonus, {zero: 1}),
                });
            }
        }

        return rows;
    }

    getOtherStats(stats) {
        let rows = [];

        for (const stat of ['charged_stamina_cost', 'charged_stamina_cost_sec']) {
            let value = stats.get(stat);
            if (!value) continue;

            if (isPercent(stat)) {
                value *= 100;
            }

            let multi = -100 * (stats.get('stamina_consume') + stats.get('stamina_consume_charged'));
            let total = Math.max(0, value + value * multi / 100);

            rows.push({
                stat: stat,
                title: lang.getStat('stat.'+ stat),
                base: Stats.format(stat, value, {zero: 1}),
                bonus: Stats.format('stamina_consume', multi, {signed: 1, zero: 1}),
                total: Stats.format(stat, total, {zero: 1}),
            });
        }

        for (const stat of ['burst_energy_cost']) {
            let value = stats.get(stat);

            rows.push({
                stat: stat,
                title: lang.getStat('stat.'+ stat),
                base: Stats.format(stat, value, {zero: 1}),
                bonus: '',
                total: Stats.format(stat, value, {zero: 1}),
            });
        }

        for (const stat of ['move_speed']) {
            let value = stats.get(stat);
            if (!value) continue;

            if (isPercent(stat)) {
                value *= 100;
            }

            rows.push({
                stat: stat,
                title: lang.getStat('stat.'+ stat),
                base: Stats.format(stat, 0, {zero: 1}),
                bonus: Stats.format(stat, value, {signed: 1, zero: 1}),
                total: Stats.format(stat, value, {signed: 1, zero: 1}),
            });
        }

        return rows;
    }

    render() {
        let build = this.props.app.currentSet();
        let buildData = build.getBuildData();
        let stats = buildData.stats;
        buildData.applyPostEffects();

        return (
            <ReactTab title={this.props.title}>
                <FullHeight>
                    <FullHeightStatic>
                        <StatsTableHeader />
                    </FullHeightStatic>
                    <FullHeightFloatTitle noPadding={true}>
                        <FloatTitleBlock title={lang.get('stat_view.base_stats')}>
                            <StatsTableBlock items={this.getBaseStats(stats)} />
                        </FloatTitleBlock>
                        <FloatTitleBlock title={lang.get('stat_view.secondary_stats')}>
                            <StatsTableBlock items={this.getSecondaryStats(stats)} />
                        </FloatTitleBlock>
                        <FloatTitleBlock title={lang.get('stat_view.elemental_stats')}>
                            <StatsTableBlock items={this.getElementalStats(stats)} />
                        </FloatTitleBlock>
                        <FloatTitleBlock title={lang.get('stat_view.damage_bonus')}>
                            <StatsTableBlock items={this.getModifierStats(stats)} />
                        </FloatTitleBlock>
                        <FloatTitleBlock title={lang.get('stat_view.reaction_bonus')}>
                            <StatsTableBlock items={this.getReactionStats(buildData)} />
                        </FloatTitleBlock>
                        <FloatTitleBlock title={lang.get('stat_view.other')}>
                            <StatsTableBlock items={this.getOtherStats(stats)} />
                        </FloatTitleBlock>
                    </FullHeightFloatTitle>
                </FullHeight>
            </ReactTab>
        );
    }
}

function StatsTableHeader(props) {
    return (
        <div className="stats-table-block header">
            <div className="flex-spacer"/>
            <div className="item">{lang.get('stat_view.base')}</div>
            <div className="item green">{lang.get('stat_view.bonus')}</div>
            <div className="item">{lang.get('stat_view.total')}</div>
        </div>
    );
}

function StatsTableBlock(props) {
    let items = [];
    let index = 0;

    for (let item of props.items) {
        let classes = ['line'];

        if (++index % 2) {
            classes.push('odd');
        }

        if (item.optional) {
            classes.push('optional')
        }

        items.push(
            <div className={classes.join(' ')} key={item.stat}>
                <div className="icon">{item.icon ? <div className={item.icon} /> : ''}</div>
                <div className="name">{item.title}</div>
                <div className="item">{item.base}</div>
                <div className="item green">{item.bonus}</div>
                <div className="item">{item.total}</div>
            </div>
        );
    }

    return (
        <div className="stats-table-block">
            {items}
        </div>
    );
}


function calcTreeValue(tree, data) {
    if (!tree.walk) {return 0}

    let compiler = new FeatureCompiler(tree);
    let opts = {dontProcessTree: true, dontProcessStaticValues: true};
    compiler.prepare({}, opts);
    compiler.compile(opts);

    data.stats.ensure(compiler.usedStats);
    return compiler.execute(data);
}
