import { Stats } from "../Stats";
import { Condition } from "../Condition";

const ALLOWED = ['cryo', 'electro', 'hydro', 'pyro'];

export class ConditionArchaic extends Condition {
    getData(settings) {
        let result = new Stats({});

        if (!this.isActive(settings)) {
            return {stats: result};
        }

        let element = settings['set_other.archaic_petra_4'] || settings['set_bonus.archaic_petra_4'];
        if (element && ALLOWED.includes(element)) {
            result.add('dmg_'+ element, 35);
        }

        return {
            stats: result,
        };
    }

    getStats(settings) {
        return new Stats();
    }
}
