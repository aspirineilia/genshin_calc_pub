import { makeStatTotalItem } from "../../Compile/Helpers";
import { CDivide, CMulti, CSum } from "../../Compile/Types/Block";
import { CConst } from "../../Compile/Types/Item";
import { FeatureMultiplierReaction } from "../Reaction";

export class FeatureMultiplierReactionLunarCharged extends FeatureMultiplierReaction {
    static masteryMultiplier(data) {
        return new CMulti([
            new CConst({value: 6}),
            new CDivide([
                makeStatTotalItem('mastery', data.stats),
                new CSum([
                    makeStatTotalItem('mastery', data.stats),
                    new CConst({value: 2000}),
                ]),
            ]),
        ], {percent: true});
    }
}
