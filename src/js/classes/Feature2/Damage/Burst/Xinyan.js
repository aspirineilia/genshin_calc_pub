import { FeatureDamageBurst } from "../Burst";
export class FeatureDamageBurstXinyan extends FeatureDamageBurst {
    /**
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        if (data.settings.char_constellation >= 2) {
            return ['crit_rate_xinyan'];
        }
        return super.getStatsCritRate(data);
    }
}
