export class DbObject {
    constructor(data) {
        this.features = data.features || [];
        this.conditions = data.conditions || [];
        this.postEffects = data.postEffects || [];
        this.multipliers = data.multipliers || [];
        this.statTable = data.statTable || {};
        this.name = data.name || '';
        this.iconClass = data.iconClass || '';
        this.rarity = data.rarity || 1;
        this.serializeId = data.serializeId || 0;
        this.beta = data.beta || false;
    }

    getName() {
        return this.name;
    }

    getIcon() {
        return this.iconClass;
    }

    isBeta() {
        return this.beta;
    }

    getRarity() {
        return this.rarity;
    }

    getConditions() {
        return this.conditions;
    }

    getPostEffects() {
        return this.postEffects;
    }

    getMultipliers() {
        return this.multipliers;
    }

    getFeatures() {
        return this.features;
    }

    getId() {
        return this.serializeId;
    }
}
