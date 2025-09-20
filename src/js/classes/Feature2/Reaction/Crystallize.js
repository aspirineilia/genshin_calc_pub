import { reactionShieldValues } from "../../../db/generated/ElementScale";
import { BuildData } from "../../Build/Data";
import { CMultiplierReaction } from "../Compile/Types/Block";
import { FeatureMultiplierReaction } from "../Multiplier/Reaction";
import { FeatureMultiplierReactionCrystallize } from "../Multiplier/Reaction/Crystallize";
import { FeatureShield } from "../Shield";

export class FeatureReactionCrystallize extends FeatureShield {
    getReactionRate() { return 1 }

    getBaseMultiplier(data) {
        return
    }

    getReactionMasteryBonus(data) {
        return FeatureMultiplierReactionCrystallize.masteryMultiplier(data);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<FeatureMultiplier>}
     */
    getMultipliers(data) {
        return [
            new FeatureMultiplierReaction({
                reactionRate: this.getReactionRate(),
                reactionValue: reactionShieldValues.getValue(data.settings.char_level),
            }),
        ];
    }

    getBaseTree(data) {
        let items = super.getBaseTree(data);
        items.push(new CMultiplierReaction([
            this.getReactionMasteryBonus(data)
        ]));

        return items;
    }

}
