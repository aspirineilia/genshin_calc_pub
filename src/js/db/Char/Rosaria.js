import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
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
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Rosaria.s1_id,
        title: 'talent_name.rosaria_spear_of_the_church',
        description: 'talent_descr.rosaria_spear_of_the_church',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Rosaria.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Rosaria.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Rosaria.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Rosaria.s1.p4),
            },
            {
                type: 'hits',
                name: 'normal_hit_5',
                table: [
                    new StatTable('normal_hit_5_1', charTalentTables.Rosaria.s1.p5),
                    new StatTable('normal_hit_5_2', charTalentTables.Rosaria.s1.p6),
                ],
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Rosaria.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Rosaria.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Rosaria.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Rosaria.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Rosaria.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Rosaria.s2_id,
        title: 'talent_name.rosaria_ravaging_confession',
        description: 'talent_descr.rosaria_ravaging_confession',
        items: [
            {
                type: 'hits',
                name: 'skill_dmg',
                table: [
                    new StatTable('rosaria_stab_dmg', charTalentTables.Rosaria.s2.p1),
                    new StatTable('rosaria_slash_dmg', charTalentTables.Rosaria.s2.p2),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Rosaria.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Rosaria.s3_id,
        title: 'talent_name.rosaria_rites_of_termination',
        description: 'talent_descr.rosaria_rites_of_termination',
        items: [
            {
                type: 'hits',
                name: 'burst_dmg',
                table: [
                    new StatTable('rosaria_swing_dmg', charTalentTables.Rosaria.s3.p1),
                    new StatTable('rosaria_burst_lance_dmg', charTalentTables.Rosaria.s3.p2),
                ],
            },
            {
                table: new StatTable('rosaria_ice_lance', charTalentTables.Rosaria.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Rosaria.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Rosaria.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Rosaria.s3.p6),
            },
        ],
    },
});

export const Rosaria = new DbObjectChar({
    name: 'rosaria',
    serializeId: 32,
    gameId: 10000045,
    iconClass: "char-icon-rosaria",
    rarity: 4,
    element: 'cryo',
    weapon: 'polearm',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Rosaria,
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
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
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
                    values: Talents.get('attack.normal_hit_3'),
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_5',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_5_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_5_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_2'),
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
        new FeatureDamageMultihit({
            name: 'skill_dmg',
            category: 'skill',
            damageType: 'skill',
            element: 'cryo',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.rosaria_stab_dmg'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.rosaria_slash_dmg'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            name: 'rosaria_stab_dmg',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.rosaria_stab_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'rosaria_slash_dmg',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.rosaria_slash_dmg'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'burst_dmg',
            category: 'burst',
            damageType: 'burst',
            element: 'cryo',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.rosaria_swing_dmg'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.rosaria_burst_lance_dmg'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageBurst({
            name: 'rosaria_swing_dmg',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.rosaria_swing_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'rosaria_burst_lance_dmg',
            element: 'cryo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.rosaria_burst_lance_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'rosaria_ice_lance',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.rosaria_ice_lance'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'rosaria_crit_dmg_buff',
            postEffect: new PostEffectStats({
                from: 'crit_rate*',
                percent: new StatTable('crit_rate', [15]),
                statCap: new ValueTable([15]),
            }),
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'rosaria_regina_probationum',
            serializeId: 1,
            title: 'talent_name.rosaria_regina_probationum',
            description: 'talent_descr.rosaria_regina_probationum',
            stats: {
                crit_rate: 12,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.rosaria_shadow_samaritan',
            description: 'talent_descr.rosaria_shadow_samaritan',
            stats: {
                text_percent: 15,
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
                    name: 'rosaria_unholy_revelation',
                    serializeId: 2,
                    title: 'talent_name.rosaria_unholy_revelation',
                    description: 'talent_descr.rosaria_unholy_revelation',
                    stats: {
                        atk_speed_normal: 10,
                        dmg_normal: 10,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.rosaria_land_without_promise',
                    description: 'talent_descr.rosaria_land_without_promise',
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
                    title: 'talent_name.rosaria_painful_grace',
                    description: 'talent_descr.rosaria_painful_grace',
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
                    name: 'rosaria_divine_retribution',
                    serializeId: 3,
                    title: 'talent_name.rosaria_divine_retribution',
                    description: 'talent_descr.rosaria_divine_retribution',
                    stats: {
                        enemy_res_phys: -20,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['crit_rate_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'rosaria_crit_rate_total',
                title: 'stat.crit_rate',
                partyStat: 'crit_rate_total',
                serializeId: 1,
                rotation: 'party',
                format: 'decimal',
                max: 100,
            }),
            new ConditionBoolean({
                name: 'party.rosaria_shadow_samaritan',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.rosaria_shadow_samaritan',
                description: 'talent_descr.rosaria_shadow_samaritan',
                info: {ascension: 4},
                stats: {
                    text_percent: 15,
                },
            }),
            new ConditionBoolean({
                name: 'party.rosaria_divine_retribution',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.rosaria_divine_retribution',
                description: 'talent_descr.rosaria_divine_retribution',
                info: {constellation: 6},
                stats: {
                    enemy_res_phys: -20,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'rosaria_crit_rate_total',
                percent: new StatTable('crit_rate', [0.15]),
                statCap: new ValueTable([15]),
                conditions: [
                    new ConditionBoolean({name: 'party.rosaria_shadow_samaritan'}),
                ],
            }),
        ],
    },
});
