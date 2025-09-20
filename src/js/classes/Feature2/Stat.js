import { makeStatTotalItem } from "./Compile/Helpers";
import { CStaticValue } from "./Compile/Types/Damage";
import { FeaturePostEffectValue } from "./PostEffectValue";

export class FeatureStat extends FeaturePostEffectValue {
    constructor(params) {
        super(params);
        this.category = 'stats';
        this.stat = params.stat;
        this.name = params.stat;
    }

    getActivePostEffectsTree(data) {
        return data.getActivePostEffectsTree();
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        return new CStaticValue([makeStatTotalItem(this.stat, data.stats)]);
    }

}
