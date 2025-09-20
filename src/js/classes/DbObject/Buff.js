import { DbObject } from "../DbObject";

export class DbObjectBuff extends DbObject {
    constructor(data) {
        super(data);
        this.type = data.type || '';
        this.visible = !data.invisible;
    }

    getType() {
        return this.type;
    }

    getName() {
        return 'buff_group.'+ this.name;
    }

    isVisible() {
        return this.visible;
    }
}
