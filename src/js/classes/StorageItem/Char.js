import { CalcSet } from "../CalcSet";
import { Serializer } from "../Serializer";
import { StorageItem } from "../StorageItem";

export class StorageItemChar extends StorageItem {
    constructor() {
        super('char');
    }

    decodeItem(string) {
        let input = Serializer.unpack(string);
        if (!input) return null;

        return CalcSet.deserialize(input);
    }

    itemHash(item) {
        return item.data +'-'+ (item.title || '');
    }

    savedHashes() {
        let result = {};

        for (let item of this.listDecoded(1)) {
            let char = item.data.getChar().object;

            for (const [slot, art] of Object.entries(item.data.getArtifacts())) {
                if (art) {
                    let hash = art.getHash();
                    if (!result[hash]) {
                        result[hash] = []
                    }

                    let icon = char.getIcon();
                    if (!result[hash].includes(icon)) {
                        result[hash].push(icon);
                    }
                }
            }
        }

        return result;
    }

    addChars(items) {
        let hashes = {};

        for (let char of this.items) {
            hashes[char.data] = 1;
        }

        for (let data of items) {
            let char = data.set;
            let hash = char.getHash();

            if (hash && !hashes[hash]) {
                this.add(char, {});
            }
        }
    }
}
