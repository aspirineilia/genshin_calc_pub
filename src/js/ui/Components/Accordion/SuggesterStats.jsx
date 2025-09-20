import React from 'react';
import "../../../../css/Components/Accordion/SuggesterStats.css";

import { GroupBox } from '../Inputs/GroupBox';
import { TextInput } from '../Inputs/Input';


const STATS_FOR_RANGE = ['recharge', 'crit_rate', 'crit_dmg', 'atk', 'def', 'hp', 'mastery'];

export function AccordionSuggesterStats(props) {
    let items = [];

    for (let stat of STATS_FOR_RANGE) {
        items.push(
            <div key={stat} className="line">
                <div className="name">{UI.Lang.get('stat.'+ stat)}</div>
                <div className="value">
                    <TextInput
                        addClass="stat-input"
                        value={props.values[stat +'_min'] || ''}
                        onChange={(value) => props.onChange(stat +'_min', value)}
                    />
                    <div className="separator">-</div>
                    <TextInput
                        addClass="stat-input"
                        value={props.values[stat +'_max'] || ''}
                        onChange={(value) => props.onChange(stat +'_max', value)}
                    />
                </div>
            </div>
        );
    }

    return (
        <GroupBox addClass="accordion-suggester-stats">
            {items}
        </GroupBox>
    );
}
