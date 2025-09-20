import { Stats } from "../../Stats";
import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanValue extends ConditionBoolean {
    getType() {
        return this.params.description ? 'static' : '';
    }

    isActive(settings) {
        return this.checkSubconditions(settings);
    }

    getCompareValue(settings) {
        return settings[this.params.setting] || 0;
    }

    checkSubconditions(settings) {
        let result = super.checkSubconditions(settings);

        if (!result) {
            return false;
        }

        let cond = this.params.cond;
        let value1 = this.params.value || 0;
        let value2 = this.getCompareValue(settings);

        if (cond == 'gt') {
            result = value2 > value1;
        } else if (cond == 'ge') {
            result = value2 >= value1;
        } else if (cond == 'eq') {
            result = value2 == value1;
        } else if (cond == 'le') {
            result = value2 <= value1;
        } else if (cond == 'lt') {
            result = value2 < value1;
        } else {
            result = false;
        }

        return result;
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

        if (this.params.stats) {
            for (const stat of this.params.stats) {
                stats.add(stat.getName(), stat.getValue( this.getLevel(settings) ))
            }
        }

        return stats;
    }
}
