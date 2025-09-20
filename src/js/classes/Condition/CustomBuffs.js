import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionCustomBuffs extends Condition {
    getType() {
        return 'custom_buffs';
    }

    getData(settings) {
        let result = {
            settings: {},
            stats: new Stats(),
        };

        for (let key of Object.keys(settings)) {
            let m = key.match(/custom_buffs.(.*)+/);
            if (m && settings[key]) {
                result.stats.add(m[1], settings[key]);
            }
        }

        return result;
    }
}
