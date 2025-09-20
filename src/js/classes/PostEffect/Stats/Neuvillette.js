import { makeStatItem, makeStatTotalItem } from "../../Feature2/Compile/Helpers";
import { CDivide, CIfGreater } from "../../Feature2/Compile/Types/Block";
import { CConst } from "../../Feature2/Compile/Types/Item";
import { PostEffectStats } from "../Stats";

export class PostEffectStatsNeuvillette extends PostEffectStats {
    getBaseValueTree(data, opts) {
        return new CIfGreater([
            makeStatItem(this.params.from, data.stats),
            new CConst({value: 100}),
            new CDivide([
                makeStatItem(this.params.from, data.stats),
                new CDivide([
                    makeStatTotalItem('hp', data.stats),
                    new CConst({value: 100}),
                ]),
            ]),
            makeStatItem(this.params.from, data.stats)
        ]);
    }
}
