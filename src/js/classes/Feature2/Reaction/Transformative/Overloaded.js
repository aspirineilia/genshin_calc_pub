import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionOverloaded extends FeatureReactionTransformative {
    getReactionRate() { return 2.75 }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_overloaded');
        return result;
    }
}
