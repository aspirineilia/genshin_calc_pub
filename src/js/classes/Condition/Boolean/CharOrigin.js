import {ConditionBoolean} from "../Boolean";

export class ConditionBooleanCharOrigin extends ConditionBoolean {
    isActive(settings) {
        let result = this.checkSubconditions(settings);

        if (!result) {
            return false;
        }

        if (this.params.origin && Array.isArray(this.params.origin)) {
            result = this.params.origin.includes(settings.char_origin);
        } else {
            return false;
        }

        return this.params.invert ? !result : result;
    }
}
