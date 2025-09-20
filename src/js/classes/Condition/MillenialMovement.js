import { Condition } from "../Condition";
import { Stats } from "../Stats";

export class ConditionMillenialMovement extends Condition {
    getData(settings) {
        let maxLevels = {
            atkBuff: 0,
            atkSpeedBuff: Math.max(settings.weapon_song_of_broken_pines ? settings.weapon_refine : 0, settings['weapon_other.weapon_song_of_broken_pines'] || 0),
            masteryBuff:  Math.max(settings.weapon_elegy_for_the_end    ? settings.weapon_refine : 0, settings['weapon_other.weapon_elegy_for_the_end'] || 0),
            affixBuff:    Math.max(settings.weapon_freedom_sworn        ? settings.weapon_refine : 0, settings['weapon_other.weapon_freedom_sworn'] || 0),
        };

        maxLevels.atkBuff = Math.max(maxLevels.atkSpeedBuff, maxLevels.masteryBuff, maxLevels.affixBuff);

        let result = {
            settings: {},
            stats: new Stats(),
        };

        if (maxLevels.atkBuff == 0) {
            return result;
        }

        let keys = Object.keys(maxLevels)

        for (let i = 0; i < keys.length; ++i) {
            let key   = keys[i];
            let level = maxLevels[key];
            let stats = this.params[key];

            if (level == 0) continue;

            for (let index = 0; index < stats.length; ++index) {
                let stat = stats[index];
                result.stats.add(stat.getName(), stat.getValue(level));
            }
        }

        return result;
    }
}
