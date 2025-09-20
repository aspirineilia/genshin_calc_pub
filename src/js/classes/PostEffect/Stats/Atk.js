import { makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsAtk extends PostEffectStats {
    getBase(allStats, settings) {
        let base    = allStats.get('atk_base');
        let percent = allStats.get('atk_percent') / 100;
        let flat    = allStats.get('atk');

        return base + flat + base * percent;
    }

    getBaseValueTree(data, opts) {
        return makeStatTotalItem('atk', data.stats);
    }
}
