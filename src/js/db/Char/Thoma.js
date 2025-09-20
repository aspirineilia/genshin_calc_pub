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
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Thoma.s1_id,
        title: 'talent_name.thoma_swiftshatter_spear',
        description: 'talent_descr.thoma_swiftshatter_spear',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Thoma.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Thoma.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Thoma.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Thoma.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Thoma.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Thoma.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Thoma.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Thoma.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Thoma.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Thoma.s2_id,
        title: 'talent_name.thoma_blazing_blessing',
        description: 'talent_descr.thoma_blazing_blessing',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Thoma.s2.p1),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('shield', charTalentTables.Thoma.s2.p2),
                    new StatTable('', charTalentTables.Thoma.s2.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('shield_duration', charTalentTables.Thoma.s2.p4),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('shield_max_absorption', charTalentTables.Thoma.s2.p5),
                    new StatTable('', charTalentTables.Thoma.s2.p6),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Thoma.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Thoma.s3_id,
        title: 'talent_name.thoma_crimson_ooyoroi',
        description: 'talent_descr.thoma_crimson_ooyoroi',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Thoma.s3.p1),
            },
            {
                table: new StatTable('thoma_fiery_collapse_dmg', charTalentTables.Thoma.s3.p2),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('shield', charTalentTables.Thoma.s3.p3),
                    new StatTable('', charTalentTables.Thoma.s3.p4),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('thoma_shield_duration', charTalentTables.Thoma.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('thoma_burst_duration', charTalentTables.Thoma.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Thoma.s3.p8),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Thoma.s3.p9),
            },
        ],
    },
});

export const Thoma = new DbObjectChar({
    name: 'thoma',
    serializeId: 44,
    gameId: 10000050,
    iconClass: "char-icon-thoma",
    rarity: 4,
    element: 'pyro',
    weapon: 'polearm',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Thoma,
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
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
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
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.shield'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.shield_max_absorption'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.thoma_fiery_collapse_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new ValueTable([2.2]),
                    condition: new ConditionAscensionChar({ascension: 4}),
                }),
            ],
        }),
        new FeatureShield({
            category: 'burst',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.shield'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'thoma_imbricated_armor',
            serializeId: 1,
            title: 'talent_name.thoma_imbricated_armor',
            description: 'talent_descr.thoma_imbricated_armor',
            maxStacks: 5,
            stats: [
                new StatTable('shield', [5]),
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.thoma_flaming_assault',
            description: 'talent_descr.thoma_flaming_assault',
            stats: {
                text_percent: 2.2,
            },
            info: {ascension: 4},
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.thoma_a_comrades_duty',
                    description: 'talent_descr.thoma_a_comrades_duty',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.thoma_a_subordinates_skills',
                    description: 'talent_descr.thoma_a_subordinates_skills',
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
                    title: 'talent_name.thoma_long_term_planning',
                    description: 'talent_descr.thoma_long_term_planning',
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
                    name: 'thoma_burning_heart',
                    serializeId: 3,
                    title: 'talent_name.thoma_burning_heart',
                    description: 'talent_descr.thoma_burning_heart',
                    stats: {
                        dmg_normal: 15,
                        dmg_charged: 15,
                        dmg_plunge: 15,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.thoma_burning_heart',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.thoma_burning_heart',
                description: 'talent_descr.thoma_burning_heart',
                info: {constellation: 6},
                stats: {
                    dmg_normal: 15,
                    dmg_charged: 15,
                    dmg_plunge: 15,
                },
            }),
        ],
    },
});
