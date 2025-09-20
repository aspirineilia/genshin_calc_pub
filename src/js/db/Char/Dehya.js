import { Condition } from '../../classes/Condition'
import { ConditionAscensionChar } from '../../classes/Condition/Ascension/Char';
import { ConditionBoolean } from '../../classes/Condition/Boolean'
import { ConditionConstellation } from '../../classes/Condition/Constellation';
import { ConditionStacks } from '../../classes/Condition/Stacks'
import { ConditionStatic } from '../../classes/Condition/Static';
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation"
import { DbObjectTalents } from '../../classes/DbObject/Talents';
import { FeatureDamageBurst } from '../../classes/Feature2/Damage/Burst';
import { FeatureDamageCharged } from '../../classes/Feature2/Damage/Charged';
import { FeatureDamageNormal } from '../../classes/Feature2/Damage/Normal';
import { FeatureDamagePlungeCollision } from '../../classes/Feature2/Damage/Plunge/Collision';
import { FeatureDamagePlungeShockWave } from '../../classes/Feature2/Damage/Plunge/ShockWave';
import { FeatureDamageSkill } from '../../classes/Feature2/Damage/Skill';
import { FeatureHeal } from '../../classes/Feature2/Heal';
import { FeatureMultiplier } from '../../classes/Feature2/Multiplier';
import { FeatureMultiplierTarget } from '../../classes/Feature2/Multiplier/Target';
import { StatTable } from "../../classes/StatTable"
import { ValueTable } from '../../classes/ValueTable';
import { charTables } from '../generated/CharTables';
import { charTalentTables } from '../generated/CharTalentTables';

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Dehya.s1_id,
        title: 'talent_name.dehya_sandstorm_assault',
        description: 'talent_descr.dehya_sandstorm_assault',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Dehya.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Dehya.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Dehya.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Dehya.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Dehya.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Dehya.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Dehya.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Dehya.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Dehya.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Dehya.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Dehya.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Dehya.s2_id,
        title: 'talent_name.dehya_molten_inferno',
        description: 'talent_descr.dehya_molten_inferno',
        items: [
            {
                table: new StatTable('dehya_indomitable_flame_dmg', charTalentTables.Dehya.s2.p1),
            },
            {
                table: new StatTable('dehya_ranging_flame_dmg', charTalentTables.Dehya.s2.p2),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'hp',
                ],
                table: [
                    new StatTable('dehya_field_dmg', charTalentTables.Dehya.s2.p3),
                    new StatTable('dehya_field_hp', charTalentTables.Dehya.s2.p4),
                ],
            },
            {
                table: new StatTable('dehya_mitigation', charTalentTables.Dehya.s2.p5),
            },
            {
                unit: 'hp',
                table: new StatTable('dehya_redmanes_blood_maximum', charTalentTables.Dehya.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('dehya_field_duration', charTalentTables.Dehya.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Dehya.s2.p8),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Dehya.s3_id,
        title: 'talent_name.dehya_leonine_bite',
        description: 'talent_descr.dehya_leonine_bite',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'hp',
                ],
                table: [
                    new StatTable('dehya_flame_manes_fist_dmg', charTalentTables.Dehya.s3.p1),
                    new StatTable('dehya_flame_manes_fist_hp', charTalentTables.Dehya.s3.p2),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'hp',
                ],
                table: [
                    new StatTable('dehya_incineration_drive_dmg', charTalentTables.Dehya.s3.p3),
                    new StatTable('dehya_incineration_drive_hp', charTalentTables.Dehya.s3.p4),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Dehya.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Dehya.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Dehya.s3.p7),
            },
        ],
    },
});

const TalentValues = {
    A4Heal: 20,
    A4HealDot: 6,
    C1MaxHp: 20,
    C1SkillHpBonus: 3.6,
    C1BurstHpBonus: 6,
    C2SkillDmg: 50,
    C4SelfHeal: 2.5,
    C6CritRate: 10,
    C6CritDmg: 15,
};

export const Dehya = new DbObjectChar({
    name: 'dehya',
    serializeId: 67,
    gameId: 10000079,
    iconClass: "char-icon-dehya",
    rarity: 5,
    element: 'pyro',
    weapon: 'claymore',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Dehya,
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
            name: 'dehya_indomitable_flame_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.dehya_indomitable_flame_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'dehya_ranging_flame_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.dehya_ranging_flame_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'dehya_field_dmg',
            element: 'pyro',
            damageBonuses: ['dmg_skill_dehya'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.dehya_field_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.dehya_field_hp'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'dehya_flame_manes_fist_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dehya_flame_manes_fist_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dehya_flame_manes_fist_hp'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'dehya_incineration_drive_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dehya_incineration_drive_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dehya_incineration_drive_hp'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'dehya_an_oath_abiding_heal',
            category: 'burst',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new ValueTable([TalentValues.C4SelfHeal]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
        new FeatureHeal({
            name: 'dehya_stalwart_and_true_heal',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new ValueTable([TalentValues.A4Heal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new FeatureHeal({
            name: 'dehya_stalwart_and_true_dot_heal',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new ValueTable([TalentValues.A4HealDot]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.dehya_unstinting_succor',
            description: 'talent_descr.dehya_unstinting_succor',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.dehya_stalwart_and_true',
            description: 'talent_descr.dehya_stalwart_and_true',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'constellation1',
            values: new ValueTable([TalentValues.C1SkillHpBonus]),
            condition: new ConditionConstellation({constellation: 1}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'constellation1',
            values: new ValueTable([TalentValues.C1BurstHpBonus]),
            condition: new ConditionConstellation({constellation: 1}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['burst'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.dehya_the_flame_incandescent',
                    description: 'talent_descr.dehya_the_flame_incandescent',
                    settings: {},
                    stats: {
                        hp_percent: TalentValues.C1MaxHp,
                        skill_base_hp_percent: TalentValues.C1SkillHpBonus,
                        burst_base_hp_percent: TalentValues.C1BurstHpBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'dehya_the_sand_blades_glittering',
                    serializeId: 2,
                    title: 'talent_name.dehya_the_sand_blades_glittering',
                    description: 'talent_descr.dehya_the_sand_blades_glittering',
                    stats: {
                        dmg_skill_dehya: TalentValues.C2SkillDmg,
                    },
                })
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
                    title: 'talent_name.dehya_an_oath_abiding',
                    description: 'talent_descr.dehya_an_oath_abiding',
                    stats: {
                        text_percent_heal: TalentValues.C4SelfHeal,
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
                    title: 'talent_name.dehya_the_burning_claws_cleaving',
                    description: 'talent_descr.dehya_the_burning_claws_cleaving_1',
                    stats: {
                        crit_rate_burst: TalentValues.C6CritRate,
                    },
                }),
                new ConditionStacks({
                    name: 'dehya_the_burning_claws_cleaving',
                    serializeId: 3,
                    maxStacks: 4,
                    title: 'talent_name.dehya_the_burning_claws_cleaving',
                    description: 'talent_descr.dehya_the_burning_claws_cleaving_2',
                    stats: [
                        new StatTable('crit_dmg_burst', [TalentValues.C6CritDmg]),
                    ],
                })
            ],
        },
    ]),
});
