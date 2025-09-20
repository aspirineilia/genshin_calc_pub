import { DbObjectListSerialize } from "../../classes/DbObject/List/Serialize";

export const Slots = new DbObjectListSerialize({
    flower: {
        serializeId: 1,
        mainStats: ['hp'],
    },
    plume: {
        serializeId: 2,
        mainStats: ['atk'],
    },
    sands: {
        serializeId: 3,
        mainStats: ['atk_percent', 'def_percent', 'hp_percent', 'mastery', 'recharge'],
    },
    goblet: {
        serializeId: 4,
        mainStats: ['atk_percent', 'def_percent', 'hp_percent', 'mastery', 'dmg_phys', 'dmg_electro', 'dmg_anemo', 'dmg_geo', 'dmg_pyro', 'dmg_cryo', 'dmg_hydro', 'dmg_dendro'],
    },
    circlet: {
        serializeId: 5,
        mainStats: ['atk_percent', 'def_percent', 'hp_percent', 'mastery', 'crit_rate', 'crit_dmg', 'healing'],
    },
});
