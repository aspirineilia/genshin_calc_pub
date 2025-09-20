import { Condition } from '../../classes/Condition'
import { ConditionAscensionChar } from '../../classes/Condition/Ascension/Char';
import { ConditionBoolean } from '../../classes/Condition/Boolean'
import { ConditionConstellation } from '../../classes/Condition/Constellation';
import { ConditionStacks } from '../../classes/Condition/Stacks'
import { ConditionStatic } from '../../classes/Condition/Static';
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation"
import { DbObjectTalents } from '../../classes/DbObject/Talents';
import { FeatureDamage } from '../../classes/Feature2/Damage';
import { FeatureDamageBurst } from '../../classes/Feature2/Damage/Burst';
import { FeatureDamageCharged } from '../../classes/Feature2/Damage/Charged';
import { FeatureDamageMultihit } from '../../classes/Feature2/Damage/Multihit';
import { FeatureDamageNormal } from '../../classes/Feature2/Damage/Normal';
import { FeatureDamagePlungeCollision } from '../../classes/Feature2/Damage/Plunge/Collision';
import { FeatureDamagePlungeShockWave } from '../../classes/Feature2/Damage/Plunge/ShockWave';
import { FeatureDamageSkill } from '../../classes/Feature2/Damage/Skill';
import { FeatureMultiplier } from '../../classes/Feature2/Multiplier';
import { StatTable } from "../../classes/StatTable"
import { ValueTable } from '../../classes/ValueTable';
import { charTables } from "../generated/CharTables";
import { charTalentTables } from '../generated/CharTalentTables';

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Keqing.s1_id,
        title: 'talent_name.keqing_yunlai_swordsmanship',
        description: 'talent_descr.keqing_yunlai_swordsmanship',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Keqing.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Keqing.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Keqing.s1.p3),
            },
            {
                type: 'hits',
                name: 'normal_hit_4',
                table: [
                    new StatTable('normal_hit_4_1', charTalentTables.Keqing.s1.p4),
                    new StatTable('normal_hit_4_2', charTalentTables.Keqing.s1.p5),
                ],
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Keqing.s1.p6),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Keqing.s1.p7),
                    new StatTable('charged_hit_2', charTalentTables.Keqing.s1.p8),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Keqing.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Keqing.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Keqing.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Keqing.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Keqing.s2_id,
        title: 'talent_name.keqing_stellar_restoration',
        description: 'talent_descr.keqing_stellar_restoration',
        items: [
            {
                table: new StatTable('keqing_skill_stiletto', charTalentTables.Keqing.s2.p1),
            },
            {
                table: new StatTable('keqing_skill_slash', charTalentTables.Keqing.s2.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('keqing_skill_clap_dmg', charTalentTables.Keqing.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Keqing.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Keqing.s3_id,
        title: 'talent_name.keqing_starward_sword',
        description: 'talent_descr.keqing_starward_sword',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Keqing.s3.p1),
            },
            {
                table: new StatTable('keqing_burst_slash', charTalentTables.Keqing.s3.p2),
            },
            {
                table: new StatTable('keqing_burst_last', charTalentTables.Keqing.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Keqing.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Keqing.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    A4CritRate: 15,
    A4Recharge: 15,
    C1Dmg: 50,
    C4AtkBonus: 25,
    C6ElectroBonus: 6,
};

export const Keqing = new DbObjectChar({
    name: 'keqing',
    serializeId: 14,
    gameId: 10000042,
    iconClass: "char-icon-keqing",
    rarity: 5,
    element: 'electro',
    weapon: 'sword',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Keqing,
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_2'),
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
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
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
            name: 'keqing_skill_stiletto',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.keqing_skill_stiletto'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'keqing_skill_slash',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.keqing_skill_slash'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'keqing_skill_clap_total_dmg',
            element: 'electro',
            category: 'skill',
            damageType: 'skill',
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.keqing_skill_clap_dmg'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            name: 'keqing_skill_clap_dmg',
            element: 'electro',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.keqing_skill_clap_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'keqing_thundering_might',
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation1',
                    values: new ValueTable([TalentValues.C1Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'keqing_burst_slash',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.keqing_burst_slash'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'keqing_burst_last',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.keqing_burst_last'),
                }),
            ],
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                allowed_infusion_electro: 1,
            },
        }),
        new ConditionBoolean({
            name: 'keqing_penance',
            serializeId: 1,
            title: 'talent_name.keqing_thundering_penance',
            description: 'talent_descr.keqing_thundering_penance',
            settings: {
                attack_infusion_electro: 1,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'keqing_dignity',
            serializeId: 2,
            title: 'talent_name.keqing_aristocratic_dignity',
            description: 'talent_descr.keqing_aristocratic_dignity',
            stats: {
                crit_rate: TalentValues.A4CritRate,
                recharge: TalentValues.A4Recharge,
            },
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
                    title: 'talent_name.keqing_thundering_might',
                    description: 'talent_descr.keqing_thundering_might',
                    stats: {
                        text_percent_dmg: TalentValues.C1Dmg,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.keqing_keen_extraction',
                    description: 'talent_descr.keqing_keen_extraction',
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
                    name: 'keqing_attunement',
                    serializeId: 3,
                    title: 'talent_name.keqing_attunement',
                    description: 'talent_descr.keqing_attunement',
                    settings: {},
                    stats: {
                        atk_percent: TalentValues.C4AtkBonus,
                    },
                }),
            ]
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
                    name: 'keqing_tenacious_star',
                    serializeId: 4,
                    title: 'talent_name.keqing_tenacious_star',
                    description: 'talent_descr.keqing_tenacious_star',
                    maxStacks: 4,
                    stats: [
                        new StatTable('dmg_electro', [TalentValues.C6ElectroBonus]),
                    ],
                })
            ],
        },
    ]),
});
