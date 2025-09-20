import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
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
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Iansan.s1_id,
        title: 'talent_name.iansan_weighted_spike',
        description: 'talent_descr.iansan_weighted_spike',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Iansan.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Iansan.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Iansan.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Iansan.s1.p4),
            },
            {
                table: new StatTable('iansan_charged_hit', charTalentTables.Iansan.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Iansan.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Iansan.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Iansan.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Iansan.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Iansan.s2_id,
        title: 'talent_name.iansan_thunderbolt_rush',
        description: 'talent_descr.iansan_thunderbolt_rush',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Iansan.s2.p1),
            },
            {
                unit: 'unit',
                table: new StatTable('xilonen_nightsoul', charTalentTables.Iansan.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Iansan.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Iansan.s3_id,
        title: 'talent_name.iansan_the_three_principles_of_power',
        description: 'talent_descr.iansan_the_three_principles_of_power',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Iansan.s3.p1),
            },
            {
                unit: 'atk',
                table: new StatTable('iansan_conversion_high', charTalentTables.Iansan.s3.p2),
            },
            {
                unit: 'atk_nightsoul',
                table: new StatTable('iansan_conversion_low', charTalentTables.Iansan.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('iansan_bonus_max', charTalentTables.Iansan.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('iansan_duration_combat', charTalentTables.Iansan.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('iansan_duration', charTalentTables.Iansan.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Iansan.s3.p7),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Iansan.s3.p8),
            },
        ],
    },
});

const BurstPointsMax = 42;
const A1AtkPercent = 20;
const A4Heal = 60;
const C2AtkPercent = 30;
const C6DmgBonus = 25;

const postEffectAtk = new PostEffectStats({
    from: 'atk*',
    levelSetting: 'char_skill_burst',
    stacksSetting: 'iansan_points',
    percent: Talents.getMulti({
        name: 'atk',
        from: 'burst.iansan_conversion_low',
        multi: 0.01,
    }),
    statCap: Talents.get('burst.iansan_bonus_max'),
    condition: new ConditionBoolean({name: 'iansan_points'}),
    percentBonus: new ValueTable([0.06]),
    bonusCondition: new ConditionBooleanValue({
        setting: 'iansan_points',
        cond: 'ge',
        value: 42,
    }),
});

export const Iansan = new DbObjectChar({
    name: 'iansan',
    serializeId: 102,
    gameId: 10000110,
    iconClass: 'char-icon-iansan',
    rarity: 4,
    element: 'electro',
    weapon: 'polearm',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Iansan,
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
                    values: Talents.get('attack.normal_hit_3'),
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
        new FeatureDamageCharged({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.iansan_charged_hit'),
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
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
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
        // new FeaturePostEffectValue({
        //     category: 'skill',
        //     name: 'iansan_atk_max',
        //     postEffect: new PostEffectStatsIansan({
        //         from: 'atk*',
        //         levelSetting: 'char_skill_burst',
        //         conversion: Talents.get('burst.iansan_conversion_high'),
        //         maxBonus: Talents.get('burst.iansan_bonus_max'),
        //     }),
        // }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'atk_bonus',
            postEffect: postEffectAtk,
            condition: new ConditionBoolean({name: 'iansan_points'}),
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'iansan_bonus_max',
            postEffect: new PostEffectStats({
                from: 'atk*',
                // global: true,
                levelSetting: 'char_skill_burst',
                percent: new StatTable('', [0.27]),
                statCap: Talents.get('burst.iansan_bonus_max'),
            }),
        }),
        new FeatureHeal({
            category: 'other',
            name: 'iansan_heal',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'atk*',
                    source: 'ascension4',
                    values: new ValueTable([A4Heal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionNumber({
            name: 'iansan_points',
            serializeId: 1,
            title: 'talent_name.nightsoul_points',
            max: BurstPointsMax,
        }),
        new ConditionStatic({
            title: 'talent_name.iansan_kinetic_energy_scale',
            description: 'talent_descr.iansan_kinetic_energy_scale',
            condition: new ConditionBoolean({name: 'iansan_points'}),
        }),
        new ConditionBoolean({
            name: 'iansan_enhanced_resistance_training',
            serializeId: 2,
            title: 'talent_name.iansan_enhanced_resistance_training',
            description: 'talent_descr.iansan_enhanced_resistance_training',
            stats: {
                atk_percent: A1AtkPercent,
            },
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStatic({
            title: 'talent_name.iansan_kinetic_energy_gradient_test',
            description: 'talent_descr.iansan_kinetic_energy_gradient_test',
            stats: {
                text_percent_heal: A4Heal,
            },
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.iansan_startings_never_easy',
                    description: 'talent_descr.iansan_startings_never_easy',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.iansan_laziness_is_the_enemy',
                    description: 'talent_descr.iansan_laziness_is_the_enemy_1',
                }),
                new ConditionStatic({
                    title: 'talent_name.iansan_laziness_is_the_enemy',
                    description: 'talent_descr.iansan_laziness_is_the_enemy_2',
                    stats: {
                        text_percent: C2AtkPercent,
                    },
                    condition: new ConditionAscensionChar({ascension: 1}),
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
                    title: 'talent_name.iansan_slow_and_steady_wins_the_race',
                    description: 'talent_descr.iansan_slow_and_steady_wins_the_race',
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
                    title: 'talent_name.iansan_teachings_of_the_collective_of_plenty',
                    description: 'talent_descr.iansan_teachings_of_the_collective_of_plenty_1',
                }),
                new ConditionBoolean({
                    name: 'iansan_teachings_of_the_collective_of_plenty',
                    serializeId: 3,
                    title: 'talent_name.iansan_teachings_of_the_collective_of_plenty',
                    description: 'talent_descr.iansan_teachings_of_the_collective_of_plenty_2',
                    stats: {
                        dmg_all: C6DmgBonus,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
            settings: ['char_skill_burst'],
        },
        conditions: [
            new ConditionNumber({
                name: 'iansan_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'iansan_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 2,
            }),
            new ConditionNumber({
                name: 'party_iansan_points',
                serializeId: 3,
                title: 'talent_name.nightsoul_points',
                rotation: 'party',
                max: BurstPointsMax,
            }),
            new ConditionStatic({
                title: 'talent_name.iansan_kinetic_energy_scale',
                description: 'talent_descr.iansan_kinetic_energy_scale',
                condition: new ConditionBoolean({name: 'party_iansan_points'}),
            }),
            new ConditionBoolean({
                name: 'party.iansan_laziness_is_the_enemy',
                serializeId: 4,
                title: 'talent_name.iansan_laziness_is_the_enemy',
                description: 'talent_descr.iansan_laziness_is_the_enemy_2',
                rotation: 'party',
                info: {constellation: 2},
                stats: {
                    text_percent: C2AtkPercent,
                    atk_percent: C2AtkPercent,
                },
            }),
            new ConditionBoolean({
                name: 'party.iansan_constellation_5',
                serializeId: 5,
                title: 'talent_name.iansan_we_can_push_it_further',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    iansan_char_skill_burst_bonus: 3,
                },
                info: {constellation: 5},
            }),
            new ConditionBoolean({
                name: 'party.iansan_teachings_of_the_collective_of_plenty',
                serializeId: 6,
                title: 'talent_name.iansan_teachings_of_the_collective_of_plenty',
                description: 'talent_descr.iansan_teachings_of_the_collective_of_plenty_2',
                rotation: 'party',
                info: {constellation: 6},
                stats: {
                    dmg_all: C6DmgBonus,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'iansan_atk_total',
                levelSetting: 'iansan_char_skill_burst',
                stacksSetting: 'party_iansan_points',
                percent: Talents.getMulti({
                    name: 'atk',
                    from: 'burst.iansan_conversion_low',
                    multi: 0.01,
                }),
                statCap: Talents.get('burst.iansan_bonus_max'),
                condition: new ConditionBoolean({name: 'party_iansan_points'}),
                percentBonus: new ValueTable([0.06]),
                bonusCondition: new ConditionBooleanValue({
                    setting: 'party_iansan_points',
                    cond: 'ge',
                    value: 42,
                }),
            }),
        ],
    },
});
