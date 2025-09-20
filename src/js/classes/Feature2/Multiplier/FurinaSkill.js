import { BuildData } from "../../Build/Data";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierFurinaSkill extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getScalingMultiplier(data) {
        let result = 1;

        if (data.settings.furina_hp_offers) {
            result += 0.1 * Math.min(4, data.settings.furina_hp_offers);
        }

        return result;
    }
}
