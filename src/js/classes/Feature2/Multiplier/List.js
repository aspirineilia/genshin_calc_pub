import { BuildData } from "../../Build/Data";
import { CBlock } from "../Compile/Types";
import { CMulti, CSum } from "../Compile/Types/Block";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierList extends FeatureMultiplier {
    getName() {
        if (this.values[0].getName) {
            return this.values[0].getName();
        }
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getTree(data) {
        let items = [
            new CSum([
                new CMulti([
                    this.getTreeLevelMultiplier(data),
                    this.getTreeStatValue(data),
                ]),
                new CConst({value: this.getValueFlat(data)}),
            ]),
        ];

        let bonusMulti = this.getTreeBonusMultiplier(data);
        if (bonusMulti) {
            items.push(bonusMulti);
        }

        return new CMulti(items);
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getValue(data) {
        return this.values[0].getValue( this.getLevel(data) ) / 100;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getValueFlat(data) {
        return this.values[1].getValue( this.getLevel(data) );
    }
}
