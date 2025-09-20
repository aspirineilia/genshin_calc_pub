import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Freminet.s1_id,
        title: 'talent_name.freminet_flowing_eddies',
        description: 'talent_descr.freminet_flowing_eddies',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Freminet.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Freminet.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Freminet.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Freminet.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Freminet.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Freminet.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Freminet.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Freminet.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Freminet.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Freminet.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Freminet.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Freminet.s2_id,
        title: 'talent_name.freminet_pressurized_floe',
        description: 'talent_descr.freminet_pressurized_floe',
        items: [
            {
                table: new StatTable('freminet_upward_thrust_dmg', charTalentTables.Freminet.s2.p1),
            },
            {
                table: new StatTable('freminet_frost_dmg', charTalentTables.Freminet.s2.p3),
            },
            {
                table: new StatTable('freminet_pressure_0_dmg', charTalentTables.Freminet.s2.p4),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'cryo',
                    'phys',
                ],
                table: [
                    new StatTable('freminet_pressure_1_dmg', charTalentTables.Freminet.s2.p5),
                    new StatTable('freminet_pressure_1_phys_dmg', charTalentTables.Freminet.s2.p6),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'cryo',
                    'phys',
                ],
                table: [
                    new StatTable('freminet_pressure_2_dmg', charTalentTables.Freminet.s2.p7),
                    new StatTable('freminet_pressure_2_phys_dmg', charTalentTables.Freminet.s2.p8),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'cryo',
                    'phys',
                ],
                table: [
                    new StatTable('freminet_pressure_3_dmg', charTalentTables.Freminet.s2.p9),
                    new StatTable('freminet_pressure_3_phys_dmg', charTalentTables.Freminet.s2.p10),
                ],
            },
            {
                table: new StatTable('freminet_pressure_4_dmg', charTalentTables.Freminet.s2.p11),
            },
            {
                table: new StatTable('spiritbreath_thorn_dmg', charTalentTables.Freminet.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('spiritbreath_thorn_interval', charTalentTables.Freminet.s2.p13),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Freminet.s2.p12),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Freminet.s3_id,
        title: 'talent_name.freminet_shadowhunters_ambush',
        description: 'talent_descr.freminet_shadowhunters_ambush',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Freminet.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Freminet.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Freminet.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Freminet.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    BurstNormalBaseMulti: 200,
    A4SkillBonus: 40,
    C1CritRateSkill: 15,
    C4AtkBonus: 9,
    C6CritDmg: 12,
};

export const Freminet = new DbObjectChar({
    name: 'freminet',
    serializeId: 74,
    gameId: 10000085,
    iconClass: 'char-icon-freminet',
    rarity: 4,
    element: 'cryo',
    weapon: 'claymore',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Freminet,
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
        new FeatureDamageNormal({
            name: 'normal_hit_3',
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
            name: 'freminet_upward_thrust_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_upward_thrust_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_frost_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_frost_dmg'),
                    scalingSource: 'talent_burst',
                    scalingMultiplier: 2,
                    scalingMultiplierCondition: new ConditionBoolean({name: 'freminet_stalking_mode'}),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_0_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_0_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_1_cryo_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_1_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_1_phys_dmg',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_1_phys_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_2_cryo_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_2_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_2_phys_dmg',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_2_phys_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_3_cryo_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_3_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_3_phys_dmg',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_3_phys_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'freminet_pressure_4_dmg',
            damageBonuses: ['dmg_skill_freminet'],
            critRateBonuses: ['crit_rate_freminet'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.freminet_pressure_4_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'spiritbreath_thorn_dmg',
            element: 'cryo',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.spiritbreath_thorn_dmg'),
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
    ],
    conditions: [
        new ConditionBoolean({
            name: 'freminet_stalking_mode',
            serializeId: 2,
            title: 'talent_name.freminet_stalking_mode',
            description: 'talent_descr.freminet_stalking_mode',
            stats: {
                text_percent_dmg: TalentValues.BurstNormalBaseMulti,
            },
        }),
        new ConditionStatic({
            title: 'talent_name.freminet_saturation_deep_dive',
            description: 'talent_descr.freminet_saturation_deep_dive',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'freminet_parallel_condensers',
            serializeId: 1,
            title: 'talent_name.freminet_parallel_condensers',
            description: 'talent_descr.freminet_parallel_condensers',
            info: {ascension: 4},
            stats: {
                dmg_skill_freminet: TalentValues.A4SkillBonus,
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
                    title: 'talent_name.freminet_dreams_of_the_foamy_deep',
                    description: 'talent_descr.freminet_dreams_of_the_foamy_deep',
                    stats: {
                        crit_rate_freminet: TalentValues.C1CritRateSkill,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.freminet_penguins_and_the_land_of_plenty',
                    description: 'talent_descr.freminet_penguins_and_the_land_of_plenty',
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
                new ConditionStacks({
                    name: 'freminet_dance_of_the_snowy_moon_and_flute',
                    serializeId: 3,
                    title: 'talent_name.freminet_dance_of_the_snowy_moon_and_flute',
                    description: 'talent_descr.freminet_dance_of_the_snowy_moon_and_flute',
                    maxStacks: 2,
                    stats: [
                        new StatTable('atk_percent', [TalentValues.C4AtkBonus]),
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
                new ConditionStacks({
                    name: 'freminet_moment_of_waking_and_resolve',
                    serializeId: 4,
                    title: 'talent_name.freminet_moment_of_waking_and_resolve',
                    description: 'talent_descr.freminet_moment_of_waking_and_resolve',
                    maxStacks: 3,
                    stats: [
                        new StatTable('crit_dmg', [TalentValues.C6CritDmg]),
                    ],
                }),
            ],
        },
    ]),
});
