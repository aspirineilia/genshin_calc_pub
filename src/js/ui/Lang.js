import { Stats } from "../classes/Stats";

export class Lang {
    constructor() {
        this.name = window.lang_name;
        this.current = window.lang_strings;
    }

    getLang() {
        return this.name;
    }

    getStat(id) {
        return this.get(id.replace(/_base$/, ''));
    }

    getStatTotal(id) {
        return this.get(id.replace(/_(base|total)$/, ''));
    }

    getTalent(id, stats) {
        let result = this.get(id);

        stats ||= new Stats();

        result = result.replace(/skill\{(\w+):(.*?)\}/g, '<span class="text-name gi-skill-info" data-skill="$1">$2</span>');
        result = result.replace(/tab\{([\w\-]+):(.*?)\}/g, '<span class="text-name gi-tab-change" data-tab="$1">$2</span>');

        result = result.replace(/format\{(\w+)=(\w+)\|([\w\.\%\{\}]+)\}/g, function(all_str, stat, value, str) {
            let statValue = stats.get(stat)
            if (statValue == value) {
                return '<span class="text-value">'+ str +'</span>';
            }
            return '<span class="text-fade">'+ str +'</span>';
        });

        result = result.replace(/(\w+)\{(.*?)\}/g, '<span class="text-$1">$2</span>');

        result = result.replace(/(\+)?\%\{(\w+)(?:\|([\d\.]+))?(?:\|(\d+))?\}/g, function(str, signed, stat, def, digits) {
            let value = Math.abs(stats.get(stat));
            value ||= def - 0;
            if (!value) {
                if (def === '0') {
                    return '<span class="text-value">0</span>';
                }
                return '?';
            }

            let result = Stats.format(stat, value, {
                signed: !!signed,
                no_decimal_zero: 1,
                decimal_digits: digits || 1,
            });

            return '<span class="text-value">'+ result +'</span>';
        });

        return result;
    }

    get(id) {
        if (!id) return '';

        let parts = id.toLowerCase().split('.');
        if (parts.length < 2 || !this.current[parts[0]]) {
            return id;
        }

        let str = this.current[parts[0]][parts[1]];

        if (!str && localStorage.warn_lang) {
            console.log(id)
        }
        return str || id;
    }

    any() {
        let str;
        let id;

        for (id of arguments) {
            let parts = id.toLowerCase().split('.');
            if (parts.length < 2 || !this.current[parts[0]]) {
                continue;
            }

            str = this.current[parts[0]][parts[1]];
            if (str) {
                break;
            }
        }

        return str || id;
    }
}
