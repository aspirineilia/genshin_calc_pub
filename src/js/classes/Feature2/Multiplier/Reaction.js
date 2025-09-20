import { _ } from "core-js";
import { makeStatItem, makeStatTotalItem } from "../Compile/Helpers";
import { CMulti, CSumPlusOne } from "../Compile/Types/Block";
import { CConst } from "../Compile/Types/Item";
import { FeatureMultiplier } from "../Multiplier";

export class FeatureMultiplierReaction extends FeatureMultiplier  {
    constructor(params) {
        super(params);
        /**
         * @type {number}
         */
        this.reactionValue = params.reactionValue;
        this.reactionRate = params.reactionRate;
        this.reactionPenalty = params.reactionPenalty;
        this.scalingStat = params.scalingStat;
    }

    /**
     * @param {BuildData} data
     * @returns {number}
     */
    getTreeBonusMultiplier(data) {
        let parts = [
            new CConst({
                value: this.reactionRate,
                percent: true,
                comment: 'reaction_ratio',
            }),
        ];

        if (this.scalingStat) {
            parts.push(
                new CSumPlusOne([
                    makeStatItem(this.scalingStat, data.stats),
                ], {percent: true, comment: 'reaction_bonus'}),
            );
        }

        if (this.reactionPenalty && this.reactionPenalty != 1) {
            parts.push(
                new CConst({value: this.reactionPenalty, percent: true, comment: 'reaction_penalty'})
            );
        }

        if (parts.length > 1) {
            return new CMulti(parts, {
                percent: true,
                comment: 'reaction_ratio',
            });
        }
        return parts[0];
    }

    /**
     * @param {BuildData} data
     * @returns {CItem}
     */
    getTreeLevelMultiplier(data) {
        return new CConst({
            value: this.reactionValue,
            comment: 'reaction_base',
        });
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getTree(data) {
        return new CMulti([
            this.getTreeLevelMultiplier(data),
            this.getTreeBonusMultiplier(data),
        ]);
    }
}
