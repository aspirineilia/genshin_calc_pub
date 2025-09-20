import { Condition } from "../Condition";

export class ConditionElementsCount extends Condition {
    getType() {
        return 'static';
    }

    isActive(settings) {
        let result = super.isActive(settings);
        if (!result) {
            return false;
        }

        result = false;

        let elementsCount = 0;
        let target = this.params.element || '';
        let count  = this.params.count || 1;

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (target == element) {
                ++elementsCount
            }
        }

        result = elementsCount >= count;

        return this.params.invert ? !result : result;
    }
}
