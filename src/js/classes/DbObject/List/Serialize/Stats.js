import { DbObjectListSerialize } from "../Serialize";

export class DbObjectListSerializeStats extends DbObjectListSerialize {
    constructor(items) {
        super(items);
        this.gameIds = {};

        for (const key of this.getKeys()) {
            let item = this.get(key);
            this.gameIds[ item.gameId ] = key;
        }
    }

    getKeyIdGame(id) {
        return this.gameIds[id];
    }

    getByGameId(id) {
        return this.get(this.gameIds[id]);
    }
}
