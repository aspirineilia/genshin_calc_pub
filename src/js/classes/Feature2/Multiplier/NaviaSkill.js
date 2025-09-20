import { BuildData } from "../../Build/Data";
import { ValueTable } from "../../ValueTable";
import { FeatureMultiplier } from "../Multiplier";

const bulletMultilier = new ValueTable([1, 1.05, 1.1, 1.15, 1.2, 1.36, 1.4, 1.6, 1.666, 1.9, 2]);

export class FeatureMultiplierNaviaSkill extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getScalingMultiplier(data) {
        let level = data.settings.navia_bullets || 1;
        let shrapnel = data.settings.navia_shrapnel_charge || 0;

        if (shrapnel > 3) shrapnel = 3;
        let max_level = 5 + shrapnel * 2;
        if (level > max_level) level = max_level;

        return bulletMultilier.getValue(level);
    }
}
