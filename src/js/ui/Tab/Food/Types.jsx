import React from 'react';
import "../../../../css/Components/Tab/Food/FoodTypes.css"

import { Stats } from '../../../classes/Stats';
import { Lang } from '../../Lang';

let lang = new Lang();

export class FoodTypes extends React.PureComponent {
    render() {
        let types = DB.Food.getKeys();
        let slots = [];

        for (let type of types) {
            let food  = this.props.app.getFood(type);
            let level = this.props.app.getFoodLevel(type);

            slots.push(
                <FoodTypesSlot
                    key={type}
                    slot={type}
                    selected={type == this.props.selectedType}
                    onClick={() => this.props.onTypeChange(type)}
                    food={food}
                    level={level}
                />
            );
        }

        return (
            <div className="food-type-line">
                {slots}
            </div>
        );
    }
}

function FoodTypesSlot(props) {
    if (!props.food) {
        return (
            <div
                className={'item'+ (props.selected ? ' active' : '')}
                onClick={props.onClick}
            >
                <div className="name">{lang.get('food_view.type_'+ props.slot.toLowerCase())}</div>
                <div className="stat">
                    <span className="empty">{lang.get('food_name.not_selected')}</span>
                </div>
            </div>
        )
    }

    let stats = props.food.getStats(props.level);
    let items = [];

    for (let stat of Object.keys(stats)) {
        items.push(
            <div key={stat} className="stat">
                <span className="name">{lang.get('stat_short.'+ stat)}</span>
                <span className="value">{Stats.format(stat, stats.get(stat), {signed: 1, no_decimal_zero: 1})}</span>
            </div>
        );
    }

    return (
        <div
            className={'item'+ (props.selected ? ' active' : '')}
            onClick={() => props.onClick(props.type)}
        >
            <div className="name">{lang.get('food_view.type_'+ props.slot.toLowerCase())}</div>
            <div className={'icon '+ (props.level == 4 ? props.food.getSpecialIcon() : props.food.getIcon())}></div>
            {items}
        </div>
    );
}
