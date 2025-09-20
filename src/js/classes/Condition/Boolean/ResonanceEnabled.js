import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanResonanceEnabled extends ConditionBoolean {
    getType() {
        return '';
    }

    isActive(settings) {
        let result = true;
        if (settings['buffs.only_full_party_resonance'] && settings.party_size < 4) {
            result = false;
        }
        return this.params.invert ? !result : result;
    }
}
