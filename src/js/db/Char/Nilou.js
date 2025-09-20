import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanNilouParty } from "../../classes/Condition/Boolean/NilouParty";
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
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Nilou.s1_id,
        title: 'talent_name.nilou_dance_of_samser',
        description: 'talent_descr.nilou_dance_of_samser',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Nilou.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Nilou.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Nilou.s1.p3),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Nilou.s1.p4),
                    new StatTable('charged_hit_2', charTalentTables.Nilou.s1.p5),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Nilou.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Nilou.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Nilou.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Nilou.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Nilou.s2_id,
        title: 'talent_name.nilou_dance_of_haftkarsvar',
        description: 'talent_descr.nilou_dance_of_haftkarsvar',
        items: [
            {
                unit: 'hp',
                table: new StatTable('skill_dmg', charTalentTables.Nilou.s2.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('nilou_sword_dance_1_dmg', charTalentTables.Nilou.s2.p6),
            },
            {
                unit: 'hp',
                table: new StatTable('nilou_sword_dance_2_dmg', charTalentTables.Nilou.s2.p7),
            },
            {
                unit: 'hp',
                table: new StatTable('nilou_watery_moon_dmg', charTalentTables.Nilou.s2.p4),
            },
            {
                unit: 'hp',
                table: new StatTable('nilou_whirling_steps_1_dmg', charTalentTables.Nilou.s2.p2),
            },
            {
                unit: 'hp',
                table: new StatTable('nilou_whirling_steps_2_dmg', charTalentTables.Nilou.s2.p3),
            },
            {
                unit: 'hp',
                table: new StatTable('nilou_water_wheel_dmg', charTalentTables.Nilou.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('nilou_pirouette_duration', charTalentTables.Nilou.s2.p11),
            },
            {
                unit: 'sec',
                table: new StatTable('nilou_lunar_prayer_duration', charTalentTables.Nilou.s2.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('nilou_tranquility_aura_duration', charTalentTables.Nilou.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Nilou.s2.p9),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Nilou.s3_id,
        title: 'talent_name.nilou_distant_dreams_listening_spring',
        description: 'talent_descr.nilou_distant_dreams_listening_spring',
        items: [
            {
                unit: 'hp',
                table: new StatTable('burst_dmg', charTalentTables.Nilou.s3.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('nilou_lingering_aeon', charTalentTables.Nilou.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Nilou.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Nilou.s3.p4),
            },
        ],
    },
});

const A1Mastery = 100;
const A4BloomBonus = 9;
const A4BloomBonusMax = 400;
const C1SkillDmg = 65;
const C2EnemyResHydro = -35;
const C2EnemyResDendro = -35;
const C4BurstDmg = 50;
const C6CritRate = 0.6;
const C6CritRateMax = 30;
const C6CritDmg = 1.2;
const C6CritDmgMax = 60;

const bloomDmgPost = new PostEffectStatsHP({
    global: true,
    exceed: 30000,
    percent: new StatTable('dmg_reaction_rupture', [A4BloomBonus / 1000]),
    statCap: new StatTable('', [A4BloomBonusMax]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
        new ConditionBooleanNilouParty(),
        new ConditionBoolean({name: 'nilou_stance_bonus'}),
    ],
});

const critRatePost = new PostEffectStatsHP({
    percent: new StatTable('crit_rate', [C6CritRate / 1000]),
    statCap: new StatTable('', [C6CritRateMax]),
    conditions: [
        new ConditionConstellation({constellation: 6}),
    ],
});

const critDmgPost = new PostEffectStatsHP({
    percent: new StatTable('crit_dmg', [C6CritDmg / 1000]),
    statCap: new StatTable('', [C6CritDmgMax]),
    conditions: [
        new ConditionConstellation({constellation: 6}),
    ],
});

export const Nilou = new DbObjectChar({
    name: 'nilou',
    serializeId: 60,
    gameId: 10000070,
    iconClass: "char-icon-nilou",
    rarity: 5,
    element: 'hydro',
    weapon: 'sword',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Nilou,
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
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit_total',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nilou_sword_dance_1_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nilou_sword_dance_1_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nilou_sword_dance_2_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nilou_sword_dance_2_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nilou_watery_moon_dmg',
            element: 'hydro',
            damageBonuses: ['dmg_skill_nilou'],
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nilou_watery_moon_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nilou_whirling_steps_1_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nilou_whirling_steps_1_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nilou_whirling_steps_2_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nilou_whirling_steps_2_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'nilou_water_wheel_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.nilou_water_wheel_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'nilou_lingering_aeon',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.nilou_lingering_aeon'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'nilou_bloom_bonus',
            postEffect: bloomDmgPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'crit_rate_bonus',
            postEffect: critRatePost,
            format: 'percent',
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'crit_dmg_bonus',
            postEffect: critDmgPost,
            format: 'percent',
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'nilou_stance_bonus',
            serializeId: 1,
            title: 'talent_name.nilou_court_of_dancing_petals',
            description: 'talent_descr.nilou_court_of_dancing_petals_1',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBooleanNilouParty(),
            ],
        }),
        new ConditionBoolean({
            name: 'nilou_stance_attacked',
            serializeId: 2,
            title: 'talent_name.nilou_court_of_dancing_petals',
            description: 'talent_descr.nilou_court_of_dancing_petals_2',
            stats: {
                mastery: A1Mastery,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBooleanNilouParty(),
                new ConditionBoolean({name: 'nilou_stance_bonus'}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.nilou_dreamy_dance_of_aeons',
            description: 'talent_descr.nilou_dreamy_dance_of_aeons',
            info: {ascension: 4},
            stats: {
                text_percent: A4BloomBonus,
                text_percent_max: A4BloomBonusMax,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
                new ConditionBooleanNilouParty(),
                new ConditionBoolean({name: 'nilou_stance_bonus'}),
            ],
        }),
    ],
    postEffects: [
        bloomDmgPost,
        critRatePost,
        critDmgPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.nilou_dance_of_the_waning_moon',
                    description: 'talent_descr.nilou_dance_of_the_waning_moon',
                    stats: {
                        dmg_skill_nilou: C1SkillDmg,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'nilou_the_starry_skies_1',
                    serializeId: 3,
                    title: 'talent_name.nilou_the_starry_skies_their_flowers_rain_1',
                    description: 'talent_descr.nilou_the_starry_skies_their_flowers_rain_1',
                    stats: {
                        enemy_res_hydro: C2EnemyResHydro,
                    },
                    subConditions: [
                        new ConditionBooleanNilouParty(),
                        new ConditionBoolean({name: 'nilou_stance_bonus'}),
                        new ConditionAscensionChar({ascension: 4}),
                    ],
                }),
                new ConditionBoolean({
                    name: 'nilou_the_starry_skies_2',
                    serializeId: 4,
                    title: 'talent_name.nilou_the_starry_skies_their_flowers_rain_2',
                    description: 'talent_descr.nilou_the_starry_skies_their_flowers_rain_2',
                    stats: {
                        enemy_res_dendro: C2EnemyResDendro,
                    },
                    subConditions: [
                        new ConditionAscensionChar({ascension: 4}),
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
                    name: 'nilou_fricative_pulse',
                    serializeId: 5,
                    title: 'talent_name.nilou_fricative_pulse',
                    description: 'talent_descr.nilou_fricative_pulse',
                    stats: {
                        dmg_burst: C4BurstDmg, // ????
                    },
                }),
            ]
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
                    title: 'talent_name.nilou_frostbreakers_melody',
                    description: 'talent_descr.nilou_frostbreakers_melody',
                    stats: {
                        text_percent_rate: C6CritRate,
                        text_percent_rate_max: C6CritRateMax,
                        text_percent_dmg: C6CritDmg,
                        text_percent_dmg_max: C6CritDmgMax,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['hp_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'nilou_max_hp',
                title: 'talent_name.stats_total_hp',
                partyStat: 'hp_total',
                serializeId: 1,
                max: CHARACTER_MAX_POSSIBLE_HP,
                class: "gi-inputs-5digit",
            }),
            new ConditionBoolean({
                name: 'party.nilou_stance_bonus',
                serializeId: 2,
                title: 'talent_name.nilou_court_of_dancing_petals',
                description: 'talent_descr.nilou_court_of_dancing_petals_1',
                info: {ascension: 1},
                subConditions: [
                    new ConditionBooleanNilouParty(),
                ],
            }),
            new ConditionBoolean({
                name: 'party.nilou_stance_attacked',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.nilou_court_of_dancing_petals',
                description: 'talent_descr.nilou_court_of_dancing_petals_2',
                stats: {
                    mastery: A1Mastery,
                },
                info: {ascension: 1},
                subConditions: [
                    new ConditionBooleanNilouParty(),
                    new ConditionBoolean({name: 'party.nilou_stance_bonus'}),
                ],
            }),
            new ConditionStatic({
                title: 'talent_name.nilou_dreamy_dance_of_aeons',
                description: 'talent_descr.nilou_dreamy_dance_of_aeons',
                info: {ascension: 4},
                subConditions: [
                    new ConditionBooleanNilouParty(),
                    new ConditionBoolean({name: 'party.nilou_stance_bonus'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.nilou_the_starry_skies_1',
                serializeId: 5,
                rotation: 'party',
                title: 'talent_name.nilou_the_starry_skies_their_flowers_rain_1',
                description: 'talent_descr.nilou_the_starry_skies_their_flowers_rain_1',
                stats: {
                    enemy_res_hydro: C2EnemyResHydro,
                },
                info: {constellation: 2},
                subConditions: [
                    new ConditionBooleanNilouParty(),
                    new ConditionBoolean({name: 'party.nilou_stance_bonus'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.nilou_the_starry_skies_2',
                serializeId: 6,
                rotation: 'party',
                title: 'talent_name.nilou_the_starry_skies_their_flowers_rain_2',
                description: 'talent_descr.nilou_the_starry_skies_their_flowers_rain_2',
                stats: {
                    enemy_res_dendro: C2EnemyResDendro,
                },
                info: {constellation: 2},
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'nilou_max_hp',
                global: 1,
                exceed: 30000,
                percent: new StatTable('dmg_reaction_rupture', [A4BloomBonus / 1000]),
                statCap: new StatTable('', [A4BloomBonusMax]),
                conditions: [
                    new ConditionBooleanNilouParty(),
                    new ConditionBoolean({name: 'party.nilou_stance_bonus'}),
                ],
            }),
        ],
    },
});
