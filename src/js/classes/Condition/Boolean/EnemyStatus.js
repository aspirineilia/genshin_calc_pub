import { Condition } from "../../Condition";

export class ConditionEnemyStatus extends Condition {
    isActive(settings) {
        let result = this.checkSubconditions(settings);

        if (!result) {
            return false;
        }

        let status = settings['common.enemy_status'];

        if (status && this.params.status && Array.isArray(this.params.status)) {
            result = this.params.status.includes(settings['common.enemy_status']);
        } else {
            result = false;
        }

        return this.params.invert ? !result : result;
    }
}
