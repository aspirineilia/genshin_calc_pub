import { BuildData } from "../../Build/Data";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierStatic extends FeatureMultiplier {
    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeStatValue(data) {
        return new CConst({value: 100});
    }
}
