import { Artifact } from "../Artifact";
import { ArtifactsSuggestSort } from "../ArtifactsSuggestSort";
import { WorkerFactory } from "../WorkerFactory";

const MAX_WORKERS_CNT = 16;
const MAX_RESULTS = 20;
const MIN_COMBINATIONS_PER_THREAD = 2_000_000;

export class WorkerFactorySuggestArtifacts extends WorkerFactory {
    createWorker() {
        return new Worker(new URL('../../workers/ArtifactsSuggest.js', import.meta.url));
    }

    getResult() {
        let result = [];

        for (const item of this.workers) {
            result = result.concat(item.result);
        }

        for (let item of result) {
            let deserialized = [];
            for (let artData of item.artifacts) {
                if (artData) {
                    deserialized.push(Artifact.deserialize(artData));
                }
            }
            item.artifacts = deserialized;
        }


        result = result.sort(function(a,b) {
            return b.value - a.value;
        });
        result = result.splice(0, MAX_RESULTS);

        return result;
    }

    onMessage(index, data) {
        if (data.result) {
            super.onMessage(index, data.result);
        } else {
            this.workers[index].count = data.count;
            this.workers[index].total = data.total;
            this.workers[index].skipped = data.skipped;
            this.updateProgress();
        }
    }

    updateProgress() {
        let progress = [];

        for (let item of this.workers) {
            progress.push({
                count: item.count || 0,
                total: item.total || 0,
                skipped: item.skipped || 0,
            })
        }

        if (this.progressCallback) {
            this.progressCallback({workers: progress});
        }
    }

    getWorkersPayload(data) {
        let arts = {
            flower: [],
            plume: [],
            sands: [],
            goblet: [],
            circlet: [],
        };

        let filteredArtifacts = data.artifacts;
        if (data.fastFilter) {
            let suggester = new ArtifactsSuggestSort({
                build: data.calcset,
                featureName: data.feature,
                featureType: data.featureType,
                settings: data.settings,
            });

            filteredArtifacts = suggester.sort(filteredArtifacts, data.fastFilterLimit || 25);
        }

        for (const item of filteredArtifacts) {
            arts[item.slot].push(item.serialize());
        }

        let maxSlot = 'flower';
        for (const slot of Object.keys(arts)) {
            if (arts[slot].length > arts[maxSlot].length) {
                maxSlot = slot;
            }
        }

        let numParts = Math.min(
            this.maxThreads,
            MAX_WORKERS_CNT,
            Math.ceil(arts[maxSlot].length / 2),
            Math.ceil(calcCombinations(arts) / MIN_COMBINATIONS_PER_THREAD)
        );

        let partSize = arts[maxSlot].length / numParts;
        let parts = [];
        let used = 0;

        for (let i = 0; i < numParts; ++i) {
            let size = Math.floor((i + 1 ) * partSize) - used;
            let part = arts[maxSlot].splice(0, size);
            used += part.length;

            for (const slot of Object.keys(arts)) {
                if (slot == maxSlot) continue;

                part = part.concat(arts[slot]);
            }

            parts.push(part);
        }


        data.calcset = data.calcset.serialize();
        data.settings.setMinValues = {};
        data.settings.setMaxValues = {};

        for (let name of [data.settings.required_sets.set1, data.settings.required_sets.set2]) {
            if (name) {
                data.settings.setMinValues[name] = (data.settings.setMinValues[name] || 0) + 2;
            }
        }

        for (let [id, val] of Object.entries(data.settings.sets)) {
            if (val) continue;
            let [setName, pieces] = id.split('-');

            if (data.settings.setMaxValues[setName] && data.settings.setMaxValues[setName] < pieces) continue;
            data.settings.setMaxValues[setName] = pieces;
        }

        let result = [];
        for (let part of parts) {
            result.push(
                Object.assign({}, data, {artifacts: part, limt: MAX_RESULTS})
            );
        }

        return result;
    }

    run(data) {
        this.maxThreads = data.maxThreads;

        super.run(data);
    }
}

function calcCombinations(items) {
    let result = 1;
    for (let slot of Object.keys(items)) {
        result *= items[slot].length || 1;
    }
    return result;
}
