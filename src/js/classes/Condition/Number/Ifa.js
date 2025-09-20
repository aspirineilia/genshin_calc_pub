import { ConditionNumber } from "../Number";

export class ConditionNumberIfa extends ConditionNumber {
    getMaxValue(settings) {
        let value = super.getMaxValue(settings);

        if (settings.char_constellation >= 2) {
            value += this.params.c2bonus;
        }

        return value;
    }
}
