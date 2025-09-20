import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionCalcElementsEscoffier } from "../../classes/Condition/CalcElementsEscoffier";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticLevel } from "../../classes/Condition/Static/Level";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { ValueTable } from "../../classes/ValueTable";
import { charScales } from "../generated/CharScale";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Escoffier.s1_id,
        title: 'talent_name.escoffier_kitchen_skills',
        description: 'talent_descr.escoffier_kitchen_skills',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Escoffier.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Escoffier.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Escoffier.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Escoffier.s1.p4),
                ],
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Escoffier.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Escoffier.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Escoffier.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Escoffier.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Escoffier.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Escoffier.s2_id,
        title: 'talent_name.escoffier_low_temperature_cooking',
        description: 'talent_descr.escoffier_low_temperature_cooking',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Escoffier.s2.p1),
            },
            {
                table: new StatTable('escoffier_frozen_parfait_attack_dmg', charTalentTables.Escoffier.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('escoffier_duration', charTalentTables.Escoffier.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_dmg', charTalentTables.Escoffier.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Escoffier.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Escoffier.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Escoffier.s3_id,
        title: 'talent_name.escoffier_scoring_cuts',
        description: 'talent_descr.escoffier_scoring_cuts',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Escoffier.s3.p1),
            },
            {
                type: 'shield',
                table: [
                    new StatTable('heal', charTalentTables.Escoffier.s3.p2),
                    new StatTable('', charTalentTables.Escoffier.s3.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Escoffier.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Escoffier.s3.p5),
            },
        ],
    },
    links: [11120001, 11120002],
});

const A1Heal = 138.24;
const A4ResShred = [-5, -10, -15, -55];
const C1CritDmg = 60;
const C2BonusDmg = 240;
const C4HealCritDmg = 100;
const C6Dmg = 500;

export const Escoffier = new DbObjectChar({
    name: 'escoffier',
    serializeId: 104,
    gameId: 10000112,
    iconClass: 'char-icon-escoffier',
    rarity: 5,
    element: 'cryo',
    weapon: 'polearm',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Escoffier,
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
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
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
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.escoffier_frozen_parfait_attack_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'surging_blade_dmg',
            element: 'cryo',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.surging_blade_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'escoffier_rehab_diet_heal',
            category: 'other',
            critRateBonuses: ['crit_rate_base', 'crit_rate'],
            critDamageBonuses: ['crit_dmg_escofier_heal'],
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([A1Heal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamageSkill({
            name: 'escoffier_special_grade_frozen_parfait_dmg',
            category: 'other',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([C6Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    // multipliers: [
    //     new FeatureMultiplier({
    //         source: 'constellation2',
    //         values: new ValueTable([C2BonusDmg]),
    //         condition: new ConditionAnd([
    //             new ConditionConstellation({constellation: 2}),
    //             new ConditionBoolean({name: 'escoffier_fresh_fragrant_stew_is_an_art'}),
    //         ]),
    //         target: new FeatureMultiplierTarget({
    //             damageElements: ['cryo'],
    //             damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
    //         }),
    //     }),
    // ],
    conditions: [
        new ConditionCalcElementsEscoffier({}),
        new ConditionStatic({
            title: 'talent_name.escoffier_better_to_salivate_than_medicate',
            description: 'talent_descr.escoffier_better_to_salivate_than_medicate',
            stats: {
                text_percent_dmg: A1Heal,
            },
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStaticLevel({
            title: 'talent_name.escoffier_inspiration_immersed_seasoning',
            description: 'talent_descr.escoffier_inspiration_immersed_seasoning',
            levelSetting: 'escoffier_chars_count',
            info: {ascension: 4},
            stats: [
                new StatTable('enemy_res_cryo', A4ResShred),
                new StatTable('enemy_res_hydro', A4ResShred),
                new StatTable('text_number', [1, 2, 3, 4]),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.escoffier_pre_dinner_dance_for_your_taste_buds',
                    description: 'talent_descr.escoffier_pre_dinner_dance_for_your_taste_buds',
                    stats: {
                        crit_dmg_cryo: C1CritDmg,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({name: 'escoffier_chars_only'}),
                        new ConditionBooleanValue({setting: 'escoffier_chars_count', cond: 'ge', value: 4}),
                    ]),
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'escoffier_fresh_fragrant_stew_is_an_art',
                    serializeId: 1,
                    title: 'talent_name.escoffier_fresh_fragrant_stew_is_an_art',
                    description: 'talent_descr.escoffier_fresh_fragrant_stew_is_an_art',
                    stats: {
                        text_percent_dmg: C2BonusDmg,
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
                    title: 'talent_name.escoffier_secret_rosemary_recipe',
                    description: 'talent_descr.escoffier_secret_rosemary_recipe',
                    stats: {
                        crit_dmg_escofier_heal: C4HealCritDmg,
                    },
                    condition: new ConditionAscensionChar({ascension: 1}),
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
                    title: 'talent_name.escoffier_tea_parties_bursting_with_color',
                    description: 'talent_descr.escoffier_tea_parties_bursting_with_color',
                    stats: {
                        text_percent_dmg: C6Dmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
        },
        conditions: [
            new ConditionCalcElementsEscoffier({}),
            new ConditionNumber({
                name: 'escoffier_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionBooleanLevels({
                name: 'party_escoffier_inspiration_immersed_seasoning',
                serializeId: 2,
                title: 'talent_name.escoffier_inspiration_immersed_seasoning',
                description: 'talent_descr.escoffier_inspiration_immersed_seasoning',
                levelSetting: 'escoffier_chars_count',
                rotation: 'party',
                info: {ascension: 4},
                stats: [
                    new StatTable('enemy_res_cryo', A4ResShred),
                    new StatTable('enemy_res_hydro', A4ResShred),
                ],
            }),
            new ConditionBoolean({
                name: 'party_escoffier_pre_dinner_dance_for_your_taste_buds',
                serializeId: 3,
                title: 'talent_name.escoffier_pre_dinner_dance_for_your_taste_buds',
                description: 'talent_descr.escoffier_pre_dinner_dance_for_your_taste_buds',
                rotation: 'party',
                info: {constellation: 1},
                stats: {
                    crit_dmg_cryo: C1CritDmg,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'escoffier_chars_only'}),
                    new ConditionBooleanValue({setting: 'escoffier_chars_count', cond: 'ge', value: 4}),
                ]),
            }),
            new ConditionBoolean({
                name: 'party_escoffier_fresh_fragrant_stew_is_an_art',
                serializeId: 4,
                title: 'talent_name.escoffier_fresh_fragrant_stew_is_an_art',
                description: 'talent_descr.escoffier_fresh_fragrant_stew_is_an_art',
                rotation: 'party',
                info: {constellation: 2},
                stats: {
                    text_percent_dmg: C2BonusDmg,
                },
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'escoffier_atk_total',
                source: 'escoffier',
                values: new ValueTable([C2BonusDmg]),
                condition: new ConditionBoolean({name: 'party_escoffier_fresh_fragrant_stew_is_an_art'}),
                target: new FeatureMultiplierTarget({
                    damageElements: ['cryo'],
                    damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
                }),
            }),
        ],
    },
});
