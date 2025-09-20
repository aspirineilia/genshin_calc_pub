import { ConditionStatic } from "../Static";
import { Stats } from "../../Stats";

export class ConditionStaticLevel extends ConditionStatic {
    getLevel(settings) {
        let level = settings[this.params.levelSetting] || 0;
        level += settings[this.params.levelSetting + '_bonus'] || 0;
        level += settings[this.params.levelSetting + '_bonus_2'] || 0;

        if (this.params.fromZero) {
            ++level;
        } else {
            level ||= 1;
        }
        return level;
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
        let level = this.getLevel(settings);

        if (this.params.stats) {
            for (const stat of this.params.stats) {
                stats.add(stat.getName(), stat.getValue(level))
            }
        }

        return stats;
    }
}
