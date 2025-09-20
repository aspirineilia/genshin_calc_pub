import { BuildData } from "../Build/Data";
import { baseStatName, getUsedStats } from "./Compile/Stats";
import { CBlock } from "./Compile/Types";
import { CBlockPost, CIsolatedBlock, CStatDecrease, CStatIncrease, CVar } from "./Compile/Types/Block";
import { CVarValue } from "./Compile/Types/Item";

const MAX_REPLACE_ITERATIONS = 10;

export class FeatureCompiler {
    constructor(tree, postItems) {
        this.tree = tree;
        this.postItems = postItems || [];
        this.usedStats = getUsedStats(this.tree, ...this.postItems);
        this.assignedStats = getAssignedStats(this.tree, ...this.postItems);
        this.isReacted = false;
    }

    checkForReaction() {
        this.tree.walk((item) => {
            if (item.isReacted) {
                this.isReacted = true;
            }
        });
    }

    /**
     * @param {BuildData} data
     * @param {Object} opts
     */
    prepare(data, opts) {
        opts = Object.assign({}, opts);

        let isRotation = this.tree.getType() == 'damage_rotation_result';
        let resultTree = this.tree.makeResult();

        let postTree;
        if (!isRotation) {
            postTree = this.makePostTree(opts);
        }

        this.processed = new CBlock();

        if (!opts.dontProcessTree) {
            this.processBlock(resultTree, opts);
            if (postTree) {
                this.processBlock(postTree, opts);
            }
        }

        if (postTree) {
            this.processed.items.push(postTree);
        }
        this.processed.items.push(resultTree);

        if (postTree && postTree.revert && postTree.revert.length) {
            let last = this.processed.items[ this.processed.items.length - 1 ];

            if (last.appendChildren) {
                last.appendChildren(...postTree.revert);
            } else {
                this.processed.items.push(...postTree.revert);
            }
        }
    }

    processBlock(tree, opts) {
        tree.walkReplace((item) => {
            return item.process(opts);
        });
        tree.process(opts);

        this.processVariables(tree, opts);
    }

    makePostTree(opts) {
        let filtered = [];

        for (let item of this.postItems) {
            if (opts.dontProcessStats || item.stat && this.usedStats.includes(item.stat)) {
                filtered.push(item);
            }
        }

        if (filtered.length == 0) {
            return;
        }

        let [assign, revert] = FeatureCompiler.postTreeBlocks(filtered, opts);
        return new CBlockPost(assign, {revert: revert});
    }

    static filterPostByStats(postItems, usedStats) {
        let filtered = [];
        let byPriority = postPyPriority(postItems);
        usedStats = [].concat(usedStats);

        for (let priority of Object.keys(byPriority).sort().reverse()) {
            for (let post of byPriority[priority]) {
                let origStat = baseStatName(post.stat)
                if (!post.stat || (!usedStats.includes(post.stat) && !usedStats.includes(origStat))) continue;

                filtered.push(post);

                for (let stat of getUsedStats(post)) {
                    if (!usedStats.includes(stat)) {
                        usedStats.push(stat);
                    }
                }
            }
        }

        return filtered;
    }

    static postTreeBlocks(postItems) {
        let assign = [];
        let revert = [];

        let byPriority = postPyPriority(postItems);

        for (let priority of Object.keys(byPriority).sort()) {
            let vars = [];
            let localAssig = [];

            for (let post of byPriority[priority]) {
                let statVar = new CVar([post], {name: 'post_'+ post.stat});
                vars.push(statVar);
                localAssig.push(new CStatIncrease([new CVarValue({ref: statVar})], {stat: post.stat}));
                revert.unshift(new CStatDecrease([new CVarValue({ref: statVar})], {stat: post.stat}));
            }

            assign.push(
                new CIsolatedBlock([
                    ...vars,
                    ...localAssig,
                ]),
            );
        }

        return [assign, revert];
    }

    /**
     * @param {Object} opts
     * @return {string}
     */
    getCode(opts) {
        return this.processed.compile(opts);
    }

    /**
     * @param {Object} opts
     * @return {Function}
     */
    compile(opts) {
        let code = this.getCode(opts);
        // console.log('------------------');
        // console.log(code);
        this.compiled = Function('stats', code);
        return code;
    }

    /**
     * @param {Object} opts
     * @return {Function}
     */
    compilePostTree(opts) {
        let tree = this.makePostTree(opts);
        if (!tree) {
            return Function('stats', '');
        }

        if (!opts.dontProcessTree) {
            this.processBlock(tree, opts);
        }
        return Function('stats', tree.compile(opts));
    }

    /**
     * @param {BuildData} data
     */
    execute(data) {
        return this.compiled(data.stats);
    }

    /**
     * @param {Object} opts
     */
    processVariables(tree, opts) {
        // let variables = {};
        // tree.walkReplace((item) => {
        //     if (item.isVariableSet() && !item.isVariableGet()) {
        //         console.log(item)
        //         variables[item.name] = item;
        //         return;
        //     }

        //     return item;
        // });

        // tree.items = insertVariables(tree.items, variables);

        if (!opts.dontInsertVariables) {
            tree.walk((item) => {
                if (item.getType() == 'isolated') {
                    this.replaceBlockRepeat(item);
                }
            });
        }
    }

    replaceBlockRepeat(tree) {
        for (let i = 0; i < MAX_REPLACE_ITERATIONS; ++i) {
            let signatures = {};

            tree.walk(
                (item) => {
                    if (item.hasItems()) {
                        let sig = item.getSignature();
                        if (sig && !sig.includes('!')) {
                            signatures[sig] = (signatures[sig] || 0) + 1;
                        }
                    }
                },
                (item) => {return item.getType() == 'isolated'},
            );

            let duplicates = [];
            for (let [k, v] of Object.entries(signatures)) {
                if (v < 2) continue;
                duplicates.push(k);
            }

            let nonChild = [];
            for (let sig of duplicates) {
                let ok = true;
                for (let sig2 of duplicates) {
                    if (sig == sig2) continue;
                    if (sig2.indexOf(sig) >= 0) {
                        ok = false;
                        break;
                    }
                }

                if (ok) {
                    nonChild.push(sig);
                }
            }

            if (nonChild.length == 0) {
                break;
            }

            let replaced = {};
            let variables = {};

            tree.walkReplace((item) => {
                let sig = item.getSignature();
                if (sig) {
                    if (nonChild.includes(sig)) {
                        if (!replaced[sig]) {
                            let varItem = new CVar([item])
                            replaced[sig] = varItem;
                            variables[varItem.name] = varItem;
                        }
                        return new CVarValue({ref: replaced[sig]});
                    }
                }

                return item;
            });

            tree.items = insertVariables(tree.items, variables);
        }
    }
}

function insertVariables(items, variables) {
    let newItems = [];

    while (Object.keys(variables).length) {
        newItems = [];

        for (let item of items) {
            let usedVars = {};
            item.walk((item) => {
                if (item.isVariableGet() && !item.isVariableSet()) {
                    usedVars[item.name] = 1
                }
            });

            for (var name of Object.keys(usedVars)) {
                if (variables[name]) {
                    newItems.push(variables[name]);
                    delete variables[name];
                }
            }

            newItems.push(item);
        }

        items = newItems;
    }

    return newItems;
}

export function getAssignedStats() {
    let assignedStats = {};

    for (let tree of arguments) {
        if (tree.getAssignedStats) {
            for (let stat of tree.getAssignedStats()) {
                assignedStats[stat] = (assignedStats[stat] || 0) + 1;
            }
        }

        tree.walk((item) => {
            if (item.getAssignedStats) {
                for (let stat of item.getAssignedStats()) {
                    assignedStats[stat] = (assignedStats[stat] || 0) + 1;
                }
            }
        });
    }

    return Object.keys(assignedStats);
}

function postPyPriority(postItems) {
    let byPriority = {};
    for (let item of postItems) {
        let priority = item.priority

        if (!byPriority[priority]) {
            byPriority[priority] = [];
        }
        byPriority[priority].push(item);
    }

    return byPriority;
}
