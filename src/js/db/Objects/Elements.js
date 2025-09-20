import { DbObjectElement } from "../../classes/DbObject/Element";
import { DbObjectList } from "../../classes/DbObject/List";

export const Elements = new DbObjectList({
    phys: new DbObjectElement({
        name: 'phys',
        icon: '',
        playable: false,
    }),
    pyro: new DbObjectElement({
        name: 'pyro',
        icon: 'element-pyro',
        playable: true,
    }),
    cryo: new DbObjectElement({
        name: 'cryo',
        icon: 'element-cryo',
        playable: true,
    }),
    electro: new DbObjectElement({
        name: 'electro',
        icon: 'element-electro',
        playable: true,
    }),
    hydro: new DbObjectElement({
        name: 'hydro',
        icon: 'element-hydro',
        playable: true,
    }),
    anemo: new DbObjectElement({
        name: 'anemo',
        icon: 'element-anemo',
        playable: true,
    }),
    geo: new DbObjectElement({
        name: 'geo',
        icon: 'element-geo',
        playable: true,
    }),
    dendro: new DbObjectElement({
        name: 'dendro',
        icon: 'element-dendro',
        playable: true,
    }),
});
