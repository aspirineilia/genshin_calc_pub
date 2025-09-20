import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkyriderGreatsword = new DbObjectWeapon({
    name: 'skyrider_greatsword',
    serializeId: 78,
    gameId: 12306,
    iconClass: "weapon-icon-claymore-skyrider-greatsword",
    rarity: 3,
    weapon: 'claymore',
    statTable: weaponStatTables.SkyriderGreatsword,
    conditions: [
        new ConditionStacks({
            name: 'weapon_skyrider_greatsword',
            serializeId: 1,
            title: 'talent_name.weapon_courage',
            description: 'talent_descr.weapon_courage',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [6, 7, 8, 9, 10]),
            ],
        })
    ],
});
