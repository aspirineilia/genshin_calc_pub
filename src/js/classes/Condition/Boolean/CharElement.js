import {ConditionBoolean} from "../Boolean";

export class ConditionBooleanCharElement extends ConditionBoolean {
    isActive(settings) {
        let result = this.checkSubconditions(settings);

        if (!result) {
            return false;
        }

        if (this.params.element && Array.isArray(this.params.element)) {
            result = this.params.element.includes(settings.char_element);
        } else {
            return false;
        }

        return this.params.invert ? !result : result;
    }
}
