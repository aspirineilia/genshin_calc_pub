import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionBoLStat extends Condition {
    getStats(settings) {
        return new Stats({bond_of_life: settings['common.bond_of_life'] || 0});
    }
}
