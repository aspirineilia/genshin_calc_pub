import { Stats } from "../Stats";
import { Condition } from "../Condition";

export class ConditionLevels extends Condition {
    getType() {
        return this.params.description ? 'static' : '';
    }

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
        let level = this.getLevel(settings) || 1;

        if (this.params.stats) {
            if (this.params.stats) {
                let pstats = this.params.stats;

                for (let i = 0; i < pstats.length; ++i) {
                    const stat = pstats[i];
                    stats.add(stat.getName(), stat.getValue(level))
                }
            }
        }

        return stats;
    }
}
