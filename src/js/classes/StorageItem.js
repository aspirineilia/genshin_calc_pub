import { Serializer } from "./Serializer";

export class StorageItem {
    constructor(keyName) {
        this.keyName = keyName;
        this.items = [];

        this.reload();
    }

    list() {
        return this.items;
    }

    listDecoded(show_beta) {
        let result = [];

        for (let i in this.items) {
            let item = this.items[i];
            let data = this.decodeItem(item.data);

            if (data) {
                if (!show_beta && data.hasBetaContent && data.hasBetaContent()) {
                    continue;
                }

                let ni = Object.assign({}, item);
                ni.data = data;
                ni.index = i;
                ni.hash = item.data;

                result.push(ni);
            }
        }

        return result;
    }

    remove(index) {
        if (this.error) return;
        if (index === undefined) return;

        if (this.items[index]) {
            let deleted = this.items.splice(index, 1);

            if (deleted.length) {
                this.save();
            }
        }
    }

    replace(index, object) {
        if (this.error) return null;

        if (this.items[index]) {
            this.items[index].data = Serializer.pack(object);
            this.save();
        }
    }

    get(index) {
        let item = this.items[index];
        if (item && item.data) {
            return item;
        }
        return null;
    }

    getItem(index) {
        let item = this.items[index];
        if (item && item.data) {
            return this.decodeItem(item.data);
        }
        return null;
    }

    setTitle(index, title) {
        if (this.error) return null;

        if (this.items[index]) {
            this.items[index].title = title;
            this.save();
        }
    }

    add(object, meta) {
        if (this.error) return null;

        let item = Object.assign({}, meta);
        if (!item) return null;

        item.data = Serializer.pack(object);
        delete item.hash;
        if (!item.data) return null;

        this.items.push(item);
        this.save();
    }

    save() {
        if (this.error) return null;

        let data = packSafe(this.items);
        if (!data) return null;

        localStorage.setItem(this.keyName, data);
    }

    clear() {
        let old = this.items;
        this.items = [];
        this.save();
        return old;
    }

    restore(old) {
        this.items = old;
    }

    reload() {
        let string = this.getString();
        this.items = [];

        if (string) {
            let json = this.parseString(string);
            if (!json) {
                this.error = true;
                return;
            }

            if (Array.isArray(json)) {
                for (let jsonItem of json) {
                    let validItem = this.validateItem(jsonItem);
                    if (validItem) {
                        this.items.push(validItem);
                    }
                }
            }
        }
    }

    validateItem(item) {
        return item;
    }

    getString() {
        if (this.keyName) {
            return localStorage.getItem(this.keyName);
        }
        return '';
    }

    parseString(string) {
        return parseSafe(string);
    }

    itemHash(item) {
        return item.data;
    }

    fromBackup(newItems, append) {
        if (!Array.isArray(newItems)) return;

        let oldItems = this.items;
        let exist = {};

        try {
            if (!append) {
                this.items = [];
            } else {
                for (const item of this.list()) {
                    exist[this.itemHash(item)] = 1;
                }
            }

            for (const item of newItems) {
                if (exist[item.data]) continue;

                let obj = this.decodeItem(item.data);
                if (obj) {
                    exist[this.itemHash(item)] = 1;
                    let meta = Object.assign({}, item);
                    delete meta.data;
                    this.add(obj, meta);
                }
            }

            this.save();
        } catch {
            this.items = oldItems
        }
    }
}

function packSafe(data) {
    let result;
    try {
        result = JSON.stringify(data);
    } catch(e) {
        console.log(e);
    }

    return result;
}

function parseSafe(string) {
    let result;
    try {
        result = JSON.parse(string);
    } catch(e) {
        console.log(e);
    }

    return result;
}
