import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const LionsRoar = new DbObjectWeapon({
    name: 'lions_roar',
    serializeId: 13,
    gameId: 11405,
    iconClass: "weapon-icon-sword-lions-roar",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.LionsRoar,
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
            name: 'enemy_electro',
            settings: {
                "common.enemy_status": 'electro',
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            serializeId: 1,
            title: 'talent_name.weapon_bane_of_fire_and_thunder',
            description: 'talent_descr.weapon_bane_of_fire_and_thunder',
            stats: [
                new StatTable('dmg_all', [20, 24, 28, 32, 36]),
            ],
            subConditions: [
                new ConditionEnemyStatus({
                    status: ['pyro', 'electro'],
                }),
            ],
        })
    ],
});
