import { ConditionDropdownElement } from "../Element";

const elements = ['cryo', 'electro', 'hydro', 'pyro', 'geo', 'anemo', 'dendro'];

export class ConditionDropdownElementInfusion extends ConditionDropdownElement {
    constructor(params) {
        super(params);

        let id = 0;
        this.params.values = [];

        for (let element of elements) {
            this.params.values.push({
                value: element,
                serializeId: ++id,
            });
        }
    }

    getDropdownItems(settings) {
        let result = [];
        let selected = this.getSelectedValue(settings);

        if (this.params.values) {
            for (const item of this.params.values) {
                if (!settings['allowed_infusion_'+ item.value]) {
                    if (selected == item.value) {
                        settings[this.getName()] = '';
                    }
                    continue;
                }

                result.push({
                    value: item.value,
                    icon: ' gi-stat-element-icon stat-'+ item.value,
                });
            }
        }

        return result;
    }

    isHidden(settings) {
        let anyElement = false;

        for (let element of elements) {
            if (settings['allowed_infusion_'+ element]) {
                anyElement = true;
                break;
            }
        }

        if (!anyElement) {
            return true;
        }

        return super.isHidden(settings);
    }
}
