import { makeStatItem } from "../Compile/Helpers";
import { CValueCap } from "../Compile/Types/Block";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierClorinde extends FeatureMultiplier {
    // /**
    //  * @param {BuildData} data
    //  * @returns {CItem}
    //  */
    // getTreeBonusMultiplier(data) {
    //     return makeStatItem('dmg_electro_clorinde', data.stats)
    // }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getTree(data) {
        return new CValueCap([
            super.getTree(data)
        ], {
            value: new CConst({value: data.stats.get('clorinde_electro_dmg_max')}),
        });
    }
}
