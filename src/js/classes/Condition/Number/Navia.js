import { ConditionNumber } from "../Number";

export class ConditionNumberNavia extends ConditionNumber {
    getMaxValue(settings) {
        let stacks = settings.navia_shrapnel_charge || 0;
        if (stacks > 3) stacks = 3;

        return 5 + stacks * 2;
    }
}
