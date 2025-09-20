import React from "react";
import parse from 'html-react-parser';

import "../../../css/Components/ConditionList.css"

import { Lang } from "../Lang";
import { Checkbox, NumberInput } from "./Inputs/Input";
import { Dropdown } from "./Inputs/Dropdown";
import { GroupBox } from "./Inputs/GroupBox";
import { Stats } from "../../classes/Stats";

let lang = new Lang();

export class ConditionList extends React.Component {
    render() {
        let items = [];
        let counter = 0;

        for (let item of this.props.items) {
            ++counter;
            let key = (item.getName() || 'cond') + counter;

            if (this.props.hideNoDescription) {
                if (!item.getDescription()) {
                    continue;
                }
            }

            if (!this.props.showBeta && item.params.beta) {
                continue;
            }

            items.push(
                <ConditionItem
                    key={key}
                    item={item}
                    settings={this.props.settings || {}}
                    onlySelectable={this.props.onlySelectable}
                    ignoreSubconditions={this.props.ignoreSubconditions}
                    hideControls={this.props.hideControls}
                    onChange={this.props.onChange}
                    noWrap={this.props.noWrap}
                    charId={this.props.charId}
                />
            );
        }

        return (
            <div
                className={'condition-list'+ (this.props.addClass ? ' '+ this.props.addClass : '')}
                // data-char={this.props.charId}
            >
                {items}
            </div>
        );
    }
}

function ConditionItem(props) {
    let cond = props.item;
    let type = cond.getType();

    if (!type) {
        return null;
    }

    if (type == 'party_weapon') {
        return <PartyWeaponItem {...props} />
    }

    let subcond = true;
    if (!props.ignoreSubconditions) {
        subcond = cond.checkSubconditions(props.settings);
    }

    if (!subcond && cond.params.hideInactive) {
        return null;
    }

    if (cond.isHidden(props.settings)) {
        return null;
    }

    if (type && !subcond) {
        type = 'static';
    }

    if (type == 'static' && props.onlySelectable) {
        return null;
    }

    let stats = cond.getStats(props.settings);
    let result = (
        <div
            className="condition-list-item"
            data-char={props.charId}
        >
            <div className="top-line">
                {props.hideControls ? '' : <div className="control">
                    <ConditionControl
                        item={cond}
                        type={type}
                        settings={props.settings}
                        onChange={props.onChange}
                        subcond={subcond}
                    />
                </div>}
                <div className="title">{cond.getTitle(stats)}</div>
                <ConditionLoadStat
                    stat={cond.params.loadPartyStat}
                    name={cond.getName()}
                    onChange={props.onChange}
                />
                <ConditionInfo item={cond} />
            </div>
            <ConditionDescription item={cond} stats={stats} />
        </div>
    );

    if (!props.noWrap) {
        result = <GroupBox>{result}</GroupBox>
    }

    return result;
}

class PartyWeaponItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: [],
        };
    }

    addLine() {
        let itemsCnt = this.props.item.getMaxDisplay();
        let index;

        for (let i = 2; i <= itemsCnt; ++i) {
            if (!this.state.visible[i-2]) {
                index = i;
                break;
            }
        }

        if (index) {
            this.state.visible[index-2] = true;
            this.setState({visible: this.state.visible});
        }
    }

    removeLine(number) {
        if (number >= 2 && number <= this.props.item.getMaxDisplay()) {
            this.state.visible[number-2] = false;

            let levelCond = this.props.item.createLevelCond(number);
            this.props.onChange(levelCond.getName(), false);

            let statCond = this.props.item.createStatCond(number);
            if (statCond) {
                this.props.onChange(statCond.getName(), 0);
            }
        }
    }

    loadStats(number) {
        let statName = this.props.item.params.partyStat;
        let statCond = this.props.item.createStatCond(number);

        if (statName && statCond) {
            UI.PartyLoad.show({
                stats: [statName + '_total'],
                callback: (data) => {
                    let value = data.stats.getTotal(statName);
                    value = Stats.format(statName, value);
                    value = value.replace(/[^\d\.]/g, '');

                    this.props.onChange(statCond.getName(), value);
                }
            });
        }
    }

    genControls() {
        let cond = this.props.item;
        let items = [];
        let itemsCnt = this.props.item.getMaxDisplay();

        for (let i = 1; i <= itemsCnt; ++i) {
            let levelCond = cond.createLevelCond(i);
            let statCond = cond.createStatCond(i);
            let isVisible = i == 1 || this.state.visible[i-2] || levelCond.isActive(this.props.settings);

            if (i >= 2 && isVisible) {
                this.state.visible[i-2] = true;
            }

            items.push(
                <div key={i} className={'top-line' + (isVisible ? '' : ' hidden')}>
                    {statCond ? <div className="control">
                        <ConditionControl
                            item={statCond}
                            type={statCond.getType()}
                            settings={this.props.settings}
                            onChange={this.props.onChange}
                        />
                    </div> : ''}
                    <div className="control">
                        <ConditionControl
                            item={levelCond}
                            type={levelCond.getType()}
                            settings={this.props.settings}
                            onChange={this.props.onChange}
                        />
                    </div>
                    <div className="title">{cond.getTitle()}</div>
                    {statCond && cond.params.partyStat ? <div className="weapon party-load" onClick={() => this.loadStats(i)} /> : ''}
                    {i == 1 ? <ConditionInfo item={cond} /> : ''}
                    {i == 1 ?
                        (itemsCnt > 1 ? <div className="info" onClick={() => this.addLine()}>+</div> : '')
                        : <div className="info" onClick={() => this.removeLine(i)}>-</div>
                    }
                </div>
            );
        }

        return items;
    }

    render() {
        let cond = this.props.item;
        let type = cond.getType();
        let stats = cond.getStats(this.props.settings);

        return (
            <GroupBox>
                <div className="condition-list-item party-weapon">
                    {this.genControls()}
                    <ConditionDescription item={cond} stats={stats} />
                </div>
            </GroupBox>
        );
    }
}

function ConditionControl(props) {
    let cond = props.item;
    let type = props.type;
    let id = cond.getName();

    if (type == 'checkbox') {
        return (
            <Checkbox
                checked={props.settings[id]}
                onChange={(checked) => props.onChange(id, checked)}
            />
        );
    } else if (type == 'stacks') {
        let items = [];
        let maxValue = cond.getMaxStacks(props.settings);
        let selValue = Math.min(maxValue, props.settings[id]) || '';

        for (let i = 0; i <= maxValue; ++i) {
            let title = ''+ i;

            if (cond.params.titleFunc) {
                let localSettings = Object.assign({}, props.settings, {[cond.getName()]: i});
                let condData = cond.getData(localSettings);

                let titleData = cond.params.titleFunc(i, condData.stats);
                if (typeof titleData == 'object') {
                    title = lang.getTalent(titleData.str, titleData.values);
                } else if (titleData) {
                    title = titleData;
                }
            }

            items.push({
                value: i,
                text: title,
            });
        }

        return (
            <Dropdown
                addClass={cond.params.dropdownClass}
                items={items}
                selected={selValue}
                onChange={(item) => props.onChange(id, item.value)}
            />
        );
    } else if (type == 'number') {
        return (
            <NumberInput
                addClass={'gi-inputs-number-dark '+ (cond.params.class || 'number-default')}
                value={cond.getValue(props.settings)|| ''}
                onChange={(value) => props.onChange(id, value)}
                isDecimal={cond.params.format == 'decimal'}
                nonEmpty={cond.params.nonEmpty}
                showButtons={cond.params.showButtons}
                minValue={cond.getMinValue(props.settings) || ''}
                maxValue={cond.getMaxValue(props.settings) || ''}
                allowMinZero={cond.params.allowMinZero || false}
            />
        );
    } else if (type == 'dropdown' || type == 'dropdown_multiple') {
        let selectedValues = [''];
        let items = [];
        if (props.settings[id]) {
            selectedValues = (''+ props.settings[id]).split(';');
        } else if (cond.params.defaultValue) {
            selectedValues = [cond.params.defaultValue];
        }

        if (!cond.params.hideEmpty) {
            items.push({
                value: '',
                text: '-',
            });
        }

        for (let i of cond.getDropdownItems(props.settings)) {
            let title = '';
            if (i.title_str) {
                if (i.title_params) {
                    title = lang.getTalent(i.title_str, new Stats(i.title_params));
                } else {
                    title = lang.get(i.title_str);
                }
            } else if (i.title) {
                title = i.title;
            }

            items.push({
                value: i.value,
                text: title,
                textIcons: i.icon ? [i.icon] : [],
            });
        }

        let limit = cond.getLimit(props.settings);
        let allowSelectNew = true;

        if (limit) {
            if (selectedValues.length >= limit) {
                allowSelectNew = false;
            }
        }

        return (
            <Dropdown
                addClass={cond.params.dropdownClass}
                disableSelectNew={!allowSelectNew}
                items={items}
                selected={selectedValues}
                onChange={(item) => props.onChange(id, dropwdownValue(item))}
                isMultiple={type == 'dropdown_multiple'}
            />
        );
    } else if (type == 'static') {
        return <div className={'static '+ (props.subcond ? 'active' : '')} />
    }

    return (
        <div className="control">{type}</div>
    );
}

function ConditionInfo(props) {
    let info = props.item.getInfo();
    if (!info) {
        return '';
    }

    let text = '';
    if (info.constellation) {
        text = 'C'+ info.constellation;
    } else if (info.ascension) {
        text = 'A'+ info.ascension;
    }

    return (
        <div className="info">{text}</div>
    );
}

function ConditionDescription(props) {
    let icon = '';
    let descr = props.item.getDescription(props.stats);

    if (!descr) {
        return '';
    }

    let condIcon = props.item.params.icon;
    if (condIcon && condIcon.rarity) {
        icon = <DescriptionIcon
            rarity={condIcon.rarity}
            name={condIcon.name}
        />
    }

    return (
        <div className={'description' + (icon ? ' with-icon' : '')}>{icon}{parse(descr)}</div>
    );
}

class ConditionLoadStat extends React.Component {
    handleSelectStat() {
        UI.PartyLoad.show({
            stats: [this.props.stat],
            callback: (data) => {
                let stat = this.props.stat;
                let isTotal = /_total/.exec(stat);
                stat = stat.replace('_total', '');
                let value;

                if (isTotal) {
                    value = data.stats.getTotal(stat);
                } else {
                    value = data.stats.get(stat);
                }
                value = Stats.format(stat, value);
                value = value.replace(/[^\d\.]/g, '');

                this.props.onChange(this.props.name, value);
            }
        });
    }

    render() {
        if (!this.props.stat || !this.props.name) {
            return '';
        }

        return (
            <div
                className="party-load"
                onClick={() => this.handleSelectStat()}
            />
        );
    }
}

function dropwdownValue(item) {
    if (Array.isArray(item)) {
        return item.map((i) => {return i.value}).join(';');
    } else {
        return item.value;
    }
}

function DescriptionIcon(props) {
    let className = `item-icon icon-40`

    if (props.rarity) {
        className += ` border-rarity-${props.rarity}`
    } else {
        className += ' no-border'
    }

    return (
        <div className={className} onClick={props.onClick}>
            <div className={'sprite sprite-40 '+ props.name}/>
        </div>
    );
}
