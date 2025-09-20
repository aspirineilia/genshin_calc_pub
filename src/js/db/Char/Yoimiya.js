
import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierYoimiya } from "../../classes/Feature2/Multiplier/Yoimiya";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Yoimiya.s1_id,
        title: 'talent_name.yoimiya_firework_flare_up',
        description: 'talent_descr.yoimiya_firework_flare_up',
        items: [
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_1', charTalentTables.Yoimiya.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Yoimiya.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Yoimiya.s1.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Yoimiya.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Yoimiya.s1.p5),
            },
            {
                table: new StatTable('aimed', charTalentTables.Yoimiya.s1.p6),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Yoimiya.s1.p7),
            },
            {
                table: new StatTable('yoimiya_kindling_arrow_dmg', charTalentTables.Yoimiya.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Yoimiya.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Yoimiya.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Yoimiya.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Yoimiya.s2_id,
        title: 'talent_name.yoimiya_niwabi_fire_dance',
        description: 'talent_descr.yoimiya_niwabi_fire_dance',
        items: [
            {
                unit: 'normal_atk',
                table: new StatTable('yoimiya_bonus_dmg', charTalentTables.Yoimiya.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Yoimiya.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Yoimiya.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Yoimiya.s3_id,
        title: 'talent_name.yoimiya_ryuukin_saxifrage',
        description: 'talent_descr.yoimiya_ryuukin_saxifrage',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Yoimiya.s3.p1),
            },
            {
                table: new StatTable('yoimiya_aurous_blaze_dmg', charTalentTables.Yoimiya.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Yoimiya.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Yoimiya.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Yoimiya.s3.p6),
            },
        ],
    },
});

const c6cond = new ConditionAnd([
    new ConditionBoolean({name: 'yoimiya_teika_enshou'}),
    new ConditionConstellation({constellation: 6}),
]);

export const Yoimiya = new DbObjectChar({
    name: 'yoimiya',
    serializeId: 37,
    gameId: 10000049,
    iconClass: "char-icon-yoimiya",
    rarity: 5,
    element: 'pyro',
    weapon: 'bow',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Yoimiya,
    features: [
        new FeatureDamageMultihit({
            name: 'normal_hit_1',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierYoimiya({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_1'),
                            scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1_1',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplierYoimiya({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplierYoimiya({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplierYoimiya({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierYoimiya({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                            scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplierYoimiya({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplierYoimiya({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'yoimiya_normal_hit_1',
            rotationHitCount: 0.5,
            rotationHitDescription: 'talent_activation_chance',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierYoimiya({
                            scalingSource: 'constellation6',
                            scalingMultiplier: 0.6,
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_1'),
                            scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                        }),
                    ],
                },
            ],
            condition: c6cond,
        }),
        new FeatureDamageNormal({
            name: 'yoimiya_normal_hit_1_1',
            rotationHitCount: 0.5,
            rotationHitDescription: 'talent_activation_chance',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplierYoimiya({
                    scalingSource: 'constellation6',
                    scalingMultiplier: 0.6,
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageNormal({
            name: 'yoimiya_normal_hit_2',
            rotationHitCount: 0.5,
            rotationHitDescription: 'talent_activation_chance',
            multipliers: [
                new FeatureMultiplierYoimiya({
                    scalingSource: 'constellation6',
                    scalingMultiplier: 0.6,
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageNormal({
            name: 'yoimiya_normal_hit_3',
            rotationHitCount: 0.5,
            rotationHitDescription: 'talent_activation_chance',
            multipliers: [
                new FeatureMultiplierYoimiya({
                    scalingSource: 'constellation6',
                    scalingMultiplier: 0.6,
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageMultihit({
            name: 'yoimiya_normal_hit_4',
            rotationHitCount: 0.5,
            rotationHitDescription: 'talent_activation_chance',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierYoimiya({
                            scalingSource: 'constellation6',
                            scalingMultiplier: 0.6,
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                            scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                        }),
                    ],
                },
            ],
            condition: c6cond,
        }),
        new FeatureDamageNormal({
            name: 'yoimiya_normal_hit_4_1',
            rotationHitCount: 0.5,
            rotationHitDescription: 'talent_activation_chance',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplierYoimiya({
                    scalingSource: 'constellation6',
                    scalingMultiplier: 0.6,
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageNormal({
            name: 'yoimiya_normal_hit_5',
            rotationHitCount: 0.5,
            rotationHitDescription: 'talent_activation_chance',
            multipliers: [
                new FeatureMultiplierYoimiya({
                    scalingSource: 'constellation6',
                    scalingMultiplier: 0.6,
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                    scalingValues: Talents.get('skill.yoimiya_bonus_dmg'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.yoimiya_kindling_arrow_dmg'),
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
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.yoimiya_aurous_blaze_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'yoimiya_teika_enshou',
            serializeId: 1,
            title: 'talent_name.yoimiya_teika_enshou',
            description: 'talent_descr.yoimiya_teika_enshou',
            settings: {
                attack_infusion: 'pyro',
            },
        }),
        new ConditionStacks({
            name: 'yoimiya_tricks',
            serializeId: 2,
            title: 'talent_name.yoimiya_tricks_of_the_trouble_maker',
            description: 'talent_descr.yoimiya_tricks_of_the_trouble_maker',
            maxStacks: 10,
            dropdownClass: 'two-digits',
            stats: [
                new StatTable('dmg_pyro', [2]),
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.yoimiya_summer_nights_dawn',
            description: 'talent_descr.yoimiya_summer_nights_dawn_1',
            stats: {
                text_percent: 10,
                text_percent_2: 1,
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
                new ConditionBoolean({
                    name: 'yoimiya_agate_ryukin',
                    serializeId: 3,
                    title: 'talent_name.yoimiya_agate_ryuukin',
                    description: 'talent_descr.yoimiya_agate_ryuukin',
                    stats: {
                        atk_percent: 20,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'yoimiya_procession_of_bonfires',
                    serializeId: 4,
                    title: 'talent_name.yoimiya_a_procession_of_bonfires',
                    description: 'talent_descr.yoimiya_a_procession_of_bonfires',
                    stats: {
                        dmg_pyro: 25,
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
                    title: 'talent_name.yoimiya_pyrotechnic_professional',
                    description: 'talent_descr.yoimiya_pyrotechnic_professional',
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
                    title: 'talent_name.yoimiya_naganohara_meteor_swarm',
                    description: 'talent_descr.yoimiya_naganohara_meteor_swarm',
                    stats: {
                        text_percent_chance: 50,
                        text_percent_dmg: 60,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.yoimiya_summer_scorch',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.yoimiya_summer_nights_dawn',
                description: 'talent_descr.yoimiya_summer_nights_dawn_2',
                info: {ascension: 4},
                stats: {
                    atk_percent: 10,
                    text_percent: 10,
                },
            }),
            new ConditionStacks({
                name: 'party.yoimiya_summer_scorch_stack',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.yoimiya_summer_nights_dawn',
                description: 'talent_descr.yoimiya_summer_nights_dawn_3',
                maxStacks: 10,
                dropdownClass: 'two-digits',
                info: {ascension: 4},
                stats: [
                    new StatTable('atk_percent', [1]),
                    new StatTable('text_percent_2', [1]),
                ],
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.yoimiya_summer_scorch',
                    }),
                ],
            }),
        ],
    },
});
