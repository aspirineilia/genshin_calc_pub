import { Condition } from "../Condition";
import { Stats } from "../Stats";
import { StatTableConditions } from "../StatTable/Condition";

export class ConditionLevelSelect extends Condition {
    getType() {
        return 'stacks';
    }

    isActive(settings) {
        let result = this.checkSubconditions(settings);
        return result && settings[this.params.name] > 0 ? true : false;
    }

    getLevel(settings) {
        return settings[this.params.name] || 0;
    }

    getStats(settings) {
        let level = this.getLevel(settings);
        let max   = this.getMaxStacks(settings);
        let stats = new Stats();

        if (level > max) {
            level = max;
            settings[this.params.name] = max;
        }

        for (const stat of this.params.stats) {
            if (stat instanceof StatTableConditions) {
                if (!stat.isActive(settings)) {
                    continue;
                }
            }

            stats.add(stat.getName(), stat.getValue(level));
        }

        return stats;
    }
}
