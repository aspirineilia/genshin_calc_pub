import { FeatureDamagePlunge } from "../Plunge";

export class FeatureDamagePlungeShockWave extends FeatureDamagePlunge {
    constructor(params) {
        if (!Array.isArray(params.tags)) {
            params.tags = [];
        }
        params.tags.push('plunge_shockwave');

        super(params);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsDmgBonus(data) {
        let result = super.getStatsDmgBonus(data)
        result.push('dmg_plunge_shockwave');
        return result;
    }
}
