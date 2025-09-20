import { BuildData } from "../../Build/Data";
import { ValueTable } from "../../ValueTable";
import { FeatureMultiplier } from "../Multiplier";

const partyBonus = new ValueTable([1.1, 1.2, 1.7]);

export class FeatureMultiplierSkirkNormal extends FeatureMultiplier {
    constructor(data) {
        data.scalingSource = 'ascension1';
        super(data);
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getScalingMultiplier(data) {
        let result = 1;
        let level = data.settings.skirk_return_to_oblivion;

        if (level > 0) {
            result = partyBonus.getValue(level);
        }

        return result;
    }
}
