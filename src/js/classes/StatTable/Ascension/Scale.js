import { StatTable } from '../../StatTable.js';

export class StatTableAscensionScale extends StatTable {
    constructor(data) {
        super(data.stat, []);

        this.baseValue = data.base;
        this.ascensionTable = data.ascension;
        this.levelScaling = data.scale;
    }

    getValue(level, ascensionLevel) {
        let value  = this.baseValue;
        level ||= 1;

        if (this.levelScaling) {
            value *= this.levelScaling.getValue(level);
        }

        value += this.getAsensionValue(ascensionLevel);

        return value;
    }

    getAsensionValue(level) {
        if (this.ascensionTable) {
            return this.ascensionTable.getValue(level);
        }

        return 0;
    }

    getLevels() {
        return [];
    }
}
