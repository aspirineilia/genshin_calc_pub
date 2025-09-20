import { Stats } from "./Stats";

export function substatCheck(stat, rarity, value) {
    let statData = DB.Artifacts.Substats.get(stat);
    let rarityData = DB.Artifacts.Rarity[rarity - 1];
    let rolls = statData.rolls[rarity-1];
    let percent = statData.type == 'percent';
    let max = rarityData.maxUpgrades;

    let allCombinations = getRolls([], value, rolls, max, percent);

    allCombinations = makeUniq(allCombinations);
    allCombinations = allCombinations.sort(function(a, b) {
        return a[a.length - 1] - b[b.length-1] || a.length - b.length;
    });

    let resultRolls = allCombinations[0];
    let result = [];

    if (!resultRolls) {
        resultRolls = [0];
    }

    let last = Stats.roundStatValue('', resultRolls.pop(), percent);

    for (let item of resultRolls) {
        let rollRarity = 1;

        for (let i = 0; i < rolls.length; ++i) {
            if (item == rolls[i]) {
                rollRarity = 2+i;
            }
        }

        result.push({
            value: Stats.roundStatValue('', item, percent),
            rarity: rollRarity,
        });
    }

    return {
        steps: result,
        maxValue: result.length * rolls[rolls.length - 1],
        last: last,
        maxUpgrades: rarityData.maxUpgrades,
    };
}

function getRolls(current, value, rolls, max, percent) {
    let results = [];

    if (max <= 0) {
        let diff = getDiff(current, value, percent);
        let values = [].concat(current);
        values.push(Math.abs(diff));
        return [values];
    }

    for (let roll of rolls) {
        let values = [].concat(current);
        values.push(roll);
        let diff = getDiff(values, value, percent);

        if (diff > 0) {
            results = results.concat(getRolls(values, value, rolls, max-1, percent));
        } else {
            if (diff == 0) {
                values.push(0);
            } else {
                values = [].concat(current);
                values.push(Math.abs(roll + diff));
            }

            results.push(values);
        }
    }

    return results;
}

function getDiff(rolls, value, percent) {
    let total = rolls.reduce(function(total, val) {return total+val}, 0)
    let diff  = Stats.roundStatValue('', value, percent) - Stats.roundStatValue('', total, percent);

    if (Math.abs(diff) < 0.001) {
        return 0;
    }

    return value - total;
}

function makeUniq(items) {
    let hash = {};

    for (let item of items) {
        let last = item.pop();
        let key = [].concat(item.sort(), [last]).join('-');
        hash[key] = 1;
    }

    let result = [];

    for (const key of Object.keys(hash).sort()) {
        result.push(key.split('-'));
    }

    return result;
}
