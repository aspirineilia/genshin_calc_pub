import { FeatureMultiplierReactionAmplifying } from "../Amplifying";

export class FeatureMultiplierReactionMelt extends FeatureMultiplierReactionAmplifying {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_melt');
        return result;
    }
}
