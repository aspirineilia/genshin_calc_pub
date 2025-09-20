export function getUsedStats() {
    let usedStats = {};

    for (let tree of arguments) {
        tree.walk((item) => {
            if (item.getUsedStats) {
                for (let stat of item.getUsedStats()) {
                    let stat_orig = baseStatName(stat)
                    if (stat_orig != stat) {
                        usedStats[stat_orig] = (usedStats[stat_orig] || 0) + 1;
                    }
                    usedStats[stat] = (usedStats[stat] || 0) + 1;
                }
            }
        });
    }

    return Object.keys(usedStats);
}

export function baseStatName(stat) {
    return stat.replace(/(_\d+)+$/, '');
}
