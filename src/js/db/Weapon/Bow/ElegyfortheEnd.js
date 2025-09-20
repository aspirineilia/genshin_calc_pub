import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const ElegyfortheEnd = new DbObjectWeapon({
    name: 'elegy_for_the_end',
    serializeId: 27,
    gameId: 15503,
    iconClass: "weapon-icon-bow-elegy-for-the-end",
    rarity: 5,
    weapon: 'bow',
    statTable: weaponStatTables.ElegyfortheEnd,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_elegy_for_the_end_passive',
            description: 'talent_descr.weapon_elegy_for_the_end_passive',
            stats: [
                new StatTable('mastery', [60, 75, 90, 105, 120]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_elegy_for_the_end',
            serializeId: 1,
            title: 'talent_name.weapon_elegy_for_the_end',
            description: 'talent_descr.weapon_elegy_for_the_end',
            stats: [
                new StatTable('text_value', [100, 125, 150, 175, 200]),
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
            ],
        }),
    ],
});

