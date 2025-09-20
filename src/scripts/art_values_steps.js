let result = {};

for (const stat of DB.Artifacts.Substats.getKeys()) {
    let item = DB.Artifacts.Substats.get(stat);
    let stars = item.rolls;
    let rarity = 0;
    let allSteps = [];

    for (const values of stars) {
        let data = DB.Artifacts.Rarity[rarity];
        let steps = getSteps(values, data.maxUpgrades, item.type);

        allSteps.push(steps);
        ++rarity;
    }

    result[stat] = {
        type: item.type,
        rolls: item.rolls,
        steps: allSteps,
    };
}

console.log(JSON.stringify(result));

function getSteps(values, upgrades, type) {
    let result = {};
    let size = values.length;

    for (let i = 1; i <= upgrades; ++i) {
        let max = Math.pow(size, i);
        let indices = [];

        for (let j = 0; j < max; ++j) {
            let number = j;
            let item = [];

            for (let k = 0; k < i; ++k) {
                let val = number % size;
                item.push(val);
                number = (number - val) / size;
            }

            indices.push(item);
        }

        for (let item of indices) {
            let sum = 0;
            for (let ind of item) {
                sum += values[ind];
            }

            if (type == 'percent') {
                sum = sum.toFixed(1);
            }

            result[sum] = 1;
        }
    }

    return Object.keys(result).sort(function(a, b) {return a - b});
}

