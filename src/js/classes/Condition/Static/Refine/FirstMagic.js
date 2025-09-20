import { ConditionStaticRefine } from "../Refine";

export class ConditionStaticRefineFirstMagic extends ConditionStaticRefine {
    getStats(settings) {
        let stats = super.getStats(settings);
        let level = Math.min(3, settings[this.params.effectLevelSetting]);
        if (!level) {
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
