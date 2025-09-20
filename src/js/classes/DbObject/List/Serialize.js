import { DbObjectList } from "../List";

export class DbObjectListSerialize extends DbObjectList {
    constructor(items) {
        super(items);
        this.ids = {};
        this.good = {};

        for (const key of this.getKeys(true)) {
            let item = this.get(key);
            this.ids[ item.serializeId ] = key;

            if (item.goodId) {
                this.good[ item.goodId ] = key;
            }
        }
    }

    getId(id) {
        let item = this.get(id);

        if (item) {
            return item.serializeId;
        }

        return 0;
    }

    getIds() {
        return Object.keys(this.ids).map((i) => {return parseInt(i)});
    }

    getKeyId(id) {
        return this.ids[id];
    }

    getKeyIdGood(id) {
        return this.good[id];
    }

    getById(id) {
        let key = this.ids[id];

        if (key) {
            return this.get(key);
        }

        return null;
    }

    getByGoodId(id) {
        let key = this.good[id];

        if (key) {
            return this.get(key);
        }

        return null;
    }
}
