import { CConst } from "../../Feature2/Compile/Types/Item";
import { CMax, CSubtract } from "../../Feature2/Compile/Types/Block";
import { PostEffectStatsRecharge } from "./Recharge";

export class PostEffectStatsExceedRecharge extends PostEffectStatsRecharge {
    getBaseValueTree(data, opts) {
        return new CMax([
            new CSubtract([
                super.getBaseValueTree(data, opts),
                new CConst({value: 1}),
            ]),
            new CConst({value: 0}),
        ]);
    }
}
