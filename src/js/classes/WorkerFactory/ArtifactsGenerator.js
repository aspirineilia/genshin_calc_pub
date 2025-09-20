import { Artifact } from "../Artifact";
import { getMainStatCombinations } from "../Generator/Artifacts";
import { WorkerFactory } from "../WorkerFactory";

const MAX_WORKERS = 1;

export class WorkerFactoryArtifactsGenerator extends WorkerFactory {
    createWorker() {
        return new Worker(new URL('../../workers/ArtifactsGenerator.js', import.meta.url));
    }

    updateProgress() {
        let total = 0;
        let completed = 0;

        for (let item of this.workers) {
            total += item.total || 0;
            completed += item.completed || 0;
        }

        if (this.progressCallback) {
            this.progressCallback({total: total, completed: completed});
        }
    }

    getResult() {
        let result = [];

        for (const item of this.workers) {
            if (item.isCompleted) {
                result = result.concat(item.result.result);
            }
        }

        for (let item of result) {
            let deserialized = [];
            for (let data of item.artifacts) {
                deserialized.push(Artifact.deserialize(data))
            }
            item.artifacts = deserialized;
        }

        return result.sort((a, b) => {return b.value - a.value});
    }

    getWorkersPayload(data) {
        let combinations = getMainStatCombinations(data);
        let numParts = Math.max(1, Math.min(Math.round(combinations.length / 3), MAX_WORKERS));

        let partSize = combinations.length / numParts;
        let parts = [];
        let used = 0;

        for (let i = 0; i < numParts; ++i) {
            let size = Math.floor((i + 1) * partSize) - used;
            let part = combinations.splice(0, size);
            used += part.length;
            parts.push(part);
        }

        data.build = data.build.serialize();

        let result = [];
        for (let part of parts) {
            result.push({
                ...data,
                combinations: part,
            });
        }

        return result;
    }
}

