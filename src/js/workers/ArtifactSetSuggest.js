import { CalcSet } from "../classes/CalcSet";
import { Condition } from "../classes/Condition";

importScripts('db.js?'+ __VERSION__);

self.onmessage = function(input) {
    let original = CalcSet.deserialize(input.data.calcset);
    let featureName = input.data.feature;
    let showBeta = input.data.showBeta;

    let maxPieces = 0;
    let arts = original.getArtifacts();
    let feature = original.getFeatureByName(featureName);
    let isRotation = feature.isRotation();

    for (const slot of Object.keys(arts)) {
        if (arts[slot]) {
            ++maxPieces;
        }
    }

    let sets = getSets(original, featureName, maxPieces, showBeta);
    let results = [];

    for (let s1 = 0; s1 < sets.length; ++s1) {
        const set1 = sets[s1];

        for (const item1 of set1.data) {
            let setNames = [].concat(item1.setNames);

            let currentSet = original.clone();
            currentSet.artifacts.modifySets(setNames);
            let settings1 = Object.assign(item1.settings);
            currentSet.setArtifactsSettings(settings1);

            let data  = currentSet.getBuildData();
            let value = feature.getResult(data)[featureName];

            results.push({
                feature: value,
                settings: settings1,
                sets: [
                    {id: set1.setId, pieces: item1.pieces},
                ]
            });

            for (let s2 = s1+1; s2 < sets.length; ++s2) {
                const set2 = sets[s2];

                for (const item2 of set2.data) {
                    if (item1.pieces + item2.pieces > maxPieces) {
                        continue;
                    }

                    let names2 = [].concat(item1.setNames, item2.setNames);

                    currentSet = original.clone();
                    currentSet.artifacts.modifySets(names2);
                    let settings2 = Object.assign({}, settings1, item2.settings);
                    currentSet.setArtifactsSettings(settings2);

                    if (isRotation) {
                        feature = currentSet.compileRotation();
                    }

                    let data  = currentSet.getBuildData();
                    let value = feature.getResult(data)[featureName];

                    results.push({
                        feature: value,
                        settings: settings2,
                        sets: [
                            {id: set1.setId, pieces: item1.pieces},
                            {id: set2.setId, pieces: item2.pieces},
                        ]
                    });
                }
            }
        }
    }

    results = results.sort(function(a,b) {return b.feature.average - a.feature.average});

    self.postMessage({result: results});
}

function getSets(original, featureName, maxPieces, showBeta) {
    let sets = [];

    let calc = original.clone();
    calc.artifacts.modifySets([]);

    let feature = calc.getFeatureByName(featureName);

    const base = calc.getBuildData();
    const reference = feature.getResult(base)[featureName];

    for (const setId of DB.Artifacts.Sets.getKeys(1)) {
        let setData = DB.Artifacts.Sets.get(setId);
        if (setData.maxRarity < 5) {
            continue;
        }

        if (!showBeta && setData.isBeta()) {
            continue;
        }

        let suggesterData = setData.getSuggesterData();

        let setResult = [];
        let prev = reference;

        let maxI = Math.min(maxPieces, suggesterData.length-1);
        let setNames = [];

        for (let pieces = 1; pieces <= maxI; ++pieces) {
            let pieceData = suggesterData[pieces];

            setNames.push(setId);

            if (pieceData && pieceData.conditions) {
                let newSet = original.clone();
                newSet.artifacts.modifySets(setNames);

                let settings;
                if (pieceData.settings) {
                    settings = pieceData.settings;
                } else {
                    settings = Object.assign({}, Condition.allConditionsOn(newSet.artifacts.getConditions()));
                }

                let newset = Object.assign({}, settings);
                newSet.setArtifactsSettings(newset);

                let feature = newSet.getFeatureByName(featureName);
                let data = newSet.getBuildData();
                let value = feature.getResult(data)[featureName];

                if (valueIsGreater(prev, value)) {
                    setResult.push({
                        pieces: pieces,
                        settings: settings,
                        setNames: [].concat(setNames),
                    });

                    prev = value;
                }
            }
        }

        if (setResult.length > 0) {
            sets.push({
                setId: setId,
                data: setResult,
            });
        }
    }

    return sets;
}

function valueIsGreater(reference, value) {
    let result = false;

    for (const key of ['normal', 'crit', 'average']) {
        result ||= Math.abs(value[key] - reference[key]) > 0.0001;
    }

    return result;
}
