import { Artifact } from "../classes/Artifact";
import { ArtifactsSuggest } from "../classes/ArtifactsSuggest";
import { CalcSet } from "../classes/CalcSet";

importScripts('db.js?'+ __VERSION__);

self.onmessage = function(input) {
    let artifactsList = [];
    for (let data of input.data.artifacts) {
        artifactsList.push(Artifact.deserialize(data));
    }

    let suggester = new ArtifactsSuggest({
        build: CalcSet.deserialize(input.data.calcset),
        artifacts: artifactsList,
        featureName: input.data.feature,
        featureType: input.data.featureType,
        settings: input.data.settings,
        limit: input.data.limit,
    });

    suggester.prepare();

    let results = suggester.getResult((current, total, skipped) => {
        self.postMessage({
            count: current,
            total: total,
            skipped: skipped,
        });
    });

    if (results.length > 0) {
        for (let item of results) {
            let arts = [];
            for (let art of item.artifacts) {
                arts.push(art ? art.serialize() : null)
            }
            item.artifacts = arts;
        }
        self.postMessage({result: results});
        return;
    }

    self.postMessage({result: []});
}
