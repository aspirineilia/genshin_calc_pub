import { makeStatItem, makeStatTotalItem } from "../../Compile/Helpers";
import { CDivide, CMulti, CSum } from "../../Compile/Types/Block";
import { CConst } from "../../Compile/Types/Item";
import { FeatureMultiplierReaction } from "../Reaction";

export class FeatureMultiplierReactionAmplifying extends FeatureMultiplierReaction {
    getStatsReactionBonus(data) {
        return [];
    }

    getReactionBonuses(data) {
        let items = this.getStatsReactionBonus(data).map((stat) => { return makeStatItem(stat, data.stats) })
        if (items.length == 0) {
            return new CConst({value: 0});
        }

        return new CSum(items);
    }

    getMasteryMultiplier(data) {
        return new CMulti([
            new CConst({value: 2.78}),
            new CDivide([
                makeStatTotalItem('mastery', data.stats),
                new CSum([
                    makeStatTotalItem('mastery', data.stats),
                    new CConst({value: 1400}),
                ]),
            ]),
        ], {percent: true});
    }
}
