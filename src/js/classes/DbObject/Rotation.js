export class DbObjectRotation {
    constructor(data) {
        this.byName = data;
        this.byId = {};

        for (const key of Object.keys(data)) {
            this.byId[data[key]] = key;
        }
    }

    getById(id) {
        return this.byId[id];
    }

    getByName(name) {
        return this.byName[name];
    }

    listNames() {
        return Object.keys(this.byName)
    }
}
