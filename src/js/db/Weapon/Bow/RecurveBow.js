import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const RecurveBow = new DbObjectWeapon({
    name: 'recurve_bow',
    serializeId: 32,
    gameId: 15303,
    iconClass: "weapon-icon-bow-recurve-bow",
    rarity: 3,
    weapon: 'bow',
    statTable: weaponStatTables.RecurveBow,
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
