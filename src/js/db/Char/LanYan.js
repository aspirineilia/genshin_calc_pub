import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.LanYan.s1_id,
        title: 'talent_name.lan_yan_black_pheasant_strides_on_water',
        description: 'talent_descr.lan_yan_black_pheasant_strides_on_water',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.LanYan.s1.p1),
            },
            {
                type: 'hits',
                name: 'normal_hit_2',
                table: [
                    new StatTable('normal_hit_2_1', charTalentTables.LanYan.s1.p2),
                    new StatTable('normal_hit_2_2', charTalentTables.LanYan.s1.p3),
                ],
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.LanYan.s1.p4),
                    new StatTable('normal_hit_3_2', charTalentTables.LanYan.s1.p5),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.LanYan.s1.p6),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('charged_hit', charTalentTables.LanYan.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.LanYan.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.LanYan.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.LanYan.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.LanYan.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.LanYan.s2_id,
        title: 'talent_name.lan_yan_swallow_wisp_pinion_dance',
        description: 'talent_descr.lan_yan_swallow_wisp_pinion_dance',
        items: [
            {
                table: new StatTable('lanyan_feathermoon_ring_dmg', charTalentTables.LanYan.s2.p1),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('shield_absorption', charTalentTables.LanYan.s2.p2),
                    new StatTable('', charTalentTables.LanYan.s2.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('shield_duration', charTalentTables.LanYan.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.LanYan.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.LanYan.s3_id,
        title: 'talent_name.lan_yan_lustrous_moonrise',
        description: 'talent_descr.lan_yan_lustrous_moonrise',
        items: [
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('burst_dmg', charTalentTables.LanYan.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.LanYan.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.LanYan.s3.p3),
            },
        ],
    },
});

const A1Scale = 50;
const A4SkillScale = 309;
const A4BurstScale = 774;
const C4Mastery = 60;

export const LanYan = new DbObjectChar({
    name: 'lan_yan',
    serializeId: 98,
    gameId: 10000108,
    iconClass: 'char-icon-lan-yan',
    rarity: 4,
    element: 'anemo',
    weapon: 'catalyst',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.LanYan,
    features: [
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_2',
            category: 'attack',
            damageType: 'normal',
            element: 'anemo',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_3',
            category: 'attack',
            damageType: 'normal',
            element: 'anemo',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'charged_hit_total',
            element: 'anemo',
            category: 'attack',
            damageType: 'charged',
            items: [
                {
                    hits: 3,
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
            element: 'anemo',
            isChild: true,
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lanyan_feathermoon_ring_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.shield_absorption'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'electro', 'cryo'].map((elem) => {
            return new FeatureDamageSkill({
                name: 'lanyan_feathermoon_ring_'+ elem +'_dmg',
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_elemental',
                        scalingMultiplier: A1Scale / 100,
                        scalingSource: 'ascension1',
                        values: Talents.get('skill.lanyan_feathermoon_ring_dmg'),
                    }),
                ],
                condition: new ConditionAscensionChar({ascension: 1}),
            });
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            source: 'ascension4',
            values: new ValueTable([A4SkillScale]),
            condition: new ConditionAscensionChar({ascension: 4}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'mastery*',
            source: 'ascension4',
            values: new ValueTable([A4BurstScale]),
            condition: new ConditionAscensionChar({ascension: 4}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['burst'],
            }),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.lan_yan_four_sealing_divination_charms',
            description: 'talent_descr.lan_yan_four_sealing_divination_charms',
            info: {ascension: 1},
            stats:{
                text_percent_dmg: A1Scale,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.lan_yan_skyfeather_evil_subduing_charm',
            description: 'talent_descr.lan_yan_skyfeather_evil_subduing_charm',
            info: {ascension: 4},
            stats: {
                skill_base_mastery_percent: A4SkillScale,
                burst_base_mastery_percent: A4BurstScale,
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
                    title: 'talent_name.lan_yan_as_one_might_stride_betwixt_the_clouds',
                    description: 'talent_descr.lan_yan_as_one_might_stride_betwixt_the_clouds',
                })
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.lan_yan_dance_vestments_billow_like_rainbow_jade',
                    description: 'talent_descr.lan_yan_dance_vestments_billow_like_rainbow_jade',
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
                new ConditionBoolean({
                    name: 'lanyan_with_drakefalcons_blood_pearls_adorned',
                    serializeId: 1,
                    title: 'talent_name.lan_yan_with_drakefalcons_blood_pearls_adorned',
                    description: 'talent_descr.lan_yan_with_drakefalcons_blood_pearls_adorned',
                    stats: {
                        mastery: C4Mastery,
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
                    title: 'talent_name.lan_yan_let_us_away_on_sylphic_wing_the_silvered_ornaments_to_ring',
                    description: 'talent_descr.lan_yan_let_us_away_on_sylphic_wing_the_silvered_ornaments_to_ring',
                }),
            ],
        }
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.lanyan_with_drakefalcons_blood_pearls_adorned',
                serializeId: 1,
                title: 'talent_name.lan_yan_with_drakefalcons_blood_pearls_adorned',
                description: 'talent_descr.lan_yan_with_drakefalcons_blood_pearls_adorned',
                rotation: 'party',
                stats: {
                    mastery: C4Mastery,
                },
                info: {constellation: 4},
            }),
        ],
    },
});
