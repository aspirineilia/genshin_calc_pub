import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const DragonsBane = new DbObjectWeapon({
    name: 'dragons_bane',
    serializeId: 88,
    gameId: 13401,
    iconClass: "weapon-icon-polearm-dragons-bane",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.DragonsBane,
    settingsSets: [
        {
            name: 'enemy_no_status',
            settings: {
                "common.enemy_status": '',
            },
        },
        {
            name: 'enemy_pyro',
            settings: {
                "common.enemy_status": 'pyro',
            },
        },
        {
            name: 'enemy_hydro',
            settings: {
                "common.enemy_status": 'hydro',
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            serializeId: 1,
            title: 'talent_name.weapon_bane_flame_water',
            description: 'talent_descr.weapon_bane_flame_water',
            stats: [
                new StatTable('dmg_all', [20, 24, 28, 32, 36]),
            ],
            subConditions: [
                new ConditionEnemyStatus({
                    status: ['pyro', 'hydro'],
                }),
            ],
        }),
    ],
});
