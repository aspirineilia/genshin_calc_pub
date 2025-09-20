import { WorkerFactory } from "../WorkerFactory";

let setsOrders;

export class WorkerFactoryArtifactsSort extends WorkerFactory {
    createWorker() {
        return new Worker(new URL('../../workers/ArtifactsSort.js', import.meta.url));
    }

    getResult() {
        let result = [];

        for (const item of this.workers) {
            result = result.concat(item.result.result);
        }

        return result;
    }

    getWorkersPayload(data) {
        let artifacts = [];

        for (let item of data.artifacts) {
            artifacts.push(item.data);
        }

        data.artifacts = artifacts;
        data.setsOrders = getSetsOrders();

        return [data];
    }
}

function getSetsOrders() {
    if (setsOrders) {
        return setsOrders;
    }

    setsOrders = {};
    let count = 0;

    for (let setId of DB.Artifacts.Sets.getKeysSorted()) {
        setsOrders[setId] = ++count;
    }

    return setsOrders;
}
