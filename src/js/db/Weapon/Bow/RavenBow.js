import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const RavenBow = new DbObjectWeapon({
    name: 'raven_bow',
    serializeId: 31,
    gameId: 15301,
    iconClass: "weapon-icon-bow-raven-bow",
    rarity: 3,
    weapon: 'bow',
    statTable: weaponStatTables.RavenBow,
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
            title: 'talent_name.weapon_bane_of_flame_and_water',
            description: 'talent_descr.weapon_bane_of_flame_and_water',
            stats: [
                new StatTable('dmg_all', [12, 15, 18, 21, 24]),
            ],
            subConditions: [
                new ConditionEnemyStatus({
                    status: ['pyro', 'hydro'],
                }),
            ],
        })
    ],
});

