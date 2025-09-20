import { CBlock } from "../../Compile/Types";
import { CMultiplierCustom } from "../../Compile/Types/Block";
import { CConst } from "../../Compile/Types/Item";
import { FeatureDamageNormal } from "../Normal";

export class FeatureDamageNormalMualani extends FeatureDamageNormal {
    /**
     * @param {BuildData} data
     * @returns {Array.<CBlock>}
     */
    getReactionMultipliers(data) {
        let items = super.getReactionMultipliers(data);

        let bytesCnt = data.settings.mualani_byte_targets;
        if (bytesCnt > 1) {
            let ratio;
            if (bytesCnt >= 3) {
                ratio = 0.72;
            } else if (bytesCnt >= 2) {
                ratio = 0.86;
            }

            items.push(
                new CMultiplierCustom([
                    new CConst({value: ratio, percent: true, comment: 'talent_elemental'}),
                ]),
            );
        }

        return items;
    }
}
