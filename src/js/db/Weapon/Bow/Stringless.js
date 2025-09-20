import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Stringless = new DbObjectWeapon({
    name: 'the_stringless',
    serializeId: 39,
    gameId: 15402,
    iconClass: "weapon-icon-bow-the-stringless",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.Stringless,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_stringless',
            description: 'talent_descr.weapon_stringless',
            stats: [
                new StatTable('dmg_burst', [24, 30, 36, 42, 48]),
                new StatTable('dmg_skill', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
});
