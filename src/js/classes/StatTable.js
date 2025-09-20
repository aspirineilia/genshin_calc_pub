export class StatTable {
    constructor(stat, values) {
        this.stat = stat;
        this.values = values;
    }

    getName() {
        return this.stat;
    }

    getValue(level) {
        if (level > 0) {
            if (level > this.values.length) {
                level = this.values.length;
            }
            return this.values[level - 1];
        }

        return 0;
    }

    getValues() {
        return this.values;
    }

    multiply(multi) {
        let new_values = [];

        for (let val of this.values) {
            new_values.push(val * multi);
        }

        return new StatTable(this.stat, new_values)
    }
}
