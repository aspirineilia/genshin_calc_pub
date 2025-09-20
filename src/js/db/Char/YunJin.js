import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionCalcElements } from "../../classes/Condition/CalcElements";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { PostEffectStatsDef } from "../../classes/PostEffect/Stats/Def";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { ConditionStaticYunJin } from "../../classes/Condition/Static/YunJin";
import { ConditionBooleanYunJin } from "../../classes/Condition/Boolean/YunJin";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ValueTable } from "../../classes/ValueTable";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { ConditionAnd } from "../../classes/Condition/And";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.YunJin.s1_id,
        title: 'talent_name.yun_jin_cloud_grazing_strike',
        description: 'talent_descr.yun_jin_cloud_grazing_strike',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.YunJin.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.YunJin.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.YunJin.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.YunJin.s1.p4),
                ],
            },
            {
                type: 'hits',
                name: 'normal_hit_4',
                table: [
                    new StatTable('normal_hit_4_1', charTalentTables.YunJin.s1.p5),
                    new StatTable('normal_hit_4_2', charTalentTables.YunJin.s1.p6),
                ],
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.YunJin.s1.p7),
            },


            {
                table: new StatTable('charged_hit', charTalentTables.YunJin.s1.p8),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.YunJin.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.YunJin.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.YunJin.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.YunJin.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.YunJin.s2_id,
        title: 'talent_name.yun_jin_opening_flourish',
        description: 'talent_descr.yun_jin_opening_flourish',
        items: [
            {
                unit: 'def',
                table: new StatTable('press_dmg', charTalentTables.YunJin.s2.p3),
            },
            {
                unit: 'def',
                table: new StatTable('yunjin_charge_1_dmg', charTalentTables.YunJin.s2.p4),
            },
            {
                unit: 'def',
                table: new StatTable('yunjin_charge_2_dmg', charTalentTables.YunJin.s2.p5),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('shield', charTalentTables.YunJin.s2.p1),
                    new StatTable('', charTalentTables.YunJin.s2.p2),
                ]
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YunJin.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.YunJin.s3_id,
        title: 'talent_name.yun_jin_cliffbreakers_banner',
        description: 'talent_descr.yun_jin_cliffbreakers_banner',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.YunJin.s3.p1),
            },
            {
                unit: 'def',
                table: new StatTable('yunjin_dmg_bonus', charTalentTables.YunJin.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.YunJin.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('yunjin_quota', charTalentTables.YunJin.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YunJin.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.YunJin.s3.p5),
            },
        ],
    },
});

export const YunJin = new DbObjectChar({
    name: 'yun_jin',
    serializeId: 47,
    gameId: 10000064,
    iconClass: "char-icon-yun-jin",
    rarity: 4,
    element: 'geo',
    weapon: 'polearm',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.YunJin,
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
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
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.yunjin_charge_1_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.yunjin_charge_2_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'geo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.shield'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'yunjin_dmg_bonus',
            postEffect: new PostEffectStatsDef({
                percent: Talents.getMulti({
                    name: '',
                    from: 'burst.yunjin_dmg_bonus',
                    multi: 0.01,
                }),
                levelSetting: 'char_skill_burst',
                percentBonus: new StatTable('', [0.025, 0.05, 0.075, 0.115]),
                percentBonusLevel: 'yunjin_traditionalist_stacks',
            }),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            leveling: 'char_skill_burst',
            source: 'talent_burst',
            values: Talents.get('burst.yunjin_dmg_bonus'),
            bonusLeveling: 'yunjin_traditionalist_stacks',
            bonusValues: new ValueTable([2.5, 5, 7.5, 11.5]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal'],
            }),
            condition: new ConditionBoolean({name: 'yunjin_flag'}),
        }),
    ],
    conditions: [
        new ConditionCalcElements({}),
        new ConditionBoolean({
            name: 'yunjin_flag',
            serializeId: 1,
            title: 'talent_name.yunjin_flag',
            description: 'talent_descr.yunjin_flag',
        }),
        new ConditionStatic({
            title: 'talent_name.yun_jin_true_to_oneself',
            description: 'talent_descr.yun_jin_true_to_oneself',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStaticYunJin({
            title: 'talent_name.yun_jin_breaking_conventions',
            description: 'talent_descr.yun_jin_breaking_conventions',
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
                    title: 'talent_name.yun_jin_thespian_gallop',
                    description: 'talent_descr.yun_jin_thespian_gallop',
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'yunjin_myriad',
                    serializeId: 2,
                    title: 'talent_name.yun_jin_myriad_mise_en_scene',
                    description: 'talent_descr.yun_jin_myriad_mise_en_scene',
                    stats: {
                        dmg_normal: 15,
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
                new ConditionBoolean({
                    name: 'yunjin_flower',
                    serializeId: 3,
                    title: 'talent_name.yun_jin_flower_and_a_fighter',
                    description: 'talent_descr.yun_jin_flower_and_a_fighter',
                    stats: {
                        def_percent: 20,
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
                    title: 'talent_name.yun_jin_decorous_harmony',
                    description: 'talent_descr.yun_jin_decorous_harmony',
                    stats: {
                        atk_speed_normal: 12,
                        text_percent: 12,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'yunjin_flag'}),
                    ],
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['def_total'],
            settings: ['char_skill_elemental'],
        },
        conditions: [
            new ConditionCalcElements({}),
            new ConditionNumber({
                name: 'yunjin_def_total',
                title: 'talent_name.stats_total_def',
                partyStat: 'def_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'yunjin_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.yunjin_flag',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.yunjin_flag',
                description: 'talent_descr.yunjin_flag',
            }),
            new ConditionBooleanYunJin({
                name: 'party.yunjin_traditionalist',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.yun_jin_breaking_conventions',
                description: 'talent_descr.yun_jin_breaking_conventions',
                info: {
                    ascension: 4,
                },
            }),
            new ConditionBoolean({
                name: 'party.yunjin_myriad',
                serializeId: 5,
                rotation: 'party',
                title: 'talent_name.yun_jin_myriad_mise_en_scene',
                description: 'talent_descr.yun_jin_myriad_mise_en_scene',
                stats: {
                    dmg_normal: 15,
                },
                info: {
                    constellation: 2,
                },
            }),
            new ConditionBoolean({
                name: 'party.yunjin_constellation_3',
                serializeId: 6,
                title: 'talent_name.yun_jin_seafaring_general',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    yunjin_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 3,
                },
            }),
            new ConditionBoolean({
                name: 'party.yunjin_decorous_harmony',
                serializeId: 7,
                title: 'talent_name.yun_jin_decorous_harmony',
                description: 'talent_descr.yun_jin_decorous_harmony',
                info: {
                    constellation: 6,
                },
                stats: {
                    text_percent: 12,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.yunjin_constellation_3'}),
                ],
            }),
            new Condition({
                stats: {
                    atk_speed_normal: 12,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.yunjin_flag'}),
                    new ConditionBoolean({name: 'party.yunjin_decorous_harmony'}),
                ],
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'yunjin_def_total',
                leveling: 'yunjin_char_skill_burst',
                source: 'yun_jin',
                values: Talents.get('burst.yunjin_dmg_bonus'),
                bonusLeveling: 'yunjin_traditionalist_stacks',
                bonusValues: new ValueTable([2.5, 5, 7.5, 11.5]),
                target: new FeatureMultiplierTarget({
                    damageTypes: ['normal'],
                }),
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'yunjin_def_total'}),
                    new ConditionBoolean({name: 'party.yunjin_flag'}),
                ]),
            }),
        ]
    },
});
