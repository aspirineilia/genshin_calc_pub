import { Stats } from "../../Stats";
import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanLevels extends ConditionBoolean {
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
        let stats = new Stats();
        let level = this.getLevel(settings);

        if (this.params.stats) {
            for (const stat of this.params.stats) {
                stats.add(stat.getName(), stat.getValue(level))
            }
        }

        return stats;
    }
}
