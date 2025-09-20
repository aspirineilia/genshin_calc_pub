import { DbObjectList } from "../List";

export class DbObjectListEnemies extends DbObjectList {
    getById(id) {
        for (const key of this.getKeys()) {
            let enemy = this.get(key).getById(id);

            if (enemy) {
                return enemy;
            }
        }

        return null;
    }

    getList() {
        let items = [];

        for (const type of this.getKeys()) {
            items = items.concat(this.get(type).getList());
        }

        return items;
    }
}
