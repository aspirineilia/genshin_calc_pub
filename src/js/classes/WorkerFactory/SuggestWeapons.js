import { Artifact } from "../Artifact";
import { WorkerFactory } from "../WorkerFactory";

export class WorkerFactorySuggestWeapons extends WorkerFactory {
    constructor(params) {
        super(params);
        this.partialCallback = params.partialCallback;
        this.subProgressCallback = params.subProgressCallback;
    }

    createWorker() {
        return new Worker(new URL('../../workers/WeaponsSuggest.js', import.meta.url));
    }

    onMessage(index, data) {
        if (data.subProgress) {
            this.workers[index].subProgress = data.subProgress;
            this.checkSubProgress();
            return;
        } else if (data.partial) {
            if (this.partialCallback) {
                let deserialized = [];
                for (let a of data.partial.artifacts) {
                    deserialized.push(Artifact.deserialize(a))
                }
                data.partial.artifacts = deserialized;

                this.partialCallback(data.partial);
            }
            return;
        }

        super.onMessage(index, data);
    }

    checkSubProgress() {
        if (!this.subProgressCallback) {
            return;
        }

        let items = [];

        for (let item of this.workers) {
            if (item.isCompleted) {
                continue;
            }
            if (item.subProgress && item.subProgress.total) {
                items.push(item.subProgress)
            }
        }

        this.subProgressCallback(items);
    }

    getResult() {
        let result = [];

        for (const item of this.workers) {
            if (item.isCompleted) {
                result = result.concat(item.result.result);
            }
        }

        result = result.sort((a, b) => {return b.result.average - a.result.average});

        for (let item of result) {
            let deserialized = [];
            for (let data of item.artifacts) {
                deserialized.push(Artifact.deserialize(data))
            }
            item.artifacts = deserialized;
        }

        return result;
    }

    getWorkersPayload(data) {
        data.build = data.build.serialize();

        if (data.storage && data.storage.artifacts) {
            let serialized = []
            for (let art of data.storage.artifacts) {
                serialized.push(art.serialize());
            }
            data.storage.artifacts = serialized;
        }

        let items = [];
        for (let part of this.splitItems(data.items, data.artifactMode)) {
            items.push(Object.assign({}, data, {items: part}));
        }

        return items;
    }

    splitItems(items, mode) {
        let partsCount = this.getPartsLength(items.length);
        if (mode == 'storage') {
            partsCount = Math.min(4, items.length);
        }

        let result = [];
        for (let i = 1; i <= partsCount; ++i) {
            let from = Math.round((i - 1) * items.length / partsCount);
            let to = Math.round(i * items.length / partsCount);
            result.push(items.slice(from, to));
        }

        return result;
    }

    getPartsLength(len) {
        if (len >= 16) {
            return 4;
        } else if (len >= 9) {
            return 3;
        }
        return 2;
    }
}

