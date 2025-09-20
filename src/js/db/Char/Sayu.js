import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierSayuBurst } from "../../classes/Feature2/Multiplier/SayuBurst";
import { Stats } from "../../classes/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Sayu.s1_id,
        title: 'talent_name.sayu_shuumatsuban_ninja_blade',
        description: 'talent_descr.sayu_shuumatsuban_ninja_blade',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Sayu.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Sayu.s1.p2),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Sayu.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Sayu.s1.p5),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Sayu.s1.p6),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Sayu.s1.p7),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Sayu.s1.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Sayu.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Sayu.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Sayu.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Sayu.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Sayu.s2_id,
        title: 'talent_name.sayu_fuuin_dash',
        description: 'talent_descr.sayu_fuuin_dash',
        items: [
            {
                table: new StatTable('sayu_windwheel_dmg', charTalentTables.Sayu.s2.p1),
            },
            {
                table: new StatTable('sayu_windwheel_kick_dmg', charTalentTables.Sayu.s2.p3),
            },
            {
                table: new StatTable('sayu_windwheel_kick_hold_dmg', charTalentTables.Sayu.s2.p4),
            },
            {
                table: new StatTable('sayu_windwheel_elemental_dmg', charTalentTables.Sayu.s2.p2),
            },
            {
                table: new StatTable('sayu_windwheel_kick_elemental_dmg', charTalentTables.Sayu.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Sayu.s2.p6),
            },
            {
                unit: 'sec',
                type: 'separated',
                separator: ' - ',
                unitLast: true,
                table: [
                    new StatTable('cd', charTalentTables.Sayu.s2.p7),
                    new StatTable('cd', charTalentTables.Sayu.s2.p8),
                ],
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Sayu.s3_id,
        title: 'talent_name.sayu_mujina_flurry',
        description: 'talent_descr.sayu_mujina_flurry',
        items: [
            {
                table: new StatTable('sayu_burst_dmg', charTalentTables.Sayu.s3.p1),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('sayu_heal', charTalentTables.Sayu.s3.p3),
                    new StatTable('', charTalentTables.Sayu.s3.p2),
                ],
            },
            {
                table: new StatTable('sayu_mujimuji_dmg', charTalentTables.Sayu.s3.p4),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('sayu_mujimuji_heal', charTalentTables.Sayu.s3.p6),
                    new StatTable('', charTalentTables.Sayu.s3.p5),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Sayu.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sayu.s3.p8),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Sayu.s3.p9),
            },
        ],
    },
});

export const Sayu = new DbObjectChar({
    name: 'sayu',
    serializeId: 38,
    gameId: 10000053,
    iconClass: "char-icon-sayu",
    rarity: 4,
    element: 'anemo',
    weapon: 'claymore',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Sayu,
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
            name: 'normal_hit_4',
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
                    values: Talents.get('attack.charged_spin'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_final'),
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
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            damageBonuses: ['dmg_skill_sayu_press'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_kick_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            damageBonuses: ['dmg_skill_sayu_hold'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_kick_hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_elemental_pyro_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_kick_elemental_pyro_dmg',
            element: 'pyro',
            damageBonuses: ['dmg_skill_sayu_hold'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_kick_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_elemental_hydro_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_kick_elemental_hydro_dmg',
            element: 'hydro',
            damageBonuses: ['dmg_skill_sayu_hold'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_kick_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_elemental_cryo_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_kick_elemental_cryo_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_skill_sayu_hold'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_kick_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_elemental_electro_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sayu_windwheel_kick_elemental_electro_dmg',
            element: 'electro',
            damageBonuses: ['dmg_skill_sayu_hold'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sayu_windwheel_kick_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.sayu_burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.sayu_mujimuji_dmg'),
                }),
                new FeatureMultiplierSayuBurst({
                    source: 'constellation6',
                    condition: new ConditionConstellation({constellation: 6}),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            partyHeal: true,
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.sayu_heal'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'sayu_mujimuji_heal',
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.sayu_mujimuji_heal'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'constellation6',
                    values: new ValueTable([300]),
                    capValue: new ValueTable([6000]),
                    condition: new ConditionConstellation({constellation: 6}),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'sayu_mujimuji_swirl_heal',
            category: 'other',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'mastery*',
                    source: 'ascension1',
                    values: [
                        new ValueTable([120]),
                        new ValueTable([300]),
                    ]
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureHeal({
            name: 'sayu_mujimuji_add_heal',
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    scalingMultiplier: 0.2,
                    scalingSource: 'ascension4',
                    values: Talents.getList('burst.sayu_mujimuji_heal'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'constellation6',
                    values: new ValueTable([300]),
                    capValue: new ValueTable([6000]),
                    condition: new ConditionConstellation({constellation: 6}),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.sayu_someone_more_capable',
            description: 'talent_descr.sayu_someone_more_capable',
            stats: {
                text_value: 300,
                text_value_hp: 1.2,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.sayu_no_work_today',
            description: 'talent_descr.sayu_no_work_today',
            stats: {
                text_percent_hp: 20,
            },
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
                    title: 'talent_name.sayu_multi_task_no_jutsu',
                    description: 'talent_descr.sayu_multi_task_no_jutsu',
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    stats: {
                        dmg_skill_sayu_press: 3.3,
                    },
                }),
                new ConditionStacks({
                    name: 'sayu_egress_prep',
                    serializeId: 1,
                    title: 'talent_name.sayu_egress_prep',
                    description: 'talent_descr.sayu_egress_prep',
                    maxStacks: 20,
                    dropdownClass: 'stack-percent',
                    titleFunc: function(value) {
                        if (value) {
                            return {
                                values: new Stats({text_decimal: value / 2}),
                                str: 'talent_tooltip.sayu_egress_prep',
                            };
                        } else {
                            return {
                                str: 'talent_tooltip.sayu_egress_prep_none',
                            };
                        }
                    },
                    stats: [
                        new StatTable('dmg_skill_sayu_hold', [3.3]),
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
                    title: 'talent_name.sayu_new_and_improved',
                    description: 'talent_descr.sayu_new_and_improved',
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
                    title: 'talent_name.sayu_sleep_oclock',
                    description: 'talent_descr.sayu_sleep_oclock',
                }),
            ],
        },
    ]),
});
