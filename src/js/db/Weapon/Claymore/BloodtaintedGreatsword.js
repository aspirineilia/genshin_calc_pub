import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BloodtaintedGreatsword = new DbObjectWeapon({
    name: 'bloodtainted_greatsword',
    serializeId: 75,
    gameId: 12302,
    iconClass: "weapon-icon-claymore-bloodtainted-greatsword",
    rarity: 3,
    weapon: 'claymore',
    statTable: weaponStatTables.BloodtaintedGreatsword,
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
                new StatTable('dmg_all', [12, 15, 18, 21, 24]),
            ],
            subConditions: [
                new ConditionEnemyStatus({
                    status: ['pyro', 'electro'],
                }),
            ],
        }),
    ],
});
