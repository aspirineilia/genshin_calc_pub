import { makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsRecharge extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return makeStatTotalItem('recharge', data.stats);
    }
}
