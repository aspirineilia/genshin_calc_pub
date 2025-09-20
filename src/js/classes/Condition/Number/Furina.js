import { ConditionNumber } from "../Number";

export class ConditionNumberFurina extends ConditionNumber {
    getMinValue(settings) {
        let value = super.getMinValue(settings);

        if (settings.char_constellation >= 1 && settings[this.params.name] > 0) {
            value += this.params.c1bonus;
        }

        return value;
    }

    getMaxValue(settings) {
        let value = super.getMaxValue(settings);

        if (settings.char_constellation >= 1) {
            value += this.params.c1bonus;
        }

        if (settings.char_constellation >= 2) {
            value += this.params.c2bonus;
        }

        return value;
    }
}
