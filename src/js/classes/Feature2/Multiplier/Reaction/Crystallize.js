import { makeStatTotalItem } from "../../Compile/Helpers";
import { CDivide, CMulti, CSum } from "../../Compile/Types/Block";
import { CConst } from "../../Compile/Types/Item";
import { FeatureMultiplierReaction } from "../Reaction";

export class FeatureMultiplierReactionCrystallize extends FeatureMultiplierReaction {
    static getTreeItems(data) {
        return [
            this.masteryMultiplier(data),
        ]
    }

    static masteryMultiplier(data) {
        return new CMulti([
            new CConst({value: 4.44}),
            new CDivide([
                makeStatTotalItem('mastery', data.stats),
                new CSum([
                    makeStatTotalItem('mastery', data.stats),
                    new CConst({value: 1400}),
                ]),
            ]),
        ]);
    }
}
