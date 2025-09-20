import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const OtherworldlyStory = new DbObjectWeapon({
    name: 'otherworldly_story',
    serializeId: 59,
    gameId: 14303,
    iconClass: "weapon-icon-catalyst-otherworldly-story",
    rarity: 3,
    weapon: 'catalyst',
    statTable: weaponStatTables.OtherworldlyStory,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_otherworldly_story',
            description: 'talent_descr.weapon_otherworldly_story',
            stats: [
                new StatTable('text_percent_hp', [1, 1.25, 1.5, 1.75, 2]),
            ],
        }),
    ],
});

