import {Stats} from "./Stats";

export class Constellation {
    constructor(data) {
        this.data = data;
    }

    getConditions(level) {
        let result = [];

        for (let i = 0; i < level && i < this.data.length; i ++) {
            let conditions = this.data[i].conditions;
            if (conditions) {
                result = result.concat(conditions);
            }
        }

        return result;
    }

    getStats(level) {
        let result = new Stats();

        for (let i = 0; i < level && i < this.data.length; i ++) {
            let stats = this.data[i].stats;
            if (stats) {
                result.concat(stats);
            }
        }

        return result;
    }

    getFeatures(level) {
        let result = [];

        for (let i = 0; i < level && i < this.data.length; i ++) {
            let features = this.data[i].features;
            if (features) {
                result = result.concat(features);
            }
        }

        return result;
    }
}
