import { WorkerFactory } from "../WorkerFactory";

export class WorkerFactorySuggestSet extends WorkerFactory {
    createWorker() {
        return new Worker(new URL('../../workers/ArtifactSetSuggest.js', import.meta.url));
    }

    getResult() {
        let result = [];

        for (const item of this.workers) {
            result = result.concat(item.result.result);
        }

        return result;
    }

    getWorkersPayload(data) {
        data.calcset = data.calcset.serialize();
        return [data];
    }
}
