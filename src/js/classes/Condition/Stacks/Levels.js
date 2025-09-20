import { ConditionStacks } from "../Stacks"

export class ConditionStacksLevels extends ConditionStacks {
    getStats(settings, stacksCnt) {
        let result = super.getStats(settings, stacksCnt);

        if (stacksCnt) {
            let real = this.params.realStats;
            result.add(real.getName(), real.getValue(stacksCnt));
        }

        return result;
    }
}
