import { BuildData } from "../../Build/Data";
import { makeStatItem } from "../Compile/Helpers";
import { CItem } from "../Compile/Types";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierTravelerHydro extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getLevel(data) {
        return 1;
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        return makeStatItem('traveler_clear_waters_percent', data.stats);
    }
}
