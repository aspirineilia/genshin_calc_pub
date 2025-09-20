import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionEnemyStatus } from "../../classes/Condition/Boolean/EnemyStatus";
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
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Qiqi.s1_id,
        title: 'talent_name.qiqi_ancient_sword_art',
        description: 'talent_descr.qiqi_ancient_sword_art',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Qiqi.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Qiqi.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Qiqi.s1.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Qiqi.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Qiqi.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit', charTalentTables.Qiqi.s1.p6),
                    new StatTable('charged_hit', charTalentTables.Qiqi.s1.p6),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Qiqi.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Qiqi.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Qiqi.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Qiqi.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Qiqi.s2_id,
        title: 'talent_name.qiqi_herald_of_frost',
        description: 'talent_descr.qiqi_herald_of_frost',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Qiqi.s2.p8),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('party_heal_on_hit', charTalentTables.Qiqi.s2.p1),
                    new StatTable('', charTalentTables.Qiqi.s2.p2),
                ],
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('heal_dot', charTalentTables.Qiqi.s2.p3),
                    new StatTable('', charTalentTables.Qiqi.s2.p4),
                ],
            },
            {
                table: new StatTable('qiqi_herald_of_frost', charTalentTables.Qiqi.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Qiqi.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Qiqi.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Qiqi.s3_id,
        title: 'talent_name.qiqi_preserver_of_fortune',
        description: 'talent_descr.qiqi_preserver_of_fortune',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Qiqi.s3.p3),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('heal', charTalentTables.Qiqi.s3.p1),
                    new StatTable('', charTalentTables.Qiqi.s3.p2),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Qiqi.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Qiqi.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Qiqi.s3.p6),
            },
        ],
    },
});

const A1HealingRecv = 20;
const C2NormalDmg = 15;

export const Qiqi = new DbObjectChar({
    name: 'qiqi',
    serializeId: 20,
    gameId: 10000035,
    iconClass: "char-icon-qiqi",
    rarity: 5,
    element: 'cryo',
    weapon: 'sword',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Qiqi,
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
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
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            isChild: true,
            hits: 2,
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
            name: 'skill_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'qiqi_herald_of_frost',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.qiqi_herald_of_frost'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'party_heal_on_hit',
            category: 'skill',
            partyHeal: true,
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.party_heal_on_hit'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'heal_dot',
            category: 'skill',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.heal_dot'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'heal',
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'qiqi_life_prolonging_methods',
            serializeId: 1,
            title: 'talent_name.qiqi_life_prolonging_methods',
            description: 'talent_descr.qiqi_life_prolonging_methods',
            stats: {
                healing_recv: A1HealingRecv,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.qiqi_a_glimpse_into_arcanum',
            description: 'talent_descr.qiqi_a_glimpse_into_arcanum',
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
                    title: 'talent_name.qiqi_ascetics_of_frost',
                    description: 'talent_descr.qiqi_ascetics_of_frost',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'qiqi_frozen_to_the_bone',
                    serializeId: 2,
                    title: 'talent_name.qiqi_frozen_to_the_bone',
                    description: 'talent_descr.qiqi_frozen_to_the_bone',
                    stats: {
                        dmg_normal: C2NormalDmg,
                        dmg_charged: C2NormalDmg,
                    },
                    subConditions: [
                        new ConditionEnemyStatus({status: ['cryo']}),
                    ],
                }),
            ]
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
                    title: 'talent_name.qiqi_divine_suppression',
                    description: 'talent_descr.qiqi_divine_suppression',
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
                    title: 'talent_name.qiqi_rite_of_resurrection',
                    description: 'talent_descr.qiqi_rite_of_resurrection',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.qiqi_life_prolonging_methods',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.qiqi_life_prolonging_methods',
                description: 'talent_descr.qiqi_life_prolonging_methods',
                info: {ascension: 4},
                stats: {
                    healing_recv: 20,
                },
            }),
        ],
    },
});
