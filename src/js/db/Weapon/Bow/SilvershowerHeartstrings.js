import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionDropdown } from "../../../classes/Condition/Dropdown";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SilvershowerHeartstrings = new DbObjectWeapon({
    name: 'silvershower_heartstrings',
    serializeId: 175,
    gameId: 15513,
    iconClass: "weapon-icon-bow-silvershower-heartstrings",
    rarity: 5,
    weapon: 'bow',
    statTable: weaponStatTables.SilvershowerHeartstrings,
    conditions: [
        new ConditionDropdown({
            name: 'weapon_silvershower_heartstrings',
            serializeId: 1,
            title: 'talent_name.weapon_silvershower_heartstrings',
            description: 'talent_descr.weapon_silvershower_heartstrings_1',
            suggesterValue: 3,
            values: [
                {
                    title: 1,
                    value: 1,
                    serializeId: 1,
                    conditions: [
                        new ConditionStaticRefine({
                            stats: [
                                new StatTable('hp_percent', [12, 15, 18, 21, 24]),
                            ],
                        }),
                    ],
                },
                {
                    title: 2,
                    value: 2,
                    serializeId: 2,
                    conditions: [
                        new ConditionStaticRefine({
                            stats: [
                                new StatTable('hp_percent', [24, 30, 36, 42, 48]),
                            ],
                        }),
                    ],
                },
                {
                    title: 3,
                    value: 3,
                    serializeId: 3,
                    conditions: [
                        new ConditionStaticRefine({
                            stats: [
                                new StatTable('hp_percent', [40, 50, 60, 70, 80]),
                            ],
                        }),
                    ],
                },
            ],
        }),
        new ConditionBooleanValue({
            title: 'talent_name.weapon_silvershower_heartstrings',
            description: 'talent_descr.weapon_silvershower_heartstrings_2',
            levelSetting: 'weapon_refine',
            cond: 'ge',
            value: 3,
            setting: 'weapon_silvershower_heartstrings',
            stats: [
                new StatTable('crit_rate_burst', [28, 35, 42, 49, 56]),
            ],
        }),
    ],
});
