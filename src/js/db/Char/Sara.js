import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsRecharge } from "../../classes/PostEffect/Stats/Recharge";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Sara.s1_id,
        title: 'talent_name.kujou_sara_tengu_bowmanship',
        description: 'talent_descr.kujou_sara_tengu_bowmanship',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Sara.s1.p1),
            },
            {
                table:new StatTable('normal_hit_2', charTalentTables.Sara.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Sara.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Sara.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Sara.s1.p5),
            },
            {
                table: new StatTable('aimed', charTalentTables.Sara.s1.p6),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Sara.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Sara.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Sara.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Sara.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Sara.s2_id,
        title: 'talent_name.kujou_sara_tengu_stormcall',
        description: 'talent_descr.kujou_sara_tengu_stormcall',
        items: [
            {
                table: new StatTable('sara_ambush_dmg', charTalentTables.Sara.s2.p1),
            },
            {
                table: new StatTable('sara_atk_bonus', charTalentTables.Sara.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('sara_atk_bonus_duration', charTalentTables.Sara.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sara.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Sara.s3_id,
        title: 'talent_name.kujou_sara_koukou_sendou',
        description: 'talent_descr.kujou_sara_koukou_sendou',
        items: [
            {
                table: new StatTable('sara_titanbreaker_dmg', charTalentTables.Sara.s3.p1),
            },
            {
                table: new StatTable('sara_stormcluster_dmg', charTalentTables.Sara.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sara.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Sara.s3.p4),
            },
        ],
    },
});

const atkBuffPost = new PostEffectStats({
    levelSetting: 'char_skill_elemental',
    from: 'atk_base',
    percent: Talents.getMulti({
        name: 'atk',
        from: 'skill.sara_atk_bonus',
        multi: 0.01,
    }),
    conditions: [
        new ConditionBoolean({name: 'sara_tengu_juurai'}),
    ],
});

export const Sara = new DbObjectChar({
    name: 'kujou_sara',
    serializeId: 42,
    gameId: 10000056,
    iconClass: "char-icon-kujou-sara",
    rarity: 4,
    element: 'electro',
    weapon: 'bow',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Sara,
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
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
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
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sara_ambush_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'sara_dark_wings_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    scalingMultiplier: 0.3,
                    scalingSource: 'constellation2',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.sara_ambush_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'sara_atk_bonus',
            postEffect: atkBuffPost,
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'sara_decorum',
            postEffect: new PostEffectStatsRecharge({
                percent: new StatTable('', [1.2]),
            }),
            format: 'decimal',
            digits: 2,
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.sara_titanbreaker_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.sara_stormcluster_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'sara_tengu_juurai',
            serializeId: 1,
            title: 'talent_name.sara_tengu_juurai',
            description: 'talent_descr.sara_tengu_juurai',
        }),
        new ConditionStatic({
            title: 'talent_name.kujou_sara_immovable_will',
            description: 'talent_descr.kujou_sara_immovable_will',
            stats: {
                text_percent: 60,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kujou_sara_decorum',
            description: 'talent_descr.kujou_sara_decorum',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        atkBuffPost
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kujou_sara_crows_eye',
                    description: 'talent_descr.kujou_sara_crows_eye',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kujou_sara_dark_wings',
                    description: 'talent_descr.kujou_sara_dark_wings',
                    stats: {
                        text_percent_dmg: 30,
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
                    title: 'talent_name.kujou_sara_conclusive_proof',
                    description: 'talent_descr.kujou_sara_conclusive_proof',
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
                    title: 'talent_name.kujou_sara_sin_of_pride',
                    description: 'talent_descr.kujou_sara_sin_of_pride',
                    stats: {
                        crit_dmg_electro: 60,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_base'],
            settings: ['char_skill_elemental'],
        },
        conditions: [
            new ConditionNumber({
                name: 'sara_atk_base',
                title: 'talent_name.stats_base_atk',
                partyStat: 'atk_base',
                serializeId: 1,
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'sara_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.sara_tengu_juurai',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.sara_tengu_juurai',
                description: 'talent_descr.sara_tengu_juurai',
            }),
            new ConditionBoolean({
                name: 'party.kujou_sara_spellsinger',
                serializeId: 4,
                title: 'talent_name.kujou_sara_spellsinger',
                description: 'talent_descr.char_constellation_skill',
                info: {constellation: 5},
                settings: {
                    sara_char_skill_elemental_bonus: 3,
                },
            }),
            new ConditionBoolean({
                name: 'party.kujou_sara_sin_of_pride',
                serializeId: 5,
                rotation: 'party',
                title: 'talent_name.kujou_sara_sin_of_pride',
                description: 'talent_descr.kujou_sara_sin_of_pride',
                info: {constellation: 6},
                stats: {
                    crit_dmg_electro: 60,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.kujou_sara_spellsinger'}),
                ],
            }),
        ],
        postEffects: [
            new PostEffectStats({
                levelSetting: 'sara_char_skill_elemental',
                maxLevelSetting: 10,
                from: 'sara_atk_base',
                percent: Talents.getMulti({
                    name: 'atk',
                    from: 'skill.sara_atk_bonus',
                    multi: 0.01,
                }),
                conditions: [
                    new ConditionBoolean({name: 'party.sara_tengu_juurai'}),
                ],
            }),
        ],
    },
});
