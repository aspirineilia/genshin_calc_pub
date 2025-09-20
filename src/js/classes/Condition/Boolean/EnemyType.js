import {ConditionBoolean} from "../Boolean";

export class ConditionBooleanEnemyType extends ConditionBoolean {
    isActive(settings) {
        let result = this.checkSubconditions(settings);

        if (!result) {
            return false;
        }

        if (this.params.types && Array.isArray(this.params.types)) {
            result = this.params.types.includes(settings.enemy_type);
        } else {
            return false;
        }

        return result;
    }
}
