import { BuildData } from "../Build/Data";
import { Condition } from "../Condition";
import { Feature2 } from "../Feature2";
import { ValueTable } from "../ValueTable";
import { makeStatItem, makeStatTotalItem } from "./Compile/Helpers";
import { CBlock, CItem} from "./Compile/Types";
import { CMax, CMulti, CSubtract, CSumPlusOne, CValueCap} from "./Compile/Types/Block";
import { CConst } from "./Compile/Types/Item";
import { FeatureMultiplierTarget } from "./Multiplier/Target";

const LEVELING_SOURCE = {
    char_skill_attack: 'talent_attack',
    char_skill_elemental: 'talent_elemental',
    char_skill_burst: 'talent_burst',
    weapon_refine: 'weapon',
};

export class FeatureMultiplier {
    constructor(data) {
        /**
         * @type {string}
         */
        this.scaling = data.scaling || 'atk*';
        /**
         * @type {string}
         */
        this.leveling = data.leveling || '';
        /**
         * @type {string}
         */
        this.stacksLeveling = data.stacksLeveling || '';
        /**
         * @type {string}
         */
        this.bonusLeveling = data.bonusLeveling || '';
        /**
         * @type {string}
         */
        this.source = data.source || '';
        /**
         * @type {ValueTable}
         */
        this.values = data.values || new ValueTable([0]);
        /**
         * @type {ValueTable}
         */
        this.bonusValues = data.bonusValues || new ValueTable([0]);
        /**
         * @type {boolean}
         */
        this.isBase = !!data.isBase;
        /**
         * @type {Condition}
         */
        this.condition = data.condition;
        /**
         * @type {FeatureMultiplierTarget}
         */
        this.target = data.target;
        /**
         * @type {Function|number}
         */
        this.maxStacks = data.maxStacks;
        /**
         * @type {string}
         */
        this.scalingSource = data.scalingSource || '';
        /**
         * @type {number}
         */
        this.scalingMultiplier = data.scalingMultiplier || 1;
        /**
         * @type {Condition}
         */
        this.scalingMultiplierCondition = data.scalingMultiplierCondition;
        /**
         * @type {number}
         */
        this.exceedStatValue = data.exceedStatValue;
        /**
         * @type {ValueTable}
         */
        this.capValue = data.capValue;

        // if (process.env.NODE_ENV !== 'production') {
        //     if (!this.source && !this.leveling) {
        //         function getErrorObject(){
        //             try { throw Error('') } catch(err) { return err; }
        //         }
        //         var err = getErrorObject().stack;
        //         let res = /db\/Char\/\w+\.js/s.exec(err);
        //         if (res && res.length) {
        //             console.log('no source or leveling for multiplier in '+ res[0]);
        //         }
        //     }

        //     if (this.scalingMultiplier != 1 && !this.scalingSource) {
        //         function getErrorObject(){
        //             try { throw Error('') } catch(err) { return err; }
        //         }
        //         var err = getErrorObject().stack;
        //         let res = /db\/Char\/\w+\.js/s.exec(err);
        //         if (res && res.length) {
        //             console.log('no scalingSource for scalingMultiplier in '+ res[0]);
        //         }
        //     }
        // }
    }

    getName() {
        if (this.values.getName) {
            return this.values.getName();
        }
    }

    /**
     * @param {BuildData} data
     * @returns {boolean}
     */
    isActive(data) {
        if (!this.condition) {
            return true;
        }

        return this.condition.isActive(data.settings);
    }

    /**
     * @param {Feature2} feature
     * @param {BuildData} data
     * @returns {boolean}
     */
    isMatchFeature(feature, data) {
        return this.target ? this.target.isMatchFeature(feature, data) : true;
    }

    /**
     * @param {string} option
     * @returns {boolean}
     */
    isMatchOption(option) {
        return this.target ? this.target.isMatchOption(option) : true;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getLevel(data) {
        return data.settings.getLevel(this.leveling) || 1;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getScalingMultiplier(data) {
        if (!this.scalingMultiplierCondition || this.scalingMultiplierCondition.isActive(data.settings)) {
            return this.scalingMultiplier;
        }
        return 1;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getBonusLevel(data) {
        return data.settings.getLevel(this.bonusLeveling) || 1;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getBonusValue(data) {
        return this.bonusValues.getValue( this.getBonusLevel(data) ) / 100;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getValue(data) {
        return this.values.getValue( this.getLevel(data) ) / 100 + this.getBonusValue(data);
    }

    /**
     * @returns {string}
     */
    getSource() {
        if (this.source) return this.source;
        return LEVELING_SOURCE[this.leveling] || '';
    }

    getStackMultiplier(data) {
        let stacks = data.settings[this.stacksLeveling] || 0;
        let maxStacks;

        if (typeof this.maxStacks === 'function') {
            maxStacks = this.maxStacks(data.settings || {});
        } else if (this.maxStacks) {
            maxStacks = this.maxStacks;
        }

        if (maxStacks && stacks > maxStacks) {
            stacks = maxStacks;
        }

        return new CConst({value: stacks, comment: 'stacks'});
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getTree(data) {
        let items = [
            this.getTreeLevelMultiplier(data),
            this.getTreeStatValue(data),
        ];

        let bonusMulti = this.getTreeBonusMultiplier(data);
        if (bonusMulti) {
            items.push(bonusMulti);
        }

        if (this.stacksLeveling) {
            items.push(this.getStackMultiplier(data));
        }

        let result = new CMulti(items)
        if (this.capValue) {
            result = new CValueCap([result], {
                value: new CConst({value: this.capValue.getValue(this.getLevel(data))}),
            });
        }

        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeLevelMultiplier(data) {
        return new CConst({
            value: this.getValue(data),
            comment: this.getSource(),
            percent: true,
            level: this.getLevel(data),
        });
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeBonusMultiplier(data) {
        let value = this.getScalingMultiplier(data);
        if (value == 1) return;

        if (isNaN(value)) {
            return new CSumPlusOne([makeStatItem(value, data.stats)], {
                percent: true,
                comment: this.scalingSource,
            });
        } else {
            return new CConst({
                value: value,
                percent: true,
                comment: this.scalingSource,
            });
        }
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeStatValue(data) {
        let value;
        if (this.scaling.indexOf('*') >= 0) {
            let realStat = this.scaling.replace('*', '');
            value = makeStatTotalItem(realStat, data.stats);
        } else {
            value = makeStatItem(this.scaling, data.stats);
        }

        if (this.exceedStatValue) {
            value = new CMax([
                new CSubtract([
                    value,
                    new CConst({value: this.exceedStatValue}),
                ]),
                new CConst({value: 0}),
            ]);
        }

        return value;
    }
}
