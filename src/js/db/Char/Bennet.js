import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionBooleanWeaponType } from "../../classes/Condition/Boolean/WeaponType";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Bennett.s1_id,
        title: 'talent_name.bennett_strike_of_fortune',
        description: 'talent_descr.bennett_strike_of_fortune',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Bennett.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Bennett.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Bennett.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Bennett.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Bennett.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Bennett.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.Bennett.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Bennett.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Bennett.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Bennett.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Bennett.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Bennett.s2_id,
        title: 'talent_name.bennett_passion_overload',
        description: 'talent_descr.bennett_passion_overload',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Bennett.s2.p1),
            },
            {
                type: 'hits',
                name: 'charge_level_1',
                table: [
                    new StatTable('charge_level_1_1', charTalentTables.Bennett.s2.p2),
                    new StatTable('charge_level_1_2', charTalentTables.Bennett.s2.p3),
                ],
            },
            {
                type: 'hits',
                name: 'charge_level_2',
                table: [
                    new StatTable('charge_level_2_1', charTalentTables.Bennett.s2.p4),
                    new StatTable('charge_level_2_2', charTalentTables.Bennett.s2.p5),
                ],
            },
            {
                table: new StatTable('explosion_dmg', charTalentTables.Bennett.s2.p6),
            },
            {
                type: 'separated',
                unit: 'sec',
                table: [
                    new StatTable('cd', charTalentTables.Bennett.s2.p7),
                    new StatTable('cd', charTalentTables.Bennett.s2.p8),
                    new StatTable('cd', charTalentTables.Bennett.s2.p9),
                ],
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Bennett.s3_id,
        title: 'talent_name.bennett_fantastic_voyage',
        description: 'talent_descr.bennett_fantastic_voyage',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Bennett.s3.p1),
            },
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('heal_dot', charTalentTables.Bennett.s3.p2),
                    new StatTable('', charTalentTables.Bennett.s3.p3),
                ],
            },
            {
                table: new StatTable('atk_ratio', charTalentTables.Bennett.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Bennett.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Bennett.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Bennett.s3.p7),
            },
        ],
    },
});

const TalentValues = {
    A1SkillCd: 20,
    A4SkillCd: 50,
    C1BuffBonus: 20,
    C2Recharge: 30,
    C4Damage: 135,
    C6PyroBonus: 15,
};

const selfBuffPost = new PostEffectStats({
    from: 'atk_base',
    levelSetting: 'char_skill_burst',
    percent: Talents.getMulti({
        name: 'atk',
        from: 'burst.atk_ratio',
        multi: 0.01,
    }),
    percentBonus: new ValueTable([TalentValues.C1BuffBonus / 100]),
    conditions: [
        new ConditionBoolean({
            name: 'bennet_fantastic_voyage',
        }),
    ],
    bonusCondition: new ConditionBooleanValue({
        setting: 'char_constellation',
        cond: 'ge',
        value: 1,
    }),
});

export const Bennet = new DbObjectChar({
    name: 'bennett',
    serializeId: 5,
    gameId: 10000032,
    iconClass: "char-icon-bennett",
    rarity: 4,
    element: 'pyro',
    weapon: 'sword',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Bennett,
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
            name: 'charged_hit_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_2',
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
            name: 'press_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'skill',
            damageType: 'skill',
            element: 'pyro',
            name: 'charge_level_1',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charge_level_1_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charge_level_1_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            name: 'charge_level_1_1',
            element: 'pyro',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charge_level_1_1'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'charge_level_1_2',
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charge_level_1_2'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'skill',
            damageType: 'skill',
            element: 'pyro',
            name: 'charge_level_2',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charge_level_2_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_elemental',
                            values: Talents.get('skill.charge_level_2_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageSkill({
            name: 'charge_level_2_1',
            element: 'pyro',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charge_level_2_1'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'charge_level_2_2',
            isChild: true,
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.charge_level_2_2'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'explosion_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.explosion_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
        new FeatureDamageSkill({
            name: 'bennet_unexpected_odyssey_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.charge_level_1_2',
                        multi: TalentValues.C4Damage / 100,
                    }),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'heal_dot',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal_dot'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'atk_bonus',
            postEffect: selfBuffPost,
        }),
    ],
    postEffects: [
        selfBuffPost,
    ],
    conditions: [
        new Condition({
            settings: {
                allowed_infusion_pyro: 1,
            },
        }),
        new ConditionBoolean({
            name: 'bennet_fantastic_voyage',
            serializeId: 2,
            title: 'talent_name.bennett_fantastic_voyage',
            description: 'talent_descr.bennett_fantastic_voyage_talent',
        }),
        new ConditionStatic({
            title: 'talent_name.bennett_rekindle',
            description: 'talent_descr.bennett_rekindle',
            stats: {
                text_percent_cd: TalentValues.A1SkillCd,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.bennett_fearnaught',
            description: 'talent_descr.bennett_fearnaught',
            stats: {
                text_percent_cd: TalentValues.A4SkillCd,
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
                    title: 'talent_name.bennett_grand_expectation',
                    description: 'talent_descr.bennett_grand_expectation',
                    stats: {
                        bonus_bennet_atk: TalentValues.C1BuffBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'bennet_impasse_conqueror',
                    serializeId: 1,
                    title: 'talent_name.bennett_impasse_conqueror',
                    description: 'talent_descr.bennett_impasse_conqueror',
                    stats: {
                        recharge: TalentValues.C2Recharge,
                        text_percent_hp: 70,
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
                    title: 'talent_name.bennett_unexpected_odyssey',
                    description: 'talent_descr.bennett_unexpected_odyssey',
                    stats: {
                        text_percent_dmg: TalentValues.C4Damage,
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
                    name: 'bennet_fire_ventures_with_me',
                    title: 'talent_name.bennett_fire_ventures_with_me',
                    description: 'talent_descr.bennett_fire_ventures_with_me',
                    settings: {
                        attack_infusion_pyro: 1,
                    },
                    stats: {
                        text_percent: TalentValues.C6PyroBonus,
                        dmg_pyro: TalentValues.C6PyroBonus,
                    },
                    subConditions: [
                        new ConditionBoolean({
                            name: 'bennet_fantastic_voyage',
                        }),
                    ]
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['atk_base'],
            settings: ['char_skill_burst'],
        },
        conditions: [
            new Condition({
                settings: {
                    allowed_infusion_pyro: 1,
                },
                subConditions: [
                    new ConditionBooleanWeaponType({
                        types: ['sword', 'claymore', 'polearm'],
                    }),
                ],
            }),
            new ConditionNumber({
                name: 'bennet_atk_base',
                title: 'talent_name.stats_base_atk',
                partyStat: 'atk_base',
                serializeId: 1,
                max: 10000,
            }),
            new ConditionNumberTalent({
                name: 'bennet_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 2,
            }),
            new ConditionBoolean({
                name: 'party.bennet_fantastic_voyage',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.bennett_fantastic_voyage',
                description: 'talent_descr.bennett_fantastic_voyage_talent',
            }),
            new ConditionBoolean({
                name: 'party.bennet_constellation_1',
                serializeId: 4,
                title: 'talent_name.bennett_grand_expectation',
                description: 'talent_descr.bennett_grand_expectation',
                stats: {
                    bonus_bennet_atk: TalentValues.C1BuffBonus,
                },
                info: {
                    constellation: 1,
                },
            }),
            new ConditionBoolean({
                name: 'party.bennet_constellation_5',
                serializeId: 5,
                title: 'talent_name.bennett_true_explorer',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    bennet_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 5,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.bennet_constellation_1',
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'party.bennet_constellation_6',
                serializeId: 6,
                title: 'talent_name.bennett_fire_ventures_with_me',
                description: 'talent_descr.bennett_fire_ventures_with_me',
                stats: {
                    text_percent: TalentValues.C6PyroBonus,
                },
                info: {
                    constellation: 6,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.bennet_constellation_5',
                    }),
                ],
            }),
            new Condition({
                stats: {
                    dmg_pyro: TalentValues.C6PyroBonus,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.bennet_fantastic_voyage',
                    }),
                    new ConditionBoolean({
                        name: 'party.bennet_constellation_5',
                    }),
                    new ConditionBoolean({
                        name: 'party.bennet_constellation_6',
                    }),
                ],
            }),
            new Condition({
                settings: {
                    attack_infusion_pyro: 1,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.bennet_fantastic_voyage',
                    }),
                    new ConditionBoolean({
                        name: 'party.bennet_constellation_6',
                    }),
                    new ConditionBooleanWeaponType({
                        types: ['sword', 'claymore', 'polearm'],
                    }),
                ],
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'bennet_atk_base',
                levelSetting: 'bennet_char_skill_burst',
                maxLevelSetting: 10,
                percent: Talents.getMulti({
                    name: 'atk',
                    from: 'burst.atk_ratio',
                    multi: 0.01,
                }),
                percentBonus: new ValueTable([TalentValues.C1BuffBonus / 100]),
                conditions: [
                    new ConditionBoolean({
                        name: 'party.bennet_fantastic_voyage',
                    }),
                ],
                bonusCondition: new ConditionBoolean({
                    name: 'party.bennet_constellation_1',
                }),
            }),
        ],
    }
});
