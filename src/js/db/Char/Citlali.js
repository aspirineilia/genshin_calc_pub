import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberCitlali } from "../../classes/Condition/Number/Citlali";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { StatTable } from "../../classes/StatTable";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { ValueTable } from "../../classes/ValueTable";
import { ConditionAnd } from "../../classes/Condition/And";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Citlali.s1_id,
        title: 'talent_name.citlali_shadow_stealing_spirit_vessel',
        description: 'talent_descr.citlali_shadow_stealing_spirit_vessel',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Citlali.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Citlali.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Citlali.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Citlali.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Citlali.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Citlali.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Citlali.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Citlali.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Citlali.s2_id,
        title: 'talent_name.citlali_dawnfrost_darkstar',
        description: 'talent_descr.citlali_dawnfrost_darkstar',
        items: [
            {
                table: new StatTable('citlali_obsidian_tzitzimitl_dmg', charTalentTables.Citlali.s2.p1),
            },
            {
                unit: 'mastery',
                type: 'shield',
                table: [
                    new StatTable('shield_absorption', charTalentTables.Citlali.s2.p2),
                    new StatTable('', charTalentTables.Citlali.s2.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('shield_duration', charTalentTables.Citlali.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('citlali_duration', charTalentTables.Citlali.s2.p4),
            },
            {
                unit: 'per_sec',
                table: new StatTable('citlali_cost', charTalentTables.Citlali.s2.p7),
            },
            {
                table: new StatTable('citlali_frostfall_storm_dmg', charTalentTables.Citlali.s2.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('xilonen_nightsoul', charTalentTables.Citlali.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Citlali.s2.p8),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Citlali.s3_id,
        title: 'talent_name.citlali_edict_of_entwined_splendor',
        description: 'talent_descr.citlali_edict_of_entwined_splendor',
        items: [
            {
                table: new StatTable('citlali_ice_storm_dmg', charTalentTables.Citlali.s3.p1),
            },
            {
                unit: '',
                table: new StatTable('citlali_point_gain', charTalentTables.Citlali.s3.p3),
            },
            {
                table: new StatTable('citlali_spiritvessel_skull_dmg', charTalentTables.Citlali.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('citlali_skull_point_gain', charTalentTables.Citlali.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Citlali.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Citlali.s3.p6),
            },
        ],
    },
});

const A1ResShred = -20;
const A4SkillBonus = 90;
const A4BurstBonus = 1200;
const C1MasteryDmgBonus = 200;
const C2MasterySelf = 125;
const C2MasteryOther = 250;
const C2ResShred = -20;
const C4SkillDmg = 1800;
const C6MaxPoints = 40;
const C6PointDmgBonus = 1.5;
const C6PointDmgBonusSelf = 2.5;

export const Citlali = new DbObjectChar({
    name: 'citlali',
    serializeId: 99,
    gameId: 10000107,
    iconClass: 'char-icon-citlali',
    rarity: 5,
    element: 'cryo',
    weapon: 'catalyst',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Citlali,
    features: [
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.citlali_obsidian_tzitzimitl_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.citlali_frostfall_storm_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'ascension4',
                    values: new ValueTable([A4SkillBonus]),
                    condition: new ConditionAnd([
                        new ConditionBoolean({name: 'citlali_itzpapalotls_star_garments'}),
                        new ConditionAscensionChar({ascension: 4}),
                    ]),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.shield_absorption'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.citlali_ice_storm_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'ascension4',
                    values: new ValueTable([A4BurstBonus]),
                    condition: new ConditionAnd([
                        new ConditionBoolean({name: 'citlali_itzpapalotls_star_garments'}),
                        new ConditionAscensionChar({ascension: 4}),
                    ]),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.citlali_spiritvessel_skull_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            category: 'other',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'constellation4',
                    values: new StatTable('citlali_obsidian_spiritvessel_skull_dmg', [C4SkillDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'citlali_mamaloacos_frigid_rain',
            serializeId: 1,
            title: 'talent_name.citlali_mamaloacos_frigid_rain',
            description: 'talent_descr.citlali_mamaloacos_frigid_rain',
            info: {ascension: 1},
            stats:{
                enemy_res_pyro: A1ResShred,
                enemy_res_hydro: A1ResShred,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'citlali_itzpapalotls_star_garments',
            serializeId: 2,
            title: 'talent_name.citlali_itzpapalotls_star_garments',
            description: 'talent_descr.citlali_itzpapalotls_star_garments',
            info: {ascension: 4},
            stats:{
                text_percent_1: A4SkillBonus,
                text_percent_2: A4BurstBonus,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.citlali_radiant_blades_of_centzon_mimixcoah',
                    description: 'talent_descr.citlali_radiant_blades_of_centzon_mimixcoah',
                    stats: {
                        text_percent: C1MasteryDmgBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'citlali_heart_devourers_travail',
                    serializeId: 3,
                    title: 'talent_name.citlali_heart_devourers_travail',
                    description: 'talent_descr.citlali_heart_devourers_travail_1',
                    stats: {
                        mastery: C2MasterySelf,
                        text_value_self: C2MasterySelf,
                        text_value_other: C2MasteryOther,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.citlali_heart_devourers_travail',
                    description: 'talent_descr.citlali_heart_devourers_travail_2',
                    stats: {
                        enemy_res_pyro: C2ResShred,
                        enemy_res_hydro: C2ResShred,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'citlali_mamaloacos_frigid_rain'}),
                    ],
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
                    title: 'talent_name.citlali_death_defiers_spirit_skull',
                    description: 'talent_descr.citlali_death_defiers_spirit_skull',
                    stats: {
                        text_percent_dmg: C4SkillDmg,
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
                    title: 'talent_name.citlali_teoiztacs_secret_pact',
                    description: 'talent_descr.citlali_teoiztacs_secret_pact_1',
                }),
                new ConditionNumberCitlali({
                    name: 'citlali_points',
                    serializeId: 4,
                    title: 'talent_name.citlali_teoiztacs_secret_pact',
                    description: 'talent_descr.citlali_teoiztacs_secret_pact_2',
                    max: C6MaxPoints,
                    otherBonus: C6PointDmgBonus,
                    selfBonus: C6PointDmgBonusSelf,
                    stats: {
                        text_percent_1: C6PointDmgBonus,
                        text_percent_2: C6PointDmgBonusSelf,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['mastery_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'citlali_mastery_total',
                title: 'talent_name.stats_total_mastery',
                partyStat: 'mastery_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionBoolean({
                name: 'party.citlali_mamaloacos_frigid_rain',
                serializeId: 2,
                title: 'talent_name.citlali_mamaloacos_frigid_rain',
                description: 'talent_descr.citlali_mamaloacos_frigid_rain',
                rotation: 'party',
                info: {ascension: 1},
                stats:{
                    enemy_res_pyro: A1ResShred,
                    enemy_res_hydro: A1ResShred,
                },
            }),
            new ConditionBoolean({
                name: 'party.citlali_radiant_blades_of_centzon_mimixcoah',
                serializeId: 3,
                title: 'talent_name.citlali_radiant_blades_of_centzon_mimixcoah',
                description: 'talent_descr.citlali_radiant_blades_of_centzon_mimixcoah',
                rotation: 'party',
                info: {constellation: 1},
                stats: {
                    text_percent: C1MasteryDmgBonus,
                },
            }),
            new ConditionBoolean({
                name: 'party.citlali_heart_devourers_travail',
                serializeId: 4,
                title: 'talent_name.citlali_heart_devourers_travail',
                description: 'talent_descr.citlali_heart_devourers_travail_1',
                rotation: 'party',
                info: {constellation: 2},
                stats: {
                    mastery: C2MasteryOther,
                    text_value_self: C2MasterySelf,
                    text_value_other: C2MasteryOther,
                },
            }),
            new ConditionBoolean({
                name: 'party.citlali_heart_devourers_travail_2',
                serializeId: 5,
                title: 'talent_name.citlali_heart_devourers_travail',
                description: 'talent_descr.citlali_heart_devourers_travail_2',
                rotation: 'party',
                info: {constellation: 2},
                stats: {
                    enemy_res_pyro: C2ResShred,
                    enemy_res_hydro: C2ResShred,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.citlali_mamaloacos_frigid_rain'}),
                ],
            }),
            new ConditionNumberCitlali({
                name: 'party_citlali_points',
                serializeId: 6,
                title: 'talent_name.citlali_teoiztacs_secret_pact',
                description: 'talent_descr.citlali_teoiztacs_secret_pact_2',
                rotation: 'party',
                max: C6MaxPoints,
                otherBonus: C6PointDmgBonus,
                info: {constellation: 6},
                stats: {
                    text_percent_1: C6PointDmgBonus,
                    text_percent_2: C6PointDmgBonusSelf,
                },
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'citlali_mastery_total',
                source: 'citlali',
                values: new ValueTable([C1MasteryDmgBonus]),
                target: new FeatureMultiplierTarget({
                    damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
                }),
                condition: new ConditionBoolean({name: 'party.citlali_radiant_blades_of_centzon_mimixcoah'}),
            }),
        ],
    },
});
