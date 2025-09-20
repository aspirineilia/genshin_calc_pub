import { FeatureReactionBloom } from "./Bloom";

export class FeatureReactionRupture extends FeatureReactionBloom {
    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_rupture');
        return result;
    }
}
