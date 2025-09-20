import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const WhiteIronGreatsword = new DbObjectWeapon({
    name: 'white_iron_greatsword',
    serializeId: 79,
    gameId: 12303,
    iconClass: "weapon-icon-claymore-white-iron-greatsword",
    rarity: 3,
    weapon: 'claymore',
    statTable: weaponStatTables.WhiteIronGreatsword,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_cull_the_weal',
            description: 'talent_descr.weapon_cull_the_weal',
            stats: [
                new StatTable('text_percent', [8, 10, 12, 14, 16]),
            ],
        }),
    ],
});
