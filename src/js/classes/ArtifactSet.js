import { Stats } from "./Stats";

export const MAX_SET_SIZE = 5;

export class ArtifactSet {
    constructor(data) {
        this.name  = data.name;
        this.bonus = {};
        this.images = data.images;
        this.iconClass = data.iconClass;
        this.minRarity = data.minRarity;
        this.maxRarity = data.maxRarity;
        this.serializeId = data.serializeId;
        this.goodId = data.goodId;
        this.gameId = data.gameId || 0;
        this.itemIds = data.itemIds || [];
        this.slots = data.slots || [];
        this.postEffects = data.postEffects || [];
        this.iconPiece = data.iconPiece || 'flower';
        this.beta = data.beta || false;
        this.needSuggesterVariant = data.needSuggesterVariant || false;

        if (data.setBonus) {
            for (let i = 1; i <= data.setBonus.length; ++i) {
                if (data.setBonus[i-1]) {
                    this.bonus[i] = data.setBonus[i-1];
                }
            }
        }
    }

    getName(slot) {
        if (slot) {
            return this.name +'_'+ slot;
        }
        return this.name;
    }

    getId() {
        return this.serializeId;
    }

    getGoodId() {
        return this.goodId;
    }

    getImage() {
        return this.iconClass;
    }

    isBeta() {
        return !!this.beta;
    }

    getIconPiece() {
        return this.iconPiece;
    }

    calcStats(pieces) {
        return this.bonus[pieces] || {};
    }

    getStats(pieces, settings) {
        let result = {
            stats: new Stats(),
            settings: {},
        };

        for (let i = 1; i <= pieces; ++i) {
            let bonus = this.bonus[i];
            if (!bonus) {
                break;
            }

            if (bonus.stats) {
                result.stats.concat(bonus.stats);
            }
        }

        return result;
    }

    getConditions(pieces) {
        let result = [];

        for (let i = 1; i <= pieces; ++i) {
            let bonus = this.bonus[i];
            if (!bonus) {
                break;
            }

            if (bonus.conditions) {
                result = result.concat(bonus.conditions);
            }
        }

        return result;
    }

    getPostEffects() {
        return this.postEffects || [];
    }

    getMultipliers(pieces) {
        let result = [];

        for (let i = 1; i <= pieces; ++i) {
            let bonus = this.bonus[i];
            if (!bonus) {
                break;
            }

            if (bonus.multipliers) {
                result = result.concat(bonus.multipliers);
            }
        }

        return result;
    }

    getConditionsByPieces() {
        let result = [];

        for (let i = 1; i <= MAX_SET_SIZE; ++i) {
            let bonus = this.bonus[i];

            if (bonus && bonus.conditions) {
                result[i] = bonus.conditions;
            } else {
                result[i] = [];
            }
        }

        return result;
    }

    getSuggesterData() {
        let result = [];

        for (let i = 1; i <= MAX_SET_SIZE; ++i) {
            let bonus = this.bonus[i];

            if (bonus && bonus.conditions) {
                result[i] = {
                    conditions: bonus.conditions || [],
                    settings: bonus.suggesterSettings,
                };
            } else {
                result[i] = {};
            }
        }

        return result;
    }

    getFeatures(pieces) {
        let result = [];

        for (let i = 1; i <= pieces; ++i) {
            let bonus = this.bonus[i];
            if (!bonus) {
                break;
            }

            if (bonus.features) {
                result = result.concat(bonus.features);
            }
        }

        return result;
    }

    canEquipSlot(slot) {
        if (!slot) {
            return true;
        }

        if (this.slots.length == 0) {
            return true;
        }

        return this.slots.includes(slot);
    }

    availableSlots() {
        return this.slots || [];
    }
}
