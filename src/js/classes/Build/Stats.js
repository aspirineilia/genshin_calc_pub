export class BuildStats {
    constructor(data) {
        Object.assign(this, data);
    }

    /**
     * @param {string} stat
     * @param {number} value
     */
    add(stat, value) {
        this[stat] = (this[stat] || 0) + value;
    }

    /**
     * @param {string} stat
     * @returns {number}
     */
    get(stat) {
        return this[stat] || 0;
    }

    /**
     * @param {string} stat
     * @returns {boolean}
     */
    isSet(stat) {
        return this.hasOwnProperty(stat);
    }

    /**
     * @param {string} stat
     * @returns {number}
     */
    getTotal(stat) {
        return this.get(stat + '_base') * (1 + this.get(stat + '_percent') / 100) + this.get(stat);
    }

    /**
     * @param {string} stat
     * @returns {number}
     */
    getTotalPercent(stat) {
        return this.get(stat + '_base') * (1 + this.get(stat + '_percent')) + this.get(stat);
    }

    /**
     * @param {BuildStats} stats
     */
    merge(stats) {
        for (let name of Object.keys(stats)) {
            this[name] = (this[name] || 0) + stats[name];
        }
    }

    /**
     * @param {Array.<string>} stats
     */
    truncate(stats) {
        for (let name of Object.keys(this)) {
            if (!stats.includes(name)) {
                delete this[name];
            }
        }
    }

    /**
     * @param {Array.<string>} stats
     */
    ensure(stats) {
        for (let name of stats) {
            this[name] ||= 0;
        }
    }

    processPercent() {
        for (let name of Object.keys(this)) {
            if (this.isPercent(name)) {
                this[name] = this[name] / 100;
            }
        }
    }

    isPercent(stat) {
        if (stat.match(/_percent/)) {
            return true;
        }

        if (stat.match(/^(stamina|recovery|duration|atk_speed|move_speed|healing|recharge|crit_rate|crit_dmg|dmg_|enemy_|res_|bonus_|.*shield)/)) {
            return true;
        }

        return false;
    }
}
