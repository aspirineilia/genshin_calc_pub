import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElementsEscoffier extends Condition {
    getData(settings) {
        let chars = 0;
        let onlycryohydro = 1;

        if (this.isActive(settings)) {
            for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
                const element = settings[name] || '';
                if (!element) continue;

                if (['hydro', 'cryo'].includes(element)) {
                    ++chars;
                } else {
                    onlycryohydro = 0;
                }
            }
        }

        return {
            settings: {
                escoffier_chars_count: chars,
                escoffier_chars_only: onlycryohydro,
            },
            stats: new Stats(),
        };
    }

    getAllConditionsOn(settings) {
        return this.getData(settings || {}).settings
    }

    getStats(settings) {
        return new Stats();
    }
}
