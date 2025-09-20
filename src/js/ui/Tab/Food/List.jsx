import React from 'react';
import "../../../../css/Components/Tab/Food/List.css"
import { Stats } from '../../../classes/Stats';

import { FeatureTableValues } from '../../Components/FeatureTable';
import { Lang } from '../../Lang';

const lang = new Lang();

export class FoodList extends React.Component {
    render() {
        let classes = ['food-list', this.props.foodCategory.toLowerCase()];

        for (let level of Object.keys(this.props.levels)) {
            classes.push('level'+ level);
        }

        let items = [];
        let index = 0;

        for (let item of this.props.items) {
            items.push(
                <FoodListItem
                    key={++index}
                    food={item.food}
                    level={item.level}
                    type={item.type}
                    result={item.result}
                    base={this.props.base}
                    displayMode={this.props.displayMode}
                    selected={item.food == this.props.selectedFood && item.level == this.props.selectedFoodLevel}
                    onClick={this.props.onClick}
                />
            );
        }

        return (
            <div className={classes.join(' ')}>
                {items}
                {this.props.foodCategory != 'Potion' ? <div className="remark">{lang.get('food_view.disclaimer')}</div> : ''}
            </div>
        );
    }
}

function FoodListItem(props) {
    let specChar;
    let prefix = props.food.getPrefix();
    let foodIcon = '';
    let foodName = '';

    if (props.level == 4) {
        foodIcon = props.food.getSpecialIcon();
        foodName = props.food.getSpecialName();
        prefix = props.food.getSpecialPrefix();

        specChar = props.food.getSpecialChar();
        if (specChar) {
            specChar = DB.Chars.get(specChar);
        }
    } else {
        foodIcon = props.food.getIcon();
        foodName = props.food.getName();
    }

    let classes = [
        'item',
        'border-rarity-'+ props.food.getRarity(),
        props.type.toLowerCase(),
    ];

    if (props.selected) {
        classes.push('active');
    }

    return (
        <div className={classes.join(' ')} onClick={() => props.onClick(props.food, props.level)}>
            <div className="title">
                {props.food.hasQuality() ? <span className="quality">{lang.get('food_view.quality_'+ prefix +'_'+ props.level)}</span> : null}
                {lang.get(foodName)}
            </div>
            <div className="line">
                <div className={'icon '+ foodIcon} />
                {specChar ? <div className={'char-icon sprite sprite-40 sprite-char '+ specChar.getIcon()} /> : null}
                <FoodListItemStats food={props.food} level={props.level} />
                <FeatureTableValues
                    result={props.result}
                    base={props.base}
                    displayMode={props.displayMode}
                />
            </div>
        </div>
    );
}

function FoodListItemStats(props) {
    let stats = props.food.getStats(props.level);
    let items = [];

    for (let stat of Object.keys(stats)) {
        items.push(
            <div key={stat} className="stat">
                <span className="name">{lang.get('stat_short.'+ stat)}</span>
                <span className="value">{Stats.format(stat, stats[stat], {signed: 1, no_decimal_zero: 1})}</span>
            </div>
        );
    }

    return (
        <div className="stats">
            {items}
        </div>
    );
}
