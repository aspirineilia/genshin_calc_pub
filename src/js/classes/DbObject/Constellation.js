export class DbObjectConstellation {
    constructor(data) {
        this.data = data;
    }

    getConditions(level) {
        let result = [];

        for (let i = 0; i < level && i < this.data.length; i ++) {
            let conditions = this.data[i].conditions;
            if (conditions) {
                for (let cond of conditions) {
                    cond.params.info = {constellation: i+1};
                }
                result = result.concat(conditions)
            }
        }

        return result;
    }

    getStats(level) {
        return {};
    }

    getFeatures(level) {
        let result = [];

        for (let i = 0; i < level && i < this.data.length; i ++) {
            let features = this.data[i].features;
            if (features) {
                result = result.concat(features)
            }
        }

        return result;
    }
}
