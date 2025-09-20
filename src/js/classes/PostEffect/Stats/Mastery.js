import { makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsMastery extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return makeStatTotalItem('mastery', data.stats);
    }
}
