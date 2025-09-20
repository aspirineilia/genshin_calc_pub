import { ConditionDropdownElement } from "../Element";

const elements = ['cryo', 'electro', 'hydro', 'pyro', 'geo', 'anemo', 'dendro'];

export class ConditionDropdownElementWanderer extends ConditionDropdownElement {
    getLimit(settings) {
        let result = super.getLimit(settings);

        if (settings.char_constellation >= 4) {
            result += 1;
        }

        return result;
    }
}
