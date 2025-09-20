export class DbObjectList {
    constructor(items) {
        this.items = items;
    }

    get(id) {
        return this.items[id];
    }

    getKeys(showBeta) {
        let result = [];

        for (let [key, item] of Object.entries(this.items)) {
            if (showBeta || !item.isBeta || !item.isBeta()) {
                result.push(key);
            }
        }

        return result;
    }

    getList(showBeta) {
        let result = [];

        for (let [key, item] of Object.entries(this.items)) {
            if (showBeta || !item.isBeta || !item.isBeta()) {
                result.push(item);
            }
        }

        return result;
    }

    getKeysSorted(lang, showBeta) {
        let items = [];
        let result = [];
        lang ||= UI.Lang;

        for (const key of this.getKeys(showBeta)) {
            items.push({
                key: key,
                name: lang.get(this.get(key).getName()),
            });
        }

        items = items.sort(function(a, b){
            return a.name.localeCompare(b.name);
        });

        for (const item of items) {
            result.push(item.key);
        }

        return result;
    }

    getFirstId(showBeta) {
        for (let id of this.getKeys(showBeta)) {
            return id;
        }

        return null;
    }

    getFirst(showBeta) {
        return this.get( this.getFirstId(showBeta) );
    }
}
