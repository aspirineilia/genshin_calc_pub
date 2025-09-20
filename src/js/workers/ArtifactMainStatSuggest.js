import { CalcSet } from "../classes/CalcSet";

importScripts('db.js?'+ __VERSION__);

self.onmessage = function(input) {
    let original = CalcSet.deserialize(input.data.build);
    let featureName = input.data.feature;

    let results = [];

    let buildData = original.getBuildData();
    let feature = original.getFeatureByName(featureName);
    let usedStats = feature.getUsedStats(buildData);

    let arts = original.getArtifacts();
    let statsBySlot = {};
    let uselessStats = {};

    for (const slot of ['sands', 'goblet', 'circlet']) {
        statsBySlot[slot] = [];

        if (!arts[slot]) {
            continue;
        }

        let slotStats = DB.Artifacts.Slots.get(slot).mainStats;
        for (let stat of slotStats) {
            if (!usedStats.includes(stat)) {
                uselessStats[slot] = stat;
                continue;
            }

            statsBySlot[slot].push(stat);
        }

        if (statsBySlot[slot].length == 0) {
            statsBySlot[slot] = [''];
        }
    }

    let combinations = [];
    for (let sandsStat of statsBySlot['sands']) {
        for (let gobletStat of statsBySlot['goblet']) {
            for (let circletStat of statsBySlot['circlet']) {
                combinations.push({
                    sands: sandsStat,
                    goblet: gobletStat,
                    circlet: circletStat,
                });
            }
        }
    }

    for (let item of combinations) {
        let build = original.clone();
        let arts = build.getArtifacts();
        let statData = {};

        for (const slot of ['sands', 'goblet', 'circlet']) {
            let stat =item[slot];
            if (stat) {
                statData[slot] = stat;
            }

            arts[slot].mainStat = stat || uselessStats[slot];
        }

        let data  = build.getBuildData();
        let value = feature.getResult(data)[featureName];

        results.push({
            feature: value,
            data: statData,
        });
    }

    results = results.sort(function(a,b) {return b.feature.average - a.feature.average});

    self.postMessage({result: results});
}
