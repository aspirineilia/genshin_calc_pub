import { makeStatItem } from "../Compile/Helpers";
import { CBaseDamage, CMulti, CMultiplierBonus, CMultiplierDefence, CMultiplierResistance, CSum } from "../Compile/Types/Block";
import { CCritDmg, CCritRate, CDamage } from "../Compile/Types/Damage";
import { CConst } from "../Compile/Types/Item";
import { FeatureDamage } from "../Damage";

export class FeatureDamageMultihit extends FeatureDamage {
    /**
     * @returns {boolean}
     */
    hasDetails() {
        return false;
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        let hits = [];

        for (let hit of this.items) {
            let multipliers = this.getMultipliers(data);

            for (let item of hit.multipliers) {
                if (!item.isActive(data)) continue;
                multipliers.push(item);
            }

            let items = [
                new CBaseDamage(
                    multipliers.map((i) => {return i.getTree(data)})
                ),
                new CMultiplierBonus(
                    this.getStatsDmgBonus(data).map((stat) => { return makeStatItem(stat, data.stats) })
                ),
                new CMultiplierResistance([this.getResistanceMultiplier(data)]),
                new CMultiplierDefence([this.getDefenceLevelMultiplier(data)], {
                    percent: true,
                }),
            ];

            let reactionItems = this.getReactionMultipliers(data);
            if (reactionItems.length) {
                for (let item of reactionItems) {
                    items.push(item);
                }
            }

            if (hit.hits) {
                items.push(new CConst({value: hit.hits}));
            }

            hits.push(new CMulti(items));
        }

        return new CDamage([new CSum(hits)], {
            critRate: this.getCritRateBlock(data),
            critDmg: this.getCritDmgBlock(data),
        });
    }
}
