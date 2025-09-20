import { DbObjectList } from "../List";

export class DbObjectListHierarchy extends DbObjectList {
    getById(id) {
        for (const key of this.getKeys()) {
            let item = this.get(key).getById(id);

            if (item) {
                return item;
            }
        }

        return null;
    }

    getByGameId(id) {
        for (const key of this.getKeys()) {
            let item = this.get(key).getByGameId(id);

            if (item) {
                return item;
            }
        }

        return null;
    }

    getList(showBeta) {
        let items = [];

        for (const type of this.getKeys(showBeta)) {
            items = items.concat(this.get(type).getList(showBeta));
        }

        return items;
    }
}
