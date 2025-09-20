import { FeatureDamage } from "../Damage";

export class FeatureDamageSkill extends FeatureDamage {
    constructor(params) {
        params.category ||= 'skill';
        params.damageType = 'skill';
        super(params);
    }
}
