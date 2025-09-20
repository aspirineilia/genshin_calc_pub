import { Condition } from "../Condition";

export class ConditionStatic extends Condition {
    getType() {
        return 'static';
    }

    isActive(settings) {
        let result = super.isActive(settings);
        return this.params.invert ? !result : result;
    }
}
