import { makeStatItem } from "../Compile/Helpers";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierBondOfLife extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        return makeStatItem('bond_of_life', data.stats)
    }
}
