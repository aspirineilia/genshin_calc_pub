import React from 'react';
import "../../../css/Components/Tab/Food.css"

import { ControlsBar } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { Feature2 } from '../../classes/Feature2';
import { FeatureTableHeader } from '../Components/FeatureTable';
import { FoodList } from './Food/List';
import { FoodTypes } from './Food/Types';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { Lang } from '../Lang';
import { ReactTab } from '../Components/Tab';
import { Tab } from "../Tab";

let lang = new Lang();

const DISPLAY_MODES = [
    {value: 'percent', text: lang.get('suggester.display_percent')},
    {value: 'absolute', text: lang.get('suggester.display_absolute')},
];

export class FoodTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'food';
        this.rightRab = true;
        this.title = 'tab_header.food';
    }

    refresh() {
        if (!this.component) {
            return;
        }

        this.component.setState({
            feature: this.app.getFeature(),
            displayMode: this.app.getDisplayMode(),
        });
    }

    createContent() {
        return (
            <FoodView
                ref={element => { this.component = element }}
                app={this.app}
                title={this.title}
                feature={this.app.getFeature()}
                displayMode={this.app.getDisplayMode()}
            />
        )
    }
}

export class FoodView extends React.Component {
    constructor(props) {
        super(props);
        this.lang = new Lang();

        this.state = {
            foodCategory: 'Attack',
            feature: props.feature,
            displayMode: props.displayMode,
            levels: {
                1: false,
                2: false,
                3: true,
                4: true,
            },
        };

        this.strings = {
            title: this.lang.get(this.props.title),
        };
    }

    handleFeature(selectedItem) {
        let feature = selectedItem.value;
        this.setState({feature: feature});
        this.props.app.setFeature(feature);
    }

    handleDisplayMode(mode) {
        this.setState({displayMode: mode});
        this.props.app.setDisplayMode(mode);
    }

    handleTypeChange(type) {
        this.setState({foodCategory: type});
    }

    handleLevelSelect(level) {
        let levels = this.state.levels;
        levels[level] = !levels[level];
        this.setState({levels: levels});
    }

    handleFoodSelect(food, level) {
        let curFood  = this.props.app.getFood(this.state.foodCategory);
        let curLevel = this.props.app.getFoodLevel(this.state.foodCategory);

        if (curFood == food && curLevel == level) {
            this.props.app.setFood(this.state.foodCategory, null, 0);
        } else {
            this.props.app.setFood(this.state.foodCategory, food, level);
        }
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(this.props.app.currentSet());
    }

    buildFoodList() {
        this.foodList = [];

        let data = DB.Food.get(this.state.foodCategory);
        if (!data) {
            return;
        }

        let build = this.props.app.currentSet().clone();
        let feature = build.getFeatureByName(this.state.feature);
        if (!feature) {
            return;
        }

        let buildData = build.getBuildData();
        this.baseResult = feature.getResult(buildData)[this.state.feature];

        let items = data.getList();
        let curFood  = this.props.app.getFood(this.state.foodCategory);
        let curLevel = this.props.app.getFoodLevel(this.state.foodCategory);

        for (let food of items) {
            for (let level = 1; level <= 4; ++level) {
                if (food == curFood && level == curLevel) {
                    // Always show selected
                } else if (this.state.foodCategory == 'Potion') {
                    if (level > 1) {
                        continue;
                    }
                } else {
                    if (!this.state.levels[level]) {
                        continue;
                    }

                    if (level < 4 && !food.hasCommon()) {
                        continue;
                    }

                    if (level == 4 && !food.hasSpecial()) {
                        continue;
                    }
                }

                build.setFood(this.state.foodCategory, food, level);
                buildData = build.getBuildData();
                let result = feature.getResult(buildData)[this.state.feature];

                this.foodList.push({
                    type: this.state.foodCategory,
                    food: food,
                    level: level,
                    result: result,
                });
            }
        }

        if (this.baseResult) {
            this.foodList = this.foodList.sort(function(a, b) {return b.result.average - a.result.average});
        }
    }

    render() {
        this.buildFoodList();

        return (
            <ReactTab title={this.strings.title}>
                <FullHeight>
                    <FullHeightStatic>
                        <ControlsBar>
                            <Dropdown
                                barClass="resizable"
                                items={this.dataFeaturesItems()}
                                selected={this.state.feature}
                                onChange={(value) => this.handleFeature(value)}
                            />
                            <Dropdown
                                barClass="feature-type"
                                items={DISPLAY_MODES}
                                selected={this.state.displayMode}
                                onChange={(item) => this.handleDisplayMode(item.value)}
                            />
                        </ControlsBar>
                        <FoodTypes
                            app={this.props.app}
                            selectedType={this.state.foodCategory}
                            onTypeChange={(type) => this.handleTypeChange(type)}
                        />
                        <FoodLevels
                            selected={this.state.levels}
                            onClick={(level) => this.handleLevelSelect(level)}
                        />
                        <FeatureTableHeader />
                    </FullHeightStatic>
                    <FullHeightScrollable>
                        <FoodList
                            foodCategory={this.state.foodCategory}
                            items={this.foodList}
                            base={this.baseResult}
                            levels={this.state.levels}
                            displayMode={this.state.displayMode}
                            selectedFoodLevel={this.props.app.getFoodLevel(this.state.foodCategory)}
                            selectedFood={this.props.app.getFood(this.state.foodCategory)}
                            onClick={(name, level) => this.handleFoodSelect(name, level)}
                        />
                    </FullHeightScrollable>
                </FullHeight>
            </ReactTab>
        );
    }
}

function FoodLevels(props) {
    let items = [];

    for (let i = 1; i <= 4; ++i) {
        items.push(
            <div
                key={i}
                className={'item'+ (props.selected[i] ? ' active' : '')}
                onClick={() => props.onClick(i)}
            >
                {lang.get('food_view.quality_n_'+ i)}
            </div>
        );
    }

    return (
        <div className="food-tab-quality">
            {items}
        </div>
    );
}


