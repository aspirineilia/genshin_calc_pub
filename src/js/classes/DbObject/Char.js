import { Condition } from "../Condition";
import { DbObject } from "../DbObject";

export class DbObjectChar extends DbObject {
    constructor(data) {
        super(data);

        this.constellation = data.constellation;
        this.element = data.element;
        this.weapon = data.weapon;
        this.origin = data.origin || '';
        this.partyData = data.partyData;
        this.talents = data.talents;
        this.gameId = [];
        this.depotIds = data.depotIds || [];
        this.priority = data.priority;
        this.priorityConst = data.priorityConst;

        if (Array.isArray(data.gameId)) {
            this.gameId = data.gameId;
        } else if (data.gameId) {
            this.gameId = [data.gameId];
        }

        if (this.partyData && Array.isArray(this.partyData.conditions) && data.serializeId) {
            for (let cond of this.partyData.conditions) {
                cond.entityId = data.serializeId;
            }
        }
    }

    getName() {
        return 'char_name.'+ this.name;
    }

    getIcon() {
        return this.iconClass || 'char-icon-' + this.name.replace('_', '-');
    }

    getGameId() {
        return this.gameId;
    }

    getWeapon() {
        return this.weapon;
    }

    getElement() {
        return this.element;
    }

    getOrigin() {
        return this.origin;
    }

    hasPartyData() {
        return !!this.partyData;
    }

    getAllConditions() {
        let result = this.getConditions();

        if (this.constellation) {
            result = result.concat(this.constellation.getConditions(6));
        }

        return result;
    }

    isLoadParty() {
        return this.partyData && this.partyData.loadStats;
    }

    getPartyConditions() {
        let burst = this.talents.get('burst.energy_cost');
        let result = [];

        if (burst) {
            result.push(
                new Condition({stats: {party_burst_energy_cost: burst.getValue(1)}}),
            );
        }

        if (this.partyData && this.partyData.conditions) {
            result = result.concat(this.partyData.conditions);
        }

        return result;
    }

    getPartyPostEffects() {
        return this.partyData && this.partyData.postEffects || [];
    }

    getPartyMultipliers() {
        return this.partyData && this.partyData.multipliers || [];
    }

    getTalentTable(name) {
        let result;

        if (this.talents) {
            result = this.talents.getCategory(name);
        }

        return result;
    }
}
