import { Condition } from "../Condition";

export class ConditionResonance extends Condition {
    getType() {
        return 'static';
    }

    isActive(settings) {
        let result = super.isActive(settings);
        if (!result) {
            return false;
        }

        result = false;

        let elementsCount = {};
        let isDuo = false;

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name];
            if (!element) continue;

            if (!elementsCount[element]) {
                elementsCount[element] = 1;
            } else {
                ++elementsCount[element];
                isDuo = true;
            }
        }

        if (this.params.element && elementsCount[this.params.element] >= 2) {
            result = true;
        } else if (!this.params.element && !isDuo) {
            result = true;
        }

        return this.params.invert ? !result : result;
    }
}
