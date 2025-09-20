import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const TomeoftheEternalFlow = new DbObjectWeapon({
    name: 'tome_of_the_eternal_flow',
    serializeId: 164,
    gameId: 14514,
    iconClass: "weapon-icon-catalyst-tome-of-the-eternal-flow",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.TomeoftheEternalFlow,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_tome_of_the_eternal_flow',
            description: 'talent_descr.weapon_tome_of_the_eternal_flow_1',
            stats: [
                new StatTable('hp_percent', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_tome_of_the_eternal_flow',
            serializeId: 1,
            title: 'talent_name.weapon_tome_of_the_eternal_flow',
            description: 'talent_descr.weapon_tome_of_the_eternal_flow_2',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_charged', [14, 18, 22, 26, 30]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_tome_of_the_eternal_flow',
            description: 'talent_descr.weapon_tome_of_the_eternal_flow_3',
            stats: [
                new StatTable('text_value', [8, 9, 10, 11, 12]),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'weapon_tome_of_the_eternal_flow',
                    cond: 'ge',
                    value: 3,
                }),
            ],
        }),
    ],
});

