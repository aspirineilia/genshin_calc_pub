import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BlackcliffSlasher = new DbObjectWeapon({
    name: 'blackcliff_slasher',
    serializeId: 65,
    gameId: 12408,
    iconClass: "weapon-icon-claymore-blackcliff-slasher",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.BlackcliffSlasher,
    settingsSets: [
        {
            name: 'no_stacks',
            settings: {
                "weapon_blackcliff_slasher": 0,
            },
        },
        {
            name: 'stacks_3',
            settings: {
                "weapon_blackcliff_slasher": 3,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_blackcliff_slasher',
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

