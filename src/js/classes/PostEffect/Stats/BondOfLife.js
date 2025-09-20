import { CMulti } from "../../Feature2/Compile/Types/Block";
import { CConst } from "../../Feature2/Compile/Types/Item";
import { PostEffectStatsHP } from "./HP";

export class PostEffectStatsBondOfLife extends PostEffectStatsHP {
    getBolValue(data) {
        return (data.settings[this.params.bolSettingName] || 0) / 100
    }

    getBaseValueTree(data, opts) {
        return new CMulti([
            super.getBaseValueTree(data, opts),
            new CConst({value: this.getBolValue(data)}),
        ]);
    }
}
