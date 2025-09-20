export class DbObjectSubstat {
    constructor(data) {
        for (const key of Object.keys(data)) {
            this[key] = data[key];
        }
    }

    getPreciseValue(value, rarity) {
        let values = this.preciseValues[rarity-1];
        if (!value) return value;

        return values[value] || value;
    }
}
