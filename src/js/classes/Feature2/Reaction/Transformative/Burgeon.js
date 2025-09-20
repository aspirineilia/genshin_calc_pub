import { FeatureReactionBloom } from "./Bloom";

export class FeatureReactionHyperBurgeon extends FeatureReactionBloom {
    getReactionRate() { return 3 }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_burgeon');
        return result;
    }
}
