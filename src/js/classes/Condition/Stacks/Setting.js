import { ConditionStacks } from "../Stacks"

export class ConditionStacksSetting extends ConditionStacks {
    getType() {
        return 'static';
    }

    getStats(settings, stacksCnt) {
        let result = super.getStats(settings, stacksCnt);
        result.add(this.params.name, settings[this.params.name] || 0.001);
        return result;
    }
}
