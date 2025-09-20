import React from 'react';

import "../../../../css/Components/Accordion/StatFilter.css";

import { Lang } from '../../Lang';
import { Checkbox, NumberInput } from '../Inputs/Input';

let lang = new Lang();

export class AccordionStatFilter extends React.Component {
    render() {
        return (
            <div className="accordion-stat-filter">
                <div className="line">
                    <div className="name">{lang.get('object_view.level')}</div>
                    <div className="value">
                        <NumberInput
                            addClass="stat-input"
                            minValue={0}
                            maxValue={20}
                            value={this.props.settings.min_level}
                            onChange={(value) => this.props.onLevelChange(value, this.props.settings.max_level)}
                        />
                        <div className="separator">-</div>
                        <NumberInput
                            addClass="stat-input"
                            minValue={0}
                            maxValue={20}
                            value={this.props.settings.max_level}
                            onChange={(value) => this.props.onLevelChange(this.props.settings.min_level, value)}
                        />
                    </div>
                </div>
                <SlotLine
                    lang={lang}
                    slot="sands"
                    settings={this.props.settings.main_stats.sands}
                    onChange={this.props.onStatChange}
                />
                <SlotLine
                    lang={lang}
                    slot="goblet"
                    settings={this.props.settings.main_stats.goblet}
                    onChange={this.props.onStatChange}
                />
                <SlotLine
                    lang={lang}
                    slot="circlet"
                    settings={this.props.settings.main_stats.circlet}
                    onChange={this.props.onStatChange}
                />
                <div className="remark">{lang.get('artifacts_ui.ctrl_click_info')}</div>
            </div>
        );
    }
}

function SlotLine(props) {
    let items = [];
    for (let stat of Object.keys(props.settings)) {
        items.push(
            <div key={stat} className="stat">
                <Checkbox
                    title={props.lang.get('stat.'+ stat)}
                    checked={props.settings[stat]}
                    onChange={(value, keys) => props.onChange(props.slot, stat, value, keys)}
                />
            </div>
        );
    }

    return (
        <div className="slot-line">
            <div className="name">{props.lang.get('artifact_set.'+ props.slot)}</div>
            <div className="list">
                {items}
            </div>
        </div>
    )
}
