import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MappaMare = new DbObjectWeapon({
    name: 'mappa_mare',
    serializeId: 54,
    gameId: 14407,
    iconClass: "weapon-icon-catalyst-mappa-mare",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.MappaMare,
    conditions: [
        new ConditionStacks({
            name: 'weapon_mappa_mare',
            serializeId: 1,
            title: 'talent_name.weapon_mappa_mare',
            description: 'talent_descr.weapon_mappa_mare',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_anemo', [8, 10, 12, 14, 16]),
                new StatTable('dmg_geo', [8, 10, 12, 14, 16]),
                new StatTable('dmg_pyro', [8, 10, 12, 14, 16]),
                new StatTable('dmg_electro', [8, 10, 12, 14, 16]),
                new StatTable('dmg_hydro', [8, 10, 12, 14, 16]),
                new StatTable('dmg_cryo', [8, 10, 12, 14, 16]),
                new StatTable('dmg_dendro', [8, 10, 12, 14, 16]),
            ],
        }),
    ]
});
