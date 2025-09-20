export function formatNumber(value, opts) {
    opts ||= {};

    let result = value;
    let digits = opts.digits || 1;

    if (opts.percent) {
        result = result.toFixed(digits);

        if (opts.no_decimal_zero) {
            result = result.replace(/(\.\d*?)0+$/, "$1");
            result = result.replace(/\.$/, "");
        }
        result += '%';
    } else if (opts.digits) {
        result = result.toFixed(digits);
    } else {
        if (result > 10000000) {
            result = (result / 1000000).toFixed(2) +'m'
        } else if (result > 1000000) {
            result = (result / 1000000).toFixed(3) +'m'
        } else {
            result = Math.round(result);
        }
    }

    if (value == 0) {
        return '';
    }

    result = result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    if (opts.signed && value >= 0) {
        result = '+'+ result;
    }

    return result;
}

export function makeShareUrl(hash) {
    let shareUrl = window.location.toString();
    shareUrl = shareUrl.replace(/#.*$/, '');
    shareUrl += '#'+ hash;
    return shareUrl;
}

export function waitForCondition(condition, callback, timer) {
    let inteval = setInterval(() => {
        if (condition()) {
            clearInterval(inteval);
            callback();
        }
    }, timer || 100);
}
