import { Condition } from '../../classes/Condition'
import { ConditionAscensionChar } from '../../classes/Condition/Ascension/Char';
import { ConditionBoolean } from '../../classes/Condition/Boolean'
import { ConditionStacks } from '../../classes/Condition/Stacks'
import { ConditionStatic } from '../../classes/Condition/Static';
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation"
import { DbObjectTalents } from '../../classes/DbObject/Talents';
import { FeatureDamageBurst } from '../../classes/Feature2/Damage/Burst';
import { FeatureDamageCharged } from '../../classes/Feature2/Damage/Charged';
import { FeatureDamageMultihit } from '../../classes/Feature2/Damage/Multihit';
import { FeatureDamageNormal } from '../../classes/Feature2/Damage/Normal';
import { FeatureDamagePlungeCollision } from '../../classes/Feature2/Damage/Plunge/Collision';
import { FeatureDamagePlungeShockWave } from '../../classes/Feature2/Damage/Plunge/ShockWave';
import { FeatureDamageSkill } from '../../classes/Feature2/Damage/Skill';
import { FeatureMultiplier } from '../../classes/Feature2/Multiplier';
import { PostEffectStatsMastery } from '../../classes/PostEffect/Stats/Mastery';
import { StatTable } from "../../classes/StatTable"
import { charTables } from "../generated/CharTables";
import { charTalentTables } from '../generated/CharTalentTables';


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Alhaitham.s1_id,
        title: 'talent_name.alhaitham_abductive_reasoning',
        description: 'talent_descr.alhaitham_abductive_reasoning',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Alhaitham.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Alhaitham.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Alhaitham.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Alhaitham.s1.p5),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Alhaitham.s1.p6),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('charged_hit', charTalentTables.Alhaitham.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Alhaitham.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Alhaitham.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Alhaitham.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Alhaitham.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Alhaitham.s2_id,
        title: 'talent_name.alhaitham_an_elaboration_on_form',
        description: 'talent_descr.alhaitham_an_elaboration_on_form',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('alhaitham_rush_dmg', charTalentTables.Alhaitham.s2.p1),
                    new StatTable('alhaitham_rush_mastery', charTalentTables.Alhaitham.s2.p2),
                ],
            },
            {
                unit: '',
                table: new StatTable('alhaitham_attack_interval', charTalentTables.Alhaitham.s2.p3),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('alhaitham_mirror_1_dmg', charTalentTables.Alhaitham.s2.p4),
                    new StatTable('alhaitham_mirror_1_mastery', charTalentTables.Alhaitham.s2.p5),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                multiplier: 2,
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('alhaitham_mirror_2_dmg', charTalentTables.Alhaitham.s2.p6),
                    new StatTable('alhaitham_mirror_2_mastery', charTalentTables.Alhaitham.s2.p7),
                ],
            },
            {
                type: 'multivalue',
                separator: ' + ',
                multiplier: 3,
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('alhaitham_mirror_3_dmg', charTalentTables.Alhaitham.s2.p8),
                    new StatTable('alhaitham_mirror_3_mastery', charTalentTables.Alhaitham.s2.p9),
                ],
            },
            {
                unit: '',
                table: new StatTable('alhaitham_mirror_interval', charTalentTables.Alhaitham.s2.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Alhaitham.s2.p11),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Alhaitham.s3_id,
        title: 'talent_name.alhaitham_fetters_of_phenomena',
        description: 'talent_descr.alhaitham_fetters_of_phenomena',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('alhaitham_single_instance_dmg', charTalentTables.Alhaitham.s3.p1),
                    new StatTable('alhaitham_single_instance_mastery', charTalentTables.Alhaitham.s3.p2),
                ],
            },
            {
                unit: '',
                table: new StatTable('alhaitham_instance_0', charTalentTables.Alhaitham.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('alhaitham_instance_1', charTalentTables.Alhaitham.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('alhaitham_instance_2', charTalentTables.Alhaitham.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('alhaitham_instance_3', charTalentTables.Alhaitham.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Alhaitham.s3.p7),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Alhaitham.s3.p8),
            },
        ],
    },
});

const TalentValues = {
    A4BonusRatio: 0.1,
    A4BonusMax: 100,
    C2Mastery: 50,
    C4Mastery: 30,
    C4DendroDmg: 10,
    C6CritRate: 10,
    C6CritDmg: 70,
}

export const Alhaitham = new DbObjectChar({
    name: 'alhaitham',
    serializeId: 66,
    gameId: 10000078,
    iconClass: "char-icon-alhaitham",
    rarity: 5,
    element: 'dendro',
    weapon: 'sword',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Alhaitham,
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
            hits: 2,
            isChild: true,
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
            name: 'charged_hit_1',
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
            name: 'alhaitham_rush_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_rush_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_rush_mastery'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'alhaitham_mirror_1_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_skill_alhaitham'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_mirror_1_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_mirror_1_mastery'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'skill',
            damageType: 'skill',
            element: 'dendro',
            name: 'alhaitham_mirror_2_total_dmg',
            damageBonuses: ['dmg_skill_alhaitham'],
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.alhaitham_mirror_2_dmg'),
                        }),
                        new FeatureMultiplier({
                            scaling: 'mastery*',
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.alhaitham_mirror_2_mastery'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            name: 'alhaitham_mirror_2_dmg',
            element: 'dendro',
            isChild: true,
            hits: 2,
            damageBonuses: ['dmg_skill_alhaitham'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_mirror_2_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_mirror_2_mastery'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'skill',
            damageType: 'skill',
            element: 'dendro',
            name: 'alhaitham_mirror_3_total_dmg',
            damageBonuses: ['dmg_skill_alhaitham'],
            items: [
                {
                    hits: 3,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.alhaitham_mirror_3_dmg'),
                        }),
                        new FeatureMultiplier({
                            scaling: 'mastery*',
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.alhaitham_mirror_3_mastery'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            name: 'alhaitham_mirror_3_dmg',
            element: 'dendro',
            isChild: true,
            hits: 3,
            damageBonuses: ['dmg_skill_alhaitham'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_mirror_3_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.alhaitham_mirror_3_mastery'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'alhaitham_single_instance_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_burst_alhaitham'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.alhaitham_single_instance_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.alhaitham_single_instance_mastery'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'alhaitham_mirror',
            serializeId: 1,
            title: 'talent_name.alhaitham_mirror',
            description: 'talent_descr.alhaitham_mirror',
            settings: {
                attack_infusion: 'dendro',
            },
        }),
        new ConditionStatic({
            title: 'talent_name.alhaitham_four_causal_correction',
            description: 'talent_descr.alhaitham_four_causal_correction',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.alhaitham_mysteries_laid_bare',
            description: 'talent_descr.alhaitham_mysteries_laid_bare',
            info: {ascension: 4},
            stats: {
                text_percent_dmg: TalentValues.A4BonusRatio,
                text_percent_max: TalentValues.A4BonusMax,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_skill_alhaitham', [TalentValues.A4BonusRatio]),
            statCap: new StatTable('', [TalentValues.A4BonusMax]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_burst_alhaitham', [TalentValues.A4BonusRatio]),
            statCap: new StatTable('', [TalentValues.A4BonusMax]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.alhaitham_intuition',
                    description: 'talent_descr.alhaitham_intuition',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'alhaitham_debate',
                    serializeId: 2,
                    title: 'talent_name.alhaitham_debate',
                    description: 'talent_descr.alhaitham_debate',
                    maxStacks: 4,
                    stats: [
                        new StatTable('mastery', [TalentValues.C2Mastery]),
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
                    name: 'alhaitham_elucidation',
                    serializeId: 3,
                    title: 'talent_name.alhaitham_elucidation',
                    description: 'talent_descr.alhaitham_elucidation',
                    maxStacks: 3,
                    stats: [
                        new StatTable('text_value_dendro', [TalentValues.C4DendroDmg]),
                        new StatTable('text_value_mastery', [TalentValues.C4Mastery]),
                        new StatTable('dmg_dendro', [TalentValues.C4DendroDmg]),
                    ],
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
                    name: 'alhaitham_structuration',
                    serializeId: 4,
                    title: 'talent_name.alhaitham_structuration',
                    description: 'talent_descr.alhaitham_structuration',
                    stats: {
                        crit_rate: TalentValues.C6CritRate,
                        crit_dmg: TalentValues.C6CritDmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionStacks({
                name: 'party.alhaitham_elucidation',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.alhaitham_elucidation',
                description: 'talent_descr.alhaitham_elucidation',
                maxStacks: 3,
                info: {constellation: 4},
                stats: [
                    new StatTable('text_value_dendro', [TalentValues.C4DendroDmg]),
                    new StatTable('text_value_mastery', [TalentValues.C4Mastery]),
                    new StatTable('mastery', [TalentValues.C4Mastery]),
                ],
            }),
        ],
    },
});
