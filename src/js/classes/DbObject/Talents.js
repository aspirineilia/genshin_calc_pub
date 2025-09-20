import { StatTable } from "../StatTable";

export class DbObjectTalents {
    constructor(data) {
        this.data = data;
        this.byId = buildList(data);
    }

    get(id) {
        return this.byId[id];
    }

    getList(id) {
        let result = this.get(id);
        return Array.isArray(result) ? result : [];
    }

    getAlias(id, alias) {
        let orig = this.get(id);

        if (!orig) {
            return orig;
        }

        if (Array.isArray(orig)) {
            let result = [];

            for (const item of orig) {
                result.push(new StatTable(alias, [].concat(item.values)));
            }

            return result;
        } else {
            return new StatTable(alias, [].concat(orig.values));
        }
    }

    getListAlias(id, alias) {
        let result = this.getAlias(id, alias);
        return Array.isArray(result) ? result : [];
    }

    getSum(data) {
        let from    = this.get(data.from);
        let isArray = Array.isArray(from);
        let add     = typeof data.add === 'object' ? data.add : this.get(data.add);
        let multi   = (data.multi || 1);
        let tables  = isArray ? from : [from];
        let result  = [];

        for (const t of tables) {
            let table = new StatTable(data.name, []);
            let max   = Math.max(t.values.length, add.values.length);

            for (let i = 1; i <= max; ++i) {
                table.values[i-1] = t.getValue(i) + add.getValue(i) * multi;
            }

            result.push(table);

            if (data.onlyFirst) {
                add = new StatTable('', [0])
            }
        }

        return isArray ? result : result[0];
    }

    getMulti(data) {
        let from    = this.get(data.from);
        let isArray = Array.isArray(from);
        let multi   = (data.multi || 1);
        let result  = [];
        let tables  = isArray ? from : [from];

        for (const t of tables) {
            result.push(
                new StatTable(data.name, t.getValues().map(function(val) {return val * multi}))
            );
        }

        return isArray ? result : result[0];
    }

    getDivide(data) {
        let from    = this.get(data.from);
        let isArray = Array.isArray(from);
        let multi   = (data.multi || 1);
        let result  = [];
        let tables  = isArray ? from : [from];

        for (const t of tables) {
            result.push(
                new StatTable(data.name, t.getValues().map(function(val) {return multi/val}))
            );
        }

        return isArray ? result : result[0];
    }

    getCategory(name) {
        return this.data[name];
    }
}

function buildList(data) {
    let result = {};

    for (const key of Object.keys(data)) {
        let items = data[key].items;

        if (Array.isArray(items)) {
            for (const item of items) {
                if (item.type && (item.type == 'hits' || item.type == 'separated' || item.type == 'multivalue')) {
                    for (let t of item.table) {
                        result[key +'.'+ t.getName()] = t;
                    }
                } else {
                    let table = Array.isArray(item.table) ? item.table[0] : item.table;
                    result[key +'.'+ table.getName()] = item.table;
                }
            }
        }
    }

    return result;
}
