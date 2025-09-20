import { FeatureDamage } from "../Damage";

export class FeatureDamagePlunge extends FeatureDamage {
    constructor(params) {
        params.category ||= 'attack';
        params.damageType = 'plunge';
        params.allowInfusion = true;
        super(params);
    }
}
