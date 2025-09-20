import { makeRoyalAverageCrit, variableName } from "../Compile/Helpers";
import { getUsedStats } from "../Compile/Stats";
import { CIsolatedBlock, CMulti, CStatIncrease, CSubtract, CVar, CVarIncrease } from "../Compile/Types/Block";
import { CDamageRotation } from "../Compile/Types/Damage";
import { CConst, CVarValue } from "../Compile/Types/Item";
import { FeatureCompiler } from "../Compiler";

const reactions = ['', 'melt', 'vaporize', 'quicken'];

export class Feature2RotationTree {
    constructor(items, opts) {
        items = [].concat(items);

        this.infoBlock;
        if (items.length > 0 && items[0].type == 'info') {
            this.infoBlock = items.shift();
        }

        this.items = items;
        this.opts = Object.assign({}, opts);
    }

    getTree(origData, usedStats) {
        let [blocks, totalNormal, totalCrit, totalAverage] = this.processBlock(this.items, origData, {
            usedStats: usedStats,
        });

        return new CDamageRotation(blocks, {vars: [
            new CVarValue({ref: totalNormal}),
            new CVarValue({ref: totalCrit}),
            new CVarValue({ref: totalAverage})
        ]});
    }

    processBlock(items, origData, opts) {
        let totalNormal = new CVar([new CConst({value: 0})], {name: 'total_normal'});
        let totalCrit = new CVar([new CConst({value: 0})], {name: 'total_crit'});
        let totalAverage = new CVar([new CConst({value: 0})], {name: 'total_average'});

        let blocks = [
            totalNormal,
            totalCrit,
            totalAverage,
        ];

        let data = origData.clone();
        let filter = data.settings ? data.settings.rotation_include : '';
        let curentItems = [];
        let curentCondItems = [];
        let currentPost = [];

        items = reorderItems(items);

        if (!this.opts.ignoreSideEffects) {
            opts = copyOptsStats(opts);
        }

        for (let item of items) {
            if (item.type == 'feature') {
                data.settings.reaction = getReactionName(item);

                let activeFeature = getActiveFeature(item.feature, data);
                if (!activeFeature) { continue }
                if (!activeFeature.usedInRotation()) { continue }

                if (filter) {
                    let element = activeFeature.getElement(data);
                    let damageType = activeFeature.getDamageType();

                    if (filter != element && filter != damageType) {
                        continue;
                    }
                }

                let featureTree = activeFeature.getTree(data);
                statReplace(featureTree, opts);

                let normalDmgItems = [
                    new CConst({value: item.count, comment: 'rotation_hit_count'}),
                    new CMulti(featureTree.items),
                ];

                let hitMulti = activeFeature.getRotationHitMiltiplier(data);
                if (typeof hitMulti === 'object') {
                    normalDmgItems.push(hitMulti);
                } else if (hitMulti != 1) {
                    normalDmgItems.push(
                        new CConst({value: hitMulti, comment: 'rotation_hit_multi'})
                    );
                }

                let varNormal = new CVar([new CMulti(normalDmgItems)], {name: 'normal'});
                let varChance = new CVar([featureTree.critRate], {name: 'crit_rate'});
                let varCdmg = new CVar([featureTree.critDmg], {name: 'crit_dmg'});
                let varCritHit = new CVar([
                    new CMulti([
                        new CVarValue({ref: varNormal}),
                        new CVarValue({ref: varCdmg}),
                    ])
                ], {name: 'crit_hit'});

                let varsBlock = [];
                if (featureTree.royalCrit) {
                    [varsBlock, varChance] = makeRoyalAverageCrit(varChance, featureTree.royalCrit);
                }

                if (varsBlock.length > 0) {
                    curentItems = curentItems.concat(varsBlock);
                }

                curentItems.push(varNormal);
                curentItems.push(varChance);
                curentItems.push(varCdmg);
                curentItems.push(varCritHit);

                curentItems.push(new CVarIncrease([
                    new CVarValue({ref: varNormal}),
                ], {ref: totalNormal}));

                curentItems.push(new CVarIncrease([
                    new CVarValue({ref: varCritHit}),
                ], {ref: totalCrit}));

                curentItems.push(new CVarIncrease([
                    new CMulti([
                        new CVarValue({ref: varNormal}),
                        new CSubtract([
                            new CConst({value: 1}),
                            new CVarValue({ref: varChance}),
                        ]),
                    ]),
                    new CMulti([
                        new CVarValue({ref: varCritHit}),
                        new CVarValue({ref: varChance}),
                    ]),
                ], {ref: totalAverage}));
            } else if (item.type == 'condition') {
                if (curentItems.length || curentCondItems.length || currentPost.length) {
                    let isolated = createIsolatedBlock(curentItems, curentCondItems, currentPost, opts);
                    if (isolated) {
                        blocks.push(isolated);
                    }
                    curentItems = [];
                    curentCondItems = [];
                    currentPost = [];
                }

                for (let stat of Object.keys(item.stats)) {
                    if (/^text_/.test(stat)) continue;

                    let statOpts = {stat: stat};

                    if (opts.copyStats) {
                        let oldStat = getOldStatName(opts, stat);
                        let newStat = getNewStatName(stat);
                        statOpts = {stat: oldStat, newName: newStat};
                        opts.stats[stat] = newStat;
                    }

                    curentCondItems.push(
                        new CStatIncrease([
                            new CConst({value: item.stats.get(stat)})
                        ], statOpts)
                    );
                }

                if (opts.usedStats) {
                    item.stats.truncate(opts.usedStats);
                }

                data.addStats(item.stats);
                data.addSettings(item.settings);
                let changeStats = opts && opts.stats ? Object.keys(opts.stats) : [];

                for (let postItem of item.postEffects) {
                    if (!postItem.getTree) {
                        continue;
                    }

                    for (let itemTree of postItem.getTree(data, opts)) {
                        if (changeStats.includes(itemTree.stat)) {
                            itemTree.stat = opts.stats[itemTree.stat];
                        }

                        statReplace(itemTree, opts);
                        currentPost.push(itemTree);
                    }
                }
            } else if (item.type == 'repeat') {
                if (curentItems.length || curentCondItems.length || currentPost.length) {
                    let isolated = createIsolatedBlock(curentItems, curentCondItems, currentPost, opts);
                    if (isolated) {
                        blocks.push(isolated);
                    }
                    curentItems = [];
                    curentCondItems = [];
                    currentPost = [];
                }

                let [repBlocks, repNormal, repCrit, repAverage] = this.processBlock(item.items, data, copyOptsStats(opts));

                curentItems.push(createIsolatedBlock([
                    ...repBlocks,
                    ...[[repNormal, totalNormal], [repCrit, totalCrit], [repAverage, totalAverage]].map((i) => {
                        let [rep, total] = i;
                        return new CVarIncrease([
                            new CMulti([
                                new CConst({value: item.count}),
                                new CVarValue({ref: rep}),
                            ]),
                        ], {ref: total});
                    }),
                ], [], [], opts));
            } else if (item.type == 'uptime') {
                if (curentItems.length || curentCondItems.length || currentPost.length) {
                    let isolated = createIsolatedBlock(curentItems, curentCondItems, currentPost, opts);
                    if (isolated) {
                        blocks.push(isolated);
                    }
                    curentItems = [];
                    curentCondItems = [];
                    currentPost = [];
                }

                if (item.percent > 0) {
                    let ratio = item.percent / 100;
                    let [repBlocks, repNormal, repCrit, repAverage] = this.processBlock([
                        ...item.conditions,
                        ...item.items,
                    ], data, copyOptsStats(opts));

                    curentItems.push(createIsolatedBlock([
                        ...repBlocks,
                        ...[[repNormal, totalNormal], [repCrit, totalCrit], [repAverage, totalAverage]].map((i) => {
                            let [rep, total] = i;
                            return new CVarIncrease([
                                new CMulti([
                                    new CConst({value: ratio}),
                                    new CVarValue({ref: rep}),
                                ]),
                            ], {ref: total});
                        }),
                    ], [], [], opts));
                }

                if (item.percent < 100) {
                    let ratio = (1 - item.percent / 100);
                    let [repBlocks, repNormal, repCrit, repAverage] = this.processBlock(item.items, data, copyOptsStats(opts));

                    curentItems.push(createIsolatedBlock([
                        ...repBlocks,
                        ...[[repNormal, totalNormal], [repCrit, totalCrit], [repAverage, totalAverage]].map((i) => {
                            let [rep, total] = i;
                            return new CVarIncrease([
                                new CMulti([
                                    new CConst({value: ratio}),
                                    new CVarValue({ref: rep}),
                                ]),
                            ], {ref: total});
                        }),
                    ], [], [], opts));
                }
            }
        }

        if (curentItems.length || curentCondItems.length || currentPost.length) {
            let isolated = createIsolatedBlock(curentItems, curentCondItems, currentPost, opts);
            if (isolated) {
                blocks.push(isolated);
            }
        }

        return [blocks, totalNormal, totalCrit, totalAverage];
    }
}

function createIsolatedBlock(features, cond, post, opts) {
    if (features.length == 0 && cond.length == 0) {
        return null;
    }

    let usedStats = getUsedStats(...features);
    let result = features;

    let filtered = FeatureCompiler.filterPostByStats(post, usedStats);
    if (filtered.length) {
        let [assign, revert] = FeatureCompiler.postTreeBlocks(filtered);
        result = [
            ...assign,
            new CIsolatedBlock(result),
            ...revert,
        ];
    }

    if (cond.length) {
        result = [
            ...cond,
            ...result,
        ];
    }

    return new CIsolatedBlock(result);
}


export function getReactionName(item) {
    return reactions[item.reaction || 0];
}

function getActiveFeature(features, data) {
    features = Array.isArray(features) ? features : [features];

    for (let feature of features) {
        if (feature.isActive(data) && feature.usedInRotation()) {
            return feature;
        }
    }
}

function reorderItems(items) {
    let result = [];
    let accum = [];

    for (let item of items) {
        if (item.type == 'feature') {
            result.push(item);
        } else if (item.type == 'condition') {
            if (accum) {
                result = result.concat(accum);
                accum = [];
            }
            result.push(item);
        } else if (item.type == 'repeat') {
            // push all blocks after single features
            accum.push(item);
        } else if (item.type == 'uptime') {
            // push all blocks after single features
            accum.push(item);
        }
    }

    if (accum) {
        result = result.concat(accum);
    }

    return result;
}

function copyOptsStats(opts) {
    let n = Object.assign({}, opts);
    n.stats = {};
    n.copyStats = true;

    if (opts.stats) {
        for (let stat of Object.keys(opts.stats)) {
            n.stats[stat] = opts.stats[stat];
        }
    }

    return n;
}

function getOldStatName(opts, stat) {
    if (!opts.stats) return stat;
    return opts.stats[stat] || stat;
}

function getNewStatName(stat) {
    return variableName(stat);
}

function statReplace(tree, opts) {
    if (opts.stats) {
        let changeStats = Object.keys(opts.stats);
        tree.walk((item) => {
            if (item.getType() == 'item_stat_total') {
                for (let stat of [item.stat, item.stat +'_base', item.stat +'_percent']) {
                    if (changeStats.includes(stat)) {
                        if (!item.replace) item.replace = {};
                        item.replace[stat] = opts.stats[stat];
                    }
                }
            } else if (item.stat) {
                if (changeStats.includes(item.stat)) {
                    item.stat = opts.stats[item.stat];
                }
            }
        });
    }
}
