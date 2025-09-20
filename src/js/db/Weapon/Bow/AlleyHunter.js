import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const AlleyHunter = new DbObjectWeapon({
    name: 'alley_hunter',
    serializeId: 23,
    gameId: 15410,
    iconClass: "weapon-icon-bow-alley-hunter",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.AlleyHunter,
    conditions: [
        new ConditionStacks({
            name: 'weapon_alley_hunter',
            serializeId: 1,
            title: 'talent_name.weapon_alley_hunter',
            description: 'talent_descr.weapon_alley_hunter',
            maxStacks: 10,
            levelSetting: 'weapon_refine',
            dropdownClass: 'two-digits',
            stats: [
                new StatTable('dmg_all', [2, 2.5, 3, 3.5, 4]),
                new StatTable('text_percent_max', [20, 25, 30, 35, 40]),
                new StatTable('text_percent_reduce', [4, 5, 6, 7, 8]),
            ],
        })
    ],
});
