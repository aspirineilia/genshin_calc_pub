import { Stats } from "./Stats";

export const PRIORITIES = {
    DEFAULT: 2,
    PRE_STATS: 1,
    SET_BONUS: 1,
    STAT_LOCAL: 2,
    STAT_GLOBAL: 3,
    STAT_DMG_BONUS: 4,
};

export class PostEffect {
    constructor(params) {
        this.params = params;
    }

    isActive(settings) {
        if (this.params.condition) {
            return this.params.condition.isActive(settings);
        } else {
            // deprecated
            let conditions = this.params.conditions;

            if (conditions) {
                for (let i = 0; i < conditions.length; ++i) {
                    const cond = conditions[i];
                    if (!cond.isActive(settings)) {
                        return false;
                    }
                }
            }

            return true;
        }
    }

    getPriority() {
        return this.params.priority || (this.isGlobal() ? PRIORITIES.STAT_GLOBAL : PRIORITIES.STAT_LOCAL);
    }

    isGlobal() {
        return this.params.global;
    }

    getLevel(settings) {
        let settingName = this.params.levelSetting;
        let result = settings[settingName] || 1;
        if (this.params.maxLevelSetting > 1) {
            result = Math.min(result, this.params.maxLevelSetting);
        }
        result += settings[settingName +'_bonus'] || 0;
        result += settings[settingName +'_bonus_2'] || 0;

        return result;
    }
}
