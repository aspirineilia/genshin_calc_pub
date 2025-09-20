import { Feature2 } from "../../Feature2";

const FIELD_NAMES = ['damageTypes', 'damageTypesExclude', 'damageElements', 'tags', 'options'];

export class FeatureMultiplierTarget {
    constructor(params) {
        if (process.env.NODE_ENV !== 'production') {
            for (let name of Object.keys(params)) {
                if (!FIELD_NAMES.includes(name)) {
                    console.error(`Unknown param '${name} in FeatureMultiplierTarget contructor`);
                }
            }
        }

        for (let name of FIELD_NAMES) {
            this[name] = params[name] || [];
            if (!Array.isArray(this[name])) {
                this[name] = [this[name]];
            }
        }
    }

    /**
     * @param {Feature2} feature
     * @returns {boolean}
     */
    isMatchFeature(feature, data) {
        let damageType = feature.getDamageType();
        if (this.damageTypes.length && !this.damageTypes.includes(damageType)) {
            return false;
        }

        if (damageType && this.damageTypesExclude.length && this.damageTypesExclude.includes(damageType)) {
            return false;
        }

        if (this.damageElements.length && !this.damageElements.includes(feature.getElement(data))) {
            return false;
        }

        if (this.tags.length) {
            let hasTag = false;
            for (let tag of feature.getTags()) {
                if (this.tags.includes(tag)) {
                    hasTag = true;
                    break;
                }
            }

            if (!hasTag) {
                return false;
            }
        }

        return true;
    }

    isMatchOption(option) {
        if (this.options.length == 0) return true;
        return this.options.includes(option);
    }
}
