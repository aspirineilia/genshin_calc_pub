import { Stats } from "../../Stats";
import { PostEffectSetBonus } from "../SetBonus";

const MAX_STACKS = 15000;

export class PostEffectSetBonusDaysPast extends PostEffectSetBonus {
    getData(stats, settings) {
        let result = new Stats();

        if (!this.isActive(settings)) {
            return result;
        }

        let stacks = 0;
        if (settings['set.song_of_days_past_4']) {
            stacks += settings.healing_recorded || 0;
        }
        if (settings['set_other.song_of_days_past_4']) {
            stacks += settings.party_healing_recorded || 0;
        }

        if (!stacks) {
            return result;
        }

        if (stacks > MAX_STACKS) {
            stacks = MAX_STACKS;
        }

        let value = 0.08 * stacks;

        result.add('base_dmg_bonus_normal', value);
        result.add('base_dmg_bonus_charged', value);
        result.add('base_dmg_bonus_plunge', value);
        result.add('base_dmg_bonus_skill', value);
        result.add('base_dmg_bonus_burst', value);

        return result;
    }
}
