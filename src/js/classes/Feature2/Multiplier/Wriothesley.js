import { BuildData } from "../../Build/Data";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierWriothesley extends FeatureMultiplier {
    constructor(data) {
        super(data);
        this.scalingValues = data.scalingValues;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getScalingMultiplier(data) {
        let result = super.getScalingMultiplier(data);

        if (data.settings.wriothesley_chilling_penalty) {
            let level = data.settings.getLevel('char_skill_elemental') || 1;
            result *= this.scalingValues.getValue(level) / 100;
        }

        return result;
    }
}
