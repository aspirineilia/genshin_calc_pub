import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const DarkIronSword = new DbObjectWeapon({
    name: 'dark_iron_sword',
    serializeId: 6,
    gameId: 11304,
    iconClass: "weapon-icon-sword-dark-iron-sword",
    rarity: 3,
    weapon: 'sword',
    statTable: weaponStatTables.DarkIronSword,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_dark_iron_sword',
            serializeId: 1,
            title: 'talent_name.weapon_dark_iron_sword',
            description: 'talent_descr.weapon_dark_iron_sword',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
        })
    ],
});
