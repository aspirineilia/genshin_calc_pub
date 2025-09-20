import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Rainslasher = new DbObjectWeapon({
    name: 'rainslasher',
    serializeId: 69,
    gameId: 12405,
    iconClass: "weapon-icon-claymore-rainslasher",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.Rainslasher,
    settingsSets: [
        {
            name: 'enemy_no_status',
            settings: {
                "common.enemy_status": '',
            },
        },
        {
            name: 'enemy_electro',
            settings: {
                "common.enemy_status": 'electro',
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
            title: 'talent_name.weapon_bane_of_storm_and_tide',
            description: 'talent_descr.weapon_bane_of_storm_and_tide',
            stats: [
                new StatTable('dmg_all', [20, 24, 28, 32, 36]),
            ],
            subConditions: [
                new ConditionEnemyStatus({
                    status: ['electro', 'hydro'],
                }),
            ],
        })
    ],
});
