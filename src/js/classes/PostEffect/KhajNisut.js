import { makeStatTotalItem } from "../Feature2/Compile/Helpers";
import { CConst } from "../Feature2/Compile/Types/Item";
import { PostEffectStats } from "./Stats";

export class PostEffectKhajNisut extends PostEffectStats {
    getLevel(settings) {
        let partyLevel = settings['weapon_other.weapon_key_of_khaj_nisut'] || 0;
        if (partyLevel > 0) {
            return partyLevel;
        }

        if (settings.weapon_id == 135) {
            return settings.weapon_refine;
        }

        return 0;
    }

    isActive(settings) {
        return settings.weapon_id == 135 && settings.weapon_key_of_khaj_nisut >= 3
            || settings['weapon_other.weapon_key_of_khaj_nisut'] > 0;
    }

    getBaseValueTree(data, opts) {
        let partyLevel = data.settings['weapon_other.weapon_key_of_khaj_nisut'] || 0;
        let partyHp = data.settings['sunken_song_of_the_sands_hp'] || 0;
        let selfLevel = data.settings.weapon_id == 135 ? (data.settings['weapon_key_of_khaj_nisut'] || 0) : 0;

        if (partyLevel > 0 && partyHp > 0) {
            return new CConst({value: partyHp});
        } else if (selfLevel >= 3) {
            return makeStatTotalItem('hp', data.stats);
        }
        return new CConst({value: 0});
    }
}
