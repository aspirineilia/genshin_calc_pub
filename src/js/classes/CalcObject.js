import { Stats } from "./Stats";
import { Condition } from "./Condition";

export class CalcObject {
    constructor() {
        this.object = null;
        this.settings = {};
    }

    getName() {
        return (this.object && this.object.getName()) || '';
    }

    getIcon() {
        return (this.object && this.object.getIcon()) || '';
    }

    getRarity() {
        return (this.object && this.object.getRarity()) || 1;
    }

    set(data) {
        this.object = data;
        this.removeInvalidSettings();
    }

    get() {
        return this.object;
    }

    getConditions() {
        return (this.object && this.object.getConditions()) || [];
    }

    getFeatures() {
        return (this.object && this.object.getFeatures()) || [];
    }

    getPostEffects() {
        return (this.object && this.object.getPostEffects()) || [];
    }

    getMultipliers() {
        return (this.object && this.object.getMultipliers()) || [];
    }

    getSettings() {
        return Object.assign({}, this.settings);
    }

    getLevels() {
        return this.levels;
    }

    getStats() {
        var result = new Stats();

        if (this.object && this.object.statTable) {
            for (let i = 0; i < this.object.statTable.length; ++i) {
                let stat = this.object.statTable[i];
                let value = stat.getValue(this.levels.level, this.levels.ascension);

                result.add(stat.getName(), value);
            }
        }

        return {
            stats: result,
            settings: {},
        }
    }

    setSettings(data) {
        this.settings = data;
    }

    modifySettings(data) {
        Object.assign(this.settings, data);
        return this.getSettings();
    }

    addSettings(data) {
        this.settings = Object.assign(this.settings, data);
    }

    isBeta() {
        return this.object && this.object.isBeta();
    }

    serialize() {
        return [];
    }

    removeInvalidSettings() {
        let conditions = this.getConditions();
        let allSettings = Condition.allConditionsOn(conditions);

        for (const key of Object.keys(this.settings)) {
            if (allSettings[key] === undefined) {
                delete this.settings[key];
            }
        }
    }

    serializeConditions(settings, items) {
        let count = 0;
        let result = [];

        let conditions = [];

        if (items) {
            for (const cond of Condition.unwrap(items, settings)) {
                if (cond.isActive(settings)) {
                    conditions.push(cond);
                }
            }
        } else {
            for (const cond of Condition.unwrap(this.getConditions({serialize: true}), settings)) {
                if (cond.isActive(settings)) {
                    conditions.push(cond);
                }
            }
        }

        for (const cond of conditions) {
            if (!cond.params.serializeId) {
                continue;
            }

            let type = cond.getType();

            if (type == 'checkbox') {
                ++count;
                result.push(cond.params.serializeId);
            } else if (type == 'stacks') {
                ++count;
                result.push(cond.params.serializeId);
                result.push(settings[cond.getName()]);
            } else if (type == 'number') {
                ++count;
                result.push(cond.params.serializeId);
                let value = settings[cond.getName()] || 0;

                if (cond.params.format == 'decimal') {
                    value = Math.floor(parseFloat(value) * 10);
                } else {
                    value = parseInt(value);
                }

                result.push(Math.max(0, value));
            } else if (type == 'dropdown' || type == 'dropdown_multiple') {
                let value = cond.getSelectedId(settings);
                if (value) {
                    ++count;
                    result.push(cond.params.serializeId);
                    result.push(value);
                }
            } else if (type == 'char') {
                let charResult = this.serializeChars(settings);
                if (charResult.length) {
                    ++count;
                    result.push(cond.params.serializeId);
                    result = result.concat(charResult);
                }
            } else if (type == 'custom_buffs') {
                let buffsResult = this.serializeCustomBuffs(settings);
                if (buffsResult.length) {
                    ++count;
                    result.push(cond.params.serializeId);
                    result = result.concat(buffsResult);
                }
            }
        }

        result.unshift(count);

        return result;
    }

    serializeChars(settings) {
        return [];
    }

    serializeCustomBuffs(settings) {
        return []
    }

    deserializeChars(input) {
        return {};
    }

    deserializeCustomBuffs(input) {
        return {};
    }

    deserializeConditions(input, items) {
        let result = {};
        let count = input.shift();
        let match = {};

        if (items) {
            for (const cond of Condition.unwrap(items)) {
                if (cond.params.serializeId) {
                    match[cond.params.serializeId] = cond;
                }
            }
        } else {
            for (const cond of Condition.unwrap(this.getConditions({serialize: true}))) {
                if (cond.params.serializeId) {
                    match[cond.params.serializeId] = cond;
                }
            }
        }

        for (let i = 1; i <= count; ++i) {
            let id = input.shift();
            if (i < 1) return;

            let cond = match[id];
            if (!cond) return;

            let type = cond.getType();

            if (type == 'checkbox') {
                result[cond.getName()] = true;
            } else if (type == 'stacks') {
                let value = input.shift();

                if (value > cond.params.maxStack) {
                    value = cond.params.maxStack;
                }

                result[cond.getName()] = value;
            } else if (type == 'number') {
                let value = input.shift();

                if (cond.params.format == 'decimal') {
                    value = (value / 10).toFixed(1);
                }

                result[cond.getName()] = value;
            } else if (type == 'dropdown' || type == 'dropdown_multiple') {
                let value = cond.getValueById(input.shift());
                result[cond.getName()] = value || '';
            } else if (type == 'char') {
                result = Object.assign(result, this.deserializeChars(input));
            } else if (type == 'custom_buffs') {
                result = Object.assign(result, this.deserializeCustomBuffs(input));
            }
        }

        return result;
    }
}
