import { Stats } from "../../Stats";
import { PostEffectSetBonus } from "../SetBonus";

const ALLOWED = ['cryo', 'electro', 'hydro', 'pyro'];

export class PostEffectSetBonusArchaic extends PostEffectSetBonus {
    getData(stats, settings) {
        let result = new Stats();

        if (!this.isActive(settings)) {
            return result;
        }

        let element = settings['set_bonus.archaic_petra_4'] || settings['set_other.archaic_petra_4'];

        if (element && ALLOWED.includes(element)) {
            result.add('dmg_'+ element, 35);
        }

        return result;
    }
}
