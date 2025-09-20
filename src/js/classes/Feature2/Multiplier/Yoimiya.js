import { BuildData } from "../../Build/Data";
import { CMulti } from "../Compile/Types/Block";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierYoimiya extends FeatureMultiplier {
    constructor(data) {
        super(data);
        this.scalingValues = data.scalingValues;
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        let result = super.getTreeBonusMultiplier(data);
        let bonus;

        if (data.settings.yoimiya_teika_enshou) {
            let level = data.settings.getLevel('char_skill_elemental') || 1;
            bonus = new CConst({
                value: this.scalingValues.getValue(level) / 100,
                percent: true,
                comment: 'talent_elemental',
            });
        }

        if (!bonus) return result;
        if (!result) return bonus;

        return new CMulti([result, bonus], {percent: true});
    }
}
