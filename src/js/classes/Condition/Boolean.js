import {Condition} from "../Condition";

export class ConditionBoolean extends Condition {
    getType() {
        return 'checkbox';
    }

    isActive(settings) {
        let result = super.isActive(settings);
        result = result && (settings[this.params.name] ? true : false);

        return this.params.invert ? !result : result;
    }
}
