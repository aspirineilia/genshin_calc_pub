import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionCalcElementsNahida } from "../../classes/Condition/CalcElementsNahida";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionLevels } from "../../classes/Condition/Levels";
import { ConditionLevelSelect } from "../../classes/Condition/LevelSelect";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { PostEffectStatsNahida } from "../../classes/PostEffect/Stats/Nahida";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Nahida.s1_id,
        title: 'talent_name.nahida_akara',
        description: 'talent_descr.nahida_akara',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Nahida.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Nahida.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Nahida.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Nahida.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Nahida.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Nahida.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Nahida.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Nahida.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Nahida.s1.p9),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.Nahida.s2_id,
        title: 'talent_name.nahida_all_schemes_to_know',
        description: 'talent_descr.nahida_all_schemes_to_know',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Nahida.s2.p1),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Nahida.s2.p2),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('nahida_trikarma_purification_dmg', charTalentTables.Nahida.s2.p3),
                    new StatTable('nahida_trikarma_purification_mastery', charTalentTables.Nahida.s2.p4),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('nahida_trikarma_purification_interval', charTalentTables.Nahida.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('nahida_seed_duration', charTalentTables.Nahida.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Nahida.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Nahida.s2.p8),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Nahida.s3_id,
        title: 'talent_name.nahida_illusory_heart',
        description: 'talent_descr.nahida_illusory_heart',
        items: [
            {
                table: new StatTable('nahida_heart_pyro_1', charTalentTables.Nahida.s3.p1),
            },
            {
                table: new StatTable('nahida_heart_pyro_2', charTalentTables.Nahida.s3.p2),
            },
            {
                unit: 'sec',
                digits: 2,
                table: new StatTable('nahida_heart_electro_1', charTalentTables.Nahida.s3.p3),
            },
            {
                unit: 'sec',
                digits: 2,
                table: new StatTable('nahida_heart_electro_2', charTalentTables.Nahida.s3.p4),
            },
            {
                unit: 'sec',
                digits: 2,
                table: new StatTable('nahida_heart_hydro_1', charTalentTables.Nahida.s3.p5),
            },
            {
                unit: 'sec',
                digits: 2,
                table: new StatTable('nahida_heart_hydro_2', charTalentTables.Nahida.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('nahida_base_duration', charTalentTables.Nahida.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Nahida.s3.p8),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Nahida.s3.p9),
            },
        ],
    },
});

const A1MasteryRatio = 25;
const A1MasteryCap = 250;
const A4CritRateBonus = 0.03;
const A4CritRateBonusCap = 24;
const A4SkillBonus = 0.1;
const A4SkillBonusCap = 80;
const C2CritRate = 20;
const C2CritDmg = 100;
const C2DefReduce = 30;

const masteryBuffPost = new PostEffectStatsNahida({
    percent: new StatTable('mastery', [A1MasteryRatio / 100]),
    statCap: new ValueTable([A1MasteryCap]),
    conditions: [
        new ConditionAscensionChar({ascension: 1}),
        new ConditionBoolean({name: 'nahida_compassion_illuminated'}),
        new ConditionBoolean({name: 'nahida_illusory_heart'}),
    ],
});

export const Nahida = new DbObjectChar({
    name: 'nahida',
    serializeId: 61,
    gameId: 10000073,
    iconClass: "char-icon-nahida",
    rarity: 5,
    element: 'dendro',
    weapon: 'catalyst',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Nahida,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'press_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'hold_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nahida_trikarma_purification_dmg',
            element: 'dendro',
            critRateBonuses: ['crit_rate_nahida'],
            damageBonuses: ['dmg_skill_nahida'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nahida_trikarma_purification_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nahida_trikarma_purification_mastery'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nahida_trikarma_purification_karmic_dmg',
            element: 'dendro',
            critRateBonuses: ['crit_rate_nahida'],
            damageBonuses: ['dmg_skill_nahida'],
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([200]),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'constellation6',
                    values: new ValueTable([400]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'nahida_mastery_bonus',
            postEffect: masteryBuffPost,
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                char_skill_burst_bonus: 3,
            },
            subConditions: [
                new ConditionConstellation({constellation: 5}),
            ],
        }),
        new ConditionCalcElementsNahida(),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.nahida_heart_pyro_1', 'dmg_skill_nahida'),
            ],
            subConditions: [
                new ConditionAnd([
                    new ConditionAscensionChar({ascension: 1}),
                    new ConditionBoolean({name: 'nahida_illusory_heart'}),
                    new ConditionBooleanValue({
                        setting: 'nahida_elements_pyro',
                        cond: 'eq',
                        value: 1,
                    }),
                ]),
            ],
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.nahida_heart_pyro_2', 'dmg_skill_nahida'),
            ],
            subConditions: [
                new ConditionAnd([
                    new ConditionAscensionChar({ascension: 1}),
                    new ConditionBoolean({name: 'nahida_illusory_heart'}),
                    new ConditionBooleanValue({
                        setting: 'nahida_elements_pyro',
                        cond: 'ge',
                        value: 2,
                    }),
                ]),
            ],
        }),
        new ConditionNumber({
            name: 'party_max_mastery',
            serializeId: 1,
            max: 1000,
            loadPartyStat: 'mastery_total',
            title: 'talent_name.party_max_mastery',
            conditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'nahida_illusory_heart',
            serializeId: 2,
            title: 'talent_name.nahida_illusory_heart',
            description: 'talent_descr.nahida_illusory_heart_talent',
        }),
        new ConditionBoolean({
            name: 'nahida_compassion_illuminated',
            serializeId: 3,
            title: 'talent_name.nahida_compassion_illuminated',
            description: 'talent_descr.nahida_compassion_illuminated',
            info: {ascension: 1},
            stats: {
                text_percent: A1MasteryRatio,
                text_value_max: A1MasteryCap,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBoolean({name: 'nahida_illusory_heart'}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.nahida_awakening_elucidated',
            description: 'talent_descr.nahida_awakening_elucidated',
            info: {ascension: 4},
            stats: {
                text_percent_crit: A4CritRateBonus,
                text_percent_crit_max: A4CritRateBonusCap,
                text_percent_skill: A4SkillBonus,
                text_percent_skill_max: A4SkillBonusCap,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        masteryBuffPost,
        new PostEffectStatsMastery({
            percent: new StatTable('crit_rate_nahida', [A4CritRateBonus]),
            exceed: 200,
            global: true,
            statCap: new StatTable('', [A4CritRateBonusCap]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_skill_nahida', [A4SkillBonus]),
            exceed: 200,
            global: true,
            statCap: new StatTable('', [A4SkillBonusCap]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.nahida_the_seed_of_stored_knowledge',
                    description: 'talent_descr.nahida_the_seed_of_stored_knowledge',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.nahida_the_root_of_all_fullness',
                    description: 'talent_descr.nahida_the_root_of_all_fullness_1',
                    stats: {
                        crit_rate_bloom: C2CritRate,
                        crit_dmg_bloom: C2CritDmg,
                        crit_rate_burning: C2CritRate,
                        crit_dmg_burning: C2CritDmg,
                    },
                }),
                new ConditionBoolean({
                    name: 'nahida_the_root_of_all_fullness',
                    serializeId: 5,
                    title: 'talent_name.nahida_the_root_of_all_fullness',
                    description: 'talent_descr.nahida_the_root_of_all_fullness_2',
                    stats: {
                        enemy_def_reduce: C2DefReduce,
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
                new ConditionLevelSelect({
                    name: 'weapon.nahida_the_stem_of_manifest_inference',
                    serializeId: 4,
                    rotation: 'buffs',
                    title: 'talent_name.nahida_the_stem_of_manifest_inference',
                    description: 'talent_descr.nahida_the_stem_of_manifest_inference',
                    maxStacks: 4,
                    stats: [
                        new StatTable('mastery', [100, 120, 140, 160]),
                    ],
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.nahida_the_fruit_of_reasons_culmination',
                    description: 'talent_descr.nahida_the_fruit_of_reasons_culmination',
                    stats: {
                        text_percent_dmg: 200,
                        text_percent_dmg2: 400,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionNumber({
                name: 'party_max_mastery',
                serializeId: 1,
                rotation: 'party',
                loadPartyStat: 'mastery_total',
                max: 5000,
                title: 'talent_name.party_max_mastery',
            }),
            new ConditionBoolean({
                name: 'party.nahida_compassion_illuminated',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.nahida_compassion_illuminated',
                description: 'talent_descr.nahida_compassion_illuminated',
                info: {ascension: 1},
            }),
            new ConditionBoolean({
                name: 'party.nahida_the_root_of_all_fullness_1',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.nahida_the_root_of_all_fullness',
                description: 'talent_descr.nahida_the_root_of_all_fullness_1',
                info: {constellation: 2},
                stats: {
                    crit_rate_bloom: C2CritRate,
                    crit_dmg_bloom: C2CritDmg,
                    crit_rate_burning: C2CritRate,
                    crit_dmg_burning: C2CritDmg,
                },
            }),
            new ConditionBoolean({
                name: 'party.nahida_the_root_of_all_fullness_2',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.nahida_the_root_of_all_fullness',
                description: 'talent_descr.nahida_the_root_of_all_fullness_2',
                info: {constellation: 2},
                stats: {
                    enemy_def_reduce: C2DefReduce,
                },
            }),
        ],
        postEffects: [
            new PostEffectStatsNahida({
                percent: new StatTable('mastery', [A1MasteryRatio / 100]),
                statCap: new StatTable('', [A1MasteryCap]),
                conditions: [
                    new ConditionBoolean({name: 'party.nahida_compassion_illuminated'}),
                ],
            })
        ],
    },
});
