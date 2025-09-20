import React from 'react';
import "../../../../css/Components/Tab/Buffs/CustomStats.css";

import { GroupBox } from '../../Components/Inputs/GroupBox';
import { NumberInput } from '../../Components/Inputs/Input';
import { Lang } from '../../Lang';


const PRIMARY_STATS = ['atk', 'def', 'hp'];
const SECONDARY_STATS = ['mastery', 'recharge', 'crit_rate', 'crit_dmg', 'healing', 'healing_recv', 'shield'];
const PERCENT_STATS = ['recharge', 'crit_rate', 'crit_dmg', 'healing', 'healing_recv', 'shield'];
const DAMAGE_BONUS_STATS = [
    'dmg_all', 'dmg_anemo', 'dmg_cryo', 'dmg_dendro', 'dmg_electro', 'dmg_geo', 'dmg_hydro', 'dmg_pyro', 'dmg_phys',
    'dmg_normal', 'dmg_charged', 'dmg_plunge', 'dmg_skill', 'dmg_burst',
    'enemy_def_reduce', 'enemy_def_ignore',
];

export class CustomStats extends React.Component {
    constructor(props) {
        super(props);

        this.lang = new Lang();

        this.strings = {
            primary: this.lang.get('stat_view.base_stats'),
            damage_bonus: this.lang.get('stat_view.damage_bonus'),
        };
    }

    render() {
        let items = [];
        let items2 = [];

        for (let stat of PRIMARY_STATS) {
            items.push(
                <div key={stat} className="line">
                    <div className="name">{this.lang.get('stat.'+ stat)}</div>
                    <div className="value">
                        <NumberInput
                            maxValue={9999}
                            addClass="stat-input"
                            value={this.props.settings['custom_buffs.' + stat] || ''}
                            onChange={(value) => this.props.onChange('custom_buffs.' + stat, value)}
                        />
                        <div className="separator"></div>
                        <NumberInput
                            maxValue={999}
                            addClass="stat-input"
                            value={this.props.settings['custom_buffs.' + stat +'_percent'] || ''}
                            isDecimal={true}
                            decimalDigits={1}
                            onChange={(value) => this.props.onChange('custom_buffs.' + stat +'_percent', value)}
                        />
                        %
                    </div>
                </div>
            );
        }

        for (let stat of SECONDARY_STATS) {
            let isPercent = PERCENT_STATS.includes(stat);
            items.push(
                <CustomStat
                    key={stat}
                    stat={stat}
                    value={this.props.settings['custom_buffs.' + stat]}
                    title={this.lang.get('stat.'+ stat)}
                    isDecimal={isPercent}
                    maxValue={isPercent ? 999 : 9999}
                    onChange={this.props.onChange}
                />
            );
        }

        for (let stat of DAMAGE_BONUS_STATS) {
            items2.push(
                <CustomStat
                    key={stat}
                    stat={stat}
                    value={this.props.settings['custom_buffs.' + stat]}
                    title={this.lang.get('stat.'+ stat)}
                    isDecimal={true}
                    maxValue={999}
                    onChange={this.props.onChange}
                />
            );
        }

        return (
            <>
                <GroupBox addClass="buff-custom-stats" title={this.strings.primary}>
                    {items}
                </GroupBox>
                <GroupBox addClass="buff-custom-stats" title={this.strings.damage_bonus}>
                    {items2}
                </GroupBox>
            </>
        );
    }
}

function CustomStat(props) {
    return (
        <div className="line">
            <div className="name">{props.title}</div>
            <div className="value">
                <NumberInput
                    maxValue={props.maxValue}
                    addClass="stat-input"
                    value={props.value || ''}
                    isDecimal={props.isDecimal}
                    decimalDigits={1}
                    onChange={(value) => props.onChange('custom_buffs.' + props.stat, value)}
                />
                {props.isDecimal ? '%' : ''}
            </div>
        </div>
    );
}
