import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionSuperConduct extends FeatureReactionTransformative {
    getReactionRate() { return 1.5 }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_overloaded');
        return result;
    }
}
