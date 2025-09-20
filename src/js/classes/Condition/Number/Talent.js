import { ConditionNumber } from "../Number";

export class ConditionNumberTalent extends ConditionNumber {
    constructor(params) {
        super(params);

        this.params.nonEmpty = true;
        this.params.class = 'inputs-2digit';
        this.params.showButtons = true;
    }

    getMinValue() {
        return 1;
    }

    getMaxValue() {
        return 10;
    }
}
