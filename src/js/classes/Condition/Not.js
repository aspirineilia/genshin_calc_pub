import { Condition } from "../Condition";

export class ConditionNot extends Condition {
    constructor(items) {
        super({});
        this.items = items;
    }

    isActive(settings) {
        let result = true;

        for (let cond of this.items) {
            result = result && cond.isActive(settings);
        }

        return !result;
    }
}
