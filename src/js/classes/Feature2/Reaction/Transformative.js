import { reactionDamageValues } from "../../../db/generated/ElementScale";
import { FeatureMultiplierReaction } from "../Multiplier/Reaction";
import { FeatureMultiplierReactionTransformative } from "../Multiplier/Reaction/Transformative";
import { FeatureReaction } from "../Reaction";

export class FeatureReactionTransformative extends FeatureReaction {
    getReactionRate() { return 1 }
    getReactionPenalty() { return 1 }

    getScalingStat(data) { return null }

    getBaseMultiplier(data) {
        return new FeatureMultiplierReaction({
            reactionRate: this.getReactionRate(),
            reactionValue: reactionDamageValues.getValue(data.settings.char_level),
            reactionPenalty: this.getReactionPenalty(),
            scalingStat: this.getScalingStat(data),
        });
    }

    getReactionMasteryBonus(data) {
        return FeatureMultiplierReactionTransformative.masteryMultiplier(data);
    }
}
