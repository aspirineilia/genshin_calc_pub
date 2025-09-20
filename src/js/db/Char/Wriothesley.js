import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticLevel } from "../../classes/Condition/Static/Level";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierWriothesley } from "../../classes/Feature2/Multiplier/Wriothesley";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Wriothesley.s1_id,
        title: 'talent_name.wriothesley_forceful_fists_of_frost',
        description: 'talent_descr.wriothesley_forceful_fists_of_frost',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Wriothesley.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Wriothesley.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Wriothesley.s1.p3),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Wriothesley.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Wriothesley.s1.p6),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Wriothesley.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Wriothesley.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Wriothesley.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Wriothesley.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Wriothesley.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Wriothesley.s2_id,
        title: 'talent_name.wriothesley_icefang_rush',
        description: 'talent_descr.wriothesley_icefang_rush',
        items: [
            {
                unit: 'normal_attack',
                table: new StatTable('wriothesley_enhanced_repelling_fist', charTalentTables.Wriothesley.s2.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('hp_cost', charTalentTables.Wriothesley.s2.p2),
            },
            {
                unit: 'unit',
                table: new StatTable('duration', charTalentTables.Wriothesley.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Wriothesley.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Wriothesley.s3_id,
        title: 'talent_name.wriothesley_darkgold_wolfbite',
        description: 'talent_descr.wriothesley_darkgold_wolfbite',
        items: [
            {
                type: 'multihit',
                hits: 5,
                table: new StatTable('burst_dmg', charTalentTables.Wriothesley.s3.p1),
            },
            {
                table: new StatTable('surging_blade_dmg', charTalentTables.Wriothesley.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Wriothesley.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Wriothesley.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Wriothesley.s3.p4),
            },
        ],
    },
});

export const Wriothesley = new DbObjectChar({
    name: 'wriothesley',
    serializeId: 76,
    gameId: 10000086,
    iconClass: 'char-icon-wriothesley',
    rarity: 5,
    element: 'cryo',
    weapon: 'catalyst',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Wriothesley,
    features: [
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            element: 'cryo',
            category: 'attack',
            damageType: 'normal',
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierWriothesley({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                            scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                            scalingSource: 'talent_elemental',
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            element: 'cryo',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierWriothesley({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                    scalingValues: Talents.get('skill.wriothesley_enhanced_repelling_fist'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'wriothesley_vaulting_fist_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_charged_wriothesley'],
            critRateBonuses: ['crit_rate_charged_wriothesley'],
            critDamageBonuses: ['crit_dmg_charged_wriothesley'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'wriothesley_vaulting_fist_heal',
            category: 'attack',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension1',
                    leveling: 'wriothesley_heal_level',
                    values: new ValueTable([30, 50]),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            damageBonuses: ['dmg_burst_wriothesley'],
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
            name: 'wriothesley_chilling_penalty',
            serializeId: 1,
            title: 'talent_name.wriothesley_chilling_penalty',
            description: 'talent_descr.wriothesley_chilling_penalty',
        }),
        new ConditionStatic({
            title: 'talent_name.wriothesley_there_shall_be_a_plea_for_justice',
            description: 'talent_descr.wriothesley_there_shall_be_a_plea_for_justice',
            stats: {
                dmg_charged_wriothesley: 50,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'wriothesley_reckoning_for_sin',
            serializeId: 2,
            title: 'talent_name.wriothesley_there_shall_be_a_reckoning_for_sin',
            description: 'talent_descr.wriothesley_there_shall_be_a_reckoning_for_sin',
            maxStacks: 5,
            stats: [
                new StatTable('atk_percent', [6]),
            ],
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
                    title: 'talent_name.wriothesley_terror_for_the_evildoers',
                    description: 'talent_descr.wriothesley_terror_for_the_evildoers',
                    stats: {
                        dmg_charged_wriothesley: 150,
                        text_percent_dmg: 200,
                    },
                    subConditions: [
                        new ConditionAscensionChar({ascension: 1}),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new ConditionStaticLevel({
                    title: 'talent_name.wriothesley_shackles_for_the_arrogant',
                    description: 'talent_descr.wriothesley_shackles_for_the_arrogant',
                    levelSetting: 'wriothesley_reckoning_for_sin',
                    fromZero: true,
                    stats: [
                        new StatTable('text_percent', [40]),
                        new StatTable('dmg_burst_wriothesley', [0, 40, 80, 120, 160, 200]),
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
                    title: 'talent_name.wriothesley_redemption_for_the_suffering',
                    description: 'talent_descr.wriothesley_redemption_for_the_suffering_1',
                    settings: {
                        wriothesley_heal_level: 2,
                    },
                    subConditions: [
                        new ConditionAscensionChar({ascension: 1}),
                    ],
                }),
                new ConditionBoolean({
                    name: 'wriothesley_redemption_for_the_suffering',
                    serializeId: 3,
                    title: 'talent_name.wriothesley_redemption_for_the_suffering_2',
                    description: 'talent_descr.wriothesley_redemption_for_the_suffering_2',
                    stats: {
                        atk_speed_normal: 20,
                    },
                }),
                new ConditionBoolean({
                    name: 'wriothesley_redemption_for_the_suffering_2',
                    serializeId: 4,
                    title: 'talent_name.wriothesley_redemption_for_the_suffering_3',
                    description: 'talent_descr.wriothesley_redemption_for_the_suffering_3',
                    stats: {
                        atk_speed_normal: 10,
                    },
                    subConditions: [
                        new ConditionNot([
                            new ConditionBoolean({name: 'wriothesley_redemption_for_the_suffering'}),
                        ]),
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
                new ConditionStatic({
                    title: 'talent_name.wriothesley_esteem_for_the_innocent',
                    description: 'talent_descr.wriothesley_esteem_for_the_innocent',
                    stats: {
                        crit_rate_charged_wriothesley: 10,
                        crit_dmg_charged_wriothesley: 80,
                    },
                    subConditions: [
                        new ConditionAscensionChar({ascension: 1}),
                    ],
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.wriothesley_redemption_for_the_suffering_2',
                serializeId: 1,
                title: 'talent_name.wriothesley_redemption_for_the_suffering_3',
                description: 'talent_descr.wriothesley_redemption_for_the_suffering_4',
                info: {constellation: 4},
                stats: {
                    atk_speed_normal: 10,
                },
            }),
        ],
    },
});
