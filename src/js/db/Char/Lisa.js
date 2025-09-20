import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Lisa.s1_id,
        title: 'talent_name.lisa_lightning_touch',
        description: 'talent_descr.lisa_lightning_touch',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Lisa.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Lisa.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Lisa.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Lisa.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Lisa.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Lisa.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Lisa.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Lisa.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Lisa.s1.p9),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.Lisa.s2_id,
        title: 'talent_name.lisa_violet_arc',
        description: 'talent_descr.lisa_violet_arc',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Lisa.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Lisa.s2.p7),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Lisa.s2.p1),
            },
            {
                table: new StatTable('lisa_stack_1', charTalentTables.Lisa.s2.p2),
            },
            {
                table: new StatTable('lisa_stack_2', charTalentTables.Lisa.s2.p3),
            },
            {
                table: new StatTable('lisa_stack_3', charTalentTables.Lisa.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Lisa.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Lisa.s3_id,
        title: 'talent_name.lisa_lightning_rose',
        description: 'talent_descr.lisa_lightning_rose',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Lisa.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Lisa.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lisa.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Lisa.s3.p4),
            },
        ],
    },
});

const BurstInitialDmg = 10;
const A4DefReduce = 15;
const C2DefPercent = 25;

export const Lisa = new DbObjectChar({
    name: 'lisa',
    serializeId: 16,
    gameId: 10000006,
    iconClass: "char-icon-lisa",
    rarity: 4,
    element: 'electro',
    weapon: 'catalyst',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Lisa,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'press_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'hold_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'lisa_stack_1',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lisa_stack_1'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'lisa_stack_2',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lisa_stack_2'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'lisa_stack_3',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lisa_stack_3'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'lisa_initial_dmg',
            element: 'electro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    source: 'talent_burst',
                    values: new ValueTable([BurstInitialDmg]),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.lisa_induced_aftershock',
            description: 'talent_descr.lisa_induced_aftershock',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'lisa_static_electricity_field',
            serializeId: 1,
            title: 'talent_name.lisa_static_electricity_field',
            description: 'talent_descr.lisa_static_electricity_field',
            stats: {
                enemy_def_reduce: A4DefReduce,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.lisa_infinite_circuit',
                    description: 'talent_descr.lisa_infinite_circuit',
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'lisa_electromagnetic_field',
                    serializeId: 2,
                    title: 'talent_name.lisa_electromagnetic_field',
                    description: 'talent_descr.lisa_electromagnetic_field',
                    stats: {
                        def_percent: C2DefPercent,
                    }
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_burst_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.lisa_plasma_eruption',
                    description: 'talent_descr.lisa_plasma_eruption',
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_elemental_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.lisa_pulsating_witch',
                    description: 'talent_descr.lisa_pulsating_witch',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.lisa_static_electricity_field',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.lisa_static_electricity_field',
                description: 'talent_descr.lisa_static_electricity_field',
                info: {ascension: 4},
                stats: {
                    enemy_def_reduce: A4DefReduce,
                },
            }),
        ],
    },
});
