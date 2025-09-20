import { Stats } from "../../Stats";
import { ConditionBoolean } from "../Boolean";

export class ConditionBooleanYunJin extends ConditionBoolean {
    getData(settings) {
        let result = super.getData(settings);

        if (this.isActive(settings)) {
            result.settings.yunjin_traditionalist_stacks = settings.party_elements_count_level;
        }

        return result;
    }

    getStats(settings) {
        return new Stats({
            yunjin_traditionalist_stacks: settings.party_elements_count_level || 1,
        });
    }
}
