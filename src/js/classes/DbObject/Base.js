export class DbObjectBase {
    constructor(data) {
        this.name = data.name || '';
        this.icon = data.icon || '';
    }

    getName() {
        return this.name;
    }

    getIcon() {
        return this.icon;
    }
}
