import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionEnemyStatus } from "../../classes/Condition/Boolean/EnemyStatus";
import { ConditionCalcElements } from "../../classes/Condition/CalcElements";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticLevel } from "../../classes/Condition/Static/Level";
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
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Lyney.s1_id,
        title: 'talent_name.lyney_card_force_translocation',
        description: 'talent_descr.lyney_card_force_translocation',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Lyney.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Lyney.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Lyney.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Lyney.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Lyney.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Lyney.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Lyney.s1.p8),
            },
            {
                table: new StatTable('aimed', charTalentTables.Lyney.s1.p9),
            },
            {
                table: new StatTable('lyney_charged_dmg', charTalentTables.Lyney.s1.p10),
            },
            {
                table: new StatTable('lyney_prop_arrow_dmg', charTalentTables.Lyney.s1.p11),
            },
            {
                unit: 'hp',
                table: new StatTable('lyney_hp_cost', charTalentTables.Lyney.s1.p12),
            },
            {
                unit: 'hp',
                table: new StatTable('lyney_hat_hp', charTalentTables.Lyney.s1.p13),
            },
            {
                unit: 'sec',
                table: new StatTable('lyney_hat_duration', charTalentTables.Lyney.s1.p14),
            },
            {
                table: new StatTable('lyney_pyrotechnic_strike_dmg', charTalentTables.Lyney.s1.p15),
            },
            {
                table: new StatTable('spiritbreath_thorn_dmg', charTalentTables.Lyney.s1.p16),
            },
            {
                unit: 'sec',
                table: new StatTable('spiritbreath_thorn_interval', charTalentTables.Lyney.s1.p17),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Lyney.s2_id,
        title: 'talent_name.lyney_bewildering_lights',
        description: 'talent_descr.lyney_bewildering_lights',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Lyney.s2.p1),
            },
            {
                table: new StatTable('lyney_skill_dmg_bonus', charTalentTables.Lyney.s2.p2),
            },
            {
                unit: 'per_stack',
                table: new StatTable('lyney_hp_regeneration', charTalentTables.Lyney.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lyney.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Lyney.s3_id,
        title: 'talent_name.lyney_miracle_parade',
        description: 'talent_descr.lyney_miracle_parade',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Lyney.s3.p1),
            },
            {
                table: new StatTable('lyney_explosive_firework_dmg', charTalentTables.Lyney.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Lyney.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lyney.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Lyney.s3.p5),
            },
        ],
    },
});

const A1ChargedDmg = 80;
const A4PyroBonus = 60;
const A4PyroBonusStack = 20;
const A4PyroBonusMax = 100;
const C2CritDmg = 20;
const C4EnemyResPyro = -20;
const C6Dmg = 80;

export const Lyney = new DbObjectChar({
    name: 'lyney',
    serializeId: 73,
    gameId: 10000084,
    iconClass: 'char-icon-lyney',
    rarity: 5,
    element: 'pyro',
    weapon: 'bow',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Lyney,
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
            name: 'normal_hit_3',
            category: 'attack',
            damageType: 'normal',
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
        new FeatureDamageChargedAimed({
            name: 'aimed',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'lyney_charged_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.lyney_charged_dmg'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'lyney_prop_arrow_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.lyney_prop_arrow_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            name: 'lyney_hat_hp',
            category: 'attack',
            postEffect: new PostEffectStatsHP({
                levelSetting: 'char_skill_attack',
                percent: Talents.getMulti({
                    name: 'lyney_hat_hp',
                    from: 'attack.lyney_hat_hp',
                    multi: 0.01,
                }),
            }),
        }),
        new FeatureDamageCharged({
            name: 'lyney_pyrotechnic_strike_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.lyney_pyrotechnic_strike_dmg'),
                }),
                new FeatureMultiplier({
                    values: new ValueTable([A1ChargedDmg]),
                    source: 'ascension1',
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ascension: 1}),
                        new ConditionBoolean({name: 'lyney_perilous_performance'}),
                    ]),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'lyney_pyrotechnic_strike_reprised_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    scalingMultiplier: C6Dmg / 100,
                    scalingSource: 'constellation6',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.lyney_pyrotechnic_strike_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureDamageCharged({
            name: 'spiritbreath_thorn_dmg',
            element: 'pyro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.spiritbreath_thorn_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    stacksLeveling: 'lyney_surplus_stacks',
                    values: Talents.get('skill.lyney_skill_dmg_bonus'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'lyney_hp_regeneration',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    stacksLeveling: 'lyney_surplus_stacks',
                    values: Talents.get('skill.lyney_hp_regeneration'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'lyney_explosive_firework_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lyney_explosive_firework_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'lyney_surplus_stacks',
            serializeId: 1,
            title: 'talent_name.lyney_surplus_stacks',
            description: 'talent_descr.lyney_surplus_stacks',
            maxStacks: 5,
        }),
        new ConditionBoolean({
            name: 'lyney_perilous_performance',
            serializeId: 2,
            title: 'talent_name.lyney_perilous_performance',
            description: 'talent_descr.lyney_perilous_performance',
            info: {ascension: 1},
            stats: {
                text_percent_dmg: A1ChargedDmg,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionCalcElements({
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionStaticLevel({
            title: 'talent_name.lyney_conclusive_ovation',
            description: 'talent_descr.lyney_conclusive_ovation',
            levelSetting: 'party_elements_same',
            fromZero: true,
            info: {ascension: 4},
            stats: [
                new StatTable('dmg_all', [A4PyroBonus, A4PyroBonus + A4PyroBonusStack, A4PyroBonus + 2 * A4PyroBonusStack]),
                new StatTable('text_percent_dmg', [A4PyroBonus]),
                new StatTable('text_percent_bonus', [A4PyroBonusStack]),
                new StatTable('text_percent_max', [A4PyroBonusMax]),
            ],
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
                new ConditionEnemyStatus({status: ['pyro']}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.lyney_whimsical_wonders',
                    description: 'talent_descr.lyney_whimsical_wonders',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'lyney_locquacious_cajoling',
                    serializeId: 3,
                    title: 'talent_name.lyney_loquacious_cajoling',
                    description: 'talent_descr.lyney_loquacious_cajoling',
                    maxStacks: 3,
                    stats: [
                        new StatTable('crit_dmg', [C2CritDmg]),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_attack_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'lyney_well_versed_well_rehearsed',
                    serializeId: 4,
                    title: 'talent_name.lyney_well_versed_well_rehearsed',
                    description: 'talent_descr.lyney_well_versed_well_rehearsed',
                    stats: {
                        enemy_res_pyro: C4EnemyResPyro,
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
                    title: 'talent_name.lyney_guarded_smile',
                    description: 'talent_descr.lyney_guarded_smile',
                    stats: {
                        text_percent_dmg: C6Dmg,
                    }
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.lyney_well_versed_well_rehearsed',
                serializeId: 1,
                title: 'talent_name.lyney_well_versed_well_rehearsed',
                description: 'talent_descr.lyney_well_versed_well_rehearsed',
                info: {constellation: 4},
                stats: {
                    enemy_res_pyro: C4EnemyResPyro,
                },
            }),
        ],
    },
});
