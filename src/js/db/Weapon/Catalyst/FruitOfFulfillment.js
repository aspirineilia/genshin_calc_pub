import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FruitOfFulfillment = new DbObjectWeapon({
    name: 'fruit_of_fulfillment',
    serializeId: 131,
    gameId: 14417,
    iconClass: "weapon-icon-catalyst-fruit-of-fulfillment",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.FruitOfFulfillment,
    conditions: [
        new ConditionStacks({
            name: 'weapon_fruit_of_fulfillment',
            serializeId: 1,
            title: 'talent_name.full_circle',
            description: 'talent_descr.full_circle',
            maxStacks: 5,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [24, 27, 30, 33, 36]),
                new StatTable('atk_percent', [-5]),
            ],
        }),
    ],
});
