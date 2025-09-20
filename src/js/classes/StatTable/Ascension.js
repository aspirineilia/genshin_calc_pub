import {StatTable} from '../StatTable.js'

export class StatTableAscension extends StatTable {
	constructor(stat, values, ascensionValues) {
		super(stat, values)
		this.ascensionValues = ascensionValues;
	}

	getValue(level, ascensionLevel) {
		let value  = this.values[0];
		let levels = this.getLevels();
		let size   = Math.min(levels.length, this.values.length);

		for (let i = size - 1; i >= 0; --i) {
			let curLevel = levels[i];
			if (level == curLevel) {
				value = this.values[i];
				break;
			} else if (level > curLevel && this.values.length > i + 1) {
				value = this.values[i] + Math.floor(
					(level - curLevel) * (this.values[i + 1] - this.values[i]) / (levels[i + 1] - curLevel)
				);
				break;
			}
		}

		value += this.getAsensionValue(ascensionLevel);

		return value;
	}

	getAsensionValue(level) {
		if (level > 0 && level <= this.ascensionValues.length) {
			return this.ascensionValues[level-1];
		}

		return 0;
	}

	getLevels() {
		return [];
	}
}
