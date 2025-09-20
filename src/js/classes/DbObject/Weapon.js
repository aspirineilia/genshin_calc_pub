import {DbObject} from "../DbObject";

export class DbObjectWeapon extends DbObject {
    constructor(data) {
        super(data);
        this.gameId = data.gameId;
        this.refineTable = data.refineTable || [];
        this.weapon = data.weapon;
        this.settingsSets = data.settingsSets || [];
    }

    getName() {
        return 'weapon_name.'+ this.name;
    }

    getType() {
        return this.weapon;
    }

    getGameId() {
        return this.gameId;
    }

    getSuggesterSettings() {
        return this.settingsSets;
    }
}
