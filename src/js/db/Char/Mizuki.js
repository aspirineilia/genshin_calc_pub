import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Mizuki.s1_id,
        title: 'talent_name.yumemizuki_mizuki_pure_heart_pure_dreams',
        description: 'talent_descr.yumemizuki_mizuki_pure_heart_pure_dreams',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Mizuki.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Mizuki.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Mizuki.s1.p3),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Mizuki.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Mizuki.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Mizuki.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Mizuki.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Mizuki.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Mizuki.s2_id,
        title: 'talent_name.yumemizuki_mizuki_aisa_utamakura_pilgrimage',
        description: 'talent_descr.yumemizuki_mizuki_aisa_utamakura_pilgrimage',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Mizuki.s2.p4),
            },
            {
                table: new StatTable('mizuki_continuous_attack_dmg', charTalentTables.Mizuki.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('mizuki_duration', charTalentTables.Mizuki.s2.p5),
            },
            {
                digits: 2,
                table: new StatTable('mizuki_em_buff', charTalentTables.Mizuki.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mizuki.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Mizuki.s3_id,
        title: 'talent_name.yumemizuki_mizuki_anraku_secret_spring_therapy',
        description: 'talent_descr.yumemizuki_mizuki_anraku_secret_spring_therapy',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Mizuki.s3.p1),
            },
            {
                table: new StatTable('mizuki_munen_shockwave_dmg', charTalentTables.Mizuki.s3.p2),
            },
            {
                type: 'shield',
                unit: 'mastery',
                table: [
                    new StatTable('mizuki_snack_heal', charTalentTables.Mizuki.s3.p3),
                    new StatTable('', charTalentTables.Mizuki.s3.p7),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Mizuki.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mizuki.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Mizuki.s3.p5),
            },
        ],
    },
});

const A4Mastery = 100;
const C1SwirlBonus = 1100;
const C2ElemBonus = 4;
const C6SwirlCritRate = 30;
const C6SwirlCritDmg = 100;

const buffSwirl = new PostEffectStatsMastery({
    levelSetting: 'char_skill_elemental',
    percent: Talents.getAlias('skill.mizuki_em_buff', 'dmg_reaction_swirl'),
    conditions: [
        new ConditionBoolean({name: 'mizuki_dreamdrifter'}),
    ],
});

const buffElemental = new PostEffectStatsMastery({
    percent: [
        new StatTable('dmg_pyro', [C2ElemBonus / 100]),
        new StatTable('dmg_hydro', [C2ElemBonus / 100]),
        new StatTable('dmg_electro', [C2ElemBonus / 100]),
        new StatTable('dmg_cryo', [C2ElemBonus / 100]),
    ],
    conditions: [
        new ConditionBoolean({name: 'mizuki_dreamdrifter'}),
        new ConditionConstellation({constellation: 2}),
    ],
});

export const Mizuki = new DbObjectChar({
    name: 'yumemizuki_mizuki',
    serializeId: 101,
    gameId: 10000109,
    iconClass: "char-icon-yumemizuki-mizuki",
    rarity: 5,
    element: 'anemo',
    weapon: 'catalyst',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Mizuki,
    features: [
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mizuki_continuous_attack_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.mizuki_munen_shockwave_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'mizuki_snack_other_heal',
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.mizuki_snack_heal'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'mizuki_snack_self_heal',
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    scalingMultiplier: 2,
                    scalingSource: 'mizuki_selfheal',
                    values: Talents.getList('burst.mizuki_snack_heal'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'mizuki_swirl_bonus',
            postEffect: buffSwirl,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'mizuki_elemental_bonus',
            postEffect: buffElemental,
            format: 'percent',
            condition: new ConditionConstellation({constellation: 2}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'mizuki_dreamdrifter',
            serializeId: 1,
            title: 'talent_name.yumemizuki_mizuki_dreamdrifter',
            description: 'talent_descr.yumemizuki_mizuki_dreamdrifter',
        }),
        new ConditionStatic({
            title: 'talent_name.yumemizuki_mizuki_bright_moons_restless_voice',
            description: 'talent_descr.yumemizuki_mizuki_bright_moons_restless_voice',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'mizuki_thoughts_by_day_bring_dreams_by_night',
            serializeId: 2,
            title: 'talent_name.yumemizuki_mizuki_thoughts_by_day_bring_dreams_by_night',
            description: 'talent_descr.yumemizuki_mizuki_thoughts_by_day_bring_dreams_by_night',
            info: {ascension: 4},
            stats: {
                mastery: A4Mastery,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            source: 'constellation1',
            values: new ValueTable([C1SwirlBonus]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'mizuki_dreamdrifter'}),
                new ConditionBoolean({name: 'mizuki_in_mist_like_waters'}),
                new ConditionConstellation({constellation: 1}),
            ]),
            target: new FeatureMultiplierTarget({
                tags: ['swirl'],
                options: ['reaction_flat'],
            }),
        }),
    ],
    postEffects: [
        buffSwirl,
        buffElemental,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'mizuki_in_mist_like_waters',
                    serializeId: 3,
                    title: 'talent_name.yumemizuki_mizuki_in_mist_like_waters',
                    description: 'talent_descr.yumemizuki_mizuki_in_mist_like_waters',
                    stats: {
                        text_percent_dmg: C1SwirlBonus,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'mizuki_dreamdrifter'}),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.yumemizuki_mizuki_your_echo_i_meet_in_dreams',
                    description: 'talent_descr.yumemizuki_mizuki_your_echo_i_meet_in_dreams',
                    stats: {
                        text_percent_dmg: C2ElemBonus / 100,
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
                    title: 'talent_name.yumemizuki_mizuki_buds_warm_lucid_springs',
                    description: 'talent_descr.yumemizuki_mizuki_buds_warm_lucid_springs',
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
                    title: 'talent_name.yumemizuki_mizuki_the_heart_lingers_long',
                    description: 'talent_descr.yumemizuki_mizuki_the_heart_lingers_long',
                    stats: {
                        crit_rate_swirl: C6SwirlCritRate,
                        crit_dmg_swirl: C6SwirlCritDmg,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'mizuki_dreamdrifter'}),
                    ],
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['mastery_total'],
            settings: ['char_skill_elemental'],
        },
        conditions: [
            new Condition({
                stats: {party_burst_energy_cost: Talents.get('burst.energy_cost').getValue()},
            }),
            new Condition({
                settings: {
                    mizuki_char_skill_elemental_bonus: 3,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.mizuki_constellation_3'}),
                ],
            }),
            new ConditionNumber({
                name: 'mizuki_mastery',
                title: 'stat.mastery',
                partyStat: 'mastery_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'mizuki_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.mizuki_dreamdrifter',
                serializeId: 3,
                title: 'talent_name.yumemizuki_mizuki_dreamdrifter',
                description: 'talent_descr.yumemizuki_mizuki_dreamdrifter',
                rotation: 'party',
            }),
            new ConditionBoolean({
                name: 'party.mizuki_in_mist_like_waters',
                serializeId: 4,
                title: 'talent_name.yumemizuki_mizuki_in_mist_like_waters',
                description: 'talent_descr.yumemizuki_mizuki_in_mist_like_waters',
                rotation: 'party',
                info: {constellation: 1},
                stats: {
                    text_percent_dmg: C1SwirlBonus,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.mizuki_dreamdrifter'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.mizuki_your_echo_i_meet_in_dreams',
                serializeId: 5,
                title: 'talent_name.yumemizuki_mizuki_your_echo_i_meet_in_dreams',
                description: 'talent_descr.yumemizuki_mizuki_your_echo_i_meet_in_dreams',
                rotation: 'party',
                info: {constellation: 2},
                stats: {
                    text_percent_dmg: C2ElemBonus / 100,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.mizuki_dreamdrifter'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.mizuki_constellation_3',
                serializeId: 6,
                title: 'talent_name.yumemizuki_mizuki_till_dawns_moon_ends_night',
                description: 'talent_descr.char_constellation_skill',
                info: {constellation: 3},
            }),
            new ConditionBoolean({
                name: 'party.mizuki_the_heart_lingers_long',
                serializeId: 7,
                title: 'talent_name.yumemizuki_mizuki_the_heart_lingers_long',
                description: 'talent_descr.yumemizuki_mizuki_the_heart_lingers_long',
                info: {constellation: 6},
                stats: {
                    crit_rate_swirl: C6SwirlCritRate,
                    crit_dmg_swirl: C6SwirlCritDmg,
                },
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'mizuki_mastery',
                source: 'yumemizuki_mizuki',
                values: new ValueTable([C1SwirlBonus]),
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'party.mizuki_dreamdrifter'}),
                    new ConditionBoolean({name: 'party.mizuki_in_mist_like_waters'}),
                ]),
                target: new FeatureMultiplierTarget({
                    tags: ['swirl'],
                    options: ['reaction_flat'],
                }),
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'mizuki_mastery',
                levelSetting: 'mizuki_char_skill_elemental',
                percent: Talents.getAlias('skill.mizuki_em_buff', 'dmg_reaction_swirl'),
                conditions: [
                    new ConditionBoolean({name: 'party.mizuki_dreamdrifter'}),
                ],
            }),
            new PostEffectStats({
                from: 'mizuki_mastery',
                percent: [
                    new StatTable('dmg_pyro', [C2ElemBonus / 100]),
                    new StatTable('dmg_hydro', [C2ElemBonus / 100]),
                    new StatTable('dmg_electro', [C2ElemBonus / 100]),
                    new StatTable('dmg_cryo', [C2ElemBonus / 100]),
                ],
                conditions: [
                    new ConditionBoolean({name: 'party.mizuki_dreamdrifter'}),
                    new ConditionBoolean({name: 'party.mizuki_your_echo_i_meet_in_dreams'}),
                ],
            }),
        ],
    },
});
