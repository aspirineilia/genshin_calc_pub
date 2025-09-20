import { DbObjectListSerialize } from "./Serialize";

export class DbObjectListArtifactSets extends DbObjectListSerialize {
    constructor(items) {
        super(items);
        this.itemToSet = {};

        for (const key of this.getKeys(1)) {
            let item = this.get(key);
            item.key = key;
            for (let itemId of item.itemIds) {
                this.itemToSet[itemId] = key;
            }
        }
    }

    getKeyByItem(id) {
        return this.itemToSet[id];
    }
}
