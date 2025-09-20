export class BuildSettings {
    constructor(data) {
        Object.assign(this, data);
    }

    /**
     * @param {string} name
     * @param {string|number} value
     */
    set(name, value) {
        this[name] = value;
    }

    /**
     * @param {string} name
     * @returns {string|number}
     */
    get(name) {
        return this[name];
    }

    /**
     * @param {string} name
     * @returns {string|number}
     */
    getNumber(name) {
        return this[name] || 0;
    }

    /**
     * @param {BuildSettings} settings
     */
    concat() {
        for (let item of arguments) {
            Object.assign(this, item);
        }
    }

    /**
     * Get talent level with bonuses
     * @param {string} name
     * @returns {number}
     */
    getLevel(name) {
        return getSkillLevelByName(name, this);
    }
}

export function getSkillLevelByName(name, settings) {
    let result = settings[name] || 1;

    result += settings[name + '_bonus'] || 0;
    result += settings[name + '_bonus_2'] || 0;

    let match = /\w+_(char_skill_\w+)/.exec(name);
    if (match) {
        result += settings[match[1] +'_bonus_party'] || 0;
    }

    return result;
}
