import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumberBondOfLife } from "../../classes/Condition/Number/BondOfLife";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormalArlecchino } from "../../classes/Feature2/Damage/Normal/Arlecchino";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierBondOfLife } from "../../classes/Feature2/Multiplier/BondOfLife";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Arlecchino.s1_id,
        title: 'talent_name.arlecchino_invitation_to_a_beheading',
        description: 'talent_descr.arlecchino_invitation_to_a_beheading',
        items: [
            {
                table: new StatTable('arlecchino_masque', charTalentTables.Arlecchino.s1.p12),
            },
            {
                table: new StatTable('normal_hit_1', charTalentTables.Arlecchino.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Arlecchino.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Arlecchino.s1.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Arlecchino.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Arlecchino.s1.p5),
            },
            {
                table: new StatTable('normal_hit_6', charTalentTables.Arlecchino.s1.p6),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Arlecchino.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Arlecchino.s1.p8),
            },
            {
                unit: 'unit',
                table: new StatTable('arlecchino_stamina_cost', charTalentTables.Arlecchino.s1.p15),
            },
            {
                table: new StatTable('plunge', charTalentTables.Arlecchino.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Arlecchino.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Arlecchino.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Arlecchino.s2_id,
        title: 'talent_name.arlecchino_all_is_ash',
        description: 'talent_descr.arlecchino_all_is_ash',
        items: [
            {
                table: new StatTable('arlecchino_spike_dmg', charTalentTables.Arlecchino.s2.p1),
            },
            {
                table: new StatTable('arlecchino_cleave_dmg', charTalentTables.Arlecchino.s2.p2),
            },
            {
                table: new StatTable('arlecchino_blooddebt_dmg', charTalentTables.Arlecchino.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Arlecchino.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Arlecchino.s3_id,
        title: 'talent_name.arlecchino_balemoon_rising',
        description: 'talent_descr.arlecchino_balemoon_rising',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Arlecchino.s3.p1),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'bond',
                    'atk',
                ],
                table: [
                    new StatTable('arlecchino_heal', charTalentTables.Arlecchino.s3.p3),
                    new StatTable('arlecchino_heal_atk', charTalentTables.Arlecchino.s3.p4),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Arlecchino.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Arlecchino.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    BondOfLifeThreshold: 30,
    C1BonusScale: 100,
    C2SkillDamage: 900,
    C2Resistance: 20,
    C6BurstDamage: 700,
    C6CritRate: 10,
    C6CritDamage: 70,
}

export const Arlecchino = new DbObjectChar({
    name: 'arlecchino',
    serializeId: 85,
    gameId: 10000096,
    iconClass: 'char-icon-arlecchino',
    rarity: 5,
    element: 'pyro',
    weapon: 'polearm',
    origin: 'fontain',
    talents: Talents,
    statTable: charTables.Arlecchino,
    features: [
        new FeatureDamageNormalArlecchino({
            name: 'normal_hit_1',
            critRateBonuses: ['crit_rate_normal_arlecchino'],
            critDamageBonuses: ['crit_dmg_normal_arlecchino'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormalArlecchino({
            name: 'normal_hit_2',
            critRateBonuses: ['crit_rate_normal_arlecchino'],
            critDamageBonuses: ['crit_dmg_normal_arlecchino'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormalArlecchino({
            name: 'normal_hit_3',
            critRateBonuses: ['crit_rate_normal_arlecchino'],
            critDamageBonuses: ['crit_dmg_normal_arlecchino'],
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
            critRateBonuses: ['crit_rate_normal_arlecchino'],
            critDamageBonuses: ['crit_dmg_normal_arlecchino'],
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
        new FeatureDamageNormalArlecchino({
            name: 'normal_hit_4_1',
            isChild: true,
            hits: 2,
            critRateBonuses: ['crit_rate_normal_arlecchino'],
            critDamageBonuses: ['crit_dmg_normal_arlecchino'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageNormalArlecchino({
            name: 'normal_hit_5',
            critRateBonuses: ['crit_rate_normal_arlecchino'],
            critDamageBonuses: ['crit_dmg_normal_arlecchino'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageNormalArlecchino({
            name: 'normal_hit_6',
            critRateBonuses: ['crit_rate_normal_arlecchino'],
            critDamageBonuses: ['crit_dmg_normal_arlecchino'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_6'),
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
            name: 'arlecchino_spike_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.arlecchino_spike_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'arlecchino_cleave_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.arlecchino_cleave_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'arlecchino_blooddebt_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.arlecchino_blooddebt_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            category: 'skill',
            name: 'arlecchino_balemoon_bloodfire_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation2',
                    values: new ValueTable([TalentValues.C2SkillDamage]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionAscensionChar({ascension: 1}),
                new ConditionConstellation({constellation: 2}),
            ])
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'pyro',
            critRateBonuses: ['crit_rate_burst_arlecchino'],
            critDamageBonuses: ['crit_dmg_burst_arlecchino'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
                new FeatureMultiplierBondOfLife({
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6BurstDamage]),
                    condition: new ConditionConstellation({constellation: 6}),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'arlecchino_heal',
            subtractBoL: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.arlecchino_heal_atk'),
                }),
                new FeatureMultiplierBondOfLife({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.arlecchino_heal'),
                }),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplierBondOfLife({
            leveling: 'char_skill_attack',
            values: Talents.get('attack.arlecchino_masque'),
            bonusLeveling: 'arlecchino_all_reprisals',
            bonusValues: new ValueTable([0, TalentValues.C1BonusScale]),
            condition: new ConditionBooleanValue({
                setting: 'common.bond_of_life',
                cond: 'ge',
                value: TalentValues.BondOfLifeThreshold,
            }),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal'],
            }),
        }),
    ],
    conditions: [
        new ConditionNumberBondOfLife({
            serializeId: 1,
        }),
        new ConditionStatic({
            title: 'talent_name.arlecchino_masque_of_the_red_death',
            description: 'talent_descr.arlecchino_masque_of_the_red_death',
            settings: {
                attack_infusion: 'pyro',
            },
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'common.bond_of_life',
                    cond: 'ge',
                    value: 30,
                }),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.arlecchino_agony_alone_may_be_repaid',
            description: 'talent_descr.arlecchino_agony_alone_may_be_repaid',
            info: {ascension: 1},
            stats: {
                text_percent: 130,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.arlecchino_strength_alone_can_defend',
            description: 'talent_descr.arlecchino_strength_alone_can_defend',
            info: {ascension: 4},
            stats: {
                text_percent: 1,
                text_percent_max: 20,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionBoolean({
            name: 'arlecchino_cinders_alone_shall_nourish',
            serializeId: 3,
            title: 'talent_name.arlecchino_cinders_alone_shall_nourish',
            description: 'talent_descr.arlecchino_cinders_alone_shall_nourish',
            stats: {
                dmg_pyro: 40,
            },
        }),
    ],
    postEffects: [],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.arlecchino_all_reprisals_and_arrears_mine_to_bear',
                    description: 'talent_descr.arlecchino_all_reprisals_and_arrears_mine_to_bear',
                    settings: {
                        arlecchino_all_reprisals: 2,
                    },
                    stats: {
                        text_percent_dmg: TalentValues.C1BonusScale,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.arlecchino_all_rewards_and_retribution_mine_to_bestow',
                    description: 'talent_descr.arlecchino_all_rewards_and_retribution_mine_to_bestow',
                    stats: {
                        text_percent_dmg: TalentValues.C2SkillDamage,
                        text_percent: TalentValues.C2Resistance,
                    },
                    subConditions: [
                        new ConditionAscensionChar({ascension: 1}),
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
                new ConditionStatic({
                    title: 'talent_name.arlecchino_you_shall_love_and_protect_each_other_henceforth',
                    description: 'talent_descr.arlecchino_you_shall_love_and_protect_each_other_henceforth',
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
                    title: 'talent_name.arlecchino_from_this_day_on_we_shall_delight_in_new_life_together',
                    description: 'talent_descr.arlecchino_from_this_day_on_we_shall_delight_in_new_life_together_1',
                    stats: {
                        text_percent_dmg: TalentValues.C6BurstDamage,
                    },
                }),
                new ConditionBoolean({
                    name: 'arlecchino_from_this_day_on_we_shall_delight_in_new_life_together',
                    serializeId: 2,
                    title: 'talent_name.arlecchino_from_this_day_on_we_shall_delight_in_new_life_together',
                    description: 'talent_descr.arlecchino_from_this_day_on_we_shall_delight_in_new_life_together_2',
                    stats: {
                        crit_rate_normal_arlecchino: TalentValues.C6CritRate,
                        crit_dmg_normal_arlecchino: TalentValues.C6CritDamage,
                        crit_rate_burst_arlecchino: TalentValues.C6CritRate,
                        crit_dmg_burst_arlecchino: TalentValues.C6CritDamage,
                    },
                }),
            ],
        },
    ]),
});
