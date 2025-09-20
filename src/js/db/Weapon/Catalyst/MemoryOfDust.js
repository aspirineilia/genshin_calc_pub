import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { StatTableConditions } from "../../../classes/StatTable/Condition";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MemoryOfDust = new DbObjectWeapon({
    name: 'memory_of_dust',
    serializeId: 48,
    gameId: 14504,
    iconClass: "weapon-icon-catalyst-memory-of-dust",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.MemoryofDust,
    settingsSets: [
        {
            name: 'no_shield',
            settings: {
                "weapon_memory_of_dust": 5,
                "common.char_status_shield": 0,
            },
        },
        {
            name: 'with_shield',
            settings: {
                "weapon_memory_of_dust": 5,
                "common.char_status_shield": 1,
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_golden_majesty',
            description: 'talent_descr.weapon_golden_majesty_passive',
            stats: [
                new StatTable('shield', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_memory_of_dust',
            serializeId: 1,
            title: 'talent_name.weapon_golden_majesty',
            description: 'talent_descr.weapon_golden_majesty',
            maxStacks: 5,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTableConditions(
                    'atk_percent',
                    [4, 5, 6, 7, 8],
                    [
                        new ConditionBoolean({
                            name: 'common.char_status_shield',
                            invert: true,
                        }),
                    ]
                ),
                new StatTableConditions(
                    'atk_percent',
                    [8, 10, 12, 14, 16],
                    [
                        new ConditionBoolean({
                            name: 'common.char_status_shield',
                        }),
                    ]
                ),
            ],
        }),
        new ConditionBoolean({
            name: 'common.char_status_shield',
            serializeId: 2,
            title: 'talent_name.weapon_golden_majesty',
            description: 'talent_descr.weapon_golden_majesty_shield',
        }),
    ],
});
