import React, { useState } from "react";

import "../../../../css/Components/Tab/Feature/Tree.css";

import { Lang } from "../../Lang";
import { Stats, isPercent } from "../../../classes/Stats";
import { FeatureCompiler } from "../../../classes/Feature2/Compiler";
import { CConst } from "../../../classes/Feature2/Compile/Types/Item";
import { CSum } from "../../../classes/Feature2/Compile/Types/Block";

const ROOT_TYPES = {
    'base_damage': LeafRoot,
    'flat_damage': LeafRoot,
    'flat_reduce': LeafRoot,
    'multiplier_bonus': LeafRootSum,
    'multiplier_defence': LeafRoot,
    'multiplier_resistance': LeafRoot,
    'multiplier_amplifying': LeafRoot,
    'multiplier_reaction': LeafRoot,
    'multiplier_custom': LeafRoot,
    'damage_result': LeafResult,
    'heal_result': LeafResult,
    'shield_result': LeafResult,
    'reaction_base': LeafRoot,
    'block_multi': LeafRootMulti,
    'block_subtract': LeafRootSubtract,
};

const INLINE_TYPES = {
    'item_const': LeafInlineConst,
    'item_stat': LeafInlineConst,
    'block_multi': LeafMulti,
    'block_sum': LeafSum,
    'block_subtract': LeafSubtract,
    'block_divide': LeafDivide,
    'resistance_value': LeafSum,
    'base_damage': LeafSum,
    'flat_damage': LeafSum,
    'flat_reduce': LeafSum,
    'multiplier_reaction': LeafSum,
    'multiplier_resistance': LeafSum,
    'multiplier_bonus': LeafSumPlus,
    'multiplier_defence': LeafSum,
    'multiplier_amplifying': LeafSum,
    'multiplier_custom': LeafSum,
    'reaction_base': LeafMulti,
    'reaction_base_bonus': LeafSum,
    'value_cap': LeafValueCap,
    'number_floor': LeftFloor,
};

let lang = new Lang();

export class FeatureViewTree extends React.Component {
    render() {
        let buildData = this.props.build.getBuildData();

        if (this.props.reaction) {
            buildData.settings.reaction = this.props.reaction;
        }

        buildData.applyPostEffects();

        let tree = this.props.feature.getTree(buildData);
        let element = this.props.feature.getElement(buildData);
        let compiler = new FeatureCompiler(tree, buildData.postItems);
        buildData.stats.ensure(compiler.usedStats);
        buildData.stats.ensure(compiler.assignedStats);

        let staticStats = [];
        for (let stat of compiler.usedStats) {
            if (['enemy_def_reduce', 'enemy_def_ignore'].includes(stat)) {
                continue
            }
            if (!buildData.stats.get(stat) && !buildData.stats.get(stat +'_base')) {
                staticStats.push(stat)
            }
        }

        let processOpts = {
            dontInsertVariables: true,
            dontProcessStaticValues: true,
            staticStats: staticStats,
            processResistance: true,
            resistanceValue: buildData.getResistance(element),
        };

        let items = [];
        for (let item of ungroupTree(tree.items)) {
            let type = item.getType();
            let leaf = ROOT_TYPES[type];
            if (!leaf) {
                console.log('unknown root type '+ type);
                continue;
            }

            compiler.processBlock(item, processOpts);

            items.push(React.createElement(leaf, {
                key: 'item'+ (items.length),
                tree: item,
                data: buildData,
                title: type,
            }));
        }

        let type = tree.getType();
        let leaf = ROOT_TYPES[type];
        if (leaf) {
            items.unshift(React.createElement(leaf, {
                key: 'base',
                tree: tree,
                data: buildData,
                title: type,
            }));
        } else {
            console.log('unknown root type '+ type);
        }

        return (
            <div className="feature-detail-tree">
                {items}
            </div>
        );
    }
}

function LeafRoot(props) {
    let isPercent = false;
    let type = props.tree.getType();

    if (/^multiplier_/.test(type)) {
        isPercent = true;
    }

    return (
        <div className="block">
            <div className="line">
                <span className="block-name">{lang.get('features_view.block_'+ props.title)}</span>
                <span className="block-value"><TreeValue tree={props.tree} data={props.data} percent={isPercent} /></span>
            </div>
            <LeafRootItems {...props} base={true} />
        </div>
    );
}

function LeafRootMulti(props) {
    return (
        <div className="block">
            <div className="line">
                <span className="block-name">{lang.get('features_view.block_'+ props.title)}</span>
                <span className="block-value"><TreeValue tree={props.tree} data={props.data} percent={isPercent} /></span>
            </div>
            <div className="line">
                <LeafMulti tree={props.tree} data={props.data} collapsable={false} />
            </div>
        </div>
    );
}

function LeafRootSum(props) {
    let tree;
    let type = props.tree.getType();

    if (type == 'multiplier_bonus' || type == 'multiplier_reaction') {
        tree = new CSum([
            new CConst({value: 1, comment: 'base_bonus', percent: true}),
            ...props.tree.items
        ], {percent: true});
    } else {
        tree = props.tree;
    }

    return (
        <div className="block">
            <div className="line">
                <span className="block-name">{lang.get('features_view.block_'+ props.title)}</span>
                <span className="block-value"><TreeValue tree={props.tree} data={props.data} percent={isPercent} /></span>
            </div>
            <div className="line">
                <LeafSum tree={tree} data={props.data} collapsable={false} hideZero={true} />
            </div>
        </div>
    );
}

function LeafRootSubtract(props) {
    return (
        <div className="block">
            <div className="line">
                <span className="block-name">{lang.get('features_view.block_'+ props.title)}</span>
                <span className="block-value"><TreeValue tree={props.tree} data={props.data} percent={isPercent} /></span>
            </div>
            <div className="line">
                <LeafSubtract tree={props.tree} data={props.data} collapsable={false} />
            </div>
        </div>
    );
}

function LeafResult(props) {
    return (
        <div className="block">
            <div className="line">
                <span className="block-name">{lang.get('features_view.block_'+ props.title)}</span>
                {/* <span className="block-value"><TreeValue tree={props.tree} data={props.data} percent={props.percent} /></span> */}
            </div>
            <div className="line">
                <LeafMulti tree={props.tree} data={props.data} onlyResult={true} />
            </div>
        </div>
    );
}

function LeafRootItems(props) {
    if (!props.tree.items) {
        return '';
    }

    let items = [];
    let type = props.tree.getType();

    if (type == 'multiplier_bonus' || type == 'multiplier_reaction') {
        let leaf = INLINE_TYPES['item_const'];
        let leafItem = React.createElement(leaf, {
            tree: new CConst({value: 1, comment: 'base_bonus', percent: true}),
            data: props.data,
            collapsable: false,
        });

        items.push(<div className="line" key={'item'+ items.length}>{leafItem}</div>);
    }

    for (let item of props.tree.items) {
        let leaf = INLINE_TYPES[item.getType()];
        if (!leaf) {
            console.log('unknown line type '+ item.getType());
            continue;
        }

        let leafItem = React.createElement(leaf, {
            tree: item,
            data: props.data,
            collapsable: false,
        });

        items.push(<div className="line" key={'item'+ items.length}>{leafItem}</div>);
    }

    return items;
}

class LeafMathOp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: !this.props.onlyResult,
        };
    }

    getItems() {
        let items = [];

        for (let item of this.props.tree.items) {
            // while (Array.isArray(item.items) && item.items.length == 1) {
            //     item = item.items[0];
            // }

            let itemType = item.getType();

            if (this.props.hideZero && itemType == 'item_const' && !item.value) {
                continue;
            }

            let leaf = INLINE_TYPES[itemType];
            if (!leaf) {
                console.log('unknown inline type '+ itemType);
                items.push(
                    <div key={'item'+ items.length} className="feature-detail-block const">
                        <div className="stat-value">?</div>
                    </div>
                );
                continue;
            }

            if (this.props.tree.items.length == 1) {
                items.push(
                    React.createElement(leaf, {
                        tree: item,
                        data: this.props.data,
                        key: 'item'+ items.length,
                        collapsable: this.props.collapsable,
                        onlyResult: this.props.onlyResult,
                    })
                );

                continue;
            }

            if (items.length > 0) {
                items.push(
                    <span className="op" key={'item'+ items.length}>{this.props.operator}</span>
                );
            }

            if (this.props.onlyResult && !item.group) {
                items.push(
                    <div key={'item'+ items.length} className="feature-detail-block const">
                        <div className="stat-value"><TreeValue tree={item} data={this.props.data} /></div>
                    </div>
                );
            } else {
                items.push(
                    React.createElement(leaf, {
                        tree: item,
                        data: this.props.data,
                        key: 'item'+ items.length,
                        collapsable: true,
                        onlyResult: this.props.onlyResult,
                    })
                );
            }
        }

        return items;
    }

    render() {
        if (this.props.collapsable) {
            if (this.state.collapsed) {
                let comment = this.props.tree.comment ? langStat(this.props.tree.comment, this.props.data) : '';
                return (
                    <div className="feature-detail-block multi collapsed" onClick={() => {this.setState({collapsed: false}); return false}}>
                        <div className="feature-detail-block const">
                            <div className="stat-value"><TreeValue tree={this.props.tree} data={this.props.data} /></div>
                            {comment ? <div className="stat-name">{comment}</div> : ''}
                        </div>
                    </div>
                );
            } else {
                return <>
                    <div className="l-bracket" onClick={() => {this.setState({collapsed: true}); return false }} />
                    {this.getItems()}
                    <div className="r-bracket" onClick={() => {this.setState({collapsed: true}); return false }} />
                </>
            }
        }

        let items = this.getItems();
        if (items.length > 1) {
            items.push(<div key={'item'+ items.length} className="feature-detail-block operator">=</div>);
            items.push(
                <div key={'item'+ items.length} className="feature-detail-block const">
                    <div className="stat-value"><TreeValue tree={this.props.tree} data={this.props.data} /></div>
                </div>
            );
        }

        return items;
    }
}

function LeafMulti(props) {
    return <LeafMathOp {...props} operator="*" />;
}

function LeafSum(props) {
    return <LeafMathOp {...props} operator="+" />;
}

function LeafSumPlus(props) {
    return <LeafMathOp
        operator="+"
        tree={new CSum([new CConst({value: 1}, ...props.tree.items)])}
        data={props.data}
        collapsable={props.collapsable}
        onlyResult={props.onlyResult}
    />;
}

function LeafSubtract(props) {
    return <LeafMathOp {...props} operator="-" />;
}

function LeafMathFunc(props) {
    return <>
        <div className="feature-detail-block op">{props.func}</div>
        <LeafSum
            tree={props.tree.items[0]}
            data={props.data}
            collapsable={props.collapsable}
            onlyResult={props.onlyResult}
        />
    </>
}

function LeftFloor(props) {
    return <LeafMathFunc {...props} func="Floor" />
}

function LeafValueCap(props) {
    const [collapsed, setCollapsed] = useState(!props.onlyResult);

    let itemType = props.tree.items[0].getType()
    let leaf = INLINE_TYPES[itemType];
    if (!leaf) {
        console.log('unknown line type '+ itemType);
        return '';
    }

    let leafItem = React.createElement(leaf, {
        tree: props.tree.items[0],
        data: props.data,
        collapsable: true,
        onlyResult: props.onlyResult,
    });

    let item = <>
        <div className="feature-detail-block cap op" onClick={() => {setCollapsed(true); return false}}>Min</div>
        <div className="l-bracket" />
        {leafItem}
        <span className="op">,</span>
        <LeafSum tree={new CSum([props.tree.value])} data={props.data} />
        <div className="r-bracket" />
    </>

    if (props.collapsable) {
        if (collapsed) {
            return (
                <div className="feature-detail-block cap collapsed" onClick={() => {setCollapsed(false); return false}}>
                    <div className="feature-detail-block const">
                        <div className="stat-value"><TreeValue tree={props.tree} data={props.data} /></div>
                    </div>
                </div>
            );
        } else {
            return item;
        }
    } else {
        return <>
            {item}
            <span className="op">=</span>
            <div className="feature-detail-block const">
                <div className="stat-value"><TreeValue tree={props.tree} data={props.data} /></div>
            </div>
        </>;
    }
}

function LeafDivide(props) {
    let items = [];

    const [collapsed, setCollapsed] = useState(!props.onlyResult);

    for (let item of props.tree.items) {
        let leaf = INLINE_TYPES[item.getType()];
        if (!leaf) {
            console.log('unknown line type '+ item.getType());
            continue;
        }

        let leafItem = React.createElement(leaf, {
            tree: item,
            data: props.data,
            collapsable: true,
        });

        if (items.length > 0) {
            items.push(
                <div className="separator" key={'sep'+ items.length} onClick={() => {setCollapsed(true); return false }} />
            );
        }

        items.push(<div key={'item'+ items.length} className="feature-detail-block divide-line">{leafItem}</div>);
    }

    if (props.collapsable) {
        if (collapsed) {
            return (
                <div className="feature-detail-block multi collapsed" onClick={() => {setCollapsed(false); return false}}>
                    <div className="feature-detail-block const">
                        <div className="stat-value"><TreeValue tree={props.tree} data={props.data} /></div>
                    </div>
                </div>
            );
        } else {
            return <div className="feature-detail-block divide">{items}</div>
        }
    }

    return (
        <>
            <div className="feature-detail-block divide">{items}</div>
            <div className="feature-detail-block operator">=</div>
            <div className="feature-detail-block const">
                <div className="stat-value"><TreeValue tree={props.tree} data={props.data} /></div>
            </div>
        </>
    )
}

function LeafInlineConst(props) {
    let comment;
    let value;
    let digits = props.tree.digits || 2;

    if (props.tree.stat) {
        comment = langStat(props.tree.stat, props.data);
        if (isPercent(props.tree.stat)) {
            value = Stats.format('text_percent', props.tree.value * 100, {decimal_digits: digits, no_decimal_zero: true});
        }
    } else if (props.tree.comment) {
        comment = langStat(props.tree.comment, props.data);
        if (props.tree.percent) {
            value = Stats.format('text_percent', props.tree.value * 100, {decimal_digits: digits, no_decimal_zero: true});
        }
    }

    value ||= Stats.format('value_decimal', props.tree.value, {decimal_digits: digits, no_decimal_zero: true}) || 0;

    if (!value && !props.collapsable) {
        return '';
    }

    return (
        <div className="feature-detail-block const">
            <div className="stat-value">{value}</div>
            {comment ? <div className="stat-name">{comment}</div> : ''}
        </div>
    );
}

function TreeValue(props) {
    let percent;
    let value;

    if (props.tree.makeResult) {
        let compiler = new FeatureCompiler(props.tree);
        let opts = {dontProcessTree: true, dontProcessStaticValues: true};
        compiler.prepare({}, opts);
        compiler.compile(opts);

        props.data.stats.ensure(Object.keys(compiler.usedStats));
        value = compiler.execute(props.data);
    } else {
        value = props.tree.value;
    }

    if (props.percent || props.tree.percent || /^multiplier_/.test(props.tree.getType())) {
        percent = 1;
    }

    if (Array.isArray(value)) {
        value = value[0];
    }

    let stat = 'value_decimal';
    if (percent) {
        value *= 100;
        stat = 'value_percent';
    }

    value ||= 0;

    return Stats.format(stat, value, {decimal_digits: props.tree.digits || 2, no_decimal_zero: true, zero: true});
}

function langStat(name, data) {
    name = name.replace('enemy_res', 'res');

    let result = lang.any(
        'features_view.stat_' + name,
        'stat_short.' + name,
        'stat.' + name,
        'char_name.' + name,
        'features_view.comment_' + name,
        'features_view.stat_' + name,
    );

    if (name == 'reaction_base') {
        result = data.settings.char_level +' '+ result;
    }

    return result;
}

function ungroupTree(items) {
    let result = [];

    for (let item of items) {
        if (item.group) {
            result = result.concat(ungroupTree(item.items));
        } else {
            result.push(item);
        }
    }

    return result;
}
