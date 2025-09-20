import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
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
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.TravelerDendro.s1_id,
        title: 'talent_name.traveler_foreign_fieldcleaver',
        description: 'talent_descr.traveler_foreign_fieldcleaver',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.TravelerDendro.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.TravelerDendro.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.TravelerDendro.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.TravelerDendro.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.TravelerDendro.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.TravelerDendro.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.TravelerDendro.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.TravelerDendro.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.TravelerDendro.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.TravelerDendro.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.TravelerDendro.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.TravelerDendro.s2_id,
        title: 'talent_name.traveler_razorgrass_blade',
        description: 'talent_descr.traveler_razorgrass_blade',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.TravelerDendro.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerDendro.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.TravelerDendro.s3_id,
        title: 'talent_name.traveler_surgent_manifestation',
        description: 'talent_descr.traveler_surgent_manifestation',
        items: [
            {
                table: new StatTable('traveler_lea_lotus_lamp_attack_dmg', charTalentTables.TravelerDendro.s3.p1),
            },
            {
                table: new StatTable('traveler_explosion_dmg', charTalentTables.TravelerDendro.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('traveler_duration', charTalentTables.TravelerDendro.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerDendro.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.TravelerDendro.s3.p7),
            },
        ],
    },
});

const skillDmgPost = new PostEffectStatsMastery({
    percent: new StatTable('dmg_skill_traveler_dendro', [0.15]),
    global: true,
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
    ],
});

const burstDmgPost = new PostEffectStatsMastery({
    percent: new StatTable('dmg_burst_traveler_dendro', [0.1]),
    global: true,
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
    ],
});

export const TravelerDendro = new DbObjectChar({
    name: 'traveler_dendro',
    serializeId: 57,
    gameId: [10000005, 10000007],
    depotIds: [508, 708],
    iconClass: "char-icon-traveler-boy",
    rarity: 5,
    element: 'dendro',
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
            element: 'dendro',
            damageBonuses: ['dmg_skill_traveler_dendro'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'dendro',
            damageBonuses: ['dmg_burst_traveler_dendro'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_lea_lotus_lamp_attack_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'dendro',
            damageBonuses: ['dmg_burst_traveler_dendro'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_explosion_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'traveler_dendro_skill_bonus',
            postEffect: skillDmgPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'traveler_dendro_burst_bonus',
            postEffect: burstDmgPost,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'traveler_verdant_overgrowth',
            serializeId: 1,
            title: 'talent_name.traveler_verdant_overgrowth',
            description: 'talent_descr.traveler_verdant_overgrowth',
            dropdownClass: 'two-digits',
            maxStacks: 10,
            info: {ascension: 1},
            stats: [
                new StatTable('mastery', [6]),
            ],
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.traveler_verdant_luxury',
            description: 'talent_descr.traveler_verdant_luxury',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionBoolean({
            name: 'traveler_swordfighting_techniques',
            serializeId: 4,
            title: 'talent_name.traveler_swordfighting_techniques',
            description: 'talent_descr.traveler_swordfighting_techniques',
            stats: {
                atk_base: 3,
            },
        }),
        new ConditionBoolean({
            name: 'traveler_special_training',
            serializeId: 5,
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
        skillDmgPost,
        burstDmgPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.traveler_symbiotic_creeper',
                    description: 'talent_descr.traveler_symbiotic_creeper',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.traveler_green_resilience',
                    description: 'talent_descr.traveler_green_resilience',
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
                    title: 'talent_name.traveler_treacle_grass',
                    description: 'talent_descr.traveler_treacle_grass',
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
                    name: 'traveler_withering_aggregation_1',
                    serializeId: 2,
                    title: 'talent_name.traveler_withering_aggregation',
                    description: 'talent_descr.traveler_withering_aggregation_1',
                    stats: {
                        dmg_dendro: 12,
                    },
                }),
                new ConditionDropdownElement({
                    name: 'party.traveler_withering_aggregation_2',
                    serializeId: 3,
                    title: 'talent_name.traveler_withering_aggregation',
                    description: 'talent_descr.traveler_withering_aggregation_2',
                    values: [
                        {
                            value: 'pyro',
                            serializeId: 1,
                            conditions: [
                                new Condition({
                                    stats: {
                                        dmg_pyro: 12,
                                    },
                                }),
                            ],
                        },
                        {
                            value: 'electro',
                            serializeId: 2,
                            conditions: [
                                new Condition({
                                    stats: {
                                        dmg_electro: 12,
                                    },
                                }),
                            ],
                        },
                        {
                            value: 'hydro',
                            serializeId: 3,
                            conditions: [
                                new Condition({
                                    stats: {
                                        dmg_hydro: 12,
                                    },
                                }),
                            ],
                        },
                    ],
                    subConditions: [
                        new ConditionBoolean({
                            name: 'traveler_withering_aggregation_1',
                        }),
                    ],
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionStacks({
                name: 'party.traveler_verdant_overgrowth',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.traveler_verdant_overgrowth',
                description: 'talent_descr.traveler_verdant_overgrowth',
                dropdownClass: 'two-digits',
                maxStacks: 10,
                info: {
                    ascension: 4,
                },
                stats: [
                    new StatTable('mastery', [6]),
                ],
                subConditions: [
                    new ConditionAscensionChar({ascension: 1}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.traveler_withering_aggregation_1',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.traveler_withering_aggregation',
                description: 'talent_descr.traveler_withering_aggregation_1',
                stats: {
                    dmg_dendro: 12,
                },
                info: {
                    constellation: 6,
                },
            }),
            new ConditionDropdownElement({
                name: 'party.party.traveler_withering_aggregation_2',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.traveler_withering_aggregation',
                description: 'talent_descr.traveler_withering_aggregation_2',
                info: {
                    constellation: 6,
                },
                values: [
                    {
                        value: 'pyro',
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                stats: {
                                    dmg_pyro: 12,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                stats: {
                                    dmg_electro: 12,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({
                                stats: {
                                    dmg_hydro: 12,
                                },
                            }),
                        ],
                    },
                ],
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.traveler_withering_aggregation_1',
                    }),
                ],
            }),
        ],
    },
});
