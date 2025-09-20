import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const RangeGauge = new DbObjectWeapon({
    name: 'range_gauge',
    serializeId: 161,
    gameId: 15427,
    iconClass: 'weapon-icon-bow-range-gauge',
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.RangeGauge,
    conditions: [
        new ConditionStacks({
            name: 'weapon_masons_ditty',
            serializeId: 1,
            title: 'talent_name.weapon_masons_ditty',
            description: 'talent_descr.weapon_masons_ditty',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [3, 4, 5, 6, 7]),
                new StatTable('dmg_anemo', [7, 8.5, 10, 11.5, 13]),
                new StatTable('dmg_geo', [7, 8.5, 10, 11.5, 13]),
                new StatTable('dmg_pyro', [7, 8.5, 10, 11.5, 13]),
                new StatTable('dmg_electro', [7, 8.5, 10, 11.5, 13]),
                new StatTable('dmg_hydro', [7, 8.5, 10, 11.5, 13]),
                new StatTable('dmg_cryo', [7, 8.5, 10, 11.5, 13]),
                new StatTable('dmg_dendro', [7, 8.5, 10, 11.5, 13]),
            ],
        }),
    ],
});
