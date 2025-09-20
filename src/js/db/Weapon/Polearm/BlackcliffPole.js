import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BlackcliffPole = new DbObjectWeapon({
    name: 'blackcliff_pole',
    serializeId: 85,
    gameId: 13404,
    iconClass: "weapon-icon-polearm-blackcliff-pole",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.BlackcliffPole,
    settingsSets: [
        {
            name: 'no_stacks',
            settings: {
                "weapon_blackcliff_pole": 0,
            },
        },
        {
            name: 'stacks_3',
            settings: {
                "weapon_blackcliff_pole": 3,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_blackcliff_pole',
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
