import { CMultiplierAmplifying } from "../../../../Compile/Types/Block";
import { CConst } from "../../../../Compile/Types/Item";
import { FeatureMultiplierReactionVaporize } from "../Vaporize";

export class FeatureMultiplierReactionVaporizeReverse extends FeatureMultiplierReactionVaporize {
    getAmplyfyingMultiplier(data) {
        return new CMultiplierAmplifying([
            new CConst({value: 1.5, percent: 1, comment: 'reaction_vape_reverse'}),
        ])
    }
}
