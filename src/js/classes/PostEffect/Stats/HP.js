import { makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsHP extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return makeStatTotalItem('hp', data.stats);
    }
}
