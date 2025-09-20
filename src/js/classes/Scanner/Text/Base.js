const levenshtein = require('js-levenshtein');

export class ScannerTextBase {
    removeNonAlnum(text) {
        let result = text.replace(/^[^\wа-я]+/ig, '');
        result = result.replace(/[^\wа-я%]+$/ig, '').toLowerCase();

        return result;
    }

    processName(text) {
        return text.replace(/[^\wа-я]+$/ig, '').toLowerCase();
    }

    strDiff(str1, str2) {
        return levenshtein(str1, str2)
    }

    replaceLettersNums(text) {
        let result = text;

        result = result.replace(/[oо]/ig, '0');
        result = result.replace(/[iltт]/ig, '1');
        result = result.replace(/[з]/ig, '3');
        result = result.replace(/[bб]/ig, '6');

        result = result.replace(/[^\d\.\,]/g, '');
        result = result.replace(/[,\.]+/g, '.');

        return result;
    }
}
