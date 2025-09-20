import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionCalcElementsNahida extends Condition {
    getData(settings) {
        let result = {};

        if (settings.char_constellation >= 1) {
            result = {nahida_elements_electro: 1, nahida_elements_pyro: 1, nahida_elements_hydro: 1};
        }

        if (this.isActive(settings)) {
            for (let name of ['resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
                let element = settings[name] || '';
                if (!element) continue;

                if (['pyro', 'hydro', 'electro'].includes(element)) {
                    result['nahida_elements_' + element] = (result['nahida_elements_' + element] || 0) + 1;
                }
            }
        }

        return {
            settings: result,
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
