import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionEnemyStatus } from "../../classes/Condition/Boolean/EnemyStatus";
import { ConditionBooleanWeaponType } from "../../classes/Condition/Boolean/WeaponType";

export const Enemy = [
    new ConditionDropdownElement({
        name: 'common.enemy_status',
        serializeId: 16,
        title: 'talent_name.enemy_status',
        description: 'talent_descr.enemy_status',
        values: [
            {
                value: 'cryo',
                serializeId: 1,
            },
            {
                value: 'electro',
                serializeId: 2,
            },
            {
                value: 'hydro',
                serializeId: 3,
            },
            {
                value: 'pyro',
                serializeId: 4,
            },
            {
                value: 'geo',
                serializeId: 5,
            },
            {
                value: 'anemo',
                serializeId: 6,
            },
            {
                value: 'dendro',
                serializeId: 7,
            },
        ],
    }),
    new ConditionBoolean({
        name: 'enemy_frozen',
        serializeId: 17,
        title: 'talent_name.enemy_frozen',
        description: 'talent_descr.enemy_frozen',
        hideInactive: true,
        subConditions: [
            new ConditionEnemyStatus({
                status: ['cryo'],
            }),
        ],
    }),
    new ConditionBoolean({
        name: 'enemy_burning',
        serializeId: 19,
        title: 'talent_name.enemy_reaction_burning',
    }),
    // new ConditionBoolean({
    //     name: 'enemy_quicken',
    //     serializeId: 20,
    //     title: 'talent_name.enemy_reaction_quicken',
    // }),
    new ConditionBoolean({
        name: 'enemy.superconduct',
        serializeId: 15,
        title: 'talent_name.enemy_reaction_superconduct',
        description: 'talent_descr.enemy_reaction_superconduct',
        stats: {
            'enemy_res_phys': -40,
        },
    }),
    new ConditionBoolean({
        name: 'enemy_weak_shot',
        serializeId: 18,
        title: 'talent_name.enemy_weak_shot',
        description: 'talent_descr.enemy_weak_shot',
        hideCondition: [
            new ConditionBooleanWeaponType({
                types: ['sword', 'claymore', 'polearm', 'catalyst'],
            }),
        ],
    }),
];
