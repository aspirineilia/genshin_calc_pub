import { Stats } from "../../../Stats";
import { ConditionStaticRefine } from "../Refine";

export class ConditionStaticRefineWaveridingWhirl extends ConditionStaticRefine {
    isActive(settings) {
        return super.isActive(settings) && this.getElementsCount(settings);
    }

    getElementsCount(settings) {
        let level = 0;

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (element == 'hydro') {
                ++level;
            }
        }

        return Math.min(2, level);
    }

    getStats(settings) {
        let stats = super.getStats(settings);
        let level = this.getElementsCount(settings);

        if (!level) {
            stats.add('text_number_f', 0.0001);
            return stats;
        }

        stats.add('text_number_f', level);

        if (this.params.realStats) {
            for (const tables of this.params.realStats) {
                let stat = tables.getValue(level);
                stats.add(stat.getName(), stat.getValue(settings.weapon_refine))
            }
        }

        return stats;
    }
}
