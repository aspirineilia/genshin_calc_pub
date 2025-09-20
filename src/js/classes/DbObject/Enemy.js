export class DbObjectEnemy {
    constructor(data) {
        this.name = data.name || '';
        this.iconClass = data.iconClass || '';
        this.resistances = data.resistances || {};
        this.settings = data.settings || {};
        this.serializeId = data.serializeId || 0;
        this.conditions = data.conditions || [];
        this.type = data.type || '';
        this.beta = data.beta || false;
    }

    getName() {
        return 'enemy_name.'+ this.name;
    }

    isBeta() {
        return this.beta;
    }

    getResistances() {
        let result = {};

        for (const element of Object.keys(this.resistances)) {
            result[element] = this.resistances[element];
        }

        return result;
    }

    getIcon() { // deprecated
        return this.iconClass;
    }

    getImage() {
        return this.iconClass;
    }

    getId() {
        return this.serializeId;
    }

    getConditions() {
        return this.conditions;
    }

    getSettings() {
        return this.settings;
    }

    getPostEffects() {
        return [];
    }

    getFeatures() {
        return []
    }

    getMultipliers() {
        return [];
    }
}
