import {Condition} from "../Condition";

export class ConditionConstellation extends Condition {
    isActive(settings) {
        let result = settings.char_constellation >= this.params.constellation ? true : false;

        return this.params.invert ? !result : result;
    }
}
