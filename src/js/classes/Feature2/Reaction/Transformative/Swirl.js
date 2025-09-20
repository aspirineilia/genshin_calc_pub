import { FeatureReactionTransformative } from "../Transformative";

export class FeatureReactionSwirl extends FeatureReactionTransformative {
    getReactionRate() { return 0.6 }

    /**
     * @returns {Array.<string>}
     */
    getStatsCritRate() {
        let result = super.getStatsCritRate();
        result.push('crit_rate_swirl');
        return result;
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsCritDamage() {
        let result = super.getStatsCritDamage();
        result.push('crit_dmg_swirl');
        return result;
    }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_swirl');
        return result;
    }
}
