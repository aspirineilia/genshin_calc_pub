import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionCalcOrigin } from "../../classes/Condition/CalcOrigin";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticLevel } from "../../classes/Condition/Static/Level";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Charlotte.s1_id,
        title: 'talent_name.charlotte_cool_color_capture',
        description: 'talent_descr.charlotte_cool_color_capture',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Charlotte.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Charlotte.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Charlotte.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Charlotte.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Charlotte.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Charlotte.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Charlotte.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Charlotte.s1.p8),
            },
            {
                table: new StatTable('spiritbreath_thorn_dmg', charTalentTables.Charlotte.s1.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('spiritbreath_thorn_interval', charTalentTables.Charlotte.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Charlotte.s2_id,
        title: 'talent_name.charlotte_freezing_point_composition',
        description: 'talent_descr.charlotte_freezing_point_composition',
        items: [
            {
                table: new StatTable('charlotte_photo_press_dmg', charTalentTables.Charlotte.s2.p1),
            },
            {
                table: new StatTable('charlotte_photo_hold_dmg', charTalentTables.Charlotte.s2.p2),
            },
            {
                table: new StatTable('charlotte_snappy_silhouette_mark_dmg', charTalentTables.Charlotte.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('charlotte_snappy_silhouette_interval', charTalentTables.Charlotte.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('charlotte_snappy_silhouette_duration', charTalentTables.Charlotte.s2.p5),
            },
            {
                table: new StatTable('charlotte_focused_impression_mark_dmg', charTalentTables.Charlotte.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('charlotte_focused_impression_interval', charTalentTables.Charlotte.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('charlotte_focused_impression_duration', charTalentTables.Charlotte.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Charlotte.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('charlotte_finisher_frame_cast_cd', charTalentTables.Charlotte.s2.p10),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Charlotte.s3_id,
        title: 'talent_name.charlotte_comprehensive_confirmation',
        description: 'talent_descr.charlotte_comprehensive_confirmation',
        items: [
            {
                type: 'shield',
                table: [
                    new StatTable('heal', charTalentTables.Charlotte.s3.p1),
                    new StatTable('', charTalentTables.Charlotte.s3.p2),
                ],
            },
            {
                table: new StatTable('burst_dmg', charTalentTables.Charlotte.s3.p3),
            },
            {
                type: 'shield',
                table: [
                    new StatTable('charlotte_kamera_heal', charTalentTables.Charlotte.s3.p4),
                    new StatTable('', charTalentTables.Charlotte.s3.p5),
                ],
            },
            {
                table: new StatTable('charlotte_kamera_dmg', charTalentTables.Charlotte.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('charlotte_duration', charTalentTables.Charlotte.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Charlotte.s3.p8),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Charlotte.s3.p9),
            },
        ],
    },
});

const TalenValues = {
    C1VerificationHeal: 80,
    C2AtkBonus: 10,
    C4BurstBonus: 1.1,
    C6CoordAtk: 180,
    C6CoordHeal: 42,
};

export const Charlotte = new DbObjectChar({
    name: 'charlotte',
    serializeId: 78,
    gameId: 10000088,
    iconClass: 'char-icon-charlotte',
    rarity: 4,
    element: 'cryo',
    weapon: 'catalyst',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Charlotte,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'spiritbreath_thorn_dmg',
            element: 'cryo',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.spiritbreath_thorn_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'charlotte_photo_press_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charlotte_photo_press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'charlotte_photo_hold_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charlotte_photo_hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'charlotte_snappy_silhouette_mark_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charlotte_snappy_silhouette_mark_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'charlotte_focused_impression_mark_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charlotte_focused_impression_mark_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'heal',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                    scalingMultiplier: 1.1,
                    scalingSource: 'constellation4',
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({name: 'charlotte_a_responsibility_to_oversee'}),
                        new ConditionConstellation({constellation: 4}),
                    ]),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'charlotte_kamera_heal',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.charlotte_kamera_heal'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'charlotte_kamera_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.charlotte_kamera_dmg'),
                    scalingMultiplier: 1.1,
                    scalingSource: 'constellation4',
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({name: 'charlotte_a_responsibility_to_oversee'}),
                        new ConditionConstellation({constellation: 4}),
                    ]),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'charlotte_verification_heal',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation1',
                    values: new ValueTable([TalenValues.C1VerificationHeal]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamageBurst({
            name: 'charlotte_coordinate_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalenValues.C6CoordAtk]),
                    scalingMultiplier: 1.1,
                    scalingSource: 'constellation4',
                    scalingMultiplierCondition: new ConditionAnd([
                        new ConditionBoolean({name: 'charlotte_a_responsibility_to_oversee'}),
                        new ConditionConstellation({constellation: 4}),
                    ]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'charlotte_coordinate_heal',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalenValues.C6CoordHeal]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.charlotte_moment_of_impact',
            description: 'talent_descr.charlotte_moment_of_impact',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionCalcOrigin({}),
        new ConditionStaticLevel({
            title: 'talent_name.charlotte_diversified_investigation',
            description: 'talent_descr.charlotte_diversified_investigation_1',
            levelSetting: 'party_origin_same',
            fromZero: true,
            info: {ascension: 4},
            stats: [
                new StatTable('healing', [0, 5, 10, 15]),
                new StatTable('text_number', [0.001, 1, 2, 3]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'party_origin_same'}),
            ],
        }),
        new ConditionStaticLevel({
            title: 'talent_name.charlotte_diversified_investigation',
            description: 'talent_descr.charlotte_diversified_investigation_2',
            levelSetting: 'party_origin_different',
            fromZero: true,
            info: {ascension: 4},
            stats: [
                new StatTable('dmg_cryo', [0, 5, 10, 15]),
                new StatTable('text_number', [0.001, 1, 2, 3]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'party_origin_different'}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.charlotte_a_need_to_verify_facts',
                    description: 'talent_descr.charlotte_a_need_to_verify_facts',
                    stats: {
                        text_percent_heal: TalenValues.C1VerificationHeal,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'charlotte_pursue_truth',
                    serializeId: 1,
                    title: 'talent_name.charlotte_a_duty_to_pursue_truth',
                    description: 'talent_descr.charlotte_a_duty_to_pursue_truth',
                    maxStacks: 3,
                    stats: [
                        new StatTable('atk_percent', [TalenValues.C2AtkBonus]),
                    ],
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
                new ConditionBoolean({
                    name: 'charlotte_a_responsibility_to_oversee',
                    serializeId: 2,
                    title: 'talent_name.charlotte_a_responsibility_to_oversee',
                    description: 'talent_descr.charlotte_a_responsibility_to_oversee',
                    stats: {
                        text_percent_dmg: 10,
                    },
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
                    title: 'talent_name.charlotte_a_summation_of_interest',
                    description: 'talent_descr.charlotte_a_summation_of_interest',
                    stats: {
                        text_percent_dmg: TalenValues.C6CoordAtk,
                        text_percent_heal: TalenValues.C6CoordHeal,
                    },
                }),
            ],
        },
    ]),
});
