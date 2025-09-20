import { BOND_OF_LIFE_MAX_PERCENT } from "../../../db/Constants";
import { ConditionNumber } from "../Number";

export class ConditionNumberBondOfLife extends ConditionNumber {
    constructor(params) {
        super(params);

        this.params.noStat = true;
        this.params.name = 'common.bond_of_life';
        this.params.title = 'talent_name.bond_of_life';
        this.params.class = 'inputs-3digit';
        this.params.format = 'decimal';
    }

    getMinValue() {
        return 0;
    }

    getMaxValue() {
        return BOND_OF_LIFE_MAX_PERCENT;
    }
}
