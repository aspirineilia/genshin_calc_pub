import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BlackcliffWarbow = new DbObjectWeapon({
    name: 'blackcliff_warbow',
    serializeId: 25,
    gameId: 15408,
    iconClass: "weapon-icon-bow-blackcliff-warbow",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.BlackcliffWarbow,
    settingsSets: [
        {
            name: 'no_stacks',
            settings: {
                "weapon_blackcliff_warbow": 0,
            },
        },
        {
            name: 'stacks_3',
            settings: {
                "weapon_blackcliff_warbow": 3,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_blackcliff_warbow',
            serializeId: 1,
            title: 'talent_name.weapon_press_the_advantage',
            description: 'talent_descr.weapon_press_the_advantage',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [12, 15, 18, 21, 24]),
            ],
        })
    ],
});
