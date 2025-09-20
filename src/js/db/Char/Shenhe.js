import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberShenhe } from "../../classes/Condition/Number/Shenhe";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsAtk } from "../../classes/PostEffect/Stats/Atk";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Shenhe.s1_id,
        title: 'talent_name.shenhe_dawnstar_piercer',
        description: 'talent_descr.shenhe_dawnstar_piercer',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Shenhe.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Shenhe.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Shenhe.s1.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Shenhe.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Shenhe.s1.p6),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Shenhe.s1.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Shenhe.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Shenhe.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Shenhe.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Shenhe.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Shenhe.s2_id,
        title: 'talent_name.shenhe_spring_spirit_summoning',
        description: 'talent_descr.shenhe_spring_spirit_summoning',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Shenhe.s2.p1),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Shenhe.s2.p2),
            },
            {
                table: new StatTable('shenhe_dmg_bonus', charTalentTables.Shenhe.s2.p3),
            },
            {
                type: 'separated',
                separator: ' / ',
                unit: 'sec',
                table: [
                    new StatTable('shenhe_duration', charTalentTables.Shenhe.s2.p4),
                    new StatTable('shenhe_duration', charTalentTables.Shenhe.s2.p5),
                ],
            },
            {
                type: 'separated',
                separator: ' / ',
                unit: '',
                table: [
                    new StatTable('shenhe_stacks', charTalentTables.Shenhe.s2.p6),
                    new StatTable('shenhe_stacks', charTalentTables.Shenhe.s2.p7),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Shenhe.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Shenhe.s2.p9),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Shenhe.s3_id,
        title: 'talent_name.shenhe_divine_maidens_deliverance',
        description: 'talent_descr.shenhe_divine_maidens_deliverance',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Shenhe.s3.p1),
            },
            {
                table: new StatTable('shenhe_res_decrease', charTalentTables.Shenhe.s3.p2),
            },
            {
                table: new StatTable('dot_dmg', charTalentTables.Shenhe.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Shenhe.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Shenhe.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Shenhe.s3.p6),
            },
        ],
    },
});

export const Shenhe = new DbObjectChar({
    name: 'shenhe',
    serializeId: 48,
    gameId: 10000063,
    iconClass: "char-icon-shenhe",
    rarity: 5,
    element: 'cryo',
    weapon: 'polearm',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Shenhe,
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
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
            isChild: true,
            hits: 2,
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
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
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
            element: 'cryo',
            damageBonuses: ['dmg_skill_shenhe'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'cryo',
            damageBonuses: ['dmg_skill_shenhe'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'shenhe_dmg_bonus',
            postEffect: new PostEffectStatsAtk({
                global: true,
                levelSetting: 'char_skill_elemental',
                percent: Talents.getMulti({
                    name: '',
                    from: 'skill.shenhe_dmg_bonus',
                    multi: 0.01,
                }),
            }),
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dot_dmg'),
                }),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            leveling: 'char_skill_elemental',
            source: 'talent_elemental',
            values: Talents.get('skill.shenhe_dmg_bonus'),
            condition: new ConditionBoolean({name: 'shenhe_icy_quill'}),
            target: new FeatureMultiplierTarget({
                damageElements: ['cryo'],
                damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
            }),
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
        new ConditionBoolean({
            name: 'shenhe_icy_quill',
            serializeId: 1,
            title: 'talent_name.shenhe_icy_quill',
            description: 'talent_descr.shenhe_icy_quill',
        }),
        new ConditionBoolean({
            name: 'shenhe_spirit_field',
            serializeId: 3,
            title: 'talent_name.shenhe_spirit_field',
        }),
        new ConditionBooleanLevels({
            name: 'shenhe_talisman_spirit',
            serializeId: 2,
            title: 'talent_name.shenhe_divine_maidens_deliverance',
            description: 'talent_descr.shenhe_talisman_spirit',
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getMulti({
                    name: 'enemy_res_phys',
                    from: 'burst.shenhe_res_decrease',
                    multi: -1,
                }),
                Talents.getMulti({
                    name: 'enemy_res_cryo',
                    from: 'burst.shenhe_res_decrease',
                    multi: -1,
                }),
            ],
        }),
        new ConditionStatic({
            name: 'shenhe_deific_embrace',
            serializeId: 4,
            title: 'talent_name.shenhe_deific_embrace',
            description: 'talent_descr.shenhe_deific_embrace',
            stats: {
                dmg_cryo: 15,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBoolean({name: 'shenhe_spirit_field'}),
            ],
        }),
        new ConditionBoolean({
            name: 'shenhe_spirit_seal_press',
            serializeId: 5,
            title: 'talent_name.shenhe_spirit_seal_press',
            description: 'talent_descr.shenhe_spirit_communion_seal_1',
            stats: {
                dmg_skill: 15,
                dmg_burst: 15,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionBoolean({
            name: 'shenhe_spirit_seal_hold',
            serializeId: 6,
            title: 'talent_name.shenhe_spirit_seal_hold',
            description: 'talent_descr.shenhe_spirit_communion_seal_2',
            stats: {
                dmg_normal: 15,
                dmg_charged: 15,
                dmg_plunge: 15,
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
                    title: 'talent_name.shenhe_clarity_of_heart',
                    description: 'talent_descr.shenhe_clarity_of_heart',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.shenhe_centered_spirit',
                    description: 'talent_descr.shenhe_centered_spirit',
                    stats: {
                        crit_dmg_cryo: 15,
                    },
                    subConditions: [
                        new ConditionBoolean({
                            name: 'shenhe_spirit_field',
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
                new ConditionNumberShenhe({
                    name: 'shenhe_skyfrost_mantra',
                    serializeId: 7,
                    title: 'talent_name.shenhe_insight',
                    description: 'talent_descr.shenhe_insight',
                    max: 50,
                    stats: {
                        text_percent_dmg: 5,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.shenhe_mystical_abandon',
                    description: 'talent_descr.shenhe_mystical_abandon',
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_total'],
            settings: ['char_skill_elemental', 'char_skill_burst'],
        },
        conditions: [
            new ConditionNumber({
                name: 'shenhe_atk_total',
                title: 'talent_name.stats_total_atk',
                partyStat: 'atk_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'shenhe_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 2,
            }),
            new ConditionNumberTalent({
                name: 'shenhe_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 3,
            }),
            new Condition({
                settings: {
                    shenhe_char_skill_elemental_bonus: 3,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.shenhe_constellation_3',
                    }),
                ],
            }),
            new Condition({
                settings: {
                    shenhe_char_skill_burst_bonus: 3,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.shenhe_constellation_5',
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'party.shenhe_icy_quill',
                serializeId: 4,
                rotation: 'party',
                title: 'talent_name.shenhe_icy_quill',
                description: 'talent_descr.shenhe_icy_quill',
            }),
            new ConditionBoolean({
                name: 'party.shenhe_spirit_field',
                serializeId: 9,
                title: 'talent_name.shenhe_spirit_field',
            }),
            new ConditionBooleanLevels({
                name: 'party.shenhe_talisman_spirit',
                serializeId: 8,
                rotation: 'party',
                title: 'talent_name.shenhe_talisman_spirit',
                description: 'talent_descr.shenhe_talisman_spirit',
                levelSetting: 'shenhe_char_skill_burst',
                stats: [
                    Talents.getMulti({
                        name: 'enemy_res_phys',
                        from: 'burst.shenhe_res_decrease',
                        multi: -1,
                    }),
                    Talents.getMulti({
                        name: 'enemy_res_cryo',
                        from: 'burst.shenhe_res_decrease',
                        multi: -1,
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'party.shenhe_deific_embrace',
                serializeId: 5,
                rotation: 'party',
                title: 'talent_name.shenhe_deific_embrace',
                description: 'talent_descr.shenhe_deific_embrace',
                stats: {
                    dmg_cryo: 15,
                },
                info: {ascension: 1},
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.shenhe_spirit_field',
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'party.shenhe_spirit_seal_press',
                serializeId: 6,
                rotation: 'party',
                title: 'talent_name.shenhe_spirit_seal_press',
                description: 'talent_descr.shenhe_spirit_communion_seal_1',
                stats: {
                    dmg_skill: 15,
                    dmg_burst: 15,
                },
                info: {ascension: 4},
            }),
            new ConditionBoolean({
                name: 'party.shenhe_spirit_seal_hold',
                serializeId: 7,
                rotation: 'party',
                title: 'talent_name.shenhe_spirit_seal_hold',
                description: 'talent_descr.shenhe_spirit_communion_seal_2',
                stats: {
                    dmg_normal: 15,
                    dmg_charged: 15,
                    dmg_plunge: 15,
                },
                info: {ascension: 4},
            }),
            new ConditionBoolean({
                name: 'party.shenhe_centered_spirit',
                serializeId: 10,
                title: 'talent_name.shenhe_centered_spirit',
                description: 'talent_descr.shenhe_centered_spirit',
                stats: {
                    crit_dmg_cryo: 15,
                },
                info: {constellation: 2},
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.shenhe_spirit_field',
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'party.shenhe_constellation_3',
                serializeId: 11,
                title: 'talent_name.shenhe_seclusion',
                description: 'talent_descr.char_constellation_skill',
                info: {
                    constellation: 3,
                },
            }),
            new ConditionBoolean({
                name: 'party.shenhe_constellation_5',
                serializeId: 12,
                title: 'talent_name.shenhe_divine_attainment',
                description: 'talent_descr.char_constellation_burst',
                info: {
                    constellation: 5,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.shenhe_constellation_3',
                    }),
                ],
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'shenhe_atk_total',
                leveling: 'shenhe_char_skill_elemental',
                source: 'shenhe',
                values: Talents.get('skill.shenhe_dmg_bonus'),
                condition: new ConditionBoolean({name: 'party.shenhe_icy_quill'}),
                target: new FeatureMultiplierTarget({
                    damageElements: ['cryo'],
                    damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
                }),
            }),
        ],
    },
});
