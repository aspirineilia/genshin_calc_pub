import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsRecharge } from "../../classes/PostEffect/Stats/Recharge";
import { PostEffectStatsStatic } from "../../classes/PostEffect/Stats/Static";
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.TravelerElectro.s1_id,
        title: 'talent_name.traveler_foreign_thundershock',
        description: 'talent_descr.traveler_foreign_thundershock',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.TravelerElectro.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.TravelerElectro.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.TravelerElectro.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.TravelerElectro.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.TravelerElectro.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.TravelerElectro.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.TravelerElectro.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.TravelerElectro.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.TravelerElectro.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.TravelerElectro.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.TravelerElectro.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.TravelerElectro.s2_id,
        title: 'talent_name.traveler_lightning_blade',
        description: 'talent_descr.traveler_lightning_blade',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.TravelerElectro.s2.p1),
            },
            {
                unit: 'per_amulet',
                table: new StatTable('traveler_amulet_recharge', charTalentTables.TravelerElectro.s2.p2),
            },
            {
                table: new StatTable('traveler_amulet_increase', charTalentTables.TravelerElectro.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.TravelerElectro.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('traveler_amulet_duration', charTalentTables.TravelerElectro.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerElectro.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.TravelerElectro.s3_id,
        title: 'talent_name.traveler_bellowing_thunder',
        description: 'talent_descr.traveler_bellowing_thunder',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.TravelerElectro.s3.p1),
            },
            {
                table: new StatTable('traveler_falling_thunder_dmg', charTalentTables.TravelerElectro.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('traveler_energy_gain', charTalentTables.TravelerElectro.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.TravelerElectro.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerElectro.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.TravelerElectro.s3.p6),
            },
        ],
    },
});

const rechargePreA4Post = new PostEffectStatsStatic({
    percent: new StatTable('recharge', [20]),
    conditions: [
        new ConditionBoolean({name: 'traveler_abundance_amulet'}),
        new ConditionNot([
            new ConditionAscensionChar({ascension: 4}),
        ]),
    ],
});

const rechargePostA4Post = new PostEffectStatsRecharge({
    percent: new StatTable('recharge', [10]),
    flatBonus: new ValueTable([0.2]),
    conditions: [
        new ConditionBoolean({name: 'traveler_abundance_amulet'}),
        new ConditionAscensionChar({ascension: 4}),
    ],
});

export const TravelerElectro = new DbObjectChar({
    name: 'traveler_electro',
    serializeId: 39,
    gameId: [10000005, 10000007],
    depotIds: [507, 707],
    iconClass: "char-icon-traveler-girl",
    rarity: 5,
    element: 'electro',
    weapon: 'sword',
    origin: 'foreign',
    talents: Talents,
    statTable: [
        ...charTables.Traveler,
        new StatTableAscensionScale({
			stat: 'burst_energy_cost',
			base: Talents.get('burst.energy_cost').getValue(1),
		}),
    ],
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
        new FeatureDamageNormal({
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
        new FeatureDamageNormal({
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
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
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
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_falling_thunder_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'traveler_falling_thunder_bonus_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    scalingMultiplier: 2,
                    scalingSource: 'constellation6',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_falling_thunder_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'traveler_electro_recharge_bonus',
            postEffect: rechargePreA4Post,
            format: 'percent',
            condition: new ConditionNot([
                new ConditionAscensionChar({ascension: 4}),
            ]),
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'traveler_electro_recharge_bonus',
            postEffect: rechargePostA4Post,
            format: 'percent',
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'traveler_abundance_amulet',
            serializeId: 3,
            title: 'talent_name.traveler_abundance_amulet',
            description: 'talent_descr.traveler_abundance_amulet',
        }),
        new ConditionStatic({
            title: 'talent_name.traveler_thunderflash',
            description: 'talent_descr.traveler_thunderflash',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.traveler_resounding_roar',
            description: 'talent_descr.traveler_resounding_roar',
            stats: {
                text_percent: 10,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionBoolean({
            name: 'traveler_swordfighting_techniques',
            serializeId: 2,
            title: 'talent_name.traveler_swordfighting_techniques',
            description: 'talent_descr.traveler_swordfighting_techniques',
            stats: {
                atk_base: 3,
            },
        }),
        new ConditionBoolean({
            name: 'traveler_special_training',
            serializeId: 4,
            title: 'talent_name.traveler_special_training',
            description: 'talent_descr.traveler_special_training',
            stats: {
                atk_base: 7,
                mastery: 15,
                hp_base: 50,
            },
        }),
    ],
    postEffects: [
        rechargePreA4Post,
        rechargePostA4Post,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.traveler_spring_thunder_of_fertility',
                    description: 'talent_descr.traveler_spring_thunder_of_fertility',
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'traveler_violet_vehemence',
                    serializeId: 1,
                    title: 'talent_name.traveler_violet_vehemence',
                    description: 'talent_descr.traveler_violet_vehemence',
                    stats: {
                        enemy_res_electro: -15,
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
                    title: 'talent_name.traveler_fickle_cloudstrike',
                    description: 'talent_descr.traveler_fickle_cloudstrike',
                    stats: {
                        text_percent1: 35,
                        text_percent2: 100,
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
                    title: 'talent_name.traveler_world_shaker',
                    description: 'talent_descr.traveler_world_shaker',
                    stats: {
                        text_percent_dmg: 100,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['recharge_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'traveler_recharge',
                title: 'stat.recharge',
                partyStat: 'recharge_total',
                serializeId: 1,
                format: 'decimal',
                max: 1000,
            }),
            new ConditionBoolean({
                name: 'party.traveler_abundance_amulet',
                serializeId: 4,
                title: 'talent_name.traveler_abundance_amulet',
                description: 'talent_descr.traveler_abundance_amulet',
            }),
            new ConditionBoolean({
                name: 'party.traveler_resounding_roar',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.traveler_resounding_roar',
                description: 'talent_descr.traveler_resounding_roar',
                info: {ascension: 4},
                stats: {
                    text_percent: 10,
                },
            }),
            new ConditionBoolean({
                name: 'party.traveler_violet_vehemence',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.traveler_violet_vehemence',
                description: 'talent_descr.traveler_violet_vehemence',
                info: {constellation: 2},
                stats: {
                    enemy_res_electro: -15,
                },
            }),
        ],
        postEffects: [
            new PostEffectStatsStatic({
                percent: new StatTable('recharge', [20]),
                conditions: [
                    new ConditionBoolean({name: 'party.traveler_abundance_amulet'}),
                ],
            }),
            new PostEffectStats({
                from: 'traveler_recharge',
                percent: new StatTable('recharge', [0.1]),
                conditions: [
                    new ConditionBoolean({name: 'party.traveler_abundance_amulet'}),
                    new ConditionBoolean({name: 'party.traveler_resounding_roar',}),
                ],
            }),
        ],
    },
});
