import { BuildData } from "../../Build/Data";
import { ValueTable } from "../../ValueTable";
import { FeatureMultiplier } from "../Multiplier";

const reactionBonus = new ValueTable([1.1, 1.25, 1.6]);

export class FeatureMultiplierNeuvilleteCharged extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getScalingMultiplier(data) {
        let result = 1;
        let level = data.settings.neuvillette_ancient_seas_legacy;

        if (level > 0) {
            result = reactionBonus.getValue(level);
        }

        return result;
    }
}
