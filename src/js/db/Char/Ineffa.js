import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureReactionLunarChargedLike } from "../../classes/Feature2/Reaction/Transformative/Lunar/ChargedLike";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsAtk } from "../../classes/PostEffect/Stats/Atk";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Ineffa.s1_id,
        title: 'talent_name.ineffa_cyclonic_duster',
        description: 'talent_descr.ineffa_cyclonic_duster',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Ineffa.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Ineffa.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Ineffa.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Ineffa.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Ineffa.s1.p5),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Ineffa.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Ineffa.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Ineffa.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Ineffa.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Ineffa.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Ineffa.s2_id,
        title: 'talent_name.ineffa_carrier_frequency',
        description: 'talent_descr.ineffa_carrier_frequency',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Ineffa.s2.p1),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('ineffa_base_shield_dmg_absorption', charTalentTables.Ineffa.s2.p2),
                    new StatTable('', charTalentTables.Ineffa.s2.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('ineffa_shield_duration', charTalentTables.Ineffa.s2.p6),
            },
            {
                table: new StatTable('ineffa_birgitta_dmg', charTalentTables.Ineffa.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('ineffa_birgitta_duration', charTalentTables.Ineffa.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ineffa.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Ineffa.s3_id,
        title: 'talent_name.ineffa_cyclonic_exterminator',
        description: 'talent_descr.ineffa_cyclonic_exterminator',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Ineffa.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ineffa.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Ineffa.s3.p3),
            },
        ],
    },
    links: [11160001],
});

const PassiveLunarScale = 0.7;
const PassiveLunarScaleCap = 14;
const A1Dmg = 65;
const A4EmScale = 6;
const C1AtkScale = 2.5;
const C1AtkScaleCap = 50;
const C2Dmg = 300;
const C6Dmg = 135;

const emBuffPost = new PostEffectStatsAtk({
    percent: new StatTable('mastery', [A4EmScale / 100]),
    condition: new ConditionBoolean({name: 'ineffa_panoramic_permutation_protocol'}),
});

const lunarPost = new PostEffectStatsAtk({
    percent: new StatTable('lunarcharged_multi', [PassiveLunarScale / 100]),
    statCap: new ValueTable([PassiveLunarScaleCap]),
});

const lunarPost2 = new PostEffectStatsAtk({
    percent: new StatTable('dmg_reaction_lunarcharged', [C1AtkScale / 100]),
    statCap: new ValueTable([C1AtkScaleCap]),
    condition: new ConditionAnd([
        new ConditionConstellation({constellation: 1}),
        new ConditionBoolean({name: 'ineffa_rectifying_processor'}),
    ]),
});

export const Ineffa = new DbObjectChar({
    name: 'ineffa',
    serializeId: 108,
    gameId: 10000116,
    iconClass: 'char-icon-ineffa',
    rarity: 5,
    element: 'electro',
    weapon: 'polearm',
    origin: 'nodkrai',
    talents: Talents,
    statTable: charTables.Ineffa,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_1'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'electro',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.ineffa_base_shield_dmg_absorption'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.ineffa_birgitta_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarChargedLike({
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    scalingMultiplier: 'lunarcharged_multi',
                    scalingSource: 'lunarcharged_multi',
                    values: new StatTable('ineffa_birgitta_coordinated_dmg', [A1Dmg]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureReactionLunarChargedLike({
            element: 'electro',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation2',
                    scalingMultiplier: 'lunarcharged_multi',
                    scalingSource: 'lunarcharged_multi',
                    values: new StatTable('ineffa_punishment_edict_dmg', [C2Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'mastery_bonus',
            postEffect: emBuffPost,
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'ineffa_lunar_bonus',
            postEffect: lunarPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'ineffa_lunar_bonus_2',
            postEffect: lunarPost2,
            format: 'percent',
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureReactionLunarChargedLike({
            element: 'electro',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    scalingMultiplier: 'lunarcharged_multi',
                    scalingSource: 'lunarcharged_multi',
                    values: new StatTable('ineffa_carrier_flow_composite_dmg', [C6Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                allowed_lunarcharged: 1,
            },
        }),
        new ConditionStatic({
            title: 'talent_name.ineffa_overclocking_circuit',
            description: 'talent_descr.ineffa_overclocking_circuit',
            info: {ascension: 1},
            stats: {
                text_percent_dmg: A1Dmg,
            },
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionBoolean({
            name: 'ineffa_panoramic_permutation_protocol',
            serializeId: 1,
            title: 'talent_name.ineffa_panoramic_permutation_protocol',
            description: 'talent_descr.ineffa_panoramic_permutation_protocol',
            info: {ascension: 4},
            stats: {
                text_percent: A4EmScale,
            },
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionStatic({
            title: 'talent_name.ineffa_assemblage_hub',
            description: 'talent_descr.ineffa_assemblage_hub',
            stats: {
                text_percent: PassiveLunarScale,
                text_percent_max: PassiveLunarScaleCap,
            },
        }),
    ],
    postEffects: [
        emBuffPost,
        lunarPost,
        lunarPost2,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'ineffa_rectifying_processor',
                    serializeId: 2,
                    title: 'talent_name.ineffa_rectifying_processor',
                    description: 'talent_descr.ineffa_rectifying_processor',
                    stats: {
                        text_percent: C1AtkScale,
                        text_percent_max: C1AtkScaleCap,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.ineffa_support_cleaning_module',
                    description: 'talent_descr.ineffa_support_cleaning_module',
                    stats: {
                        text_percent_dmg: C2Dmg,
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
                    title: 'talent_name.ineffa_the_edictless_path',
                    description: 'talent_descr.ineffa_the_edictless_path',
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
                    title: 'talent_name.ineffa_a_dawning_morn_for_you',
                    description: 'talent_descr.ineffa_a_dawning_morn_for_you',
                    stats: {
                        text_percent_dmg: C6Dmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
        },
        conditions: [
            new Condition({settings: {allowed_lunarcharged: 1}}),
            new ConditionNumber({
                name: 'ineffa_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionStatic({
                title: 'talent_name.ineffa_assemblage_hub',
                description: 'talent_descr.ineffa_assemblage_hub',
                stats: {
                    text_percent: PassiveLunarScale,
                    text_percent_max: PassiveLunarScaleCap,
                },
            }),
            new ConditionBoolean({
                name: 'party.ineffa_panoramic_permutation_protocol',
                serializeId: 2,
                title: 'talent_name.ineffa_panoramic_permutation_protocol',
                description: 'talent_descr.ineffa_panoramic_permutation_protocol',
                info: {ascension: 4},
                rotation: 'party',
                stats: {
                    text_percent: A4EmScale,
                },
            }),
            new ConditionBoolean({
                name: 'party.ineffa_rectifying_processor',
                serializeId: 3,
                title: 'talent_name.ineffa_rectifying_processor',
                description: 'talent_descr.ineffa_rectifying_processor',
                info: {constellation: 1},
                stats: {
                    text_percent: C1AtkScale,
                    text_percent_max: C1AtkScaleCap,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'ineffa_atk_total',
                percent: new StatTable('mastery', [A4EmScale / 100]),
                condition: new ConditionBoolean({name: 'party.ineffa_panoramic_permutation_protocol'}),
            }),
            new PostEffectStats({
                from: 'ineffa_atk_total',
                percent: new StatTable('lunarcharged_multi', [PassiveLunarScale / 100]),
                statCap: new ValueTable([PassiveLunarScaleCap]),
            }),
            new PostEffectStats({
                from: 'ineffa_atk_total',
                percent: new StatTable('dmg_reaction_lunarcharged', [C1AtkScale / 100]),
                statCap: new ValueTable([C1AtkScaleCap]),
                condition: new ConditionBoolean({name: 'party.ineffa_rectifying_processor'}),
            }),
        ],
    },
});
