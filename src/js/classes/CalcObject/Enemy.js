import {CalcObject} from '../CalcObject';
import {Stats} from '../Stats';

export class CalcObjectEnemy extends CalcObject {
    constructor() {
        super();
        this.levels = {
            level : 1,
        },
        this.resistances = {
            phys: 0,
            anemo: 0,
            cryo: 0,
            geo: 0,
            hydro: 0,
            pyro: 0,
            electro: 0,
            dendro: 0,
        };
    }

    setLevels(data) {
        this.levels.level = data.level;
    }

    setResistances(data) {
        for (const res of ['anemo', 'cryo', 'dendro', 'electro', 'geo', 'hydro', 'phys', 'pyro']) {
            this.resistances[res] = parseInt(data[res]) || 0;
        }
    }

    getResistances() {
        if (this.object) {
            return this.object.getResistances()
        }

        return this.resistances;
    }

    getStats() {
        return {
            stats: new Stats(),
            settings: {},
        }
    }

    getSettings() {
        let result = super.getSettings();

        let resistances = this.getResistances();

        result = Object.assign(result, {
            enemy_level: this.levels.level,
            enemy_res_phys: resistances.phys || 0,
            enemy_res_anemo: resistances.anemo || 0,
            enemy_res_cryo: resistances.cryo || 0,
            enemy_res_geo: resistances.geo || 0,
            enemy_res_hydro: resistances.hydro || 0,
            enemy_res_pyro: resistances.pyro || 0,
            enemy_res_electro: resistances.electro || 0,
            enemy_res_dendro: resistances.dendro || 0,
        });

        if (this.object) {
            result.enemy_type = this.object.type;
            result = Object.assign(result, this.object.getSettings());
        }

        return result;
    }

    getConditions() {
        let result = super.getConditions();

        result = result.concat(DB.Conditions.Enemy);

        return result;
    }

    serialize(settings) {
        let result = [];

        result.push(this.levels.level);

        if (this.object) {
            result.push(2) // 2 - mob DB

            result.push(this.object.getId());
        } else {
            result.push(1) // 1 -raw resists

            result.push(this.resistances.anemo+100);
            result.push(this.resistances.cryo+100);
            result.push(this.resistances.dendro+100);
            result.push(this.resistances.electro+100);
            result.push(this.resistances.geo+100);
            result.push(this.resistances.hydro+100);
            result.push(this.resistances.phys+100);
            result.push(this.resistances.pyro+100);
        }

        let condData = this.serializeConditions(settings);
        return result.concat(condData);
    }

    static deserialize(input) {
        let level = input.shift();
        if (level < 1 || level > 110) return null;

        let type = input.shift();
        let result = new CalcObjectEnemy();
        result.setLevels({level: level});

        if (type == 1) {
            let resists = {};

            for (const res of ['anemo', 'cryo', 'dendro', 'electro', 'geo', 'hydro', 'phys', 'pyro']) {
                let value = input.shift() - 100;
                if (value < -100 || value > 1000) return null;

                resists[res] = value;
            }

            result.setResistances(resists);
        } else if (type == 2) {
            let enemy = DB.Enemies.getById(input.shift());
            if (!enemy) return null;

            result.set(enemy);
        } else {
            return null;
        }

        let settings = result.deserializeConditions(input);
        if (!settings) return null

        result.setSettings(settings);

        return result;
    }
}
