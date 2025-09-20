import { Artifact } from "../classes/Artifact";
import { CalcSet } from "../classes/CalcSet";
import { Condition } from "../classes/Condition";
import { Serializer } from "../classes/Serializer";

importScripts('db.js?'+ __VERSION__);

const slotOrders = {
    flower: 1,
    plume: 2,
    sands: 3,
    goblet: 4,
    circlet: 5,
}

self.onmessage = function(input) {
    let artifacts = input.data.artifacts;
    let currentSet = CalcSet.deserialize(input.data.calcSet);
    let featureName = input.data.feature;
    let featureType = input.data.featureType;
    let sortByFeature = input.data.sortByFeature;
    let sortByStat = input.data.sortByStat;
    let setsOrders = input.data.setsOrders;

    let results = [];
    let feature;

    if (sortByFeature) {
        feature = currentSet.getFeatureByName(featureName);
    }

    let currentSettings = currentSet.artifacts.getSettings();
    let conditions = currentSet.getConditions({objects: 'artifacts'});
    let currentArtSettings = Condition.allConditionsOff(conditions);
    Object.assign(currentArtSettings, currentSettings);


    for (let hash of artifacts) {
        let art = Artifact.deserialize( Serializer.unpack(hash) );
        let item = {
            hash: hash,
            featureValue: 0,
            statValue: 0,
            setValue: setsOrders[art.getSet()],
            slotValue: slotOrders[art.getSlot()],
        };

        if (sortByFeature && feature) {
            let build = currentSet.clone();
            build.setArtifact(art);

            let conditions = build.getConditions({objects: 'artifacts'});
            let artSettingsOn = Condition.allConditionsOn(conditions);
            let newArtSettings = Object.assign({}, artSettingsOn, currentArtSettings);
            build.setArtifactsSettings(newArtSettings);

            let data = build.getBuildData();
            let featureResult = feature.getResult(data);

            if (featureResult[featureName]) {
                item.featureValue = featureResult[featureName][featureType];
            }
        }

        if (sortByStat) {
            let stats = art.calcStats();
            item.statValue = stats.get(sortByStat);
        }

        results.push(item);
    }


    results = results.sort( (a, b) => {
        return b.featureValue - a.featureValue || b.statValue - a.statValue || a.setValue - b.setValue || a.slotValue - b.slotValue;
    });

    self.postMessage({result: results.map((i) => {return i.hash})});
}
