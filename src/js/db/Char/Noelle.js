import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { PostEffectStatsDef } from "../../classes/PostEffect/Stats/Def";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Noelle.s1_id,
        title: 'talent_name.noelle_favonius_bladework_maid',
        description: 'talent_descr.noelle_favonius_bladework_maid',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Noelle.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Noelle.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Noelle.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Noelle.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Noelle.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Noelle.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Noelle.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Noelle.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Noelle.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Noelle.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Noelle.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Noelle.s2_id,
        title: 'talent_name.noelle_breastplate',
        description: 'talent_descr.noelle_breastplate',
        items: [
            {
                unit: 'def',
                table: new StatTable('skill_dmg', charTalentTables.Noelle.s2.p6),
            },
            {
                unit: 'def',
                type: 'shield',
                table: [
                    new StatTable('shield', charTalentTables.Noelle.s2.p1),
                    new StatTable('', charTalentTables.Noelle.s2.p7),
                ],
            },
            {
                unit: 'def',
                type: 'shield',
                table: [
                    new StatTable('heal', charTalentTables.Noelle.s2.p2),
                    new StatTable('', charTalentTables.Noelle.s2.p8),
                ],
            },
            {
                table: new StatTable('noelle_heal_chance', charTalentTables.Noelle.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Noelle.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Noelle.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Noelle.s3_id,
        title: 'talent_name.noelle_sweeping_time',
        description: 'talent_descr.noelle_sweeping_time',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Noelle.s3.p1),
            },
            {
                table: new StatTable('noelle_skill_dmg', charTalentTables.Noelle.s3.p2),
            },
            {
                unit: 'def',
                table: new StatTable('noelle_atk_bonus', charTalentTables.Noelle.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Noelle.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Noelle.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Noelle.s3.p6),
            },
        ],
    },
});

const A1Shield = 400;
const C1ChargedStamina = 20;
const C1ChargedBonus = 15;
const C4ShieldDmg = 400;
const C6BuffBonus = 50;

export const Noelle = new DbObjectChar({
    name: 'noelle',
    serializeId: 19,
    gameId: 10000034,
    iconClass: "char-icon-noelle",
    rarity: 4,
    element: 'geo',
    weapon: 'claymore',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Noelle,
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
            name: 'skill_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            name: 'shield',
            element: 'geo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.shield'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'heal',
            category: 'skill',
            partyHeal: true,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.heal'),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'noelle_to_be_cleaned',
            category: 'skill',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation4',
                    values: new ValueTable([C4ShieldDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
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
            name: 'noelle_skill_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.noelle_skill_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            name: 'noelle_devotion_shield',
            category: 'other',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    source: 'ascension1',
                    values: new ValueTable([A1Shield]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
    ],
    postEffects: [
        new PostEffectStatsDef({
            levelSetting: 'char_skill_burst',
            percent: Talents.getMulti({
                name: 'atk',
                from: 'burst.noelle_atk_bonus',
                multi: 0.01,
            }),
            conditions: [
                new ConditionBoolean({name: 'noelle_sweeping_time'}),
            ],
            percentBonus: new ValueTable([C6BuffBonus / 100]),
            bonusCondition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'noelle_sweeping_time',
            serializeId: 1,
            title: 'talent_name.noelle_sweeping_time',
            description: 'talent_descr.noelle_sweeping_time_talent',
            settings: {
                attack_infusion: 'geo',
            }
        }),
        new ConditionStatic({
            title: 'talent_name.noelle_devotion',
            description: 'talent_descr.noelle_devotion',
            stats: {
                text_percent: A1Shield,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.noelle_nice_and_clean',
            description: 'talent_descr.noelle_nice_and_clean',
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
                    title: 'talent_name.noelle_i_got_your_back',
                    description: 'talent_descr.noelle_i_got_your_back',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.noelle_combat_maid',
                    description: 'talent_descr.noelle_combat_maid',
                    stats: {
                        stamina_consume_charged: C1ChargedStamina,
                        dmg_charged: C1ChargedBonus,
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
                    title: 'talent_name.noelle_to_be_cleaned',
                    description: 'talent_descr.noelle_to_be_cleaned',
                    stats: {
                        text_percent_dmg: C4ShieldDmg,
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
                    serializeId: 2, // for compatibility
                    title: 'talent_name.noelle_must_be_spotless',
                    description: 'talent_descr.noelle_must_be_spotless',
                    stats: {
                        text_percent_dmg: C6BuffBonus,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'noelle_sweeping_time'}),
                    ],
                }),
            ],
        },
    ]),
});
