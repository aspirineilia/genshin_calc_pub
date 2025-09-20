import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanNightSoul extends ConditionBoolean {
    isActive(settings) {
        let result = this.checkSubconditions(settings);

        if (!result) {
            return false;
        }

        if (settings.char_origin == 'natlan' || settings.char_id == 100) {
            return true
        }

        return false;
    }
}
