import { Artifact } from "../classes/Artifact";
import { CalcSet } from "../classes/CalcSet";
import { Condition } from "../classes/Condition";
import { ArtifactGenerator, getMainStatCombinations } from "../classes/Generator/Artifacts";
import { ArtifactGeneratorKQM } from "../classes/Generator/ArtifactsKQM";
import { sendWorkerProgeressInc, sendWorkerProgeressTotal } from "../classes/WorkerFactory";

importScripts('db.js?'+ __VERSION__);

self.onmessage = function(input) {
    let buildBase = CalcSet.deserialize(input.data.build);
    let featureName = input.data.feature;

    let items = input.data.items;
    let results = [];
    let generatorSettings = input.data.generatorSettings;

    sendWorkerProgeressTotal(items.length);

    let storageArtifacts = [];
    if (input.data.storage) {
        for (let art of input.data.storage.artifacts) {
            storageArtifacts.push(Artifact.deserialize(art));
        }
    }

    for (let item of items) {
        let weapon = DB.Weapons.getById(item.weaponId)
        let build = buildBase.clone();
        let artifacts = [];

        build.setWeapon(weapon);
        build.setWeaponLevels({
            level: 90,
            ascension: 6,
            refine: item.refine,
        });
        build.setWeaponSettings(item.settings);

        if (input.data.artifactMode == 'generate') {
            let params = {
                build: build.clone(),
                feature: featureName,
                settings: {
                    sets: generatorSettings.sets,
                    count: generatorSettings.count,
                    critRolls: generatorSettings.critRolls,
                    mode: generatorSettings.mode,
                    minRecharge: generatorSettings.minRecharge,
                    kqms: generatorSettings.kqms,
                    required_sets_settings: generatorSettings.required_sets_settings
                },
            };
            params.combinations = getMainStatCombinations(params);

            let generator;
            if (params.settings.kqms) {
                generator = new ArtifactGeneratorKQM(params);
            } else {
                generator = new ArtifactGenerator(params);
            }

            let result = generator.generate();
            for (let art of result[0].artifacts) {
                artifacts.push(art.serialize())
            }
            build.replaceArtifacts(result[0].artifacts);

            let artConditions = build.getConditions({objects: 'artifacts'});
            let allSettings = Condition.allConditionsOn(artConditions);
            if (generatorSettings.required_sets_settings) {
                allSettings = Object.assign(allSettings, generatorSettings.required_sets_settings);
            }
            build.setArtifactsSettings(allSettings);
        }

        let feature = build.getFeatureByName(featureName);
        let data = build.getBuildData();
        let featureResult = feature.getResult(data)[featureName];

        if (featureResult) {
            let resultItem = {
                weaponId: item.weaponId,
                suggestName: item.suggestName,
                level: item.level,
                ascension: item.ascension,
                refine: item.refine,
                result: featureResult,
                artifacts: artifacts,
            };

            self.postMessage({
                partial: resultItem,
            });

            results.push(resultItem);
        }

        sendWorkerProgeressInc();
    }

    self.postMessage({
        result: results,
    });
}
