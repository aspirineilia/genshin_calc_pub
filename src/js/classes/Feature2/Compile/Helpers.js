import { REAL_TOTAL } from "../../../db/Constants";
import { isPercent, Stats } from "../../Stats";
import { CDivide, CMin, CMulti, CSum, CVar } from "./Types/Block";
import { CConst, CStat, CStatTotal, CVarValue } from "./Types/Item";

/**
 * @param {string} stat
 * @param {Stats} stat
 * @returns {CStat}
 */
export function makeStatItem(stat, stats) {
    if (stat.indexOf('*') > 0) {
        return makeStatTotalItem(stat.replace('*', ''), stats);
    }

    return new CStat({
        stat: stat,
        value: stats.get(stat),
    });
}

/**
 * @param {string} stat
 * @param {Stats} stat
 * @returns {CStatTotal}
 */
export function makeStatTotalItem(stat, stats) {
    if (!REAL_TOTAL.includes(stat)) {
        return new CSum([
            makeStatItem(stat + '_base', stats),
            makeStatItem(stat, stats),
        ], {comment: stat, percent: isPercent(stat)});
    }

    return new CStatTotal({
        stat: stat,
        value: stats.getTotalPercent(stat),
        baseBalue: stats.get(stat + '_base'),
        percentValue: stats.get(stat + '_percent'),
        flatValue: stats.get(stat),
    });
}

/**
 * @param {string} suffix
 * @returns {string}
 */
let varCounter = BigInt(0);
export function variableName(suffix) {
    // if (varCounter == Number.MAX_SAFE_INTEGER) {varCounter = 0}
    return (suffix || 'var') + '_' + (++varCounter);
}

export function makeRoyalAverageCrit(critVar, royalStat) {
    let base = new CVarValue({ref: critVar});
    let c1 = new CVar([new CMin([new CConst({value: 1}), new CSum([base, royalStat])])]);
    let c2 = new CVar([new CMin([new CConst({value: 1}), new CSum([base, new CMulti([new CConst({value: 2}), royalStat])])])]);
    let c3 = new CVar([new CMin([new CConst({value: 1}), new CSum([base, new CMulti([new CConst({value: 3}), royalStat])])])]);
    let c4 = new CVar([new CMin([new CConst({value: 1}), new CSum([base, new CMulti([new CConst({value: 4}), royalStat])])])]);
    let c5 = new CVar([new CMin([new CConst({value: 1}), new CSum([base, new CMulti([new CConst({value: 5}), royalStat])])])]);

    let s1 = new CVarValue({ref: c1});
    let s2 = new CVarValue({ref: c2});
    let s3 = new CVarValue({ref: c3});
    let s4 = new CVarValue({ref: c4});
    let s5 = new CVarValue({ref: c5});

    let result = new CDivide([
        new CMulti([new CConst({value: -1}), s5]),
        new CSum([
            base,
            s1,
            s2,
            s3,
            s4,
            new CConst({value: -1}),
            new CMulti([new CConst({value: -1}), base, s1]),
            new CMulti([new CConst({value: -1}), base, s2]),
            new CMulti([base, s1, s2]),
            new CMulti([new CConst({value: -1}), s1, s2]),
            new CMulti([new CConst({value: -1}), base, s3]),
            new CMulti([base, s1, s3]),
            new CMulti([new CConst({value: -1}), s1, s3]),
            new CMulti([base, s2, s3]),
            new CMulti([new CConst({value: -1}), base, s1, s2, s3]),
            new CMulti([s1, s2, s3]),
            new CMulti([new CConst({value: -1}), s2, s3]),
            new CMulti([new CConst({value: -1}), base, s4]),
            new CMulti([base, s1, s4]),
            new CMulti([new CConst({value: -1}), s1, s4]),
            new CMulti([base, s2, s4]),
            new CMulti([new CConst({value: -1}), base, s1, s2, s4]),
            new CMulti([s1, s2, s4]),
            new CMulti([new CConst({value: -1}), s2, s4]),
            new CMulti([base, s3, s4]),
            new CMulti([new CConst({value: -1}), base, s1, s3, s4]),
            new CMulti([s1, s3, s4]),
            new CMulti([new CConst({value: -1}), base, s2, s3, s4]),
            new CMulti([base, s1, s2, s3, s4]),
            new CMulti([new CConst({value: -1}), s1, s2, s3, s4]),
            new CMulti([s2, s3, s4]),
            new CMulti([new CConst({value: -1}), s3, s4]),
            new CMulti([new CConst({value: 4}), base, s5]),
            new CMulti([new CConst({value: -3}), base, s1, s5]),
            new CMulti([new CConst({value: 3}), s1, s5]),
            new CMulti([new CConst({value: -2}), base, s2, s5]),
            new CMulti([new CConst({value: 2}), base, s1, s2, s5]),
            new CMulti([new CConst({value: -2}), s1, s2, s5]),
            new CMulti([new CConst({value: 2}), s2, s5]),
            new CMulti([new CConst({value: -1}), base, s3, s5]),
            new CMulti([base, s1, s3, s5]),
            new CMulti([new CConst({value: -1}), s1, s3, s5]),
            new CMulti([base, s2, s3, s5]),
            new CMulti([new CConst({value: -1}), base, s1, s2, s3, s5]),
            new CMulti([s1, s2, s3, s5]),
            new CMulti([new CConst({value: -1}), s2, s3, s5]),
            new CMulti([s3, s5]),
            new CMulti([new CConst({value: -5}), s5]),
        ]),
    ]);

    return [
        [critVar, c1, c2, c3, c4, c5],
        new CVar([result], {name: 'crit_rate_avg'}),
    ];
}
