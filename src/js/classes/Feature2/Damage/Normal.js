import { FeatureDamage } from "../Damage";

export class FeatureDamageNormal extends FeatureDamage {
    constructor(params) {
        params.category ||= 'attack';
        params.damageType = 'normal';
        params.allowInfusion = true;
        super(params);
    }
}
