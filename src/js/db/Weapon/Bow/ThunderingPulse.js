import { ConditionDropdown } from "../../../classes/Condition/Dropdown";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const ThunderingPulse = new DbObjectWeapon({
    name: 'thundering_pulse',
    serializeId: 102,
    gameId: 15509,
    iconClass: "weapon-icon-bow-thundering-pulse",
    rarity: 5,
    weapon: 'bow',
    statTable: weaponStatTables.ThunderingPulse,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_thundering_pulse',
            description: 'talent_descr.weapon_thundering_pulse',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionDropdown({
            name: 'weapon_thundering_pulse_2',
            serializeId: 1,
            title: 'talent_name.weapon_thundering_pulse',
            description: 'talent_descr.weapon_thundering_pulse_2',
            suggesterValue: 3,
            values: [
                {
                    title: 1,
                    value: 1,
                    serializeId: 1,
                    conditions: [
                        new ConditionStaticRefine({
                            stats: [
                                new StatTable('dmg_normal', [12, 16, 18, 21, 24]),
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
                                new StatTable('dmg_normal', [24, 30, 36, 42, 48]),
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
                                new StatTable('dmg_normal', [40, 50, 60, 70, 80]),
                            ],
                        }),
                    ],
                },
            ],
        }),
    ],
});
