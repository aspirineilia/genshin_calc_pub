import { FeatureDamageCharged } from "../Charged";

export class FeatureDamageChargedYanfei extends FeatureDamageCharged {
    getRotationHitMiltiplier(data) {
        return this.getCritRateBlock(data);
    }

    getDisplayRotationHitMiltiplier(data) {
        let tree = this.getRotationHitMiltiplier(data);
        return tree.execute(data);
    }
}
