export class Stats {
    constructor(data) {
        if (data) {
            for (let stat of Object.keys(data)) {
                this[stat] = data[stat];
            }
        }
    }

    add(stat, value) {
        this[stat] = (this[stat] || 0) + value;
    }

    set(stat, value) {
        this[stat] = value;
    }

    get(stat) {
        return this[stat] || 0;
    }

    del(stat) {
        delete this[stat];
    }

    isSet(stat) {
        return this.hasOwnProperty(stat);
    }

    getTotal(stat) {
        let base    = this.get(stat +'_base');
        let bonus   = this.get(stat);
        let percent = this.get(stat +'_percent');

        if (percent && base)  {
            bonus += base * (percent / 100);
        }

        return base + bonus;
    }

    getTotalPercent(stat) {
        return this.get(stat + '_base') * (1 + this.get(stat + '_percent')) + this.get(stat);
    }

    getBaseBonus(dmgType) {
        let result = this.get('base_dmg_bonus_'+ dmgType);

        let bonus = this.get(dmgType + '_base_atk_percent');
        if (bonus) {
            result += this.getTotal('atk') * bonus / 100;
        }

        bonus = this.get(dmgType + '_base_def_percent');
        if (bonus) {
            result += this.getTotal('def') * bonus / 100;
        }

        bonus = this.get(dmgType + '_base_hp_percent');
        if (bonus) {
            result += this.getTotal('hp') * bonus / 100;
        }

        bonus = this.get(dmgType + '_base_mastery_percent');
        if (bonus) {
            result += this.getTotal('mastery') * bonus / 100;
        }

        return result;
    }

    isEmpty() {
        return Object.keys(this).length == 0;
    }

    concat(data) {
        for (let stat of Object.keys(data)) {
            this[stat] = (this[stat] || 0) + data[stat];
        }
    }

    getSetFunc() {
        let code = [];
        for (let stat of Object.keys(this)) {
            code.push(`stats.${stat} = ${this[stat]}`);
        }
        return Function('stats', code.join(';'))
    }

    getConcatFunc(setStats) {
        let code = [];
        for (let stat of Object.keys(this)) {
            code.push(`stats.${stat} += ${this[stat]}`);
        }

        if (setStats) {
            for (let stat of Object.keys(setStats)) {
                code.push(`stats.${stat} = ${setStats[stat]}`);
            }
        }

        return Function('stats', code.join(';'))
    }

    truncate(stats) {
        for (let name of Object.keys(this)) {
            if (!stats.includes(name)) {
                delete this[name];
            }
        }
    }

    ensure(stats) {
        for (let name of stats) {
            this[name] ||= 0;
        }
    }

    processPercent() {
        for (let name of Object.keys(this)) {
            if (isPercent(name)) {
                this[name] = this[name] / 100;
            }
        }
    }

    revertPercent() {
        for (let name of Object.keys(this)) {
            if (isPercent(name)) {
                this[name] = this[name] * 100;
            }
        }
    }

    calcPost() {
        let totals = this.calcTotals();

        if (this.post_atk_hp_bonus) {
            let value = this.get('post_atk_hp_bonus') / 100;
            this.add('atk', totals.get('hp_total') * value);
        }
    }

    calcTotals(filterStat) {
        let result = new Stats();
        filterStat ||= '';

        for (const stat of ['atk', 'def', 'hp']) {
            if (filterStat && filterStat != stat) {
                continue;
            }

            let base = this.get(stat +'_base');
            let bonus = (base * this.get(stat +'_percent') / 100) + this.get(stat)
            let total = base + bonus;

            result.add(stat +'_base', base);
            result.add(stat +'_bonus', bonus);
            result.add(stat +'_total', total);
        }

        for (const stat of ['crit_rate', 'crit_dmg', 'mastery', 'healing', 'healing_recv', 'recharge', 'shield', 'recovery']) {
            if (filterStat && filterStat != stat) {
                continue;
            }

            let base = this.get(stat +'_base');
            let bonus = this.get(stat)
            let total = base + bonus;

            result.add(stat +'_base', base);
            result.add(stat +'_bonus', bonus);
            result.add(stat +'_total', total);
        }

        for (const stat of ['anemo', 'geo', 'electro', 'pyro', 'cryo', 'hydro', 'phys']) {
            for (const type of ['dmg_', 'res_']) {
                if (filterStat && filterStat != type + stat) {
                    continue;
                }

                let base = this.get(type + stat +'_base');
                let bonus = this.get(type + stat)
                let total = base + bonus;

                result.add(type + stat +'_base', base);
                result.add(type + stat +'_bonus', bonus);
                result.add(type + stat +'_total', total);
            }
        }

        return result;
    }

    applyPostEffects(settings, effects, maxPriority) {
        if (effects && effects.length) {
            let byPriority = {};

            for (const item of effects) {
                let priority = item.getPriority();

                if (maxPriority && priority > maxPriority) {
                    continue;
                }

                if (!byPriority[priority]) {
                    byPriority[priority] = [];
                }

                byPriority[priority].push(item);
            }

            for (let priority of Object.keys(byPriority).sort((a, b) => {return a - b})) {
                let postStats = new Stats();

                for (const item of byPriority[priority]) {
                    let postData = item.getData(this, settings);
                    postStats.concat(postData);
                }

                this.concat(postStats);
            }
        }
    }

    getFormatted(stat, opts) {
        return Stats.format(stat, this.get(stat), opts);
    }

    revert() {
        let result = new Stats();

        let keys = Object.keys(this);
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            result.add(key, -1 * this[key]);
        }

        return result;
    }

    static roundStatValue(stat, value, forcePercent) {
        let percent = forcePercent || isPercent(stat || '');
        value = parseFloat(value) + 0.00000001;
        if (percent) {
            return value.toFixed(1);
        }

        return Math.round(value);
    }

    static format(stat, value, opts) {
        opts ||= {};
        let result = value;
        let percent = isPercent(stat);

        if (Math.abs(value) < 0.00001) {
            return opts.zero ? '0' : '';
        }

        if (isDecimal(stat)) {
            result += 0.00000001;
            result = result.toFixed(opts.decimal_digits || 1);

            if (opts.no_decimal_zero) {
                result = result.replace(/(\.\d*?)0+$/, "$1");
                result = result.replace(/\.$/, "");
            }

            if (percent) {
                result = result + '%';
            }
        } else {
            result = Math.round(result);

            if (opts.minimize) {
                if (result > 10000000) {
                    result = (result / 1000000).toFixed(2) +'m'
                } else if (result > 1000000) {
                    result = (result / 1000000).toFixed(3) +'m'
                }
            }
        }

        result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        if (opts.signed) {
            if (value < 0) {
                if (result == '0') {
                    result = '-0';
                }
            } else {
                result = '+'+ result;
            }
        }

        return result;
    }

    static diff(stats1, stats2) {
        let allStats = Object.assign({}, stats1, stats2);

        let result = new Stats();

        for (const stat of Object.keys(allStats)) {
            let value = stats2.get(stat) - stats1.get(stat);

            if (value) {
                result.add(stat, value);
            }
        }

        return result;
    }
}

function isDecimal(stat) {
    if (isPercent(stat)) return true;

    if (stat.match(/(_cooldown|_decimal)/)) {
        return true;
    }

    return false;
}

export function isPercent(stat) {
    if (stat.match(/_percent/)) {
        return true;
    }

    if (stat.match(/^(bond_of_life|stamina|recovery|duration|atk_speed|move_speed|healing|recharge|crit_|dmg_|enemy_|res_|.*bonus_|.*shield|.*_multi)/)) {
        return true;
    }

    return false;
}

