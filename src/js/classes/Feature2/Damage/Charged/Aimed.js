import { CCritRate } from "../../Compile/Types/Damage";
import { CConst } from "../../Compile/Types/Item";
import { FeatureDamageCharged } from "../Charged";

export class FeatureDamageChargedAimed extends FeatureDamageCharged {
    getCritRateBlock(data) {
        if (data.settings.enemy_weak_shot) {
            return new CCritRate([new CConst({value: 1})]);
        }

        return super.getCritRateBlock(data);
    }
}
