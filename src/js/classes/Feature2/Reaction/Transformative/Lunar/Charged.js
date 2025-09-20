import { FeatureReactionLunar } from "../Lunar";

export class FeatureReactionLunarCharged extends FeatureReactionLunar {
    getReactionRate() { return 1.8 }
    getReactionPenalty() { return this.penalty }
    getScalingStat(data) { return 'lunarcharged_multi' }

    /**
     * @returns {Array.<string>}
     */
    getStatsReactionBonus() {
        let result = super.getStatsReactionBonus();
        result.push('dmg_reaction_lunarcharged');
        return result;
    }
}
