import { DbObjectBase } from "./Base";

export class DbObjectElement extends DbObjectBase {
    constructor(data) {
        super(data)
        this.playable = data.playable ? true : false;
    }

    isPlayable() {
        return this.playable;
    }
}
