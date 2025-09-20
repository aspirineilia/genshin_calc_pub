import { BuildData } from "../../../../Build/Data";
import { CConst } from "../../../Compile/Types/Item";
import { CMultiplierAmplifying } from "../../../Compile/Types/Block";
import { FeatureReactionLunarCharged } from "./Charged";

export class FeatureReactionLunarChargedLike extends FeatureReactionLunarCharged {
    constructor(params) {
        params.damageType ||= 'lunardirect';
        params.cannotReact = true;
        super(params);
    }

    /**
     * @param {BuildData} data
     * @returns {Array.<CBlock>}
     */
    getMultiplierReaction(data) {
        let result = super.getMultiplierReaction(data);
        result.push(
            new CMultiplierAmplifying([new CConst({value: 3, comment: 'lunarcharged', percent: true})]),
        );
        return result;
    }

    /**
     * @param {BuildData} data
     * @returns {CBlock}
     */
    getReactionBaseMultipliers(data) {
        return this.getMultipliers(data);
    }
}
