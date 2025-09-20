import React from 'react';
import "../../../css/Components/Tab/Compare.css"

import { CalcSet } from '../../classes/CalcSet';
import { ControlsBar, ControlsBarDivider } from '../Components/ControlsBar';
import { Dropdown } from '../Components/Inputs/Dropdown';
import { Feature2 } from '../../classes/Feature2';
import { FeatureTableHeader, FeatureTableValues } from '../Components/FeatureTable';
import { FullHeight, FullHeightScrollable, FullHeightStatic } from '../Components/FullHeight';
import { Lang } from '../Lang';
import { Radio } from '../Components/Inputs/Input';
import { ReactTab } from '../Components/Tab';
import { RoundButton, TitledButton, ToggleRoundButton } from '../Components/Inputs/Buttons';
import { Serializer } from '../../classes/Serializer';
import { Tab } from "../Tab";

let lang = new Lang();

const MAX_STORAGE_LEGNTH = 50;
const ROTATION_TYPE_SAVED = 1;
const ROTATION_TYPE_CURRENT = 2;

export class CompareTab extends Tab {
    constructor(params) {
        super(params);

        this.id = 'compare';
        this.rightRab = false;
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

    addItem(build) {
        this.component.addFromBuild(build);
    }

    createContent() {
        return (
            <CompareView
                ref={element => { this.component = element }}
                app={this.app}
              />
        );
    }
}

export class CompareView extends React.Component {
    constructor(props) {
        super(props);

        this.index = 0;
        this.state = {
            feature: '',
            displayMode: '',
            baseIndex: 0,
            rotationType: ROTATION_TYPE_CURRENT,
            sortByFeature: false,
            items: [],
            moreFeaturesList: [],
        };

        this.loadFromStorage();
    }

    saveToStorage() {
        let result = [];
        for (let item of this.state.items) {
            result.push({
                title: item.title || '',
                data: Serializer.pack(item.build)
            });

            if (result.length >= MAX_STORAGE_LEGNTH) {
                continue;
            }
        }
        localStorage.setItem('compare_items', JSON.stringify(result));
    }

    loadFromStorage() {
        let result;
        try {
            result = JSON.parse(localStorage.getItem('compare_items'));
        } catch(e) {
            return;
        }

        let showBetaContent = this.props.app.showBetaContent();

        if (Array.isArray(result)) {
            for (let item of result) {
                let input = Serializer.unpack(item.data);
                if (!input) {
                    continue;
                }

                let build = CalcSet.deserialize(input);
                if (!build) {
                    continue;
                }

                let isBeta = build.hasBetaContent();
                if (showBetaContent || !isBeta) {
                    this.addFromBuild(build, item.title, true);
                }
            }
        }
    }

    addFromBuild(build, title, noRefresh) {
        this.index++;
        title = title || lang.get(build.getChar().getName()) +' '+ this.index;

        this.state.items.push({
            key: 'compare'+ this.index,
            title: title,
            build: build,
        });

        if (!noRefresh) {
            this.refreshItems();
        }
    }

    refreshItems() {
        this.saveToStorage();
        this.setState({items: this.state.items});
    }

    dataFeaturesItems() {
        return Feature2.buildDropdown(this.props.app.currentSet());
    }

    handleFeature(feature) {
        this.props.app.setFeature(feature);
        this.props.app.refresh();
    }

    handleDisplayMode(mode) {
        this.setState({displayMode: mode});
        this.props.app.setDisplayMode(mode);
    }

    handleFeaturesSelect() {
        UI.WindowSelectFeatureList.show((items) => {
            this.setState({moreFeaturesList: [].concat(items)});
        }, this.state.moreFeaturesList);
    }

    handleFeatureSort(value) {
        this.setState({sortByFeature: !!value});
    }

    handleAddItem() {
        this.index++;
        let build = this.props.app.currentSet().clone();
        let title = lang.get(build.getChar().getName()) +' '+ this.index;

        this.state.items.push({
            key: 'compare'+ this.index,
            title: title,
            build: build,
        });
        this.refreshItems();
    }

    handleClearItems() {
        UI.ConfirmWindow.show('modal.confirm', 'compare_view.clear_comparison_confirm', () => {
            this.state.items = [];
            this.index = 0;
            this.refreshItems();
        });
    }

    handleBaseIndexChange(index) {
        this.setState({baseIndex: index});
    }

    handleRotationType(value) {
        this.setState({rotationType: value});
    }

    handleItemRename(index) {
        let item = this.state.items[index];
        if (!item) {
            return;
        }

        UI.PromptWindow.show('modal.edit_compare_name', item.title, (text) => {
            this.state.items[index].title = text;
            this.refreshItems();
        });
    }

    handleItemDelete(index) {
        UI.ConfirmWindow.show('modal.confirm', 'compare_view.confirm_delete', () => {
            let newBase = this.state.baseIndex;
            if (this.state.baseIndex == index) {
                newBase = 0;
            } else if (this.state.baseIndex > index) {
                --newBase;
            }

            this.state.items.splice(index, 1);
            this.state.baseIndex = newBase;
            this.refreshItems();
        });
    }

    handleItemApply(index) {
        let item = this.state.items[index];
        if (!item) {
            return;
        }

        UI.ConfirmWindow.show('modal.confirm', 'share_view.confirm_load', () => {
            this.props.app.replaceSet(item.build.clone());
        });
    }

    getItemsSorted() {
        let rotation;
        if (this.state.rotationType == ROTATION_TYPE_CURRENT) {
            rotation = this.props.app.getRotation().clone();
        }

        let base = this.state.items[0];
        if (this.state.baseIndex > 0 && this.state.baseIndex < this.state.items.length) {
            base = this.state.items[this.state.baseIndex];
        }

        let index = 0;
        let result = [];
        let baseFeatures = base ? this.calcBuildFeatures(base.build, rotation) : {};

        for (let item of this.state.items) {
            let features = {};
            if (index == this.state.baseIndex) {
                features = baseFeatures;
            } else {
                features = this.calcBuildFeatures(item.build, rotation);
            }

            result.push({
                index: index,
                item: item,
                itemFeatures: features,
                baseFeatures: baseFeatures,
                value: features[this.state.feature] ? features[this.state.feature].average : 0,
            });

            ++index;
        }

        if (this.state.sortByFeature) {
            result = result.sort((a, b) => {return b.value - a.value});
        }

        return result;
    }

    calcBuildFeatures(build, rotation) {
        if (rotation) {
            let copy = build.clone();
            copy.setRotation(rotation);
            return copy.calcFeatures(1);
        }

        return build.calcFeatures(1);
    }

    render() {
        let isRotation = /rotation/.test(this.state.feature);

        return (
            <ReactTab title={lang.get('tab_header.compare')}>
                <FullHeight>
                    <FullHeightStatic>
                        <ControlsBar>
                            <RoundButton
                                icon="icon-add"
                                onClick={() => this.handleFeaturesSelect()}
                            />
                            <Dropdown
                                barClass="resizable"
                                items={this.dataFeaturesItems()}
                                selected={this.state.feature}
                                onChange={(item) => this.handleFeature(item.value)}
                            />
                            <Dropdown
                                barClass="feature-type"
                                items={[
                                    {value: 'percent', text: lang.get('suggester.display_percent')},
                                    {value: 'absolute', text: lang.get('suggester.display_absolute')},
                                ]}
                                selected={this.state.displayMode}
                                onChange={(item) => this.handleDisplayMode(item.value)}
                            />
                        </ControlsBar>
                        {isRotation ? <ControlsBar>
                            <div>{lang.get('compare_view.use_rotation')}</div>
                            <div>
                                <Radio
                                    value={ROTATION_TYPE_CURRENT}
                                    title={lang.get('compare_view.rotation_current')}
                                    selected={this.state.rotationType === ROTATION_TYPE_CURRENT}
                                    onChange={(value) => this.handleRotationType(value)}
                                />
                            </div>
                            <div>
                                <Radio
                                    value={ROTATION_TYPE_SAVED}
                                    title={lang.get('compare_view.rotation_saved')}
                                    selected={this.state.rotationType === ROTATION_TYPE_SAVED}
                                    onChange={(value) => this.handleRotationType(value)}
                                />
                            </div>
                        </ControlsBar> : ''}
                        <ControlsBar>
                            <ToggleRoundButton
                                icon="icon-sort"
                                checked={this.state.sortByFeature}
                                tooltip={lang.get('tooltip.pool_sort')}
                                onChange={(value) => this.handleFeatureSort(value)}
                            />
                            <ControlsBarDivider />
                            <TitledButton
                                icon="icon-add"
                                title={lang.get('compare_view.add')}
                                onClick={() => this.handleAddItem()}
                            />
                            <TitledButton
                                icon="icon-delete"
                                title={lang.get('compare_view.clear')}
                                onClick={() => this.handleClearItems()}
                            />
                        </ControlsBar>
                        <FeatureTableHeader />
                    </FullHeightStatic>
                    <FullHeightScrollable noPadding={true}>
                        <CompareItems
                            {...this.state}
                            sortedItems={this.getItemsSorted()}
                            onBaseIndex={(index) => this.handleBaseIndexChange(index)}
                            onRename={(index) => this.handleItemRename(index)}
                            onDelete={(index) => this.handleItemDelete(index)}
                            onApply={(index) => this.handleItemApply(index)}
                        />
                    </FullHeightScrollable>
                </FullHeight>
            </ReactTab>
        );
    }
}


class CompareItems extends React.Component {
    render() {
        let items = [];
        let i = 0;

        for (let sortedItem of this.props.sortedItems) {
            let item = sortedItem.item;

            items.push(
                <CompareItem
                    key={item.key}
                    index={sortedItem.index}
                    odd={!(i++ % 2)}

                    item={item}
                    itemFeatures={sortedItem.itemFeatures}
                    baseFeatures={sortedItem.baseFeatures}
                    feature={this.props.feature}
                    displayMode={this.props.displayMode}
                    moreFeaturesList={this.props.moreFeaturesList}

                    baseIndex={this.props.baseIndex}
                    onBaseIndex={this.props.onBaseIndex}
                    onRename={this.props.onRename}
                    onDelete={this.props.onDelete}
                    onApply={this.props.onApply}
                />
            );
        }


        return (
            <div className="compare-list">
                {items}
            </div>
        );
    }
}

export class CompareItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            sortValue: 0,
        };
    }

    render() {
        let result = this.props.itemFeatures[this.props.feature];
        let featureItems = [];

        for (let feature of this.props.moreFeaturesList) {
            if (feature == this.props.feature || !this.props.itemFeatures[feature]) {
                continue;
            }

            featureItems.push(
                <div
                    key={feature}
                    className={'line' + (this.props.odd ? ' odd': '')}
                >
                    <div className="more-info">
                        {lang.get('feature_' + feature)}
                    </div>
                    <FeatureTableValues
                        result={this.props.itemFeatures[feature]}
                    />
                </div>
            );
        }

        return (
            <>
                <div className={'line' + (this.props.odd ? ' odd': '')}>
                    <div className="info">
                        <div className="name">
                            <Radio
                                value={this.props.index}
                                selected={this.props.index === this.props.baseIndex}
                                onChange={(value) => this.props.onBaseIndex(value)}
                            />
                            <div className="name-edit" onClick={() => this.props.onRename(this.props.index)} />
                            <span className="name-title">{this.props.item.title}</span>
                        </div>
                        <div>
                            <span className="item-button" onClick={() => this.props.onApply(this.props.index)}>{lang.get('compare_view.load_set')}</span>
                            <span className="item-button" onClick={() => this.props.onDelete(this.props.index)}>{lang.get('compare_view.delete_set')}</span>
                            {/* <span className="item-button">{lang.get('compare_view.set_details')}</span> */}
                        </div>
                    </div>
                    <FeatureTableValues
                        result={result}
                        base={this.props.baseFeatures[this.props.feature]}
                        displayMode={this.props.displayMode}
                    />
                </div>
                {featureItems}
            </>
        );
    }
}
