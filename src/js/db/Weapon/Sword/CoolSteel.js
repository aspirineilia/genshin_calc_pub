import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CoolSteel = new DbObjectWeapon({
    name: 'cool_steel',
    serializeId: 5,
    gameId: 11301,
    iconClass: "weapon-icon-sword-cool-steel",
    rarity: 3,
    weapon: 'sword',
    statTable: weaponStatTables.CoolSteel,
    settingsSets: [
        {
            name: 'enemy_no_status',
            settings: {
                "common.enemy_status": '',
            },
        },
        {
            name: 'enemy_cryo',
            settings: {
                "common.enemy_status": 'cryo',
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
            title: 'talent_name.weapon_bane_of_water_and_ice',
            description: 'talent_descr.weapon_bane_of_water_and_ice',
            stats: [
                new StatTable('dmg_all', [12, 15, 18, 21, 24]),
            ],
            subConditions: [
                new ConditionEnemyStatus({
                    status: ['cryo', 'hydro'],
                }),
            ],
        })
    ],
});
