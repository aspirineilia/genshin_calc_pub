import { FeatureDamage } from "../Damage";

export class FeatureDamageCharged extends FeatureDamage {
    constructor(params) {
        params.category ||= 'attack';
        params.damageType = 'charged';
        params.allowInfusion = true;
        super(params);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsDmgBonus(data) {
        let result = super.getStatsDmgBonus(data)
        result.push('dmg_charged_enemy');
        return result;
    }

}
