
import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
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
import { FeatureMultiplierStatic } from "../../classes/Feature2/Multiplier/Static";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureStatic } from "../../classes/Feature2/Static";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsExceedRecharge } from "../../classes/PostEffect/Stats/ExceedRecharge";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.RaidenShogun.s1_id,
        title: 'talent_name.raiden_shogun_origin',
        description: 'talent_descr.raiden_shogun_origin',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.RaidenShogun.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.RaidenShogun.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.RaidenShogun.s1.p3),
            },
            {
                type: 'hits',
                name: 'normal_hit_4',
                table: [
                    new StatTable('normal_hit_4_1', charTalentTables.RaidenShogun.s1.p4),
                    new StatTable('normal_hit_4_2', charTalentTables.RaidenShogun.s1.p5),
                ],
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.RaidenShogun.s1.p6),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.RaidenShogun.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.RaidenShogun.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.RaidenShogun.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.RaidenShogun.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.RaidenShogun.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.RaidenShogun.s2_id,
        title: 'talent_name.raiden_shogun_baleful_omen',
        description: 'talent_descr.raiden_shogun_baleful_omen',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.RaidenShogun.s2.p1),
            },
            {
                table: new StatTable('baal_coordinated_atk_dmg', charTalentTables.RaidenShogun.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.RaidenShogun.s2.p3),
            },
            {
                unit: 'per_energy',
                digits: 2,
                table: new StatTable('baal_burst_bonus', charTalentTables.RaidenShogun.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.RaidenShogun.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.RaidenShogun.s3_id,
        title: 'talent_name.raiden_shogun_musou_shinsetsu',
        description: 'talent_descr.raiden_shogun_musou_shinsetsu',
        items: [
            {
                table: new StatTable('baal_musou_no_hitotachi_dmg', charTalentTables.RaidenShogun.s3.p1),
            },
            {
                unit: 'per_stack',
                digits: 2,
                table: new StatTable('baal_resolve_burst', charTalentTables.RaidenShogun.s3.p2),
            },
            {
                unit: 'per_stack',
                digits: 2,
                table: new StatTable('baal_resolve_atk', charTalentTables.RaidenShogun.s3.p3),
            },
            {
                unit: 'per_energy',
                digits: 2,
                table: new StatTable('baal_resolve_stack', charTalentTables.RaidenShogun.s3.p4),
            },
            {
                table: new StatTable('normal_hit_1', charTalentTables.RaidenShogun.s3.p5),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.RaidenShogun.s3.p6),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.RaidenShogun.s3.p7),
            },
            {
                type: 'hits',
                name: 'normal_hit_4',
                table: [
                    new StatTable('normal_hit_4_1', charTalentTables.RaidenShogun.s3.p8),
                    new StatTable('normal_hit_4_2', charTalentTables.RaidenShogun.s3.p9),
                ],
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.RaidenShogun.s3.p10),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.RaidenShogun.s3.p11),
                    new StatTable('charged_hit_2', charTalentTables.RaidenShogun.s3.p12),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.RaidenShogun.s3.p13),
            },
            {
                table: new StatTable('plunge', charTalentTables.RaidenShogun.s3.p14),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.RaidenShogun.s3.p15),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.RaidenShogun.s3.p16),
            },
            {
                unit: '',
                table: new StatTable('baal_energy_recharge', charTalentTables.RaidenShogun.s3.p17),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.RaidenShogun.s3.p18),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.RaidenShogun.s3.p19),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.RaidenShogun.s3.p20),
            },
        ],
    },
});

const burstDmgPost = new PostEffectStats({
    levelSetting: 'char_skill_elemental',
    from: 'burst_energy_cost',
    percent: Talents.getAlias('skill.baal_burst_bonus', 'dmg_burst'),
    conditions: [
        new ConditionBoolean({name: 'baal_eye_of_stormy_judgment'}),
    ],
});

const electroDmgPost = new PostEffectStatsExceedRecharge({
    percent: new StatTable('dmg_electro', [40]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
    ],
});

export const RaidenShogun = new DbObjectChar({
    name: 'raiden_shogun',
    serializeId: 40,
    gameId: 10000052,
    iconClass: "char-icon-raiden-shogun",
    rarity: 5,
    element: 'electro',
    weapon: 'polearm',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.RaidenShogun,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
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
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_1'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_2'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'baal_musou_isshin'}),
            ]),
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_1',
            category: 'attack',
            tags: ['raiden_attacks'],
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_2',
            category: 'attack',
            tags: ['raiden_attacks'],
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_3',
            category: 'attack',
            tags: ['raiden_attacks'],
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            category: 'attack',
            tags: ['raiden_attacks'],
            damageType: 'burst',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.normal_hit_4_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.normal_hit_4_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_4_1',
            category: 'attack',
            tags: ['raiden_attacks'],
            isChild: true,
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_4_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_4_2',
            category: 'attack',
            tags: ['raiden_attacks'],
            isChild: true,
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_4_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'normal_hit_5',
            category: 'attack',
            tags: ['raiden_attacks'],
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_5'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageMultihit({
            name: 'charged_hit_total',
            category: 'attack',
            tags: ['raiden_attacks'],
            damageType: 'burst',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.charged_hit_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.charged_hit_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'charged_hit_1',
            category: 'attack',
            tags: ['raiden_attacks'],
            isChild: true,
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.charged_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'charged_hit_2',
            category: 'attack',
            tags: ['raiden_attacks'],
            isChild: true,
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.charged_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'plunge',
            category: 'attack',
            tags: ['raiden_attacks'],
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'plunge_low',
            category: 'attack',
            tags: ['raiden_attacks'],
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageBurst({
            name: 'plunge_high',
            category: 'attack',
            tags: ['raiden_attacks'],
            allowInfusion: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'baal_coordinated_atk_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.baal_coordinated_atk_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'baal_musou_no_hitotachi_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.baal_musou_no_hitotachi_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    stacksLeveling: 'baal_resolve_stacks',
                    values: Talents.get('burst.baal_resolve_burst'),
                    condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
                }),
            ],
        }),
        new FeatureStatic({
            category: 'burst',
            name: 'baal_energy_recharge',
            format: 'decimal',
            digits: 2,
            multipliers: [
                new FeatureMultiplierStatic({
                    values: new ValueTable([1]),
                }),
                new FeatureMultiplier({
                    scaling: 'recharge*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'burst.baal_energy_recharge',
                        multi: 60,
                    }),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'burst_dmg_bonus',
            postEffect: burstDmgPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'electro_dmg_bonus',
            postEffect: electroDmgPost,
            format: 'percent',
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'baal_eye_of_stormy_judgment',
            serializeId: 1,
            title: 'talent_name.baal_eye_of_stormy_judgment',
            description: 'talent_descr.baal_eye_of_stormy_judgment',
        }),
        new ConditionBoolean({
            name: 'baal_musou_isshin',
            serializeId: 2,
            title: 'talent_name.baal_musou_isshin',
            description: 'talent_descr.baal_musou_isshin',
            settings: {
                attack_infusion: 'electro',
            },
        }),
        new ConditionNumber({
            name: 'baal_resolve_stacks',
            serializeId: 3,
            title: 'talent_name.baal_resolve_stacks',
            description: 'talent_descr.baal_resolve_stacks',
            max: 60,
        }),
        new ConditionStatic({
            title: 'talent_name.raiden_shogun_wishes_unnumbered',
            description: 'talent_descr.raiden_shogun_wishes_unnumbered',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.raiden_shogun_enlightened_one',
            description: 'talent_descr.raiden_shogun_enlightened_one',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        burstDmgPost,
        electroDmgPost,
    ],
    multipliers: [
        new FeatureMultiplier({
            leveling: 'char_skill_burst',
            stacksLeveling: 'baal_resolve_stacks',
            values: Talents.get('burst.baal_resolve_atk'),
            condition: new ConditionBoolean({name: 'baal_musou_isshin'}),
            source: 'talent_burst',
            target: new FeatureMultiplierTarget({
                tags: ['raiden_attacks'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.raiden_shogun_ominous_inscription',
                    description: 'talent_descr.raiden_shogun_ominous_inscription',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.raiden_shogun_steelbreaker',
                    description: 'talent_descr.raiden_shogun_steelbreaker',
                    stats: {
                        enemy_def_ignore_burst: 60,
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
                    title: 'talent_name.raiden_shogun_pledge_of_propriety',
                    description: 'talent_descr.raiden_shogun_pledge_of_propriety',
                    stats: {
                        text_percent: 30,
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
                    title: 'talent_name.raiden_shogun_wishbearer',
                    description: 'talent_descr.raiden_shogun_wishbearer',
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['char_skill_elemental'],
        },
        conditions: [
            new ConditionNumberTalent({
                name: 'baal_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 1,
            }),
            new ConditionBoolean({
                name: 'party.baal_eye_of_stormy_judgment',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.baal_eye_of_stormy_judgment',
                description: 'talent_descr.baal_eye_of_stormy_judgment',
            }),
            new ConditionBoolean({
                name: 'party.raiden_shogun_pledge_of_propriety',
                serializeId: 5,
                rotation: 'party',
                title: 'talent_name.raiden_shogun_pledge_of_propriety',
                description: 'talent_descr.raiden_shogun_pledge_of_propriety',
                info: {constellation: 4},
                stats: {
                    atk_percent: 30,
                    text_percent: 30,
                },
            }),
            new ConditionBoolean({
                name: 'party.baal_constellation_5',
                serializeId: 3,
                title: 'talent_name.raiden_shogun_shoguns_descent',
                description: 'talent_descr.char_constellation_skill',
                info: {constellation: 5},
                settings: {
                    baal_char_skill_elemental_bonus: 3,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                levelSetting: 'baal_char_skill_elemental',
                maxLevelSetting: 10,
                from: 'burst_energy_cost',
                percent: Talents.getAlias('skill.baal_burst_bonus', 'dmg_burst'),
                conditions: [
                    new ConditionBoolean({name: 'party.baal_eye_of_stormy_judgment'}),
                ],
            })
        ],
    },
});
