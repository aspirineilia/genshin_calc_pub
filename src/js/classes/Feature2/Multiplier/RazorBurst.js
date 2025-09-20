import { BuildData } from "../../Build/Data";
import { makeStatItem } from "../Compile/Helpers";
import { CItem } from "../Compile/Types";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierRazorBurst extends FeatureMultiplier {
    constructor(data) {
        super(data);
        this.burstValues = data.burstValues;
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        let level = data.settings.getLevel('char_skill_burst') || 1;
        return new CConst({value: this.burstValues.getValue(level) / 100, percent: true, comment: 'talent_burst'});
    }
}
