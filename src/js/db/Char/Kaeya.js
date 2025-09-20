import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStatic } from "../../classes/Condition/Static";
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
import { FeatureShield } from "../../classes/Feature2/Shield";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Kaeya.s1_id,
        title: 'talent_name.kaeya_ceremonial_bladework',
        description: 'talent_descr.kaeya_ceremonial_bladework',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kaeya.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Kaeya.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Kaeya.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Kaeya.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Kaeya.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Kaeya.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.Kaeya.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Kaeya.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kaeya.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kaeya.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kaeya.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kaeya.s2_id,
        title: 'talent_name.kaeya_frostgnaw',
        description: 'talent_descr.kaeya_frostgnaw',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Kaeya.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kaeya.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kaeya.s3_id,
        title: 'talent_name.kaeya_glacial_waltz',
        description: 'talent_descr.kaeya_glacial_waltz',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Kaeya.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Kaeya.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kaeya.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kaeya.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A1Heal: 15,
    C1CritRate: 15,
    C4Shield: 30,
};

export const Kaeya = new DbObjectChar({
    name: 'kaeya',
    serializeId: 13,
    gameId: 10000015,
    iconClass: "char-icon-kaeya",
    rarity: 4,
    element: 'cryo',
    weapon: 'sword',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Kaeya,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            critRateBonuses: ['crit_rate_kaeya'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            critRateBonuses: ['crit_rate_kaeya'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            critRateBonuses: ['crit_rate_kaeya'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            critRateBonuses: ['crit_rate_kaeya'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            critRateBonuses: ['crit_rate_kaeya'],
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
            critRateBonuses: ['crit_rate_kaeya'],
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
            critRateBonuses: ['crit_rate_kaeya'],
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
            critRateBonuses: ['crit_rate_kaeya'],
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
            name: 'skill_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'kaeya_coldblooded_strike',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1Heal]),
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
        new FeatureShield({
            name: 'kaeya_shield',
            category: 'other',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new ValueTable([TalentValues.C4Shield]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.kaeya_cold_blooded_strike',
            description: 'talent_descr.kaeya_cold_blooded_strike',
            stats: {
                text_percent_dmg: TalentValues.A1Heal,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kaeya_glacial_heart',
            description: 'talent_descr.kaeya_glacial_heart',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'kaeya_excellent_blood',
                    serializeId: 1,
                    title: 'talent_name.kaeya_excellent_blood',
                    description: 'talent_descr.kaeya_excellent_blood',
                    stats: {
                        crit_rate_kaeya: TalentValues.C1CritRate,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kaeya_never_ending_performance',
                    description: 'talent_descr.kaeya_never_ending_performance',
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
                    title: 'talent_name.kaeya_frozen_kiss',
                    description: 'talent_descr.kaeya_frozen_kiss',
                    stats: {
                        text_percent: TalentValues.C4Shield,
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
                    title: 'talent_name.kaeya_glacial_whirlwind',
                    description: 'talent_descr.kaeya_glacial_whirlwind',
                }),
            ],
        },
    ]),
});
