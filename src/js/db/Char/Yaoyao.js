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
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Yaoyao.s1_id,
        title: 'talent_name.yaoyao_toss_n_turn_spear',
        description: 'talent_descr.yaoyao_toss_n_turn_spear',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Yaoyao.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Yaoyao.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Yaoyao.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Yaoyao.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Yaoyao.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Yaoyao.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Yaoyao.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Yaoyao.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Yaoyao.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Yaoyao.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Yaoyao.s2_id,
        title: 'talent_name.yaoyao_raphanus_sky_cluster',
        description: 'talent_descr.yaoyao_raphanus_sky_cluster',
        items: [
            {
                table: new StatTable('yaoyao_radish_dmg', charTalentTables.Yaoyao.s2.p1),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('yaoyao_radish_heal', charTalentTables.Yaoyao.s2.p2),
                    new StatTable('', charTalentTables.Yaoyao.s2.p3),
                ]
            },
            {
                unit: 'sec',
                table: new StatTable('yaoyao_throw_duration', charTalentTables.Yaoyao.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('yaoyao_radish_duration', charTalentTables.Yaoyao.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Yaoyao.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Yaoyao.s3_id,
        title: 'talent_name.yaoyao_moonjade_descent',
        description: 'talent_descr.yaoyao_moonjade_descent',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Yaoyao.s3.p4),
            },
            {
                table: new StatTable('yaoyao_white_radish_dmg', charTalentTables.Yaoyao.s3.p1),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('yaoyao_white_radish_heal', charTalentTables.Yaoyao.s3.p2),
                    new StatTable('', charTalentTables.Yaoyao.s3.p3),
                ]
            },
            {
                table: new StatTable('yaoyao_dendro_res_bonus', charTalentTables.Yaoyao.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('yaoyao_adept_duration', charTalentTables.Yaoyao.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Yaoyao.s3.p7),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Yaoyao.s3.p8),
            },
        ],
    },
});

const masteryBonusPost = new PostEffectStatsHP({
    percent: new StatTable('mastery', [0.003]),
    statCap: new StatTable('', [120]),
    conditions: [
        new ConditionConstellation({constellation: 4}),
        new ConditionBoolean({name: 'yaoyao_winsome'}),
    ],
});

export const Yaoyao = new DbObjectChar({
    name: 'yaoyao',
    serializeId: 65,
    gameId: 10000077,
    iconClass: "char-icon-yaoyao",
    rarity: 4,
    element: 'dendro',
    weapon: 'polearm',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Yaoyao,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
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
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
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
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.yaoyao_radish_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new StatTable('yaoyao_megaradish_dmg', [75]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureHeal({
            category: 'skill',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.yaoyao_radish_heal'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation6',
                    values: new StatTable('yaoyao_megaradish_heal', [7.5]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureHeal({
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new StatTable('yaoyao_in_others_shoes_heal', [0.8]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new FeatureDamageBurst({
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.yaoyao_white_radish_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.yaoyao_white_radish_heal'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'mastery_bonus',
            postEffect: masteryBonusPost,
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'yaoyao_adeptal_legacy',
            serializeId: 1,
            title: 'talent_name.yaoyao_adeptal_legacy',
            description: 'talent_descr.yaoyao_adeptal_legacy',
            stats: {
                move_speed: 15,
                res_dendro: 50,
            }
        }),
        new ConditionStatic({
            title: 'talent_name.yaoyao_starscatter',
            description: 'talent_descr.yaoyao_starscatter',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.yaoyao_in_others_shoes',
            description: 'talent_descr.yaoyao_in_others_shoes',
            info: {ascension: 4},
            stats: {
                text_percent_hp: 0.8,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        masteryBonusPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'yaoyao_adeptus_tutelage',
                    serializeId: 2,
                    title: 'talent_name.yaoyao_adeptus_tutelage',
                    description: 'talent_descr.yaoyao_adeptus_tutelage',
                    stats: {
                        dmg_dendro: 15,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.yaoyao_innocent',
                    description: 'talent_descr.yaoyao_innocent',
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
                    name: 'yaoyao_winsome',
                    serializeId: 3,
                    title: 'talent_name.yaoyao_winsome',
                    description: 'talent_descr.yaoyao_winsome',
                    stats: {
                        text_percent_hp: 0.3,
                        text_value_max: 120,
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
                    title: 'talent_name.yaoyao_beneficent',
                    description: 'talent_descr.yaoyao_beneficent',
                    stats: {
                        text_percent_atk: 75,
                        text_percent_heal: 7.5,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.yaoyao_adeptus_tutelage',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.yaoyao_adeptus_tutelage',
                description: 'talent_descr.yaoyao_adeptus_tutelage',
                info: {constellation: 1},
                stats: {
                    dmg_dendro: 15,
                },
            }),
        ],
    },
});
