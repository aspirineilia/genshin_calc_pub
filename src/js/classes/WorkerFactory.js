export class WorkerFactory {
    constructor(params) {
        params = Object.assign({}, params);
        this.callback = params.callback;
        this.startCallback = params.startCallback;
        this.terminateCallback = params.terminateCallback;
        this.progressCallback = params.progressCallback;
        this.workers = [];
        this.startedAt = null;
    }

    getUrl() {
        return this.url;
    }

    terminate(clear) {
        let finishedWorkers = [];

        for (let item of this.workers) {
            if (item.isCompleted) {
                item.result = null;
                finishedWorkers.push(item);
            } else {
                item.worker.terminate();
            }
        }

        this.workers = finishedWorkers;

        if (!clear && this.terminateCallback) {
            this.terminateCallback();
        }
    }

    getWorkersPayload(data) {
        return [data];
    }

    onMessage(index, data) {
        if (data.progress) {
            this.acceptProgress(index, data.progress);
        } else {
            this.workers[index].isCompleted = true;
            this.workers[index].result = data;
            this.checkCompleted();
        }
    }

    onError(index, data) {
        if (this.workers[index]) {
            this.workers[index].isError = true;
        }
        this.checkCompleted();
    }

    getResult() {
        return {};
    }

    checkCompleted() {
        let completed = 0;

        for (let item of this.workers) {
            if (item.isCompleted || item.isError) {
                ++completed;
            }
        }

        if (completed == this.workers.length) {
            this.submitResult();
        }
    }

    acceptProgress(index, data) {
        if (data.inc) {
            this.workers[index].progress.completed += data.inc
        } else if (data.completed) {
            this.workers[index].progress = {
                completed: data.completed,
                total: data.total,
            };
        } else if (data.total) {
            this.workers[index].progress.total = data.total;
        } else {
            return;
        }

        this.checkProgress();
    }

    checkProgress() {
        if (!this.progressCallback) {
            return;
        }

        let completed = 0;
        let total = 0;

        for (let item of this.workers) {
            if (item.progress && item.progress.total) {
                completed += item.progress.completed;
                total += item.progress.total;
            }
        }

        this.progressCallback({
            completed: completed,
            total: total,
        });
    }

    submitResult() {
        UI.debug(this.constructor.name +' finished in: '+ (performance.now() - this.startedAt));
        this.callback(this.getResult());
    }

    createWorker() {
        return null;
    }

    run(data) {
        this.terminate(true);

        this.startedAt = performance.now();
        this.progress = {completed: 0, total: 0};

        let finishedWorkers = this.workers;
        this.workers = [];

        for (let payload of this.getWorkersPayload(data)) {
            let old = finishedWorkers.shift();
            let worker;

            if (old) {
                worker = old.worker;
            } else {
                worker = this.createWorker();
            }

            let index = this.workers.length
            this.workers.push({
                isCompleted: false,
                isError: false,
                worker: worker,
                result: {},
                progress: {completed: 0, total: 0},
                payload: payload,
            });

            worker.onmessage = (data) => {this.onMessage(index, data.data)};
            worker.onerror   = (data) => {this.onError(index, data.data)};
        }

        if (this.startCallback) {
            this.startCallback({
                workers: this.workers.length,
            });
        }

        for (let item of this.workers) {
            item.worker.postMessage(item.payload);
        }
    }
}

export function sendWorkerProgeress(completed, total) {
    if (typeof self !== 'undefined') {
        self.postMessage({
            progress: {
                completed: completed,
                total: total,
            },
        });
    }
}

export function sendWorkerProgeressTotal(total) {
    if (typeof self !== 'undefined') {
        self.postMessage({
            progress: {
                total: total,
            },
        });
    }
}

export function sendWorkerProgeressInc(completed) {
    if (typeof self !== 'undefined') {
        self.postMessage({
            progress: {
                inc: completed || 1,
            },
        });
    }
}
