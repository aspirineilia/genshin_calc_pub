import { BuildData } from "../../Build/Data";
import { CConst } from "../Compile/Types/Item";
import { CDivide, CNumberFloor, CValueCap } from "../Compile/Types/Block";
import { FeatureMultiplier } from "../Multiplier";
import { makeStatTotalItem } from "../Compile/Helpers";

export class FeatureMultiplierKiraraBurst extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        let result = new CValueCap([
            new CNumberFloor([
                new CDivide([
                    makeStatTotalItem('hp', data.stats),
                    new CConst({value: 8000}),
                ]),
            ]),
        ], {
            value: new CConst({value: 4}),
        });

        return result;
    }
}
