import { CharInfoLock } from "../CharInfo/Lock";
import { CharList } from "../CharList";

export class CharListLock extends CharList {
    initCharWidget() {
        this.charWidget = new CharInfoLock(this.opts);
    }

    isVisible(data) {
        return data.artifacts.hasEquipped();
    }
}
