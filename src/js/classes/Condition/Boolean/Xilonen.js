import { Stats } from "../../Stats";
import { ConditionBoolean } from "../Boolean";

const samplersElements = ['pyro', 'cryo', 'electro', 'hydro'];

export class ConditionBooleanXilonen extends ConditionBoolean {
    getData(settings) {
        let result = {
            settings: {},
            stats: new Stats(),
        };

        let samplers = this.getSamplers(settings);
        let otherElementsCnt = 0;

        for (let element of samplers) {
            result.settings['xilonen_sampler_'+ element] = 1;
            if (element != 'geo') {
                ++otherElementsCnt;
            }
        }

        if (otherElementsCnt >= 2) {
            result.settings['xilonen_support_mode'] = 1;
        } else {
            result.settings['xilonen_damage_mode'] = 1;
        }

        if (this.isActive(settings)) {
            for (let element of samplers) {
                result.settings['xilonen_active_sampler_'+ element] = 1;
            }
        }

        return result;
    }

    getSamplers(settings) {
        let result = [];

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (samplersElements.includes(element)) {
                result.push(element);
            }
        }

        while (result.length < 3) {
            result.push('geo');
        }

        return result;
    }
}
