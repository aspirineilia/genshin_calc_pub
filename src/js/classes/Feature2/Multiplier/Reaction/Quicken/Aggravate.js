import { CConst } from "../../../Compile/Types/Item";
import { FeatureMultiplierReactionQuicken } from "../Quicken";

export class FeatureMultiplierReactionAggravate extends FeatureMultiplierReactionQuicken {
    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsDmgBonus(data) {
        let result = super.getStatsDmgBonus(data);
        result.push('dmg_reaction_aggravate');
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getReactionMultiplier(data) {
        return new CConst({value: 1.15, percent: true, comment: 'reaction_aggravate'});
    }
}
