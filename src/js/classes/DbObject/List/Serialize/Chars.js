import { DbObjectListSerialize } from "../Serialize";

export class DbObjectListSerializeChars extends DbObjectListSerialize {
    getByGameId(id, subid) {
        let foundChars = [];

        for (const key of this.getKeys()) {
            let item = this.get(key);
            if (item.gameId.includes(id)) {
                foundChars.push(item)
            }
        }

        if (foundChars.length <= 1) {
            return foundChars[0];
        }

        for (let char of foundChars) {
            if (char.depotIds.includes(subid)) {
                return char;
            }
        }

        return;
    }
}
