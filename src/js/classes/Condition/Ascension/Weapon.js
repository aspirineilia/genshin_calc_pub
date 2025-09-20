import {ConditionAscension} from "../Ascension";

export class ConditionAscensionWeapon extends ConditionAscension {
    ascensionValue(settings) {
        return settings.weapon_ascension || 0;
    }
}
