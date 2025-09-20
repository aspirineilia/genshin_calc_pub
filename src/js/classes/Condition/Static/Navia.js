import { Stats } from "../../Stats";
import { ConditionStatic } from "../Static";

export class ConditionStaticNavia extends ConditionStatic {
    getType() {
        return '';
    }

    getStats(settings) {
        let stats = new Stats();

        let shrapnel1 = Math.min(3, settings.navia_shrapnel_charge);
        let shrapnel2 = 0;
        if (settings.navia_shrapnel_charge && settings.navia_shrapnel_charge >= 3) {
            shrapnel2 = Math.min(3, settings.navia_shrapnel_charge - 3)
        }

        if (shrapnel1) {
            if (settings.char_constellation >= 2) {
                stats.add('crit_rate_navia', shrapnel1 * this.params.c2_crit_rate);
            }
        }

        if (shrapnel2) {
            stats.add('dmg_skill_navia', shrapnel2 * this.params.dmg_bonus);

            if (settings.char_constellation >= 6) {
                stats.add('crit_dmg_navia', shrapnel2 * this.params.c6_crit_dmg);
            }
        }

        return stats;
    }
}
