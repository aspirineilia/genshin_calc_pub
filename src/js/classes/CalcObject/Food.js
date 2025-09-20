import { CalcObject } from "../CalcObject";
import { Stats } from "../Stats";

export const foodTypes = ['Attack', 'Defence', 'Potion'];

export class CalcObjectFood extends CalcObject {
    constructor() {
        super();
        this.food = {
            Attack:  {item: null, level: 0},
            Defence: {item: null, level: 0},
            Potion:  {item: null, level: 0},
        };
    }

    get(type) {
        let i = this.food[type];

        if (i.item) {
            return i.item;
        }

        return;
    }

    getLevel(type) {
        let i = this.food[type];

        if (i.item) {
            return i.level;
        }

        return 0;
    }

    set(type, data, level) {
        this.food[type] = {
            item: data,
            level: level,
        };
    }

    isBeta() {
        return false;
    }

    getSettings() {
        return {};
    }

    getStats(settings) {
        let result = {
            stats: new Stats(),
            settings: {},
        };

        for (let i = 0; i < foodTypes.length; ++i) {
            const type = foodTypes[i];
            let it = this.food[type];

            if (it.item) {
                result.stats.concat(it.item.getStats(it.level));
            }
        }

        return result;
    }

    getConditions() {
        return [];
    }

    getPostEffects() {
        return [];
    }

    serialize() {
        let result = [];
        let count = 0;

        for (let i = 0; i < foodTypes.length; ++i) {
            const type = foodTypes[i];
            ++count;

            let data = this.food[type];

            if (data.item) {
                result.push(data.item.getId());
                result.push(data.level);
            } else {
                result.push(0);
            }
        }

        result.unshift(count);

        return result;
    }

    static deserialize(input) {
        let result = new CalcObjectFood();

        let count = input.shift();

        for (let i = 0; i < count; ++i) {
            let type  = foodTypes[i];
            if (!type) return null;

            let id    = input.shift();
            let level = 0;

            let item = DB.Food.get(type).getById(id);

            if (id > 0) {
                level = input.shift();
            }

            if (item) {
                result.food[type] = {
                    item: item,
                    level: level,
                };
            }
        }

        return result;
    }
}
