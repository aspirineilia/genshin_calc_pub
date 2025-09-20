import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElementsChasca extends Condition {
    getData(settings) {
        let elements = {};
        if (this.isActive(settings)) {
            for (const name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
                const element = settings[name] || '';
                if (!element) continue;

                if (['pyro', 'hydro', 'electro', 'cryo'].includes(element)) {
                    elements[element] = 1;
                }
            }
        }

        let stacks = Object.keys(elements).length;
        let stats = new Stats();

        if (stacks > 0) {
            stats.add(this.params.bonuses.getName(), this.params.bonuses.getValue(stacks))
        }

        return {
            stats: stats,
        };
    }

    getStats(settings) {
        return new Stats();
    }
}
