import { FeatureReactionBloom } from "./Bloom";

export class FeatureReactionHyperBloom extends FeatureReactionBloom {
    getReactionRate() { return 3 }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_hyperbloom');
        return result;
    }
}
