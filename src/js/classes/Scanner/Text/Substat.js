import { ScannerTextBase } from "./Base";

export class ScannerTextSubstat extends ScannerTextBase {
    process(text) {
        let line = this.removeNonAlnum(text);
        if (!line.length) return null;

        let parts = this.getParts(line);
        let stat  = this.getStatName(parts[0], line);
        let value = this.getStatValue(parts[1], line);

        if (!stat || !value) {
            return null;
        }

        return {
            stat: stat,
            value: value,
        };
    }

    getParts(text) {
        let parts = text.split('+');
        let value;
        let name;

        if (parts.length == 2) {
            name  = parts[0];
            value = parts[1];
        } else {
            value = text.replace(/[^0-9\.,]+/g, '');
            name  = text.replace(/\s*(\+)?\s*\d+((,|\.)\d+)?/ig, '');
        }

        value = value.replace(',', '.');
        value = value.replace(/^[^\wа-я]+/ig, '');

        name = this.processName(name);

        return [name, value];
    }

    getStatName(name, line) {
        let percent = this.isPercentValue(line);
        let stat;

        for (let statName of ['atk', 'def', 'hp']) {
            let s = UI.Lang.get('stat_artifact.'+ statName).toLowerCase();

            if (this.strDiff(name, s) <= 2) {
                stat = statName + (percent ? '_percent' : '');
            }
        }

        for (let statName of ['mastery', 'recharge', 'crit_dmg', 'crit_rate']) {
            let s = UI.Lang.get('stat_artifact.'+ statName).toLowerCase();

            if (this.strDiff(name, s) <= 2) {
                stat = statName;
            }
        }

        return stat;
    }

    getStatValue(text, line) {
        let percent = this.isPercentValue(line);
        let value   = this.replaceLettersNums(text);

        if (percent) {
            value = parseFloat(value);
        } else {
            value = value.replace(/\D/g, '');
            value = parseInt(value);
        }

        return value;
    }

    isPercentValue(text) {
        return /\d+%/.test(text);
    }
}
