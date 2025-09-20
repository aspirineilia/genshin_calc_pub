import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
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
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.YaeMiko.s1_id,
        title: 'talent_name.yae_miko_spiritfox_sin_eater',
        description: 'talent_descr.yae_miko_spiritfox_sin_eater',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.YaeMiko.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.YaeMiko.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.YaeMiko.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.YaeMiko.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.YaeMiko.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.YaeMiko.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.YaeMiko.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.YaeMiko.s1.p8),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.YaeMiko.s2_id,
        title: 'talent_name.yae_miko_sesshou_sakura',
        description: 'talent_descr.yae_miko_sesshou_sakura',
        items: [
            {
                table: new StatTable('miko_sesshou_sakura_1_dmg', charTalentTables.YaeMiko.s2.p1),
            },
            {
                table: new StatTable('miko_sesshou_sakura_2_dmg', charTalentTables.YaeMiko.s2.p2),
            },
            {
                table: new StatTable('miko_sesshou_sakura_3_dmg', charTalentTables.YaeMiko.s2.p3),
            },
            {
                table: new StatTable('miko_sesshou_sakura_4_dmg', charTalentTables.YaeMiko.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.YaeMiko.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YaeMiko.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.YaeMiko.s3_id,
        title: 'talent_name.yae_miko_tenko_kenshin',
        description: 'talent_descr.yae_miko_tenko_kenshin',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.YaeMiko.s3.p1),
            },
            {
                table: new StatTable('miko_thunderbolt_dmg', charTalentTables.YaeMiko.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YaeMiko.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.YaeMiko.s3.p4),
            },
        ],
    },
});

const skillDmgPost = new PostEffectStatsMastery({
    global: true,
    percent: new StatTable('dmg_skill_yaemiko', [0.15]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
    ],
});

export const YaeMiko = new DbObjectChar({
    name: 'yae_miko',
    serializeId: 49,
    gameId: 10000058,
    iconClass: "char-icon-yae-miko",
    rarity: 5,
    element: 'electro',
    weapon: 'catalyst',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.YaeMiko,
    features: [
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.miko_sesshou_sakura_1_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.miko_sesshou_sakura_2_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.miko_sesshou_sakura_3_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            damageBonuses: ['dmg_skill_yaemiko'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.miko_sesshou_sakura_4_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
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
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.miko_thunderbolt_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'yae_miko_skill_bonus',
            postEffect: skillDmgPost,
            format: 'percent',
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.yae_miko_the_shrines_sacred_shade',
            description: 'talent_descr.yae_miko_the_shrines_sacred_shade',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.yae_miko_enlightened_blessing',
            description: 'talent_descr.yae_miko_enlightened_blessing',
            stats: {
                text_percent: 0.15,
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
                    title: 'talent_name.yae_miko_yakan_offering',
                    description: 'talent_descr.yae_miko_yakan_offering',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.yae_miko_foxs_mooncall',
                    description: 'talent_descr.yae_miko_foxs_mooncall',
                    stats: {
                        text_percent: 60,
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
                new ConditionBoolean({
                    name: 'miko_sakura_channeling',
                    serializeId: 1,
                    title: 'talent_name.yae_miko_sakura_channeling',
                    description: 'talent_descr.yae_miko_sakura_channeling',
                    stats: {
                        dmg_electro: 20,
                    },
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
                    title: 'talent_name.yae_miko_daisesshou',
                    description: 'talent_descr.yae_miko_daisesshou',
                    stats: {
                        enemy_def_ignore_skill: 60,
                    },
                }),
            ],
        },
    ]),
    postEffects: [
        skillDmgPost,
    ],
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.miko_sakura_channeling',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.yae_miko_sakura_channeling',
                description: 'talent_descr.yae_miko_sakura_channeling',
                info: {constellation: 4},
                stats: {
                    dmg_electro: 20,
                },
            }),
        ],
    },
});
