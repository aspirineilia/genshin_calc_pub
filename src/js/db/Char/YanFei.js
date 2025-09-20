import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionLevels } from "../../classes/Condition/Levels";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageChargedYanfei } from "../../classes/Feature2/Damage/Charged/Yanfei";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.YanFei.s1_id,
        title: 'talent_name.yanfei_seal_of_approval',
        description: 'talent_descr.yanfei_seal_of_approval',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.YanFei.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.YanFei.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.YanFei.s1.p3),
            },
            {
                type: 'separated',
                table: [
                    new StatTable('charged_hit', charTalentTables.YanFei.s1.p4),
                    new StatTable('yanfei_charged_1', charTalentTables.YanFei.s1.p5),
                    new StatTable('yanfei_charged_2', charTalentTables.YanFei.s1.p6),
                    new StatTable('yanfei_charged_3', charTalentTables.YanFei.s1.p7),
                    new StatTable('yanfei_charged_4', charTalentTables.YanFei.s1.p8),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.YanFei.s1.p14),
            },
            {
                unit: 'per_seal',
                table: new StatTable('yanfei_seal_stamina_decreasse', charTalentTables.YanFei.s1.p15),
            },
            {
                unit: 'sec',
                table: new StatTable('yanfei_seal_duration', charTalentTables.YanFei.s1.p19),
            },
            {
                table: new StatTable('plunge', charTalentTables.YanFei.s1.p16),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.YanFei.s1.p17),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.YanFei.s1.p18),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.YanFei.s2_id,
        title: 'talent_name.yanfei_signed_edict',
        description: 'talent_descr.yanfei_signed_edict',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.YanFei.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YanFei.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.YanFei.s3_id,
        title: 'talent_name.yanfei_done_deal',
        description: 'talent_descr.yanfei_done_deal',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.YanFei.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('yanfei_seal_interval', charTalentTables.YanFei.s3.p4),
            },
            {
                table: new StatTable('yanfei_charged_bonus', charTalentTables.YanFei.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.YanFei.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.YanFei.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.YanFei.s3.p6),
            },
        ],
    },
});

const scarletSealsCnt = [
    {
        value: 3,
        condition: [
            new ConditionConstellation({
                constellation: 6,
                invert: true,
            }),
        ],
    },
    {
        value: 4,
        condition: [
            new ConditionConstellation({
                constellation: 6,
            }),
        ],
    },
];

export const YanFei = new DbObjectChar({
    name: 'yanfei',
    serializeId: 34,
    gameId: 10000048,
    iconClass: "char-icon-yanfei",
    rarity: 4,
    element: 'pyro',
    weapon: 'catalyst',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.YanFei,
    features: [
        new FeatureDamageNormal({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.yanfei_charged_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.yanfei_charged_2'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.yanfei_charged_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.yanfei_charged_4'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureDamageChargedYanfei({
            element: 'pyro',
            rotationHitDescription: 'talent_activation_chance',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension4',
                    values: new StatTable('yanfei_blazing_eye', [80]),
                }),
            ],
            condition:  new ConditionAscensionChar({ascension: 4}),
        }),
        new FeatureDamagePlungeCollision({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'pyro',
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
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'other',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new StatTable('yanfei_shield', [45]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                char_skill_burst_bonus: 3,
            },
            subConditions: [
                new ConditionConstellation({constellation: 5}),
            ],
        }),
        new ConditionBooleanLevels({
            name: 'yanfei_brilliance',
            serializeId: 3,
            title: 'talent_name.yanfei_brilliance',
            description: 'talent_descr.yanfei_brilliance',
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.yanfei_charged_bonus', 'dmg_charged'),
            ],
        }),
        new ConditionStacks({
            name: 'yanfei_scarlet_seal',
            serializeId: 1,
            title: 'talent_name.yanfei_scarlet_seal',
            description: 'talent_descr.yanfei_scarlet_seal',
            maxStacks: scarletSealsCnt,
            stats: [
                new StatTable('stamina_consume', [15]),
            ],
        }),
        new ConditionLevels({
            levelSetting: 'yanfei_scarlet_seal',
            stats: [
                new StatTable('stamina_consume_charged', [10, 20, 30, 40]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'yanfei_scarlet_seal'}),
                new ConditionConstellation({constellation: 1}),
            ],
        }),
        new ConditionLevels({
            levelSetting: 'yanfei_scarlet_seal',
            stats: [
                new StatTable('dmg_pyro', [5, 10, 15, 20]),
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionBoolean({name: 'yanfei_scarlet_seal'}),
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.yanfei_proviso',
            description: 'talent_descr.yanfei_proviso',
            stats: {
                text_percent_dmg: 5,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.yanfei_blazing_eye',
            description: 'talent_descr.yanfei_blazing_eye',
            stats: {
                text_percent_dmg: 80,
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
                    title: 'talent_name.yanfei_the_law_knows_no_kindness',
                    description: 'talent_descr.yanfei_the_law_knows_no_kindness',
                    stats: {
                        text_percent: 10,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'yanfei_interpretation',
                    serializeId: 2,
                    title: 'talent_name.yanfei_right_of_final_interpretation',
                    description: 'talent_descr.yanfei_right_of_final_interpretation',
                    stats: {
                        crit_rate_charged: 20,
                        text_percent_hp: 50,
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
                    title: 'talent_name.yanfei_supreme_amnesty',
                    description: 'talent_descr.yanfei_supreme_amnesty',
                    stats: {
                        text_percent_hp: 45,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.yanfei_extra_clause',
                    description: 'talent_descr.yanfei_extra_clause',
                }),
            ],
        },
    ]),
});
