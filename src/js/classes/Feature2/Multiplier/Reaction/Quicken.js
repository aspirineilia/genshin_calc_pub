import { reactionDamageValues } from "../../../../db/generated/ElementScale";
import { makeStatItem, makeStatTotalItem } from "../../Compile/Helpers";
import { CItem } from "../../Compile/Types";
import { CDivide, CMulti, CSum, CSumPlusOne } from "../../Compile/Types/Block";
import { CConst } from "../../Compile/Types/Item";
import { FeatureMultiplierReaction } from "../Reaction";

export class FeatureMultiplierReactionQuicken extends FeatureMultiplierReaction {
    /**
     * @param {Feature2} feature
     * @param {BuildData} data
     * @returns {boolean}
     */
    isMatchFeature(feature, data) {
        if (feature && !feature.canReact()) return false
        return super.isMatchFeature(feature, data);
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getMasteryMultiplier(data) {
        return new CMulti([
            new CConst({value: 5}),
            new CDivide([
                makeStatTotalItem('mastery', data.stats),
                new CSum([
                    makeStatTotalItem('mastery', data.stats),
                    new CConst({value: 1200}),
                ]),
            ]),
        ], {comment: 'mastery_multi'});
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<string>}
     */
    getStatsDmgBonus(data) {
        return ['dmg_reaction_quicken'];
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getBaseValue(data) {
        return new CConst({value: reactionDamageValues.getValue(data.settings.char_level), comment: 'reaction_base'});
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getReactionMultiplier(data) {
        return new CConst({value: 1});
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getReactionBonuses(data) {
        return new CSum([
            ...this.getStatsDmgBonus().map((stat) => { return makeStatItem(stat, data.stats) })
        ]);
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getTree(data) {
        return new CMulti([
            this.getReactionMultiplier(data),
            this.getBaseValue(data),
            new CSumPlusOne([
                this.getMasteryMultiplier(data),
                this.getReactionBonuses(data),
            ], {comment: 'mastery_multi'}),
        ], {isReacted: true});
    }
}
