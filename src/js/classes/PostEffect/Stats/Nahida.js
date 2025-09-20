import { makeStatItem, makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { CMax } from "../../Feature2/Compile/Types/Block";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsNahida extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return new CMax([
            makeStatTotalItem('mastery', data.stats),
            makeStatItem('party_max_mastery', data.stats),
        ]);
    }
}
