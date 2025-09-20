import { FeatureMultiplierReactionAmplifying } from "../Amplifying";

export class FeatureMultiplierReactionVaporize extends FeatureMultiplierReactionAmplifying {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_vaporize');
        return result;
    }
}
