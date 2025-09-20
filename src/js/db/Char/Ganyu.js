import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Ganyu.s1_id,
        title: 'talent_name.ganyu_liutian_archery',
        description: 'talent_descr.ganyu_liutian_archery',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Ganyu.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Ganyu.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Ganyu.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Ganyu.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Ganyu.s1.p5),
            },
            {
                table: new StatTable('normal_hit_6', charTalentTables.Ganyu.s1.p6),
            },
            {
                table: new StatTable('aimed', charTalentTables.Ganyu.s1.p7),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Ganyu.s1.p8),
            },
            {
                table:new StatTable('ganyu_frostflake', charTalentTables.Ganyu.s1.p9),
            },
            {
                table:new StatTable('ganyu_frostflake_bloom', charTalentTables.Ganyu.s1.p10),
            },
            {
                table: new StatTable('plunge', charTalentTables.Ganyu.s1.p11),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Ganyu.s1.p12),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Ganyu.s1.p13),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Ganyu.s2_id,
        title: 'talent_name.ganyu_trail_of_the_qilin',
        description: 'talent_descr.ganyu_trail_of_the_qilin',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Ganyu.s2.p2),
            },
            {
                table: new StatTable('ganyu_lotus_hp', charTalentTables.Ganyu.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Ganyu.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ganyu.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Ganyu.s3_id,
        title: 'talent_name.ganyu_celestial_shower',
        description: 'talent_descr.ganyu_celestial_shower',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Ganyu.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Ganyu.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ganyu.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Ganyu.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A1CritRate: 20,
    A4CryoDmg: 20,
    C1EnemyResCryo: -15,
    C4DmgBonus: 5,
};

export const Ganyu = new DbObjectChar({
    name: 'ganyu',
    serializeId: 10,
    gameId: 10000037,
    iconClass: "char-icon-ganyu",
    rarity: 5,
    element: 'cryo',
    weapon: 'bow',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Ganyu,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
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
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_6',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_6'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'aimed',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'charged_aimed',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'ganyu_frostflake',
            element: 'cryo',
            critRateBonuses: ['crit_rate_ganyu'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.ganyu_frostflake'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'ganyu_frostflake_bloom',
            element: 'cryo',
            critRateBonuses: ['crit_rate_ganyu'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.ganyu_frostflake_bloom'),
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
            name: 'skill_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'ganyu_lotus_hp',
            postEffect: new PostEffectStatsHP({
                levelSetting: 'char_skill_elemental',
                percent: Talents.getMulti({
                    name: 'ganyu_lotus_hp',
                    from: 'skill.ganyu_lotus_hp',
                    multi: 0.01,
                }),
            }),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'ganyu_undivided_heart',
            serializeId: 1,
            title: 'talent_name.ganyu_undivided_heart',
            description: 'talent_descr.ganyu_undivided_heart',
            info: {ascension: 1},
            stats: {
                crit_rate_ganyu: TalentValues.A1CritRate,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'ganyu_harmony',
            serializeId: 2,
            title: 'talent_name.ganyu_harmony_between_heaven_and_earth',
            description: 'talent_descr.ganyu_harmony_between_heaven_and_earth',
            info: {ascension: 4},
            stats: {
                dmg_cryo: TalentValues.A4CryoDmg,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'ganyu_dew_drinker',
                    serializeId: 3,
                    title: 'talent_name.ganyu_dew_drinker',
                    description: 'talent_descr.ganyu_dew_drinker',
                    settings: {},
                    stats: {
                        enemy_res_cryo: TalentValues.C1EnemyResCryo,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.ganyu_the_auspicious',
                    description: 'talent_descr.ganyu_the_auspicious',
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
                new ConditionStacks({
                    name: 'ganyu_westward_sojourn',
                    serializeId: 4,
                    title: 'talent_name.ganyu_westward_sojourn',
                    description: 'talent_descr.ganyu_westward_sojourn',
                    maxStacks: 5,
                    stats: [
                        new StatTable('dmg_all', [TalentValues.C4DmgBonus]),
                    ],
                })
            ]
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
                    title: 'talent_name.ganyu_the_clement',
                    description: 'talent_descr.ganyu_the_clement',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.ganyu_harmony',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.ganyu_harmony_between_heaven_and_earth',
                description: 'talent_descr.ganyu_harmony_between_heaven_and_earth',
                stats: {
                    dmg_cryo: TalentValues.A4CryoDmg,
                },
                info: {ascension: 4},
            }),
            new ConditionBoolean({
                name: 'party.ganyu_dew_drinker',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.ganyu_dew_drinker',
                description: 'talent_descr.ganyu_dew_drinker',
                stats: {
                    enemy_res_cryo: TalentValues.C1EnemyResCryo,
                },
                info: {constellation: 1},
            }),
            new ConditionStacks({
                name: 'party.ganyu_westward_sojourn',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.ganyu_westward_sojourn',
                description: 'talent_descr.ganyu_westward_sojourn',
                maxStacks: 5,
                stats: [
                    new StatTable('dmg_all', [TalentValues.C4DmgBonus]),
                ],
                info: {constellation: 4},
            }),
        ],
    },
});
