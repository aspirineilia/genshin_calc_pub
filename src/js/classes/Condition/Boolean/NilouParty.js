import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanNilouParty extends ConditionBoolean {
    isActive(settings) {
        let result = this.checkSubconditions(settings);
        if (!result) {
            return false;
        }

        let hasHydro = false;
        let hasDendro = false;
        let hasOther = false;

        for (const name of ['char_element', 'resonance_element_1', 'resonance_element_2', 'resonance_element_3']) {
            const element = settings[name] || '';
            if (!element) continue;

            if (element == 'dendro') {
                hasDendro = true;
            } else if (element == 'hydro') {
                hasHydro = true;
            } else {
                hasOther = true;
            }
        }

        return hasHydro && hasDendro && !hasOther;
    }
}
