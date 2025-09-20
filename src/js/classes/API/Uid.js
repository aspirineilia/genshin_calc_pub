let POS_LIST = [
    [1, 2, 3],
    [1, 3, 2],
    [2, 1, 3],
    [2, 3, 1],
    [3, 1, 2],
    [3, 2, 1],
];

export function prepareUid(uid) {
    return uid;
    if (!/^\d+$/.exec(uid)) {
        return uid.toLowerCase();
    }

    let digits = uid.match(/.{1,3}/g);
    let pos = 1 + Math.floor(Math.random() * 6);
    let parts = [];

    for (let num of digits) {
        let m = 2 + Math.floor(Math.random() * 8);
        num = parseInt(num) * m;
        parts.push(String(num).padStart(4, '0') + (10 - m))
    }

    let sum = 0;
    for (let p of parts) {
        sum += calcSum(p)
    }

    let rParts = [pos];
    for (let i of POS_LIST[pos-1]) {
        rParts.push(parts[i-1])
    }

    return rParts.join('') + String(sum % 100).padStart(2, '0');
}

function calcSum(str) {
    let numbers = str.split('');
    let result = 0;
    for (let i = 0; i < numbers.length; ++i) {
        result += (i + 1) * parseInt(numbers[i]);
    }
    return result;
}
