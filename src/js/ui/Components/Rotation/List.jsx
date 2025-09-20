import React from "react";
import parse from 'html-react-parser';
import { ReactSortable } from "react-sortablejs";

import "../../../../css/Components/Tab/Rotation/List.css"

import { GroupBox } from "../Inputs/GroupBox";
import { Lang } from "../../Lang";
import { MAX_DEPTH, Rotation } from "../../../classes/Rotation";
import { Stats } from "../../../classes/Stats";
import { BlockRemark } from "../TextBlocks";

let lang = new Lang();

const reactionNames = {
    1: 'melt',
    2: 'vaporize',
    3: 'quicken',
};

export class RotationList extends React.Component {
    handleSort(items) {
        this.buffer = items;
        this.checkForTriggerUpdate();
    }

    handleInnerSort(base, items, key) {
        key ||= 'items';
        base[key] = items.map((i) => {return i.item});
        this.checkForTriggerUpdate();
    }

    checkForTriggerUpdate() {
        let mapped = this.buffer.map((i) => {return i.item});
        let number = this.getNumberTotal(mapped);

        // if (number < 0) {
        //     this.props.onSortItems(); // refresh
        //     return;
        // }

        if (number != this.itemsTotal) {
            return;
        }

        if (getMaxDepth(mapped, 0) > MAX_DEPTH) {
            this.props.onSortItems();
            return;
        }

        let result = new Rotation({name: '', items: mapped});
        this.props.onSortItems(result);
    }

    getNumberTotal(items) {
        let cnt = 0;

        if (!Array.isArray(items)) {
            return 0;
        }

        for (let item of items) {
            ++cnt;

            for (let key of ['items', 'conditions', 'features']) {
                if (item.hasOwnProperty(key)) {
                    cnt += this.getNumberTotal(item[key])
                }
            }
        }

        return cnt;
    }

    buildList(items, parentIsDisabled) {
        let count = 0;
        let list = [];

        for (let item of items) {
            let listItem = {
                id: item.id,
                item: item,
                build: this.props.build,
            };

            let isDisabled = parentIsDisabled || item.disabled;

            if (item.type == 'feature') {
                if (!isDisabled) {
                    listItem.feature = this.featuresCache.shift();
                }
            } else if (item.type == 'repeat') {
                let [blockList, blockCount] = this.buildList(item.items, isDisabled);

                listItem.list = blockList;
                count += blockCount;
            } else if (item.type == 'uptime') {
                let [conditionsList, conditionsCount] = this.buildList(item.conditions, isDisabled);
                let [featuresList, featuresCount] = this.buildList(item.features, isDisabled);

                listItem.conditions = conditionsList;
                listItem.features = featuresList;
                count += conditionsCount + featuresCount;
            }

            ++count;
            list.push(listItem);
        }

        return [list, count];
    }

    render() {
        this.featuresCache = [].concat(this.props.featureItems);
        [this.buffer, this.itemsTotal] = this.buildList(this.props.items);

        return (
            <ReactSortable
                group="rotation"
                list={this.buffer}
                setList={(v) => this.handleSort(v)}
                className="rotation-items-list"
                handle=".handler"
                swapThreshold={0.5}
            >
                <SortableItems
                    items={this.buffer}
                    settings={this.props.settings}
                    onCopy={this.props.onCopy}
                    onEnable={this.props.onEnable}
                    onEdit={this.props.onEdit}
                    onDelete={this.props.onDelete}
                    onSort={(item, sortItems, key) => this.handleInnerSort(item, sortItems, key)}
                    onToggle={this.props.onToggle}
                />
            </ReactSortable>
        );
    }
}

function SortableItems(props) {
    let items = [];

    for (let item of props.items) {
        items.push(
            <RotationListItem
                key={item.id}
                {...item}
                settings={props.settings}
                onCopy={props.onCopy}
                onEnable={props.onEnable}
                onEdit={props.onEdit}
                onDelete={props.onDelete}
                onSort={props.onSort}
                onToggle={props.onToggle}
            />
        );
    }

    return (
        <>{items}</>
    );
}

class RotationListItem extends React.Component {
    render() {
        let item;
        let showButtons = true;

        if (this.props.item.type == 'feature') {
            if (this.props.feature && this.props.feature.result) {
                item = <RotationListFeature {...this.props} />;
            } else {
                item = <RotationListFeatureInvalid {...this.props} />;
            }
        } else if (this.props.item.type == 'condition') {
            item = <RotationListCondition {...this.props} />;
        } else if (this.props.item.type == 'repeat') {
            showButtons = false;
            item = <RotationRepeat {...this.props} />;
        } else if (this.props.item.type == 'uptime') {
            showButtons = false;
            item = <RotationBuffUptime {...this.props} />;
        }

        return (
            <div className={'item' + (this.props.item.disabled ? ' disabled' : '')}>
                {item}
                {showButtons ? <>
                    <div
                        className="item-enable control"
                        onClick={() => this.props.onEnable(this.props.item.id)}
                    />
                    <div
                        className="item-edit control"
                        onClick={() => this.props.onEdit(this.props.item.id)}
                    />
                    <div
                        className="item-delete control"
                        onClick={() => this.props.onDelete(this.props.item.id)}
                    />
                </> : ''}
            </div>
        );
    }
}

function RotationListFeature(props) {
    let parts = props.item.feature.split('.');

    return (
        <div className="rotation-block feature handler">
            <div className="line">
                <div className="count">x{props.item.count || 1}</div>
                <div className={'icon gi-stat-element-icon stat-' + props.feature.result.icon}></div>
                <RotationLineReaction
                    item={props.item}
                    feature={props.feature}
                />
                <div className="feature-line">
                    <span className="feature-name">{parse(lang.get('feature_' + props.item.feature))}</span>
                    <span className="feature-category">{lang.get('feature_rotation.' + parts[0])}</span>
                </div>
            </div>
            <RotationLineValues
                count={props.feature.count}
                result={props.feature.result}
            />
            <RotationFeatureSubLine
                data={props.feature.subLine}
            />
        </div>
    );
}

function RotationFeatureSubLine(props) {
    if (!props.data) {
        return null;
    }

    let values = new Stats({
        count: props.data.value,
        count_percent: props.data.value,
        count100_percent: props.data.value * 100,
    });

    let text = lang.getTalent(props.data.descr, values) || '';

    return (
        <div className="sub-line">
            {parse(text)}
        </div>
    );
}

function RotationLineReaction(props) {
    if (!props.item.reaction) {
        return null;
    }

    let reactionName = reactionNames[props.item.reaction];
    let reactionClass = ' invalid';

    if (props.feature && props.feature && props.feature.result && props.feature.result.isReacted) {
        reactionClass = ' text-'+ props.feature.result.icon;
        if (props.item.reaction == 3) {
            if (props.feature.result.icon == 'electro') {
                reactionName = 'aggravate';
            } else if (props.feature.result.icon == 'dendro') {
                reactionName = 'spread';
            }
        }
    }

    return (
        <div className={'reaction' + reactionClass}>{lang.get('feature_reaction.'+ reactionName)}</div>
    );
}

function RotationLineValues(props) {
    let items = [];

    for (let type of ['normal', 'crit', 'average']) {
        if (props.result[type]) {
            items.push(
                <React.Fragment key={type}>
                    <div className="name">{lang.get('stat_view.' + type)}</div>
                    <div className="value">{Stats.format('', props.count * props.result[type])}</div>
                </React.Fragment>
            );
        }
    }

    return (
        <div className="line">
            <div className="flex-spacer"></div>
            {items}
        </div>
    )
}

function RotationListFeatureInvalid(props) {
    let parts = props.item.feature.split('.');

    return (
        <div className="rotation-block feature handler invalid">
            <div className="line">
                <div className="count">x{props.item.count || 1}</div>
                <RotationLineReaction
                    item={props.item}
                    feature={props.feature}
                />
                <div className="feature-line">
                    <span className="feature-name">{lang.get('feature_' + props.item.feature)}</span>
                    <span className="feature-category">{lang.get('feature_rotation.' + parts[0])}</span>
                </div>
            </div>
        </div>
    );
}

function RotationListCondition(props) {
    let itemData = Rotation.getConditionData(props.item, props.build);
    if (!itemData.cond) {
        return (
            <div className="condition handle invalid">???</div>
        );
    }

    let type = itemData.cond.getType();
    let valueHtml;
    let mainIcon = itemData.icon;
    let items = [];

    if (itemData.object == 'buffs') {
        items.push(<div key="team" className="icon icon-team"/>);
    }

    if (type == 'checkbox') {
        if (props.item.value) {
            items.push(<div key="disabled" className="condition-flag enabled"></div>);
        } else {
            items.push(<div key="disabled" className="condition-flag"></div>);
        }
    } else if (type == 'stacks' || type == 'number') {
        if (props.item.value) {
            items.push(<div key="text_value" className="condition-value">{props.item.value}</div>);
        } else {
            items.push(<div key="disabled" className="condition-flag"></div>);
        }
    } else if (type == 'dropdown' || type == 'dropdown_multiple') {
        let values = [];
        let settings = {};
        settings[itemData.cond.getName()] = itemData.cond.getValueById(props.item.value);
        let selectedVals = itemData.cond.getSelectedValues(settings);

        for (let i of itemData.cond.getDropdownItems(props.settings || {})) {
            if (!selectedVals.includes(''+ i.value)) {
                continue;
            }

            let value = '';
            if (i.icon) {
                items.push(<div key={'value' + i.value} className={'icon gi-dropdown-icon icon-' + i.icon}/>);
            } else if (i.title) {
                value = i.title;
            }
            values.push(value)
        }

        if (values.length) {
            valueHtml = values.join('') +' '+ itemData.cond.getTitle();
        } else {
            items.push(<div key="disabled" className="condition-flag"></div>);
        }
    }

    valueHtml ||= itemData.cond.getTitle();

    let rotationNumber = itemData.cond.params.rotationNumber;
    if (rotationNumber) {
        valueHtml += ' ('+ rotationNumber +')';
    }

    let classes = ['rotation-block', 'handler', 'condition'];
    if (itemData.invalid) {
        classes.push('invalid');
    }

    return (
        <div className={classes.join(' ')}>
            {mainIcon ? <div className={'icon sprite sprite-24 '+ mainIcon}></div> : null}
            {items}
            <div className="condition-text">
                {valueHtml}
            </div>
        </div>
    );
}

function RotationRepeat(props) {
    let title = lang.get('rotation_view.repeat_text');
    title = title.replace('{x}', props.item.count);

    return (
        <div className="rotation-block handler compose repeat">
            <div className="line">
                <div className="inner-title">{title}</div>
                <div
                    className="item-eye control"
                    onClick={() => props.onToggle(props.item.id)}
                />
                <div
                    className="item-enable control"
                    onClick={() => props.onEnable(props.item.id)}
                />
                <div
                    className="item-edit control"
                    onClick={() => props.onEdit(props.item.id)}
                />
                <div
                    className="item-delete control"
                    onClick={() => props.onDelete(props.item.id)}
                />
            </div>
            {props.item.collapsed
                ? <BlockRemark>
                    {parse(lang.getTalent('rotation_view.items_collapsed', new Stats({number: props.list.length})))}
                </BlockRemark>
                :
                <GroupBox>

                    <ReactSortable
                        group="rotation"
                        list={props.list}
                        setList={(v) => {props.onSort(props.item, v)}}
                        className="rotation-items-list inner"
                        handle=".rotation-block"
                        swapThreshold={0.5}
                    >
                        <SortableItems
                            items={props.list}
                            settings={props.settings}
                            onCopy={props.onCopy}
                            onEnable={props.onEnable}
                            onEdit={props.onEdit}
                            onDelete={props.onDelete}
                            onSort={props.onSort}
                            onToggle={props.onToggle}
                        />
                    </ReactSortable>
                </GroupBox>
            }
        </div>
    );
}

function RotationBuffUptime(props) {
    let title = lang.get('rotation_view.uptime_text');
    title = title.replace('{x}', props.item.percent);
    title += '%';

    return (
        <div className="rotation-block handler compose uptime">
            <div className="line compose-title">
                <div className="inner-title">{title}</div>
                <div
                    className="item-eye control"
                    onClick={() => props.onToggle(props.item.id)}
                />
                <div
                    className="item-enable control"
                    onClick={() => props.onEnable(props.item.id)}
                />
                <div
                    className="item-edit control"
                    onClick={() => props.onEdit(props.item.id)}
                />
                <div
                    className="item-delete control"
                    onClick={() => props.onDelete(props.item.id)}
                />
            </div>
            {props.item.collapsed
                ? <BlockRemark>{
                    parse(lang.getTalent('rotation_view.items_collapsed', new Stats({number: props.conditions.length + props.features.length})))}
                </BlockRemark>
                : <>
                    <GroupBox>
                    <ReactSortable
                        group="rotation"
                        list={props.conditions}
                        setList={(v) => {props.onSort(props.item, v, 'conditions')}}
                        className="rotation-items-list inner"
                        handle=".rotation-block"
                        swapThreshold={0.5}
                    >
                        <SortableItems
                            items={props.conditions}
                            settings={props.settings}
                            onCopy={props.onCopy}
                            onEnable={props.onEnable}
                            onEdit={props.onEdit}
                            onDelete={props.onDelete}
                            onSort={props.onSort}
                            onToggle={props.onToggle}
                        />
                    </ReactSortable>
                </GroupBox>
                <GroupBox>
                    <ReactSortable
                        group="rotation"
                        list={props.features}
                        setList={(v) => {props.onSort(props.item, v, 'features')}}
                        className="rotation-items-list inner"
                        handle=".handler"
                    >
                        <SortableItems
                            items={props.features}
                            settings={props.settings}
                            onCopy={props.onCopy}
                            onEnable={props.onEnable}
                            onEdit={props.onEdit}
                            onDelete={props.onDelete}
                            onSort={props.onSort}
                            onToggle={props.onToggle}
                        />
                    </ReactSortable>
                </GroupBox>
            </>}
        </div>
    );
}

function getMaxDepth(items) {
    let result = 0;

    for (let item of items) {
        for (let key of ['items', 'conditions', 'features']) {
            if (item.hasOwnProperty(key)) {
                result = Math.max(result, 1 + getMaxDepth(item[key], result));
            }
        }
    }

    return result;
}
