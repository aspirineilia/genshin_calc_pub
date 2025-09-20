import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
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
        gameId: charTalentTables.Venti.s1_id,
        title: 'talent_name.venti_divine_marksmanship',
        description: 'talent_descr.venti_divine_marksmanship',
        items: [
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_1', charTalentTables.Venti.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Venti.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Venti.s1.p3),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Venti.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Venti.s1.p5),
            },
            {
                table: new StatTable('normal_hit_6', charTalentTables.Venti.s1.p6),
            },
            {
                table: new StatTable('aimed', charTalentTables.Venti.s1.p7),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Venti.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Venti.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Venti.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Venti.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Venti.s2_id,
        title: 'talent_name.venti_skyward_sonnet',
        description: 'talent_descr.venti_skyward_sonnet',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Venti.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Venti.s2.p2),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Venti.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Venti.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Venti.s3_id,
        title: 'talent_name.venti_winds_grand_ode',
        description: 'talent_descr.venti_winds_grand_ode',
        items: [
            {
                table: new StatTable('dot_dmg', charTalentTables.Venti.s3.p1),
            },
            {
                table: new StatTable('anemoskill_dmg', charTalentTables.Venti.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Venti.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Venti.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Venti.s3.p5),
            },
        ],
    },
});

export const Venti = new DbObjectChar({
    name: 'venti',
    serializeId: 26,
    gameId: 10000022,
    iconClass: "char-icon-venti",
    rarity: 5,
    element: 'anemo',
    weapon: 'bow',
    talents: Talents,
    origin: 'mondstadt',
    statTable: charTables.Venti,
    features: [
        new FeatureDamageMultihit({
            name: 'normal_hit_1',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_1'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1_1',
            hits: 2,
            isChild: true,
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
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            hits: 2,
            isChild: true,
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
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_6'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'second_aimed',
            multipliers: [
                new FeatureMultiplier({
                    scalingMultiplier: 0.33,
                    scalingSource: 'constellation1',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamageChargedAimed({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'second_charged_aimed',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    scalingMultiplier: 0.33,
                    scalingSource: 'constellation1',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
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
            name: 'skill_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dot_dmg'),
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
            title: 'talent_name.venti_embrace_of_winds',
            description: 'talent_descr.venti_embrace_of_winds',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.venti_stormeye',
            description: 'talent_descr.venti_stormeye',
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
                    title: 'talent_name.venti_splitting_gales',
                    description: 'talent_descr.venti_splitting_gales',
                    stats: {
                        text_percent_dmg: 33,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'venti_breeze',
                    serializeId: 1,
                    title: 'talent_name.venti_breeze_of_reminiscence',
                    description: 'talent_descr.venti_breeze_of_reminiscence_1',
                    stats: {
                        enemy_res_anemo: -12,
                        enemy_res_phys: -12,
                    },
                }),
                new ConditionBoolean({
                    name: 'venti_breeze_2',
                    serializeId: 2,
                    title: 'talent_name.venti_breeze_of_reminiscence',
                    description: 'talent_descr.venti_breeze_of_reminiscence_2',
                    stats: {
                        enemy_res_anemo: -12,
                        enemy_res_phys: -12,
                    },
                }),
            ]
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
                    name: 'venti_hurricane',
                    serializeId: 3,
                    title: 'talent_name.venti_hurricane_of_freedom',
                    description: 'talent_descr.venti_hurricane_of_freedom',
                    stats: {
                        dmg_anemo: 25,
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
                    name: 'venti_storm',
                    serializeId: 4,
                    title: 'talent_name.venti_storm_of_defiance',
                    description: 'talent_descr.venti_storm_of_defiance_1',
                    stats: {
                        enemy_res_anemo: -20,
                    },
                }),
                new ConditionDropdownElement({
                    name: 'venti_storm_element',
                    serializeId: 5,
                    title: 'talent_name.venti_storm_of_defiance',
                    description: 'talent_descr.venti_storm_of_defiance_2',
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
                        new ConditionBoolean({name: 'venti_storm'}),
                    ]
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.venti_breeze',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.venti_breeze_of_reminiscence',
                description: 'talent_descr.venti_breeze_of_reminiscence_1',
                stats: {
                    enemy_res_anemo: -12,
                    enemy_res_phys: -12,
                },
                info: {constellation: 2},
            }),
            new ConditionBoolean({
                name: 'party.venti_breeze_2',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.venti_breeze_of_reminiscence',
                description: 'talent_descr.venti_breeze_of_reminiscence_2',
                stats: {
                    enemy_res_anemo: -12,
                    enemy_res_phys: -12,
                },
                info: {constellation: 2},
                subConditions: [
                    new ConditionBoolean({name: 'party.venti_breeze'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.venti_storm',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.venti_storm_of_defiance',
                description: 'talent_descr.venti_storm_of_defiance_1',
                info: {constellation: 6},
                stats: {
                    enemy_res_anemo: -20,
                },
            }),
            new ConditionDropdownElement({
                name: 'party.venti_storm_element',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.venti_storm_of_defiance',
                description: 'talent_descr.venti_storm_of_defiance_2',
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
                    new ConditionBoolean({
                        name: 'party.venti_storm',
                    }),
                ],
                info: {
                    constellation: 6,
                },
            }),
        ],
    },
});
