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
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Tighnari.s1_id,
        title: 'talent_name.tighnari_khanda_barrier_buster',
        description: 'talent_descr.tighnari_khanda_barrier_buster',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Tighnari.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Tighnari.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Tighnari.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Tighnari.s1.p4),
            },
            {
                table: new StatTable('aimed', charTalentTables.Tighnari.s1.p5),
            },
            {
                table: new StatTable('tighnari_charged_dmg', charTalentTables.Tighnari.s1.p6),
            },
            {
                table: new StatTable('tighnari_wreath_arrow_dmg', charTalentTables.Tighnari.s1.p7),
            },
            {
                table: new StatTable('tighnari_clusterbloom_arrow_dmg', charTalentTables.Tighnari.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Tighnari.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Tighnari.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Tighnari.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Tighnari.s2_id,
        title: 'talent_name.tighnari_vijnana_phala_mine',
        description: 'talent_descr.tighnari_vijnana_phala_mine',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Tighnari.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('tighnari_field_duration', charTalentTables.Tighnari.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('tighnari_penetrator_duration', charTalentTables.Tighnari.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Tighnari.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Tighnari.s3_id,
        title: 'talent_name.tighnari_fashioners_tanglevine_shaft',
        description: 'talent_descr.tighnari_fashioners_tanglevine_shaft',
        items: [
            {
                table: new StatTable('tighnari_primary_dmg', charTalentTables.Tighnari.s3.p1),
            },
            {
                table: new StatTable('tighnari_secondary_dmg', charTalentTables.Tighnari.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Tighnari.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Tighnari.s3.p4),
            },
        ],
    },
});

const chargedBuffPost = new PostEffectStatsMastery({
    global: true,
    percent: [
        new StatTable('dmg_charged_tighnari', [0.06]),
        new StatTable('dmg_burst_tighnari', [0.06]),
    ],
    statCap: new StatTable('', [60]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
    ],
});

export const Tighnari = new DbObjectChar({
    name: 'tighnari',
    serializeId: 54,
    gameId: 10000069,
    iconClass: "char-icon-tighnari",
    rarity: 5,
    element: 'dendro',
    weapon: 'bow',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Tighnari,
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
            name: 'normal_hit_3',
            category: 'attack',
            damageType: 'normal',
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
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            damageBonuses: ['dmg_charged_tighnari'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            element: 'dendro',
            damageBonuses: ['dmg_charged_tighnari'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.tighnari_charged_dmg'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            element: 'dendro',
            damageBonuses: ['dmg_charged_tighnari'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.tighnari_wreath_arrow_dmg'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'dendro',
            damageBonuses: ['dmg_charged_tighnari'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.tighnari_clusterbloom_arrow_dmg'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'tighnari_clusterbloom_arrow_c6_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_charged_tighnari'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: new ValueTable([150]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
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
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'dendro',
            damageBonuses: ['dmg_burst_tighnari'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.tighnari_primary_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'dendro',
            damageBonuses: ['dmg_burst_tighnari'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.tighnari_secondary_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'tighnari_charged_bonus',
            postEffect: chargedBuffPost,
            format: 'percent',
            digits: 1,
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'tighnari_keen_sight',
            serializeId: 1,
            title: 'talent_name.tighnari_keen_sight',
            description: 'talent_descr.tighnari_keen_sight',
            stats: {
                mastery: 50,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.tighnari_scholarly_blade',
            description: 'talent_descr.tighnari_scholarly_blade',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        chargedBuffPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.tighnari_beginnings_determined_at_the_roots',
                    description: 'talent_descr.tighnari_beginnings_determined_at_the_roots',
                    stats: {
                        crit_rate_charged: 15,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'tighnari_origins_known_from_the_stem',
                    serializeId: 2,
                    title: 'talent_name.tighnari_origins_known_from_the_stem',
                    description: 'talent_descr.tighnari_origins_known_from_the_stem',
                    stats: {
                        dmg_dendro: 20,
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
                new ConditionBoolean({
                    name: 'tighnari_withering_glimpsed_in_the_leaves_1',
                    serializeId: 3,
                    title: 'talent_name.tighnari_withering_glimpsed_in_the_leaves',
                    description: 'talent_descr.tighnari_withering_glimpsed_in_the_leaves_1',
                    stats: {
                        mastery: 60,
                    },
                }),
                new ConditionBoolean({
                    name: 'tighnari_withering_glimpsed_in_the_leaves_2',
                    serializeId: 4,
                    title: 'talent_name.tighnari_withering_glimpsed_in_the_leaves',
                    description: 'talent_descr.tighnari_withering_glimpsed_in_the_leaves_2',
                    stats: {
                        mastery: 60,
                    },
                    subConditions: [
                        new ConditionBoolean({
                            name: 'tighnari_withering_glimpsed_in_the_leaves_1',
                        }),
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
                new ConditionStatic({
                    title: 'talent_name.tighnari_karma_adjudged_from_the_leaden_fruit',
                    description: 'talent_descr.tighnari_karma_adjudged_from_the_leaden_fruit',
                    stats: {
                        text_percent_dmg: 150,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.tighnari_withering_glimpsed_in_the_leaves_1',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.tighnari_withering_glimpsed_in_the_leaves',
                description: 'talent_descr.tighnari_withering_glimpsed_in_the_leaves_1',
                info: {constellation: 4},
                stats: {
                    mastery: 60,
                },
            }),
            new ConditionBoolean({
                name: 'party.tighnari_withering_glimpsed_in_the_leaves_2',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.tighnari_withering_glimpsed_in_the_leaves',
                description: 'talent_descr.tighnari_withering_glimpsed_in_the_leaves_2',
                stats: {
                    mastery: 60,
                },
                info: {constellation: 4},
                subConditions: [
                    new ConditionBoolean({name: 'party.tighnari_withering_glimpsed_in_the_leaves_1'}),
                ],
            }),
        ],
    },
});
