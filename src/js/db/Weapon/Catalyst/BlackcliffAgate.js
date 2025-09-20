import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BlackcliffAgate = new DbObjectWeapon({
    name: 'blackcliff_agate',
    serializeId: 56,
    gameId: 14408,
    iconClass: "weapon-icon-catalyst-blackcliff-agate",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.BlackcliffAgate,
    settingsSets: [
        {
            name: 'no_stacks',
            settings: {
                "weapon_blackcliff_agate": 0,
            },
        },
        {
            name: 'stacks_3',
            settings: {
                "weapon_blackcliff_agate": 3,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_blackcliff_agate',
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

