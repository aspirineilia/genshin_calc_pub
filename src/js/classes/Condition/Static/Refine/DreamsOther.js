import { Stats } from "../../../Stats";
import { ConditionStaticRefine } from "../Refine";

export class ConditionStaticRefineDreamsOther extends ConditionStaticRefine {
    getStacks(settings) {
        return settings.party_elements_different || 0;
    }

    getStats(settings) {
        let stacksCnt = this.getStacks(settings);
        let stats = new Stats({
            dreams_elements_different: stacksCnt,
        });

        if (stacksCnt > 0) {
            if (this.params.stats) {
                for (const stat of this.params.stats) {
                    stats.add('text_' + stat.getName(), stat.getValue(settings.weapon_refine))
                    stats.add(stat.getName(), stacksCnt * stat.getValue(settings.weapon_refine))
                }
            }
        }

        return stats;
    }
}
