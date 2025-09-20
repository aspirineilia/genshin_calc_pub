import { ConditionStacks } from "../Stacks"

export class ConditionStacksNumber extends ConditionStacks {
    getType() {
        return 'number';
    }

    getMinValue(settings) {
        return 0;
    }

    getMaxValue(settings) {
        return this.params.maxStacks;
    }

    getValue(settings) {
        let min = this.getMinValue(settings);
        let max = this.getMaxValue(settings);
        let value = parseInt(settings && settings[this.params.name]) || 0;

        return Math.min(max, Math.max(min, value));
    }
}
