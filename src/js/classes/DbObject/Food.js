import { Stats } from "../Stats";

export class DbObjectFood {
    constructor(data) {
        this.rarity = data.rarity || 1;
        this.items = data.items || [];
        this.stats = data.stats || [];
        this.serializeId = data.serializeId || 0;
        this.special = data.special || null;
        this.hideQuality = data.hideQuality;
        this.noCommon = data.noCommon;
    }

    getName() {
        let first = this.items[0];

        if (first) {
            return 'food_name.'+ first.name;
        }

        return '';
    }

    getSpecialName() {
        if (this.special) {
            return 'food_name.'+ this.special.name;
        }

        return '';
    }

    getSpecialChar() {
        if (this.special) {
            return this.special.char;
        }

        return '';
    }

    getPrefix() {
        let first = this.items[0];

        if (first) {
            return first.prefix || 'n';
        }

        return 'n';
    }

    getSpecialPrefix() {
        if (this.special) {
            return this.special.prefix || 'n';
        }

        return 'n';
    }

    getIcon() {
        let first = this.items[0];

        if (first) {
            return first.icon;
        }

        return '';
    }

    getSpecialIcon() {
        if (this.special) {
            return this.special.icon;
        }

        return '';
    }

    getRarity() {
        return this.rarity;
    }

    getId() {
        return this.serializeId;
    }

    hasCommon() {
        return !this.noCommon;
    }

    hasSpecial() {
        return !!this.special;
    }

    hasQuality() {
        return !this.hideQuality;
    }

    getStats(level) {
        let stats = new Stats();

        for (let i = 0; i < this.stats.length; ++i) {
            const data = this.stats[i];
            let value  = data.getValue(level);

            if (value) {
                stats.add(data.getName(), value);
            }
        }

        return stats;
    }
}
