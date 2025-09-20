import {CalcObject} from "../CalcObject";

export class CalcObjectWeapon extends CalcObject {
    constructor() {
        super();
        this.levels = {
            level: 1,
            ascension: 0,
            refine: 1,
        };
    }

    setLevels(data) {
        this.levels.level = data.level;
        this.levels.ascension = data.ascension;
        this.levels.refine = Math.min(5, Math.max(1, data.refine));
    }

    getStats() {
        var result = super.getStats();

        if (this.object && this.object.refineTable) {
            for (let stat of this.object.refineTable) {
                result.stats.add(stat.getName(), stat.getValue(this.levels.refine));
            }
        }

        return result;
    }

    getSettings() {
        let result = super.getSettings();

        let weaponSettings = {
            weapon_level: this.levels.level,
            weapon_ascension: this.levels.ascension,
            weapon_refine: this.levels.refine,
        };

        if (this.object) {
            weaponSettings.weapon_id = this.object.getId();
            weaponSettings.weapon_type = this.object.weapon;
        }

        result = Object.assign(result, weaponSettings);

        return result;
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

    getConditions() {
        let result = super.getConditions();
        result = result.concat(DB.Conditions.Weapon);
        return result;
    }

    serialize(settings) {
        let result = [];

        if (!this.object) {
            return null;
        }

        result.push(this.object.getId())
        result.push(this.levels.level, this.levels.ascension, this.levels.refine);

        let condData = this.serializeConditions(settings);

        return result.concat(condData);
    }

    static deserialize(input) {
        let weapon = DB.Weapons.getById(input.shift());
        if (!weapon) return null;

        let level = input.shift();
        if (level < 1 || level > 90) return null;

        let ascension = input.shift();
        if (ascension < 0 || ascension > 6) return null;

        let refine = input.shift();
        if (refine < 0 || refine > 5) return null;

        let result = new CalcObjectWeapon();
        result.set(weapon);

        result.setLevels({
            level: level,
            ascension: ascension,
            refine: refine || 1,
        });

        let settings = result.deserializeConditions(input);
        if (!settings) return null

        result.setSettings(settings);

        return result;
    }
}
