import { CMultiplierAmplifying } from "../../../../Compile/Types/Block";
import { CConst } from "../../../../Compile/Types/Item";
import { FeatureMultiplierReactionMelt } from "../Melt";

export class FeatureMultiplierReactionMeltForvard extends FeatureMultiplierReactionMelt {
    getAmplyfyingMultiplier(data) {
        return new CMultiplierAmplifying([
            new CConst({value: 2, percent: 1, comment: 'reaction_melt_forvard'}),
        ]);
    }
}
