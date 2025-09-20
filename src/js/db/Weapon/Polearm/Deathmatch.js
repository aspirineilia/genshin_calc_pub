import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Deathmatch = new DbObjectWeapon({
    name: 'deathmatch',
    serializeId: 87,
    gameId: 13405,
    iconClass: "weapon-icon-polearm-deathmatch",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.Deathmatch,
    settingsSets: [
        {
            name: 'deathmatch_def',
            settings: {
                weapon_deathmatch: 0,
            },
        },
        {
            name: 'deathmatch_atk',
            settings: {
                weapon_deathmatch: 1,
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_deathmatch_1',
            description: 'talent_descr.weapon_deathmatch_1',
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
                new StatTable('def_percent', [16, 20, 24, 28, 32]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_deathmatch',
                    invert: true,
                }),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_deathmatch',
            serializeId: 1,
            title: 'talent_name.weapon_deathmatch_2',
            description: 'talent_descr.weapon_deathmatch_2',
            stats: [
                new StatTable('atk_percent', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
});

