import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageBurstXinyan } from "../../classes/Feature2/Damage/Burst/Xinyan";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { PostEffectStatsDef } from "../../classes/PostEffect/Stats/Def";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Xinyan.s1_id,
        title: 'talent_name.xinyan_dance_on_fire',
        description: 'talent_descr.xinyan_dance_on_fire',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Xinyan.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Xinyan.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Xinyan.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Xinyan.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Xinyan.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Xinyan.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Xinyan.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Xinyan.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Xinyan.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Xinyan.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Xinyan.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Xinyan.s2_id,
        title: 'talent_name.xinyan_sweeping_fervor',
        description: 'talent_descr.xinyan_sweeping_fervor',
        items: [
            {
                table: new StatTable('swing_dmg', charTalentTables.Xinyan.s2.p1),
            },
            {
                type: 'shield',
                unit: 'def',
                table: [
                    new StatTable('xinyan_shield_level_1', charTalentTables.Xinyan.s2.p2),
                    new StatTable('', charTalentTables.Xinyan.s2.p3),
                ],
            },
            {
                type: 'shield',
                unit: 'def',
                table: [
                    new StatTable('xinyan_shield_level_2', charTalentTables.Xinyan.s2.p4),
                    new StatTable('', charTalentTables.Xinyan.s2.p5),
                ],
            },
            {
                type: 'shield',
                unit: 'def',
                table: [
                    new StatTable('xinyan_shield_level_3', charTalentTables.Xinyan.s2.p6),
                    new StatTable('', charTalentTables.Xinyan.s2.p7),
                ],
            },
            {
                table: new StatTable('dot_dmg', charTalentTables.Xinyan.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('xinyan_duration', charTalentTables.Xinyan.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Xinyan.s2.p10),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Xinyan.s3_id,
        title: 'talent_name.xinyan_riff_revolution',
        description: 'talent_descr.xinyan_riff_revolution',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Xinyan.s3.p1),
            },
            {
                table: new StatTable('dot_dmg', charTalentTables.Xinyan.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Xinyan.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Xinyan.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Xinyan.s3.p4),
            },
        ],
    },
});

export const Xinyan = new DbObjectChar({
    name: 'xinyan',
    serializeId: 30,
    gameId: 10000044,
    iconClass: "char-icon-xinyan",
    rarity: 4,
    element: 'pyro',
    weapon: 'claymore',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Xinyan,
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
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_spin'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_final',
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
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.swing_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.dot_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.xinyan_shield_level_1'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.xinyan_shield_level_2'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.xinyan_shield_level_3'),
                }),
            ],
        }),
        new FeatureDamageBurstXinyan({
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
                    values: Talents.get('burst.dot_dmg'),
                }),
            ],
        }),
    ],
    postEffects: [
        new PostEffectStatsDef({
            percent: new StatTable('atk', [0.3]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'xinyan_rockin_in_a_flaming_world'}),
                new ConditionConstellation({constellation: 6}),
            ]),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.xinyan_the_show_goes_on_even_without_an_audience',
            description: 'talent_descr.xinyan_the_show_goes_on_even_without_an_audience',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'xinyan_now_thats_rock',
            serializeId: 1,
            title: 'talent_name.xinyan_now_thats_rock_n_roll',
            description: 'talent_descr.xinyan_now_thats_rock_n_roll',
            stats: {
                dmg_phys: 15,
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
                new ConditionBoolean({
                    name: 'xinyan_fatal_acceleration',
                    serializeId: 2,
                    title: 'talent_name.xinyan_fatal_acceleration',
                    description: 'talent_descr.xinyan_fatal_acceleration',
                    stats: {
                        atk_speed_normal: 12,
                        atk_speed_charged: 12,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.xinyan_impromptu_opening',
                    description: 'talent_descr.xinyan_impromptu_opening',
                    stats: {
                        crit_rate_xinyan: 100,
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
                    name: 'xinyan_wildfire_rhythm',
                    serializeId: 4,
                    title: 'talent_name.xinyan_wildfire_rhythm',
                    description: 'talent_descr.xinyan_wildfire_rhythm',
                    stats: {
                        enemy_res_phys: -15,
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
                    name: 'xinyan_rockin_in_a_flaming_world',
                    serializeId: 5,
                    title: 'talent_name.xinyan_rockin_in_a_flaming_world',
                    description: 'talent_descr.xinyan_rockin_in_a_flaming_world',
                    stats: {
                        text_percent: 30,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.xinyan_now_thats_rock',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.xinyan_now_thats_rock_n_roll',
                description: 'talent_descr.xinyan_now_thats_rock_n_roll',
                info: {ascension: 4},
                stats: {
                    dmg_phys: 15,
                },
            }),
            new ConditionBoolean({
                name: 'party.xinyan_wildfire_rhythm',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.xinyan_wildfire_rhythm',
                description: 'talent_descr.xinyan_wildfire_rhythm',
                info: {constellation: 4},
                stats: {
                    enemy_res_phys: -15,
                },
            }),
        ],
    },
});
