import { CConst } from "../Compile/Types/Item";
import { FeatureDamage } from "../Damage";

export class FeatureDamageClam extends FeatureDamage {
    /**
     * @returns {Array.<string>}
     */
    getStatsDmgBonus(data) {
        return [];
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        return [];
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        return [];
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getDefenceLevelMultiplier(data) {
        return new CConst({value: 1});
    }

    getDisplayRotationHitMiltiplier(data) {
        return data.stats.get('accumulated_healing');
    }
}
