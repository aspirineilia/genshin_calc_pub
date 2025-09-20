import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const ThrillingTales = new DbObjectWeapon({
    name: 'thrilling_tales_of_dragon_slayers',
    serializeId: 58,
    gameId: 14302,
    iconClass: "weapon-icon-catalyst-thrilling-tales-of-dragon-slayers",
    rarity: 3,
    weapon: 'catalyst',
    statTable: weaponStatTables.ThrillingTalesofDragonSlayers,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_thrilling_tales',
            description: 'talent_descr.weapon_thrilling_tales',
            stats: [
                new StatTable('text_percent', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
});

