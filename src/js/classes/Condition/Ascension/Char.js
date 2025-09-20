import {ConditionAscension} from "../Ascension";

export class ConditionAscensionChar extends ConditionAscension {
    ascensionValue(settings) {
        return settings.char_ascension || 0;
    }
}
