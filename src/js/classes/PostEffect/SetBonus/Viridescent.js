import { Stats } from "../../Stats";
import { PostEffectSetBonus } from "../SetBonus";

const ALLOWED = ['cryo', 'electro', 'hydro', 'pyro'];

export class PostEffectSetBonusViridiscent extends PostEffectSetBonus {
    getData(stats, settings) {
        let result = new Stats();

        if (!this.isActive(settings)) {
            return result;
        }

        let selectedElements = {};

        for (let element of (settings['set.viridescent_venerer_4'] || '').split(';')) {
            if (ALLOWED.includes(element)) {
                selectedElements[element] = 1;
            }
        }

        for (let element of (settings['set_other.viridescent_venerer_4'] || '').split(';')) {
            if (ALLOWED.includes(element)) {
                selectedElements[element] = 1;
            }
        }

        for (let element of Object.keys(selectedElements)) {
            result.add('enemy_res_'+ element, -40);
        }

        return result;
    }
}
