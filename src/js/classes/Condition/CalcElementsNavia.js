import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElementsNavia extends Condition {
    getData(settings) {
        let chars = 0;

        if (this.isActive(settings)) {
            for (const name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
                const element = settings[name] || '';
                if (!element) continue;

                if (['pyro', 'hydro', 'electro', 'cryo'].includes(element)) {
                    ++chars;
                }
            }
        }

        return {
            settings: {
                navia_chars_count: chars,
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
