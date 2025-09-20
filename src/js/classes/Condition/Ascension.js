import {Condition} from "../Condition";

export class ConditionAscension extends Condition {
    ascensionValue(settings) {
        return 0;
    }

    isActive(settings) {
        let result = super.isActive(settings);

        if (!this.params.ascension) {
            result = false;
        }

        return result && (this.ascensionValue(settings) >= this.params.ascension ? true : false);
    }
}
