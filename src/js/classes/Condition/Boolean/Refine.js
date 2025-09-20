import {Stats} from "../../Stats";
import {ConditionBoolean} from "../Boolean";

export class ConditionBooleanRefine extends ConditionBoolean {
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
                stats.add(stat.getName(), stat.getValue(settings.weapon_refine))
            }
        }

        return stats;
    }
}
