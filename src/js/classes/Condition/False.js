import { Condition } from "../Condition";

export class ConditionFalse extends Condition {
    isActive() {
        return false;
    }
}
