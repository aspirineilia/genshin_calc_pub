import { BuildData } from "../Build/Data";
import { Feature2 } from "../Feature2";
import { makeStatItem } from "./Compile/Helpers";
import { CBaseDamage, CMultiplierBonus } from "./Compile/Types/Block";
import { CShield } from "./Compile/Types/Damage";
import { CConst } from "./Compile/Types/Item";

export class FeatureShield extends Feature2 {
    constructor(params) {
        super(params);

        this.element = params.element || '';
        this.category = params.category || 'other';
        this.damageType = '';
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
    getStatsShieldBonus(data) {
        if (data.settings.ignore_shield_bonus) {
            return [];
        }

        return ['shield'];
    }

    getBaseTree(data) {
        let multipliers = this.getMultipliers(data);

        let items = [
            new CBaseDamage(multipliers.map((i) => {return i.getTree(data)})),
            new CMultiplierBonus(
                this.getStatsShieldBonus(data).map((stat) => { return makeStatItem(stat, data.stats) })
            ),
        ];

        return items;
    }

    /**
     * @param {BuildData} data
     * @returns {Function}
     */
    getTree(data) {
        let items = this.getBaseTree(data);

        if (data.settings.add_shield_element) {
            let bonus = this.elementBonus || (this.getElement(data) == 'geo' ? 1.5 : 2.5);
            items.push(
                new CConst({value: bonus, comment: 'shield_element'}),
            );
        }

        return new CShield(items);
    }

    getDisplaySettings(data) {
        let result = [
            {
                icon: 'shield',
                settings: {
                    ignore_shield_bonus: 1,
                    add_shield_element: 0,
                },
            },
            {
                icon: 'shield',
                title: 'shield.strength_bonus',
                subItemId: this.getName() + '.strength_bonus',
                isChild: true,
                settings: {
                    ignore_shield_bonus: 0,
                    add_shield_element: 0,
                },
            },
        ];

        if (this.element) {
            result.push({
                icon: this.element,
                title: 'shield.element_bonus',
                subItemId: this.getName() + '.element_bonus',
                isChild: true,
                settings: {
                    ignore_shield_bonus: 0,
                    add_shield_element: 1,
                },
            });
        }

        return result;
    }
}
