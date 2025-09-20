import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionNot } from "../../../classes/Condition/Not";
import { ConditionOr } from "../../../classes/Condition/Or";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Widsith = new DbObjectWeapon({
    name: 'the_widsith',
    serializeId: 50,
    gameId: 14402,
    iconClass: "weapon-icon-catalyst-the-widsith",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.Widsith,
    settingsSets: [
        {
            name: 'widsith_atk',
            settings: {
                weapon_widsith_1: 1,
                weapon_widsith_2: 0,
                weapon_widsith_3: 0,
                weapon_widsith_avg: 0,
            },
        },
        {
            name: 'widsith_eledmg',
            settings: {
                weapon_widsith_1: 0,
                weapon_widsith_2: 1,
                weapon_widsith_3: 0,
                weapon_widsith_avg: 0,
            },
        },
        {
            name: 'widsith_mastery',
            settings: {
                weapon_widsith_1: 0,
                weapon_widsith_2: 0,
                weapon_widsith_3: 1,
                weapon_widsith_avg: 0,
            },
        },
        {
            name: 'widsith_nobonus',
            settings: {
                weapon_widsith_1: 0,
                weapon_widsith_2: 0,
                weapon_widsith_3: 0,
                weapon_widsith_avg: 0,
            },
        },
        // {
        //     name: 'widsith_avg',
        //     settings: {
        //         weapon_widsith_1: 0,
        //         weapon_widsith_2: 0,
        //         weapon_widsith_3: 0,
        //         weapon_widsith_avg: 1,
        //     },
        // },
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.weapon_widsith',
            description: 'talent_descr.weapon_widsith',
        }),
        new ConditionBooleanRefine({
            name: 'weapon_widsith_1',
            serializeId: 1,
            title: 'talent_name.weapon_widsith_1',
            description: 'talent_descr.weapon_widsith_1',
            stats: [
                new StatTable('atk_percent', [60, 75, 90, 105, 120]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionOr([
                        new ConditionBoolean({name: 'weapon_widsith_2'}),
                        new ConditionBoolean({name: 'weapon_widsith_3'}),
                        new ConditionBoolean({name: 'weapon_widsith_avg'}),
                    ]),
                ]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_widsith_2',
            serializeId: 2,
            title: 'talent_name.weapon_widsith_2',
            description: 'talent_descr.weapon_widsith_2',
            stats: [
                new StatTable('dmg_anemo', [48, 60, 72, 84, 96]),
                new StatTable('dmg_electro', [48, 60, 72, 84, 96]),
                new StatTable('dmg_pyro', [48, 60, 72, 84, 96]),
                new StatTable('dmg_cryo', [48, 60, 72, 84, 96]),
                new StatTable('dmg_hydro', [48, 60, 72, 84, 96]),
                new StatTable('dmg_geo', [48, 60, 72, 84, 96]),
                new StatTable('dmg_dendro', [48, 60, 72, 84, 96]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionOr([
                        new ConditionBoolean({name: 'weapon_widsith_3'}),
                        new ConditionBoolean({name: 'weapon_widsith_avg'}),
                    ]),
                ]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_widsith_3',
            serializeId: 3,
            title: 'talent_name.weapon_widsith_3',
            description: 'talent_descr.weapon_widsith_3',
            stats: [
                new StatTable('mastery', [240, 300, 360, 420, 480]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionBoolean({name: 'weapon_widsith_avg'}),
                ]),
            ],
        }),
        // new ConditionBooleanRefine({
        //     name: 'weapon_widsith_avg',
        //     serializeId: 4,
        //     title: 'talent_name.weapon_widsith_avg',
        //     description: 'talent_descr.weapon_widsith_avg',
        //     stats: [
        //         new StatTable('atk_percent', [60/9, 75/9, 90/9, 105/9, 120/9]),
        //         new StatTable('dmg_anemo', [48/9, 60/9, 72/9, 84/9, 96/9]),
        //         new StatTable('dmg_electro', [48/9, 60/9, 72/9, 84/9, 96/9]),
        //         new StatTable('dmg_pyro', [48/9, 60/9, 72/9, 84/9, 96/9]),
        //         new StatTable('dmg_cryo', [48/9, 60/9, 72/9, 84/9, 96/9]),
        //         new StatTable('dmg_hydro', [48/9, 60/9, 72/9, 84/9, 96/9]),
        //         new StatTable('dmg_geo', [48/9, 60/9, 72/9, 84/9, 96/9]),
        //         new StatTable('dmg_dendro', [48/9, 60/9, 72/9, 84/9, 96/9]),
        //         new StatTable('mastery', [240/9, 300/9, 360/9, 420/9, 480/9]),
        //     ],
        // }),
    ],
});
