
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanChar } from "../../../classes/Condition/Boolean/Char";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Predator = new DbObjectWeapon({
    name: 'predator',
    serializeId: 111,
    gameId: 15415,
    iconClass: "weapon-icon-bow-predator",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.Predator,
    conditions: [
        new ConditionBoolean({
            name: 'common.ps_network',
            serializeId: 1,
            title: 'talent_name.ps_network',
            description: 'talent_descr.ps_network',
        }),
        new ConditionStatic({
            // title: 'talent_name.weapon_predator',
            title: 'weapon_name.predator',
            description: 'talent_descr.weapon_predator_1',
            stats: {
                atk: 66,
            },
            subConditions: [
                new ConditionBooleanChar({
                    chars: ['aloy'],
                }),
                new ConditionBoolean({
                    name: 'common.ps_network',
                }),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_predator',
            serializeId: 2,
            // title: 'talent_name.weapon_predator',
            title: 'weapon_name.predator',
            description: 'talent_descr.weapon_predator_2',
            maxStacks: 2,
            stats: [
                new StatTable('dmg_normal', [10]),
                new StatTable('dmg_charged', [10]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'common.ps_network',
                }),
            ],
        }),
    ],
});
