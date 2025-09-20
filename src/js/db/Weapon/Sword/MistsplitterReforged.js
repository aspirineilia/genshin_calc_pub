import { ConditionDropdown } from "../../../classes/Condition/Dropdown";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MistsplitterReforged = new DbObjectWeapon({
    name: 'mistsplitter_reforged',
    serializeId: 101,
    gameId: 11509,
    iconClass: "weapon-icon-sword-mistsplitter-reforged",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.MistsplitterReforged,
    settingsSets: [
        {
            name: 'stacks_2',
            settings: {
                weapon_mistsplitters_reforged: 2,
            },
        },
        {
            name: 'stacks_3',
            settings: {
                weapon_mistsplitters_reforged: 3,
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_mistsplitters_reforged',
            description: 'talent_descr.weapon_mistsplitters_reforged_1',
            stats: [
                new StatTable('dmg_anemo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_geo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_pyro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_electro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_hydro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_cryo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_dendro', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionDropdown({
            name: 'weapon_mistsplitters_reforged',
            serializeId: 1,
            title: 'talent_name.weapon_mistsplitters_reforged',
            description: 'talent_descr.weapon_mistsplitters_reforged_2',
            suggesterValue: 3,
            values: [
                {
                    title: 1,
                    value: 1,
                    serializeId: 1,
                    conditions: [
                        new ConditionStaticRefine({
                            stats: [
                                new StatTable('dmg_own', [8, 10, 12, 14, 16]),
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
                                new StatTable('dmg_own', [16, 20, 24, 28, 32]),
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
                                new StatTable('dmg_own', [28, 35, 42, 49, 56]),
                            ],
                        }),
                    ],
                },
            ],
        }),
    ],
});
