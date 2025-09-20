export class FeatureResult {
    constructor(data) {
        this.critChance = 0;
        this.critMulti  = 1;

        if (data) {
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; ++i) {
                const key = keys[i];
                this[key] = data[key];
            }
        }

        this.calcCritValues();
    }

    isHealing() {
        return this.icon && this.icon == 'heal';
    }

    calcCritValues() {
        if (this.average !== undefined) {
            return;
        }

        if (this.normal) {
            this.crit    = this.normal * this.critMulti;
            this.average = this.normal * (1 - this.critChance) + this.crit * this.critChance;
        } else {
            this.normal  = 0;
            this.crit    = 0;
            this.average = 0;
        }
    }

    clone() {
        let result = Object.assign({}, this);
        Object.setPrototypeOf(result, FeatureResult.prototype);
        return result;
    }
}
