import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanSkirkParty } from "../../classes/Condition/Boolean/SkirkParty";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionLevels } from "../../classes/Condition/Levels";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumberSkirk } from "../../classes/Condition/Number/Skirk";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierSkirkBurst } from "../../classes/Feature2/Multiplier/SkirkBurst";
import { FeatureMultiplierSkirkNormal } from "../../classes/Feature2/Multiplier/SkirkNormal";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Skirk.s1_id,
        title: 'talent_name.skirk_sunder',
        description: 'talent_descr.skirk_sunder',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Skirk.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Skirk.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Skirk.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Skirk.s1.p5),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Skirk.s1.p6),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('charged_hit', charTalentTables.Skirk.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Skirk.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Skirk.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Skirk.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Skirk.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Skirk.s2_id,
        title: 'talent_name.skirk_warp',
        description: 'talent_descr.skirk_warp',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Skirk.s2.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Skirk.s2.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Skirk.s2.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Skirk.s2.p5),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Skirk.s2.p7),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('charged_hit', charTalentTables.Skirk.s2.p8),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Skirk.s2.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Skirk.s2.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Skirk.s2.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Skirk.s2.p12),
            },
            {
                unit: 'sec',
                table: new StatTable('skirk_duration', charTalentTables.Skirk.s2.p13),
            },
            {
                unit: '',
                table: new StatTable('skirk_limit', charTalentTables.Skirk.s2.p14),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Skirk.s2.p15),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Skirk.s3_id,
        title: 'talent_name.skirk_ruin',
        description: 'talent_descr.skirk_ruin',
        items: [
            {
                type: 'multihit',
                hits: 5,
                table: new StatTable('skirk_slash_dmg', charTalentTables.Skirk.s3.p1),
            },
            {
                table: new StatTable('skirk_final_dmg', charTalentTables.Skirk.s3.p2),
            },
            {
                unit: 'atk_per_point',
                table: new StatTable('skirk_burst_bonus', charTalentTables.Skirk.s3.p3),
            },
            {
                table: new StatTable('skirk_absorption_0_bonus', charTalentTables.Skirk.s3.p4),
            },
            {
                table: new StatTable('skirk_absorption_1_bonus', charTalentTables.Skirk.s3.p5),
            },
            {
                table: new StatTable('skirk_absorption_2_bonus', charTalentTables.Skirk.s3.p6),
            },
            {
                table: new StatTable('skirk_absorption_3_bonus', charTalentTables.Skirk.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Skirk.s3.p8),
            },
        ],
    },
    links: [11130005, 11130006, 11130007, 11130008],
});

const stanceCond = new ConditionBoolean({name: 'skirk_seven_phase_flash'});

const stanceCondRev = new ConditionNot([
    new ConditionBoolean({name: 'skirk_seven_phase_flash'}),
]);

const C1Dmg = 500;
const C2StackBonus = 10;
const C2AtkBonus = 70;
const C4AtkStack1 = 10;
const C4AtkStack2 = 20;
const C4AtkStack3 = 40;
const C6BurstDmg = 750;
const C6NormalDmg = 180;

export const Skirk = new DbObjectChar({
    name: 'skirk',
    serializeId: 106,
    gameId: 10000114,
    iconClass: 'char-icon-skirk',
    rarity: 5,
    element: 'cryo',
    weapon: 'sword',
    origin: 'foreign',
    talents: Talents,
    statTable: charTables.Skirk,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_3',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.getAlias('attack.normal_hit_3', 'normal_hit_3_1'),
                        }),
                    ],
                },
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageNormal({
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.getAlias('attack.normal_hit_3', 'normal_hit_3_1'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit_total',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit'),
                        }),
                    ],
                },
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: stanceCondRev,
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            damageBonuses: ['dmg_normal_skirk'],
            multipliers: [
                new FeatureMultiplierSkirkNormal({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_1'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            damageBonuses: ['dmg_normal_skirk'],
            multipliers: [
                new FeatureMultiplierSkirkNormal({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_2'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_3',
            element: 'cryo',
            category: 'attack',
            damageType: 'normal',
            damageBonuses: ['dmg_normal_skirk'],
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierSkirkNormal({
                            leveling: 'char_skill_elemental',
                            values: Talents.getAlias('skill.normal_hit_3', 'normal_hit_3_1'),
                        }),
                    ],
                },
            ],
            condition: stanceCond,
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            isChild: true,
            hits: 2,
            damageBonuses: ['dmg_normal_skirk'],
            multipliers: [
                new FeatureMultiplierSkirkNormal({
                    leveling: 'char_skill_elemental',
                    values: Talents.getAlias('skill.normal_hit_3', 'normal_hit_3_1'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            element: 'cryo',
            category: 'attack',
            damageType: 'normal',
            damageBonuses: ['dmg_normal_skirk'],
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierSkirkNormal({
                            leveling: 'char_skill_elemental',
                            values: Talents.getAlias('skill.normal_hit_4', 'normal_hit_4_1'),
                        }),
                    ],
                },
            ],
            condition: stanceCond,
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            isChild: true,
            hits: 2,
            damageBonuses: ['dmg_normal_skirk'],
            multipliers: [
                new FeatureMultiplierSkirkNormal({
                    leveling: 'char_skill_elemental',
                    values: Talents.getAlias('skill.normal_hit_4', 'normal_hit_4_1'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            damageBonuses: ['dmg_normal_skirk'],
            multipliers: [
                new FeatureMultiplierSkirkNormal({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_5'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamageMultihit({
            element: 'cryo',
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit_total',
            items: [
                {
                    hits: 3,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charged_hit'),
                        }),
                    ],
                },
            ],
            condition: stanceCond,
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'cryo',
            isChild: true,
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charged_hit'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamagePlungeCollision({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.plunge'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.plunge_low'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.plunge_high'),
                }),
            ],
            condition: stanceCond,
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierSkirkBurst({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skirk_slash_dmg'),
                }),
                new FeatureMultiplierSkirkBurst({
                    leveling: 'char_skill_burst',
                    stacksLeveling: 'skirk_serpents_subtlety',
                    values: Talents.get('burst.skirk_burst_bonus'),
                    condition: new ConditionBoolean({name: 'skirk_serpents_subtlety'}),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierSkirkBurst({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.skirk_final_dmg'),
                }),
                new FeatureMultiplierSkirkBurst({
                    leveling: 'char_skill_burst',
                    stacksLeveling: 'skirk_serpents_subtlety',
                    values: Talents.get('burst.skirk_burst_bonus'),
                    condition: new ConditionBoolean({name: 'skirk_serpents_subtlety'}),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'skirk_crystal_blade_dmg',
            element: 'cryo',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation1',
                    values: new ValueTable([C1Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamageBurst({
            name: 'skirk_burst_coordinated_attack_dmg',
            element: 'cryo',
            category: 'other',
            multipliers: [
                new FeatureMultiplierSkirkBurst({
                    source: 'constellation6',
                    values: new ValueTable([C6BurstDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureDamageNormal({
            name: 'skirk_normal_coordinated_attack_dmg',
            element: 'cryo',
            category: 'other',
            damageBonuses: ['dmg_normal_skirk'],
            multipliers: [
                new FeatureMultiplierSkirkNormal({
                    source: 'constellation6',
                    values: new ValueTable([C6NormalDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureDamageCharged({
            name: 'skirk_charged_coordinated_attack_dmg',
            element: 'cryo',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([C6NormalDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                char_skill_burst_bonus: 3,
            },
            condition: new ConditionConstellation({constellation: 3}),
        }),
        new ConditionBoolean({
            name: 'skirk_seven_phase_flash',
            serializeId: 1,
            title: 'talent_name.skirk_seven_phase_flash',
        }),
        new ConditionNumberSkirk({
            name: 'skirk_serpents_subtlety',
            serializeId: 5,
            title: 'talent_name.skirk_serpents_subtlety',
            max: 12,
            c2bonus: C2StackBonus,
            forceSettings: true,
        }),
        new ConditionBoolean({
            name: 'skirk_havoc_extinction',
            serializeId: 6,
            title: 'talent_name.skirk_havoc_extinction',
        }),
        new ConditionStacks({
            name: 'skirk_reason_beyond_reason',
            serializeId: 2,
            title: 'talent_name.skirk_reason_beyond_reason',
            description: 'talent_descr.skirk_reason_beyond_reason',
            maxStacks: 3,
            info: {ascension: 1},
        }),
        new ConditionStacks({
            name: 'skirk_return_to_oblivion',
            serializeId: 3,
            title: 'talent_name.skirk_return_to_oblivion',
            description: 'talent_descr.skirk_return_to_oblivion',
            maxStacks: 3,
            info: {ascension: 4},
        }),
        new ConditionBoolean({
            name: 'skirk_mutual_weapons_mentorship',
            serializeId: 4,
            title: 'talent_name.skirk_mutual_weapons_mentorship',
            description: 'talent_descr.skirk_mutual_weapons_mentorship',
            settings: {
                char_skill_elemental_bonus_2: 1,
                char_skill_elemental_bonus_party: 1,
            },
            condition: new ConditionBooleanSkirkParty(),
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.skirk_absorption_0_bonus', 'dmg_normal_skirk'),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({name: "skirk_havoc_extinction"}),
                new ConditionBooleanValue({setting: 'skirk_reason_beyond_reason', cond: 'eq', value: 0}),
            ]),
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.skirk_absorption_1_bonus', 'dmg_normal_skirk'),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({name: "skirk_havoc_extinction"}),
                new ConditionBooleanValue({setting: 'skirk_reason_beyond_reason', cond: 'eq', value: 1}),
            ]),
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.skirk_absorption_2_bonus', 'dmg_normal_skirk'),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({name: "skirk_havoc_extinction"}),
                new ConditionBooleanValue({setting: 'skirk_reason_beyond_reason', cond: 'eq', value: 2}),
            ]),
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.skirk_absorption_3_bonus', 'dmg_normal_skirk'),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({name: "skirk_havoc_extinction"}),
                new ConditionBooleanValue({setting: 'skirk_reason_beyond_reason', cond: 'eq', value: 3}),
            ]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.skirk_far_to_fall',
                    description: 'talent_descr.skirk_far_to_fall',
                    stats: {
                        text_percent_dmg: C1Dmg,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.skirk_into_the_abyss',
                    description: 'talent_descr.skirk_into_the_abyss_1',
                }),
                new ConditionBoolean({
                    name: 'skirk_into_the_abyss',
                    serializeId: 7,
                    title: 'talent_name.skirk_into_the_abyss',
                    description: 'talent_descr.skirk_into_the_abyss_2',
                    stats: {
                        atk_percent: C2AtkBonus,
                    },
                    condition: stanceCond,
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionLevels({
                    title: 'talent_name.skirk_fractured_flow',
                    description: 'talent_descr.skirk_fractured_flow',
                    levelSetting: 'skirk_return_to_oblivion',
                    stats: [
                        new StatTable('atk_percent', [C4AtkStack1, C4AtkStack2, C4AtkStack3]),
                    ],
                    condition: new ConditionBoolean({name: 'skirk_return_to_oblivion'}),
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
                    title: 'talent_name.skirk_to_the_source',
                    description: 'talent_descr.skirk_to_the_source',
                    stats: {
                        text_percent_dmg_1: C6BurstDmg,
                        text_percent_dmg_2: C6NormalDmg,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.skirk_mutual_weapons_mentorship',
                serializeId: 1,
                title: 'talent_name.skirk_mutual_weapons_mentorship',
                description: 'talent_descr.skirk_mutual_weapons_mentorship',
                settings: {
                    char_skill_elemental_bonus_2: 1,
                    char_skill_elemental_bonus_party: 1,
                },
                condition: new ConditionBooleanSkirkParty(),
            }),
        ],
    },
});
