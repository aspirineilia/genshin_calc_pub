import { getSkillLevelByName } from "./Build/Settings";
import {Stats} from "./Stats";

export class Condition {
    constructor(params) {
        this.params = params || {};
        this.entityId = 0;
    }

    getId() {
        return this.params.serializeId || 0;
    }

    getEntityId() {
        return this.entityId;
    }

    getName() {
        return this.params.name;
    }

    getNamesList() {
        return [this.getName()];
    }

    getType() {
        return '';
    }

    getTitle(stats) {
        if (!this.params.title) {
            return '';
        }

        return UI.Lang.getTalent(this.params.title, stats);
    }

    getIcon() {
        if (this.params.icon) {
            return this.params.icon.name;
        }
        return '';
    }

    getDescription(stats) {
        if (!this.params.description) {
            return '';
        }

        return UI.Lang.getTalent(this.params.description, stats);
    }

    getInfo() {
        return this.params.info;
    }

    getLevel(settings) {
        return getSkillLevelByName(this.params.levelSetting, settings);
    }

    isHidden(settings) {
        if (this.params.isHidden) {
            return true;
        }

        let subcond = this.params.hideCondition;
        if (subcond) {
            for (let i = 0; i < subcond.length; ++i) {
                const cond = subcond[i];

                if (cond.isActive(settings)) {
                    return true;
                }
            }
        }

        return false;
    }

    isActive(settings) {
        return this.checkSubconditions(settings);
    }

    isSerializable() {
        let name = this.getName();
        let type = this.getType();

        if (!name && !type || type == 'static') {
            return false;
        }

        return true;
    }

    getMaxStacks(settings) {
        return this.params.maxStacks || 0;
    }

    checkSubconditions(settings) {
        if (this.params.condition) {
            return this.params.condition.isActive(settings);
        } else {
            // deprecated
            let subcond = this.params.subConditions;
            if (subcond) {
                for (let i = 0; i < subcond.length; ++i) {
                    const cond = subcond[i];
                    if (!cond.isActive(settings)) {
                        return false;
                    }
                }
            }
        }

        return true;
    }

    getData(settings) {
        let result = {
            settings: {},
        };

        if (this.isActive(settings)) {
            result.settings = this.params.settings || {};
            result.stats = this.getStats(settings);
        } else {
            result.stats = new Stats();
        }

        return result;
    }

    getStats(settings) {
        return new Stats(this.params.stats || {});
    }

    getBuffRotationSection(settings) {
        return this.params.rotation || '';
    }

    static allConditionsOn(conditions, buildSettings) {
        let settings = {};

        for (let i = 0; i < conditions.length; ++i) {
            const cond = conditions[i];

            let type = cond.getType();
            if (type == 'stacks') {
                settings[cond.getName()] = cond.getMaxStacks();
            } else if (type == 'checkbox') {
                settings[cond.getName()] = true;
            } else if (type == 'dropdown') {
                settings[cond.getName()] = cond.params.suggesterValue || 0;
            } else if (cond.getAllConditionsOn) {
                Object.assign(settings, cond.getAllConditionsOn(buildSettings));
            }
        }

        return settings;
    }

    static allConditionsOff(conditions) {
        let settings = {};

        for (let i = 0; i < conditions.length; ++i) {
            const cond = conditions[i];

            let type = cond.getType();
            if (type == 'stacks') {
                settings[cond.getName()] = 0;
            } else if (type == 'checkbox') {
                settings[cond.getName()] = false;
            }
        }

        return settings;
    }

    static setCommonValues(settings, conditions) {
        let result = {};

        for (let i = 0; i < conditions.length; ++i) {
            const name = conditions[i].getName();

            if (/^common\./.test(name)) {
                settings[name] ||= 0;
                result[name] = settings[name];
            }
        }

        return result;
    }

    static unwrap(items, settings) {
        let result = [];

        for (let item of items) {
            if (item.getCondtitionList) {
                for (let subItem of item.getCondtitionList()) {
                    if (!settings || subItem.isActive(settings)) {
                        result.push(subItem);
                    }
                }
            } else {
                result.push(item);
            }
        }

        return result;
    }
}
