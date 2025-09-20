import { FeatureDamage } from "../Damage";

export class FeatureDamageBurst extends FeatureDamage {
    constructor(params) {
        params.category ||= 'burst';
        params.damageType = 'burst';
        super(params);
    }
}
