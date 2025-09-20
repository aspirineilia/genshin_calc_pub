import { BuildData } from "../Build/Data";
import { CBlock } from "./Compile/Types";
import { CStaticValue } from "./Compile/Types/Damage";
import { Feature2 } from "../Feature2";
import { FeatureResult } from "../FeatureResult";

export class FeaturePostEffectValue extends Feature2 {
    constructor(params) {
        super(params);

        this.category = params.category || 'other';
        this.element = '';
        this.damageType = '';
        this.format = params.format;
        this.digits = params.digits;
        this.postEffect = params.postEffect;
    }

    /**
     * @param {BuildData} data
     * @returns {Array}
     */
    getActivePostEffectsTree(data) {
        let result = [];
        let postItems = data.getActivePostEffects();
        let priority = this.postEffect.getPriority();

        for (let item of postItems) {
            let tree = item.getTree(data);
            for (let treeItem of tree) {
                if (!item.getTree) continue;
                if (item.getPriority() >= priority) continue;

                result.push(treeItem)
            }
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        let multipliers = this.postEffect.getTree(data);
        let tree = [];

        if (multipliers.length) {
            tree = multipliers[0].items;
        }

        return new CStaticValue(tree);
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    compile(data, opts) {
        let tree = this.getTree(data);
        return this.compileTree(tree, opts);
    }

    /**
     * @param {CBlock} tree
     * @param {BuildData} data
     * @returns {Function}
     */
    compileTree(root, opts) {
        opts = Object.assign({}, opts);
        return root.compile(opts);
    }

    /**
     * @param {BuildData} data
     * @returns {Object}
     */
    getResult(data) {
        if (!this.checkConditions(data)) {
            return {};
        }

        let compiler = this.getCompiled(data);
        let [normal, crit, average] = compiler.execute(data);

        if (this.format == 'percent') {
            normal *= 100;
            crit *= 100;
            average *= 100;
        }

        return {
            [this.getName()]: new FeatureResult({
                icon: 'buff',
                normal: normal,
                crit: crit,
                average: average,
                format: this.format,
                digits: this.digits,
                noCritValues: true,
            }),
        };
    }
}
