import { BuildData } from "../Build/Data";
import { Feature2 } from "../Feature2";
import { makeStatItem, makeStatTotalItem } from "./Compile/Helpers";
import { CBaseDamage, CFlatReduction, CMulti, CMultiplierBonus, CSubtract } from "./Compile/Types/Block";
import { CDamage, CHeal } from "./Compile/Types/Damage";

export class FeatureHeal extends Feature2 {
    constructor(params) {
        super(params);

        this.category = params.category || 'other';
        this.element = 'heal';
        this.damageType = '';
        this.subtractBoL = params.subtractBoL;
        this.partyHeal = params.partyHeal || false;
        this.noCritValues = true;
    }

    /**
     * @returns {boolean}
     */
    hasDetails() {
        return true;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsHealBonus(data) {
        let result = ['healing', 'healing_base'];
        if (!data.settings.ignore_healing_recv) {
            result.push('healing_recv');
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritRate(data) {
        let result = [];

        if (this.critRateBonuses.length) {
            this.noCritValues = false;
            result = result.concat(this.critRateBonuses);
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsCritDamage(data) {
        let result = [];

        if (this.critDamageBonuses.length) {
            this.noCritValues = false;
            result = result.concat(this.critDamageBonuses);
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        let multipliers = this.getMultipliers(data);

        let base = [
            new CBaseDamage(multipliers.map((i) => {return i.getTree(data)})),
            new CMultiplierBonus(
                this.getStatsHealBonus(data).map((stat) => { return makeStatItem(stat, data.stats) })
            ),
        ];

        let dmgOpts = {
            critRate: this.getCritRateBlock(data),
            critDmg: this.getCritDmgBlock(data),
        };

        if (this.subtractBoL) {
            return new CDamage([
                new CSubtract([
                    new CMulti(base, {group: true}),
                    new CFlatReduction([
                        new CMulti([
                            makeStatItem('bond_of_life', data.stats),
                            makeStatTotalItem('hp', data.stats),
                        ]),
                    ]),
                ], {group: true}),
            ], dmgOpts);
        } else {
            return new CDamage(base, dmgOpts);
        }
    }

    getDisplaySettings(data) {
        return [
            {
                settings: {ignore_healing_recv: 1},
            },
            {
                title: 'heal.healing_recv',
                subItemId: this.getName() + '.healing_recv',
                isChild: true,
                settings: {ignore_healing_recv: 0},
            },
        ];
    }
}
