import {CalcObject} from "../CalcObject";
import { StatTable } from "../StatTable";

export const SKILL_LEVELS = new StatTable('', [1, 2, 4, 6, 8, 10])

export class CalcObjectCharacter extends CalcObject {
    constructor() {
        super();
        this.levels = {
            level: 1,
            ascension: 0,
            constellation: 0,
        };
        this.skills = {
            attack: 1,
            elemental: 1,
            burst: 1,
        };
    }

    setLevels(data) {
        this.levels.level = data.level;
        this.levels.ascension = data.ascension;
        this.levels.constellation = data.constellation;
    }

    getLevels() {
        return {
            level: this.levels.level,
            ascension: this.levels.ascension,
            constellation: this.levels.constellation,
        };
    }

    setSkills(data) {
        this.skills.attack = data.attack;
        this.skills.elemental = data.elemental;
        this.skills.burst = data.burst;
    }

    getId() {
        if (this.object) {
            return this.object.getId();
        }

        return 0;
    }

    getName() {
        if (this.object) {
            return this.object.getName();
        }

        return '';
    }

    getSkills() {
        return {
            attack: this.skills.attack,
            elemental: this.skills.elemental,
            burst: this.skills.burst,
        };
    }

    getConditions() {
        let result = super.getConditions();

        if (!this.object) {
            return result;
        }

        let c = this.object.constellation;
        if (c) {
            result = result.concat(c.getConditions(this.levels.constellation));
        }

        result = result.concat(DB.Conditions.Character);

        return result;
    }

    getFeatures() {
        let result = super.getFeatures();

        if (!this.object) {
            return result;
        }

        let c = this.getConstellation();
        if (c) {
            result = result.concat(c.getFeatures(this.levels.constellation));
        }

        return result;
    }

    getSettings() {
        let result = super.getSettings();
        let maxSkillLevel = SKILL_LEVELS.getValue(this.levels.ascension || 1);

        let charSettings = {
            char_skill_attack: Math.min(maxSkillLevel, this.skills.attack),
            char_skill_elemental: Math.min(maxSkillLevel, this.skills.elemental),
            char_skill_burst: Math.min(maxSkillLevel, this.skills.burst),
            char_level: this.levels.level,
            char_ascension: this.levels.ascension,
            char_constellation: this.levels.constellation,
        };

        if (this.object) {
            charSettings.char_id = this.object.getId();
            charSettings.char_name = this.object.name;
            charSettings.char_element = this.object.element;
            charSettings.char_origin = this.object.origin;
        }

        result = Object.assign(result, charSettings);

        return result;
    }

    getConstellation() {
        return this.object.constellation;
    }

    getElement() {
        return (this.object && this.object.getElement()) || '';
    }

    getWeaponType() {
        return (this.object && this.object.getWeapon()) || '';
    }

    serialize(settings) {
        let result = [];

        if (!this.object) {
            return null;
        }

        result.push(this.object.getId())
        result.push(this.levels.level, this.levels.ascension, this.levels.constellation);
        result.push(this.skills.attack, this.skills.elemental, this.skills.burst);

        let condData = this.serializeConditions(settings);

        return result.concat(condData);
    }

    static deserialize(input) {
        let char = DB.Chars.getById(input.shift());
        if (!char) return null;

        let level = input.shift();
        if (level < 1 || level > 90) return null;

        let ascension = input.shift();
        if (ascension < 0 || ascension > 6) return null;

        let constellation = input.shift();
        if (constellation < 0 || constellation > 6) return null;

        let attack = input.shift();
        if (attack < 1 || attack > 10) return null;

        let elemental = input.shift();
        if (elemental < 1 || elemental > 10) return null;

        let burst = input.shift();
        if (burst < 1 || burst > 10) return null;

        let result = new CalcObjectCharacter();
        result.set(char);

        result.setLevels({
            level: level,
            ascension: ascension,
            constellation: constellation,
        });
        result.setSkills({
            attack: attack,
            elemental: elemental,
            burst: burst,
        });

        let settings = result.deserializeConditions(input);
        if (!settings) return null

        result.setSettings(settings);

        return result;
    }
}
