import { makeStatTotalItem } from "../Compile/Helpers";
import { CMulti, CValueCap } from "../Compile/Types/Block";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierSayuBurst extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeLevelMultiplier(data) {
        return new CValueCap([
            new CMulti([
                makeStatTotalItem('mastery', data.stats),
                new CConst({value: 0.002, percent: true, comment: 'constellation6'}),
            ]),
        ], {
            value: new CConst({value: 4}),
        });
    }
}
