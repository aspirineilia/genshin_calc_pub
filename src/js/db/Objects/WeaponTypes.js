import { DbObjectBase } from "../../classes/DbObject/Base";
import { DbObjectList } from "../../classes/DbObject/List";

export const WeaponTypes = new DbObjectList({
    sword: new DbObjectBase({
        name: 'sword',
        icon: 'weapon-type-sword',
    }),
    polearm: new DbObjectBase({
        name: 'polearm',
        icon: 'weapon-type-polearm',
    }),
    claymore: new DbObjectBase({
        name: 'claymore',
        icon: 'weapon-type-claymore',
    }),
    bow: new DbObjectBase({
        name: 'bow',
        icon: 'weapon-type-bow',
    }),
    catalyst: new DbObjectBase({
        name: 'catalyst',
        icon: 'weapon-type-catalyst',
    }),
})
