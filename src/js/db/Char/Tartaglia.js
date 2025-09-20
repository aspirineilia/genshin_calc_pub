import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionStatic } from "../../classes/Condition/Static";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Tartaglia.s1_id,
        title: 'talent_name.tartaglia_cutting_torrent',
        description: 'talent_descr.tartaglia_cutting_torrent',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Tartaglia.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Tartaglia.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Tartaglia.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Tartaglia.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Tartaglia.s1.p5),
            },
            {
                table: new StatTable('normal_hit_6', charTalentTables.Tartaglia.s1.p6),
            },
            {
                table: new StatTable('aimed', charTalentTables.Tartaglia.s1.p7),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Tartaglia.s1.p8),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('tartaglia_tide_flash', charTalentTables.Tartaglia.s1.p9),
            },
            {
                table: new StatTable('tartaglia_tide_burst', charTalentTables.Tartaglia.s1.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('tartaglia_tide_duration', charTalentTables.Tartaglia.s1.p14),
            },
            {
                table: new StatTable('plunge', charTalentTables.Tartaglia.s1.p11),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Tartaglia.s1.p12),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Tartaglia.s1.p13),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Tartaglia.s2_id,
        title: 'talent_name.tartaglia_raging_tide',
        description: 'talent_descr.tartaglia_raging_tide',
        items: [
            {
                table: new StatTable('activation_dmg', charTalentTables.Tartaglia.s2.p1),
            },
            {
                table: new StatTable('normal_hit_1', charTalentTables.Tartaglia.s2.p2),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Tartaglia.s2.p3),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Tartaglia.s2.p4),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Tartaglia.s2.p5),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Tartaglia.s2.p6),
            },
            {
                type: 'hits',
                name: 'normal_hit_6',
                table: [
                    new StatTable('normal_hit_6_1', charTalentTables.Tartaglia.s2.p7),
                    new StatTable('normal_hit_6_2', charTalentTables.Tartaglia.s2.p8),
                ],
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Tartaglia.s2.p9),
                    new StatTable('charged_hit_2', charTalentTables.Tartaglia.s2.p10),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Tartaglia.s2.p12),
            },
            {
                table: new StatTable('tartaglia_slash_dmg', charTalentTables.Tartaglia.s2.p11),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Tartaglia.s2.p13),
            },
            {
                unit: 'sec',
                type: 'separated',
                separator: ' - ',
                unitLast: true,
                table: [
                    new StatTable('tartaglia_cd', charTalentTables.Tartaglia.s2.p14),
                    new StatTable('tartaglia_cd', charTalentTables.Tartaglia.s2.p15),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('max_cd', charTalentTables.Tartaglia.s2.p16),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Tartaglia.s3_id,
        title: 'talent_name.tartaglia_obliteration',
        description: 'talent_descr.tartaglia_obliteration',
        items: [
            {
                table: new StatTable('tartaglia_burst_dmg_melee', charTalentTables.Tartaglia.s3.p1),
            },
            {
                table: new StatTable('tartaglia_burst_dmg_ranged', charTalentTables.Tartaglia.s3.p3),
            },
            {
                table: new StatTable('tartaglia_riptide_blast_dmg', charTalentTables.Tartaglia.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('tartaglia_energy_return', charTalentTables.Tartaglia.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Tartaglia.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Tartaglia.s3.p6),
            },
        ],
    },
});

export const Tartaglia = new DbObjectChar({
    name: 'tartaglia',
    serializeId: 23,
    gameId: 10000033,
    iconClass: "char-icon-tartaglia",
    rarity: 5,
    element: 'hydro',
    weapon: 'bow',
    origin: 'snezhnaya',
    talents: Talents,
    statTable: charTables.Tartaglia,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_6'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_5'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_6',
            category: 'attack',
            damageType: 'attack',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.normal_hit_6_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.normal_hit_6_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageCharged({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_6_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageCharged({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.normal_hit_6_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageChargedAimed({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
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
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charged_hit_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charged_hit_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charged_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charged_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageNormal({
            hits: 3,
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.tartaglia_tide_flash'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.tartaglia_tide_burst'),
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
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageSkill({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.activation_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.tartaglia_slash_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.tartaglia_burst_dmg_ranged'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'tartaglia_raging_tide'}),
            ]),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.tartaglia_burst_dmg_melee'),
                }),
            ],
            condition: new ConditionBoolean({name: 'tartaglia_raging_tide'}),
        }),
        new FeatureDamageBurst({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.tartaglia_riptide_blast_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                char_skill_attack_bonus: 1,
            },
        }),
        new ConditionBoolean({
            name: 'tartaglia_raging_tide',
            serializeId: 1,
            title: 'talent_name.tartaglia_raging_tide',
            description: 'talent_descr.tartaglia_raging_tide_talent',
            stats: {
                charged_stamina_cost: 20,
            },
            settings: {
                attack_infusion: 'hydro',
            },
        }),
        new ConditionStatic({
            title: 'talent_name.tartaglia_never_ending',
            description: 'talent_descr.tartaglia_never_ending',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.tartaglia_sword_of_torrents',
            description: 'talent_descr.tartaglia_sword_of_torrents',
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
                    title: 'talent_name.tartaglia_tide_withholder',
                    description: 'talent_descr.tartaglia_tide_withholder',
                    stats: {
                        text_percent_cd: 20,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.tartaglia_understream',
                    description: 'talent_descr.tartaglia_understream',
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
                    title: 'talent_name.tartaglia_hydrospout',
                    description: 'talent_descr.tartaglia_hydrospout',
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
                    title: 'talent_name.tartaglia_annihilation',
                    description: 'talent_descr.tartaglia_annihilation',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionStatic({
                title: 'talent_name.tartaglia_master_of_weaponry',
                description: 'talent_descr.tartaglia_master_of_weaponry',
                settings: {
                    char_skill_attack_bonus_2: 1,
                },
            }),
        ],
    },
});
