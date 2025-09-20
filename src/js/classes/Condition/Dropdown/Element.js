import { ConditionDropdown } from "../Dropdown";

export class ConditionDropdownElement extends ConditionDropdown {
    getDropdownItems(settings) {
        let result = [];

        if (this.params.values) {
            for (const item of this.params.values) {
                result.push({
                    value: item.value,
                    icon: ' gi-stat-element-icon stat-'+ item.value,
                });
            }
        }

        return result;
    }

    getAllConditionsOn() {
        if (!this.params.multiple) {
            return {};
        }

        let values = [];
        for (const item of this.params.values) {
            values.push(item.value);
        }

        return {
            [this.getName()]: values.join(';'),
        }
    }
}
