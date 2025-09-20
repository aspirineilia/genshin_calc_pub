import { CMultiplierAmplifying } from "../../../../Compile/Types/Block";
import { CConst } from "../../../../Compile/Types/Item";
import { FeatureMultiplierReactionVaporize } from "../Vaporize";

export class FeatureMultiplierReactionVaporizeForvard extends FeatureMultiplierReactionVaporize {
    getAmplyfyingMultiplier(data) {
        return new CMultiplierAmplifying([
            new CConst({value: 2, percent: 1, comment: 'reaction_vape_forvard'}),
        ]);
    }
}
