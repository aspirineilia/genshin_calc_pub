import { DbObjectList } from "../List";

export class DbObjectListWeapons extends DbObjectList {
    getById(id) {
        for (const key of this.getKeys()) {
            let weapon = this.get(key).getById(id);

            if (weapon) {
                return weapon;
            }
        }

        return null;
    }
}
