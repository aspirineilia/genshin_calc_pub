import { Stats } from "../../Stats";
import { ConditionStatic } from "../Static";

export class ConditionDefendersWill extends ConditionStatic {

    getData(settings) {
        let result = {
            settings: {},
            stats: new Stats(),
        };

        if (this.isActive(settings)) {
            result.settings = this.params.settings || {};
            result.stats = this.getStats(settings);
        }

        return result;
    }

    getStats(settings) {
        settings ||= {}

        let stats = new Stats({
            text_percent: 30,
        });

        let elements = {};
        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (!elements[element]) {
                elements[element] = 0
            }
            ++elements[element]
        }

        for (let element of Object.keys(elements)) {
            if (elements[element] == 1) {
                stats.add('res_'+ element, 30)
            }
        }

        return stats;
    }
}
