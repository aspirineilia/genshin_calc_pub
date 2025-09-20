import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Cloudforged = new DbObjectWeapon({
    name: 'cloudforged',
    serializeId: 174,
    gameId: 15426,
    iconClass: "weapon-icon-bow-cloudforged",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.Cloudforged,
    conditions: [
        new ConditionStacks({
            name: 'weapon_cloudforged',
            serializeId: 1,
            title: 'talent_name.weapon_cloudforged',
            description: 'talent_descr.weapon_cloudforged',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
});
