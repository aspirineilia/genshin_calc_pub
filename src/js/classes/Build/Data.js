import { getUsedStats } from "../Feature2/Compile/Stats";
import { CBlock } from "../Feature2/Compile/Types";
import { FeatureCompiler } from "../Feature2/Compiler";
import { PostEffect } from "../PostEffect";
import { Stats } from "../Stats";
import { BuildSettings } from "./Settings";

export class BuildData {
    constructor(settings, stats) {
        this.stats = new Stats(stats);
        this.settings = new BuildSettings(settings);
        this.multipliers = [];
        this.postEffects = [];
    }

    /**
     * @param {Stats} data
     */
    addStats(data) {
        this.stats.concat(data);
    }

    /**
     * @param {BuildSettings} data
     */
    addSettings(data) {
        this.settings.concat(data);
    }

    /**
     * @returns {Array.<PostEffect>}
     */
    getActivePostEffects() {
        return this.postEffects.filter((i) => {return i.isActive(this.settings)});
    }

    /**
     * @returns {Array.<CBlock[]>}
     */
    getActivePostEffectsTree() {
        let items = this.getActivePostEffects();
        let result = [];

        for (let item of items) {
            if (!item.getTree) {
                continue;
            }

            for (let itemTree of item.getTree(this)) {
                result.push(itemTree);
            }
        }

        return result;
    }

    applyPostEffects(opts) {
        for (let treeItems of this.postEffectTreeByPriority()) {
            let compiler = new FeatureCompiler(new CBlock([]), treeItems);
            let statFunc = compiler.compilePostTree({dontProcessStats: true});

            if (statFunc) {
                this.stats.ensure(compiler.usedStats);
                this.stats.ensure(compiler.assignedStats);
                statFunc(this.stats);
            }
        }

        this.postEffects = [];
    }

    postEffectByPriority(opts) {
        opts = Object.assign({}, opts);

        let items = this.getActivePostEffects();
        let byPriority = {};

        for (let item of items) {
            let priority = item.getPriority()
            if (opts.maxPriority && priority > opts.maxPriority) {
                continue;
            }

            if (!byPriority[priority]) {
                byPriority[priority] = [];
            }

            byPriority[priority].push(item);
        }

        let result = [];
        for (let priority of Object.keys(byPriority).sort()) {
            result.push(byPriority[priority]);
        }
        return result;
    }

    postEffectTreeByPriority(opts) {
        let itemsAll = this.postEffectByPriority(opts);
        let result = [];

        for (let items of itemsAll) {
            let priorityItems = [];
            for (let post of items) {
                priorityItems = priorityItems.concat(post.getTree(this))
            }
            result.push(priorityItems);
        }

        return result;
    }

    getResistance(element) {
        return this.settings.get('enemy_res_'+ element) + this.stats.get('enemy_res_'+ element) * 100;
    }

    clone() {
        let data = new BuildData(this.settings, this.stats)
        data.postEffects = [].concat(this.postEffects);
        data.multipliers = [].concat(this.multipliers);
        return data;
    }
}

export function filterPostEffectTreeByStats(items, us) {
    let usedStats = [].concat(us);
    let result = [];

    for (let priorityItems of items) {
        let priorityStats = [];
        for (let item of priorityItems) {
            if (usedStats.includes(item.stat)) {
                result.push(item);
                priorityStats = priorityStats.concat(getUsedStats(item));
            }
        }

        usedStats = usedStats.concat(priorityStats);
    }

    return result;
}
