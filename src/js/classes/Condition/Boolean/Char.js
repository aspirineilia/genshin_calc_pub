import {ConditionBoolean} from "../Boolean";

export class ConditionBooleanChar extends ConditionBoolean {
    isActive(settings) {
        let result = this.checkSubconditions(settings);

        if (!result) {
            return false;
        }

        if (this.params.chars && Array.isArray(this.params.chars)) {
            result = this.params.chars.includes(settings.char_name);
        } else {
            return false;
        }

        return result;
    }
}
