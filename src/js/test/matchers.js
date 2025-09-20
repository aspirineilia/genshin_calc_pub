export function toBeEmptyArray(received) {
    const pass = Array.isArray(received) && received.length == 0;

    if (pass) {
        return {
            message: () => 'Expected any items',
            pass: true,
        };
    } else {
        return {
            message: () => 'Got items: '+ received.join('; '),
            pass: false,
        };
    }
}

export function toBeFeatureValue(received, expected)  {
    let pass = true;
    let mismatch = 'Values match';

    for (const key of ['normal', 'crit', 'average']) {
        let value = Math.round(received[key])
        pass &&= value == expected[key];

        if (!pass) {
            mismatch = `Value mismatch for key ${key}: got '${value}' expected '${expected[key]}'`;
            break;
        }
    }

    if (pass) {
        for (const key of ['icon']) {
            if (expected.icon === undefined) continue;

            pass &&= received[key] == expected[key];

            if (!pass) {
                mismatch = `Value mismatch for key ${key}: got '${received[key]}' expected '${expected[key]}'`;
                break;
            }
        }
    }

    if (pass) {
        return {
            message: () => mismatch,
            pass: true,
        };
    } else {
        return {
            message: () => mismatch,
            pass: false,
        };
    }
}
