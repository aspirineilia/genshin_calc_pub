import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const IronSting = new DbObjectWeapon({
    name: 'iron_sting',
    serializeId: 12,
    gameId: 11407,
    iconClass: "weapon-icon-sword-iron-sting",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.IronSting,
    conditions: [
        new ConditionStacks({
            name: 'weapon_iron_sting',
            serializeId: 1,
            title: 'talent_name.weapon_iron_sting',
            description: 'talent_descr.weapon_iron_sting',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_all', [6, 7.5, 9, 10.5, 12]),
            ],
        })
    ],
});
