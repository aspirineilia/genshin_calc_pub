import { DbObjectEnemy } from "../../classes/DbObject/Enemy";
import { DbObjectListSerialize } from "../../classes/DbObject/List/Serialize";

export const HydroMimics = new DbObjectListSerialize({
    HydroMimicBoar: new DbObjectEnemy({
        name: 'hydro_mimic_boar',
        serializeId: 79,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: -40,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: 15,
            anemo: 15,
            cryo: 15,
            geo: 15,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
    HydroMimicFerret: new DbObjectEnemy({
        name: 'hydro_mimic_ferret',
        serializeId: 80,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: -40,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: 15,
            anemo: 15,
            cryo: 15,
            geo: 15,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
    HydroMimicCrane: new DbObjectEnemy({
        name: 'hydro_mimic_crane',
        serializeId: 81,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: 15,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: -40,
            anemo: 15,
            cryo: 15,
            geo: 15,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
    HydroMimicRaptor: new DbObjectEnemy({
        name: 'hydro_mimic_raptor',
        serializeId: 82,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: 15,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: -40,
            anemo: 15,
            cryo: 15,
            geo: 15,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
    HydroMimicCrab: new DbObjectEnemy({
        name: 'hydro_mimic_crab',
        serializeId: 83,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: 15,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: 15,
            anemo: 15,
            cryo: -40,
            geo: 15,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
    HydroMimicMallard: new DbObjectEnemy({
        name: 'hydro_mimic_mallard',
        serializeId: 84,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: 15,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: 15,
            anemo: 15,
            cryo: -40,
            geo: 15,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
    HydroMimicFinch: new DbObjectEnemy({
        name: 'hydro_mimic_finch',
        serializeId: 85,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: 15,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: 15,
            anemo: 15,
            cryo: 15,
            geo: -40,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
    HydroMimicFrog: new DbObjectEnemy({
        name: 'hydro_mimic_frog',
        serializeId: 86,
        iconClass: "type-elemental enemy-icon-oceanid-underling",
        resistances: {
            phys: 15,
            pyro: 15,
            dendro: 15,
            hydro: 15,
            electro: 15,
            anemo: 15,
            cryo: 15,
            geo: -40,
        },
        settings: {
            enemy_immune_hydro: 1,
        },
    }),
});
