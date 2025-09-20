import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Sigewinne.s1_id,
        title: 'talent_name.sigewinne_targeted_treatment',
        description: 'talent_descr.sigewinne_targeted_treatment',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Sigewinne.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Sigewinne.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Sigewinne.s1.p3),
            },
            {
                table: new StatTable('aimed', charTalentTables.Sigewinne.s1.p7),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Sigewinne.s1.p8),
            },
            {
                table: new StatTable('sigewinnne_mini_stration_bubble_dmg', charTalentTables.Sigewinne.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Sigewinne.s1.p4),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Sigewinne.s1.p5),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Sigewinne.s1.p6),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Sigewinne.s2_id,
        title: 'talent_name.sigewinne_rebound_hydrotherapy',
        description: 'talent_descr.sigewinne_rebound_hydrotherapy',
        items: [
            {
                unit: 'hp',
                table: new StatTable('sigewinne_bolstering_bubblebalm_dmg', charTalentTables.Sigewinne.s2.p1),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('sigewinne_bolstering_bubblebalm_heal', charTalentTables.Sigewinne.s2.p2),
                    new StatTable('', charTalentTables.Sigewinne.s2.p3),
                ],
            },
            {
                unit: 'hp',
                table: new StatTable('sigewinne_bounce_end_heal', charTalentTables.Sigewinne.s2.p4),
            },
            {
                unit: 'hp',
                table: new StatTable('surging_blade_dmg', charTalentTables.Sigewinne.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Sigewinne.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sigewinne.s2.p9),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Sigewinne.s3_id,
        title: 'talent_name.sigewinne_super_saturated_syringing',
        description: 'talent_descr.sigewinne_super_saturated_syringing',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Sigewinne.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Sigewinne.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sigewinne.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Sigewinne.s3.p3),
            },
        ],
    },
});

const A1HydroDmg = 8;
const A1MinHP = 30000;
const A1DmgBonus = 80;
const A1DmgBonusMax = 2800;
const A4HealingBonus = 3;
const A4HealingBonusMax = 30;
const C1DmgBonus = 100;
const C1DmgBonusMax = 3500;
const C2Shield = 30;
const C2HydroRes = -35;
const C6CritRate = 0.4;
const C6CritRateMax = 20;
const C6CritDmg = 2.2;
const C6CritDmgMax = 110;

export const Sigewinne = new DbObjectChar({
    name: 'sigewinne',
    serializeId: 87,
    gameId: 10000095,
    iconClass: 'char-icon-sigewinne',
    rarity: 5,
    element: 'hydro',
    weapon: 'bow',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Sigewinne,
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
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.sigewinnne_mini_stration_bubble_dmg'),
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
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sigewinne_bolstering_bubblebalm_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            partyHeal: 1,
            noSelfHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.sigewinne_bolstering_bubblebalm_heal'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sigewinne_bounce_end_heal'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'hydro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.surging_blade_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'sigewinne_hp_buff',
            postEffect: new PostEffectStatsHP({
                global: true,
                exceed: A1MinHP,
                levelSetting: 'sigewinne_buff_level',
                percent: new StatTable('', [A1DmgBonus / 1000, C1DmgBonus / 1000]),
                statCap: new ValueTable([A1DmgBonusMax, C1DmgBonusMax]),
            }),
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureShield({
            name: 'sigewinne_bubbly_shield',
            category: 'other',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation2',
                    values: new ValueTable([C2Shield]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
    ],
    // multipliers: [
    //     new FeatureMultiplier({
    //         leveling: 'sigewinne_buff_level',
    //         source: 'ascension1',
    //         scaling: 'hp*',
    //         values: new ValueTable([A1DmgBonus / 10, C1DmgBonus / 10]),
    //         capValue: new ValueTable([A1DmgBonusMax, C1DmgBonusMax]),
    //         condition: new ConditionBoolean({name: 'sigewinne_requires_appropriate_rest'}),
    //         target: new FeatureMultiplierTarget({
    //             damageTypes: ['skill'],
    //         }),
    //     }),
    // ],
    conditions: [
        new ConditionBoolean({
            name: 'sigewinne_requires_appropriate_rest',
            serializeId: 1,
            title: 'talent_name.sigewinne_requires_appropriate_rest',
            description: 'talent_descr.sigewinne_requires_appropriate_rest_1',
            info: {ascension: 1},
            stats: {
                dmg_hydro: A1HydroDmg,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.sigewinne_requires_appropriate_rest',
            description: 'talent_descr.sigewinne_requires_appropriate_rest_2',
            info: {ascension: 1},
            stats: {
                text_value_hp: A1MinHP,
                text_value_dmg: A1DmgBonus,
                text_value_max: A1DmgBonusMax,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionNumber({
            name: 'sigewinne_detailed_diagnosis',
            serializeId: 3,
            title: 'talent_name.sigewinne_detailed_diagnosis_thorough_treatment',
            description: 'talent_descr.sigewinne_detailed_diagnosis_thorough_treatment',
            max: 10000,
            class: "gi-inputs-5digit",
            info: {ascension: 4},
            stats: {
                text_percent: A4HealingBonus,
                text_percent_max: A4HealingBonusMax,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        new PostEffectStats({
            from: 'sigewinne_detailed_diagnosis',
            percent: new StatTable('healing', [A4HealingBonus / 1000]),
            statCap: new StatTable('', [A4HealingBonusMax]),
            conditions: [
                new ConditionBoolean({name: 'sigewinne_detailed_diagnosis'}),
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new PostEffectStatsHP({
            percent: new StatTable('crit_rate', [C6CritRate / 10]),
            statCap: new StatTable('', [C6CritRateMax]),
            conditions: [
                new ConditionBoolean({name: 'sigewinne_would_the_most_radiant_of_spirits_pray_for_me'}),
                new ConditionConstellation({constellation: 6}),
            ],
        }),
        new PostEffectStatsHP({
            percent: new StatTable('crit_dmg', [C6CritDmgMax / 10]),
            statCap: new StatTable('', [C6CritDmgMax]),
            conditions: [
                new ConditionBoolean({name: 'sigewinne_would_the_most_radiant_of_spirits_pray_for_me'}),
                new ConditionConstellation({constellation: 6}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.sigewinne_can_the_happiest_of_spirits_understand_anxiety',
                    description: 'talent_descr.sigewinne_can_the_happiest_of_spirits_understand_anxiety',
                    stats: {
                        text_value_hp: A1MinHP,
                        text_value_dmg: C1DmgBonus,
                        text_value_max: C1DmgBonusMax,
                    },
                    settings: {
                        sigewinne_buff_level: 2,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.sigewinne_can_the_most_merciful_of_spirits_defeat_its_foes',
                    description: 'talent_descr.sigewinne_can_the_most_merciful_of_spirits_defeat_its_foes_1',
                    stats: {
                        text_percent: C2Shield,
                    }
                }),
                new ConditionBoolean({
                    name: 'party.sigewinne_spirits_defeat_its_foes',
                    serializeId: 4,
                    title: 'talent_name.sigewinne_can_the_most_merciful_of_spirits_defeat_its_foes',
                    description: 'talent_descr.sigewinne_can_the_most_merciful_of_spirits_defeat_its_foes_2',
                    stats: {
                        enemy_res_hydro: C2HydroRes,
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
                    title: 'talent_name.sigewinne_can_the_loveliest_of_spirits_keep_decay_at_bay',
                    description: 'talent_descr.sigewinne_can_the_loveliest_of_spirits_keep_decay_at_bay',
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
                    name: 'sigewinne_would_the_most_radiant_of_spirits_pray_for_me',
                    serializeId: 5,
                    title: 'talent_name.sigewinne_can_the_most_radiant_of_spirits_pray_for_me',
                    description: 'talent_descr.sigewinne_can_the_most_radiant_of_spirits_pray_for_me',
                    stats: {
                        text_percent_1: C6CritRate,
                        text_percent_1_max: C6CritRateMax,
                        text_percent_2: C6CritDmg,
                        text_percent_2_max: C6CritDmgMax,
                    },
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
                name: 'sigewinne_hp_total',
                title: 'talent_name.stats_total_hp',
                partyStat: 'hp_total',
                serializeId: 1,
                rotation: 'party',
                max: 150000,
                class: "gi-inputs-5digit",
            }),
            new ConditionBoolean({
                name: 'party.sigewinne_requires_appropriate_rest',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.sigewinne_requires_appropriate_rest',
                description: 'talent_descr.sigewinne_requires_appropriate_rest_2',
                info: {ascension: 1},
                stats: {
                    text_value_hp: A1MinHP,
                    text_value_dmg: A1DmgBonus,
                    text_value_max: A1DmgBonusMax,
                },
            }),
            new ConditionBoolean({
                name: 'party.sigewinne_spirits',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.sigewinne_can_the_happiest_of_spirits_understand_anxiety',
                description: 'talent_descr.sigewinne_can_the_happiest_of_spirits_understand_anxiety',
                info: {constellation: 1},
                stats: {
                    text_value_hp: A1MinHP,
                    text_value_dmg: C1DmgBonus,
                    text_value_max: C1DmgBonusMax,
                },
                settings: {
                    sigewinne_buff_level: 2,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.sigewinne_requires_appropriate_rest'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.sigewinne_spirits_defeat_its_foes',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.sigewinne_can_the_most_merciful_of_spirits_defeat_its_foes',
                description: 'talent_descr.sigewinne_can_the_most_merciful_of_spirits_defeat_its_foes_2',
                info: {constellation: 2},
                stats: {
                    enemy_res_hydro: C2HydroRes,
                },
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'sigewinne_hp_total',
                leveling: 'sigewinne_buff_level',
                source: 'sigewinne',
                values: new ValueTable([A1DmgBonus / 10, C1DmgBonus / 10]),
                capValue: new ValueTable([A1DmgBonusMax, C1DmgBonusMax]),
                exceedStatValue: A1MinHP,
                condition: new ConditionBoolean({name: 'party.sigewinne_requires_appropriate_rest'}),
                target: new FeatureMultiplierTarget({
                    damageTypes: ['skill'],
                }),
            }),
        ],
    },
});
