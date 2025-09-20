export class Serializer {
    static pack(object) {
        let input = object.serialize();
        let result = '';

        if (!input) {
            return;
        }

        for (const i of input) {
            result += intToText(i);
        }

        return result;
    }

    static unpack(string) {
        let input = string.split('');
        let result = [];
        let value = 0;

        while (input.length > 0) {
            let letter = input.shift();

            // fix invalid saved data
            if (letter == '\x00') {
                letter = 'b';
            }

            let digit = letter.toUpperCase().charCodeAt(0) - 65;
            if (digit < 0 && digit > 25) return null;

            value += digit;
            if (letter.toLowerCase() == letter) {
                result.push(value);
                value = 0;
            } else {
                value = value * 26;
            }
        }

        if (value) {
            result.push(value);
        }

        return result;
    }
}

function intToText(int) {
    let value = parseInt(int);
    let result = '';

    while (value > 25) {
        let digit = value % 26;
        value -= digit;
        value  = value / 26;
        result = String.fromCharCode(65 + digit) + result;
    }

    result = String.fromCharCode(65 + value) + result;

    let lastchar   = result.substring(result.length - 1);
    let firstchars = result.substring(0, result.length - 1);

    return firstchars.toUpperCase() + lastchar.toLowerCase();
}
