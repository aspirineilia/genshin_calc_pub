import { Feature2 } from "../Feature2";
import { CBaseDamage } from "./Compile/Types/Block";
import { CStaticValue } from "./Compile/Types/Damage";

export class FeatureStatic extends Feature2 {
    constructor(params) {
        super(params);

        this.element = params.element || 'buff';
        this.format = params.format;
        this.digits = params.digits;
        this.noCritValues = true;
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        let multipliers = this.getMultipliers(data);

        return new CStaticValue([
            new CBaseDamage(
                multipliers.map((i) => {return i.getTree(data)})
            ),
        ]);
    }
}
