import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionNot } from "../../../classes/Condition/Not";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BeaconOfTheReedSea = new DbObjectWeapon({
    name: 'beacon_of_the_reed_sea',
    serializeId: 143,
    gameId: 12511,
    iconClass: "weapon-icon-claymore-beacon-of-the-reed-sea",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.BeaconOfTheReedSea,
    settingsSets: [
        {
            name: 'stacks_1',
            settings: {
                "beacon_of_the_reed_sea": 1,
            },
        },
        {
            name: 'stacks_2',
            settings: {
                "beacon_of_the_reed_sea": 2,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'beacon_of_the_reed_sea',
            serializeId: 1,
            title: 'talent_name.beacon_of_the_reed_sea',
            description: 'talent_descr.beacon_of_the_reed_sea_1',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionBoolean({
            name: 'common.char_status_shield',
            serializeId: 2,
            title: 'buffs_name.resonance_geo_shield',
        }),
        new ConditionStaticRefine({
            title: 'talent_name.beacon_of_the_reed_sea',
            description: 'talent_descr.beacon_of_the_reed_sea_2',
            stats: [
                new StatTable('hp_percent', [32, 40, 48, 56, 64]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionBoolean({name: 'common.char_status_shield'}),
                ]),
            ],
        }),
    ],
});

