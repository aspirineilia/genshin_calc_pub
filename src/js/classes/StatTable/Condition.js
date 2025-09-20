import { StatTable } from "../StatTable";

export class StatTableConditions extends StatTable {
    constructor(stat, values, conditions) {
        super(stat, values);
        this.conditions = conditions;
    }

    isActive(settings) {
        if (this.conditions) {
            for (const cond of this.conditions) {
                if (!cond.isActive(settings)) {
                    return false;
                }
            }
        }

        return true;
    }
}
