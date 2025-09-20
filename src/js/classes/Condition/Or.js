import { Condition } from "../Condition";

export class ConditionOr extends Condition {
    constructor(items) {
        super({})
        this.items = items;
    }

    isActive(settings) {
        for (let cond of this.items) {
            if (cond.isActive(settings)) {
                return true
            }
        }

        return false
    }
}
