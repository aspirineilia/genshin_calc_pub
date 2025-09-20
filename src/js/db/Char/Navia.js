import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionCalcElementsNavia } from "../../classes/Condition/CalcElementsNavia";
import { ConditionNumberNavia } from "../../classes/Condition/Number/Navia";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticLevel } from "../../classes/Condition/Static/Level";
import { ConditionStaticNavia } from "../../classes/Condition/Static/Navia";
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
import { FeatureMultiplierNaviaSkill } from "../../classes/Feature2/Multiplier/NaviaSkill";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Navia.s1_id,
        title: 'talent_name.navia_blunt_refusal',
        description: 'talent_descr.navia_blunt_refusal',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Navia.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Navia.s1.p2),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('normal_hit_3', charTalentTables.Navia.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Navia.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Navia.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Navia.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Navia.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Navia.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Navia.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Navia.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Navia.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Navia.s2_id,
        title: 'talent_name.navia_ceremonial_crystalshot',
        description: 'talent_descr.navia_ceremonial_crystalshot',
        items: [
            {
                table: new StatTable('navia_rosula_shardshot_base_dmg', charTalentTables.Navia.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('navia_crystal_shrapnel_duration', charTalentTables.Navia.s2.p3),
            },
            {
                table: new StatTable('surging_blade_dmg', charTalentTables.Navia.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Navia.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Navia.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Navia.s3_id,
        title: 'talent_name.navia_as_the_sunlit_skys_singing_salute',
        description: 'talent_descr.navia_as_the_sunlit_skys_singing_salute',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Navia.s3.p1),
            },
            {
                table: new StatTable('navia_cannon_fire_support_dmg', charTalentTables.Navia.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('navia_cannon_fire_support_duration', charTalentTables.Navia.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Navia.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Navia.s3.p5),
            },
        ],
    },
});

const SkillDmgBonus = 15;
const A1DamageBonus = 40;
const A4AtkBonus = 20;
const C2CritRate = 12;
const C4EnemyGeoRes = -20;
const C6CritDmg = 45;

export const Navia = new DbObjectChar({
    name: 'navia',
    serializeId: 81,
    gameId: 10000091,
    iconClass: 'char-icon-navia',
    rarity: 5,
    element: 'geo',
    weapon: 'claymore',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Navia,
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
                    hits: 3,
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
            hits: 3,
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
        new FeatureDamageCharged({
            name: 'charged_spin',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_spin'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_final',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_final'),
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
            name: 'navia_rosula_shardshot_dmg',
            element: 'geo',
            critRateBonuses: ['crit_rate_navia'],
            critDamageBonuses: ['crit_dmg_navia'],
            damageBonuses: ['dmg_skill_navia'],
            multipliers: [
                new FeatureMultiplierNaviaSkill({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.navia_rosula_shardshot_base_dmg'),
                    scalingSource: 'navia_bullet',
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'surging_blade_dmg',
            element: 'geo',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.surging_blade_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'navia_cannon_fire_support_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.navia_cannon_fire_support_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStaticNavia({
            dmg_bonus: SkillDmgBonus,
            c2_crit_rate: C2CritRate,
            c6_crit_dmg: C6CritDmg,
        }),
        new ConditionStacks({
            name: 'navia_shrapnel_charge',
            serializeId: 1,
            title: 'talent_name.navia_shrapnel_charge',
            description: 'talent_descr.navia_shrapnel_charge',
            maxStacks: 6,
            stats: [
                new StatTable('text_percent_dmg', [SkillDmgBonus]),
            ],
        }),
        new ConditionNumberNavia({
            name: 'navia_bullets',
            serializeId: 2,
            title: 'talent_name.navia_bullets',
            description: 'talent_descr.navia_bullets',
            min: 1,
            nonEmpty: true,
            class: 'inputs-2digit',
            showButtons: true,
        }),
        new ConditionBoolean({
            name: 'navia_undisclosed_distribution_channels',
            serializeId: 3,
            title: 'talent_name.navia_undisclosed_distribution_channels',
            description: 'talent_descr.navia_undisclosed_distribution_channels',
            stats: {
                dmg_normal: A1DamageBonus,
                dmg_charged: A1DamageBonus,
                dmg_plunge: A1DamageBonus,
            },
            settings: {
                attack_infusion: 'geo',
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionCalcElementsNavia({
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionStaticLevel({
            name: 'navia_mutual_assistance_network',
            title: 'talent_name.navia_mutual_assistance_network',
            description: 'talent_descr.navia_mutual_assistance_network',
            levelSetting: 'navia_chars_count',
            fromZero: true,
            stats: [
                new StatTable('text_number', [0.001, 1, 2]),
                new StatTable('text_percent', [A4AtkBonus]),
                new StatTable('atk_percent', [0, A4AtkBonus, A4AtkBonus * 2]),
            ],
            info: {ascension: 4},
            subConditions: [
                new ConditionBoolean({name: 'navia_chars_count'}),
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.navia_a_ladys_rules_for_keeping_a_courteous_distance',
                    description: 'talent_descr.navia_a_ladys_rules_for_keeping_a_courteous_distance',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.navia_the_presidents_pursuit_of_victory',
                    description: 'talent_descr.navia_the_presidents_pursuit_of_victory',
                    stats: {
                        text_percent: C2CritRate,
                        text_percent_max: C2CritRate * 3,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'navia_shrapnel_charge'}),
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
                new ConditionBoolean({
                    name: 'navia_the_oathsworn_never_capitulate',
                    serializeId: 5,
                    title: 'talent_name.navia_the_oathsworn_never_capitulate',
                    description: 'talent_descr.navia_the_oathsworn_never_capitulate',
                    stats: {
                        enemy_res_geo: C4EnemyGeoRes,
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
                    title: 'talent_name.navia_the_flexible_finesse_of_the_spinas_president',
                    description: 'talent_descr.navia_the_flexible_finesse_of_the_spinas_president',
                    stats: {
                        text_percent: C6CritDmg,
                    },
                    subConditions: [
                        new ConditionBooleanValue({
                            setting: 'navia_shrapnel_charge',
                            cond: 'ge',
                            value: 4,
                        }),
                    ],
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.navia_the_oathsworn_never_capitulate',
                serializeId: 1,
                title: 'talent_name.navia_the_oathsworn_never_capitulate',
                description: 'talent_descr.navia_the_oathsworn_never_capitulate',
                rotation: 'party',
                info: {constellation: 4},
                stats: {
                    enemy_res_geo: C4EnemyGeoRes,
                },
            }),
        ],
    },
});
