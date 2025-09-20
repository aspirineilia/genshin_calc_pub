import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
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
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.TravelerAnemo.s1_id,
        title: 'talent_name.traveler_foreign_ironwind',
        description: 'talent_descr.traveler_foreign_ironwind',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.TravelerAnemo.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.TravelerAnemo.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.TravelerAnemo.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.TravelerAnemo.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.TravelerAnemo.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.TravelerAnemo.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.TravelerAnemo.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.TravelerAnemo.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.TravelerAnemo.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.TravelerAnemo.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.TravelerAnemo.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.TravelerAnemo.s2_id,
        title: 'talent_name.traveler_palm_vortex',
        description: 'talent_descr.traveler_palm_vortex',
        items: [
            {
                table: new StatTable('traveler_initial_cutting_dmg', charTalentTables.TravelerAnemo.s2.p1),
            },
            {
                table: new StatTable('traveler_max_cutting_dmg', charTalentTables.TravelerAnemo.s2.p2),
            },
            {
                table: new StatTable('traveler_initial_storm_dmg', charTalentTables.TravelerAnemo.s2.p3),
            },
            {
                table: new StatTable('traveler_max_storm_dmg', charTalentTables.TravelerAnemo.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('base_cd', charTalentTables.TravelerAnemo.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('max_cd', charTalentTables.TravelerAnemo.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.TravelerAnemo.s3_id,
        title: 'talent_name.traveler_gust_surge',
        description: 'talent_descr.traveler_gust_surge',
        items: [
            {
                table: new StatTable('traveler_tornado_dmg', charTalentTables.TravelerAnemo.s3.p1),
            },
            {
                table: new StatTable('anemoskill_dmg', charTalentTables.TravelerAnemo.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.TravelerAnemo.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerAnemo.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.TravelerAnemo.s3.p5),
            },
        ],
    },
});

const SkillNames = ['traveler_initial_cutting_dmg', 'traveler_max_cutting_dmg', 'traveler_initial_storm_dmg', 'traveler_max_storm_dmg'];

export const TravelerAnemo = new DbObjectChar({
    name: 'traveler_anemo',
    serializeId: 24,
    gameId: [10000005, 10000007],
    depotIds: [504, 704],
    iconClass: "char-icon-traveler-boy",
    rarity: 5,
    element: 'anemo',
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
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new StatTable('traveler_slitting_wind', [60]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
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
        ...SkillNames.map((name) => {
            return new FeatureDamageSkill({
                element: 'anemo',
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.'+ name),
                    }),
                ],
            });
        }),
        ...SkillNames.map((name) => {
            return new FeatureDamageSkill({
                name: name.replace('_dmg', '_pyro_dmg'),
                element: 'pyro',
                multipliers: [
                    new FeatureMultiplier({
                        scalingMultiplier: 0.25,
                        scalingSource: 'talent_elemental',
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.'+ name),
                    }),
                ],
            });
        }),
        ...SkillNames.map((name) => {
            return new FeatureDamageSkill({
                name: name.replace('_dmg', '_hydro_dmg'),
                element: 'hydro',
                multipliers: [
                    new FeatureMultiplier({
                        scalingMultiplier: 0.25,
                        scalingSource: 'talent_elemental',
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.'+ name),
                    }),
                ],
            });
        }),
        ...SkillNames.map((name) => {
            return new FeatureDamageSkill({
                name: name.replace('_dmg', '_cryo_dmg'),
                element: 'cryo',
                multipliers: [
                    new FeatureMultiplier({
                        scalingMultiplier: 0.25,
                        scalingSource: 'talent_elemental',
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.'+ name),
                    }),
                ],
            });
        }),
        ...SkillNames.map((name) => {
            return new FeatureDamageSkill({
                name: name.replace('_dmg', '_electro_dmg'),
                element: 'electro',
                multipliers: [
                    new FeatureMultiplier({
                        scalingMultiplier: 0.25,
                        scalingSource: 'talent_elemental',
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.'+ name),
                    }),
                ],
            });
        }),
        new FeatureHeal({
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new StatTable('heal_dot', [2]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.traveler_tornado_dmg'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'cryo', 'electro'].map((elem) => {
            return new FeatureDamageBurst({
                name: 'anemoskill_'+ elem +'_dmg',
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_burst',
                        values: Talents.get('burst.anemoskill_dmg'),
                    }),
                ],
            });
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.traveler_slitting_wind',
            description: 'talent_descr.traveler_slitting_wind',
            stats: {
                text_percent_dmg: 60,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.traveler_second_wind',
            description: 'talent_descr.traveler_second_wind',
            stats: {
                text_percent_hp: 2,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionBoolean({
            name: 'traveler_swordfighting_techniques',
            serializeId: 3,
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
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.traveler_raging_vortex',
                    description: 'talent_descr.traveler_raging_vortex',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.traveler_uprising_whirlwind',
                    description: 'talent_descr.traveler_uprising_whirlwind',
                    stats: {
                        recharge: 16,
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
                    title: 'talent_name.traveler_cherishing_breezes',
                    description: 'talent_descr.traveler_cherishing_breezes',
                    stats: {
                        text_percent_reduce: 10,
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
                new ConditionBoolean({
                    name: 'traveler_intertwined_winds',
                    serializeId: 1,
                    title: 'talent_name.traveler_intertwined_winds',
                    description: 'talent_descr.traveler_intertwined_winds',
                    stats: {
                        enemy_res_anemo: -20,
                    },
                }),
                new ConditionDropdownElement({
                    name: 'traveler_intertwined_winds_element',
                    serializeId: 2,
                    title: 'talent_name.traveler_intertwined_winds',
                    description: 'talent_descr.traveler_intertwined_winds_element',
                    values: [
                        {
                            value: 'cryo',
                            serializeId: 1,
                            conditions: [
                                new Condition({stats: {enemy_res_cryo: -20}}),
                            ],
                        },
                        {
                            value: 'electro',
                            serializeId: 2,
                            conditions: [
                                new Condition({stats: {enemy_res_electro: -20}}),
                            ],
                        },
                        {
                            value: 'hydro',
                            serializeId: 3,
                            conditions: [
                                new Condition({stats: {enemy_res_hydro: -20}}),
                            ],
                        },
                        {
                            value: 'pyro',
                            serializeId: 4,
                            conditions: [
                                new Condition({stats: {enemy_res_pyro: -20}}),
                            ],
                        },
                    ],
                    subConditions: [
                        new ConditionBoolean({name: 'traveler_intertwined_winds'}),
                    ],
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.traveler_intertwined_winds',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.traveler_intertwined_winds',
                description: 'talent_descr.traveler_intertwined_winds',
                info: {constellation: 6},
                stats: {
                    enemy_res_anemo: -20,
                },
            }),
            new ConditionDropdownElement({
                name: 'party.traveler_intertwined_winds_element',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.traveler_intertwined_winds',
                description: 'talent_descr.traveler_intertwined_winds_element',
                values: [
                    {
                        value: 'cryo',
                        serializeId: 1,
                        conditions: [
                            new Condition({stats: {enemy_res_cryo: -20}}),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({stats: {enemy_res_electro: -20}}),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({stats: {enemy_res_hydro: -20}}),
                        ],
                    },
                    {
                        value: 'pyro',
                        serializeId: 4,
                        conditions: [
                            new Condition({stats: {enemy_res_pyro: -20}}),
                        ],
                    },
                ],
                info: {constellation: 6},
                subConditions: [
                    new ConditionBoolean({name: 'party.traveler_intertwined_winds'}),
                ],
            }),
        ],
    },
});
