import { CalcSet } from "../classes/CalcSet";
import { ArtifactGenerator } from "../classes/Generator/Artifacts";
import { ArtifactGeneratorKQM } from "../classes/Generator/ArtifactsKQM";

importScripts('db.js?'+ __VERSION__);

self.onmessage = function(input) {
    input.data.build = CalcSet.deserialize(input.data.build);
    input.data.progressCallback = (progress) => {
        self.postMessage({progress: progress});
    };

    let generator;
    if (input.data.settings.kqms) {
        generator = new ArtifactGeneratorKQM(input.data);
    } else {
        generator = new ArtifactGenerator(input.data);
    }

    let result = generator.generate();
    for (let item of result) {
        let serialized = [];
        for (let art of item.artifacts) {
            serialized.push(art.serialize());
        }
        item.artifacts = serialized;
    }

    self.postMessage({
        result: result,
    });
}
