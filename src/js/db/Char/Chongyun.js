import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanWeaponType } from "../../classes/Condition/Boolean/WeaponType";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Chongyun.s1_id,
        title: 'talent_name.chongyun_demonbane',
        description: 'talent_descr.chongyun_demonbane',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Chongyun.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Chongyun.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Chongyun.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Chongyun.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Chongyun.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Chongyun.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Chongyun.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Chongyun.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Chongyun.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Chongyun.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Chongyun.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Chongyun.s2_id,
        title: 'talent_name.chongyun_chonghuas_layered_frost',
        description: 'talent_descr.chongyun_chonghuas_layered_frost',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Chongyun.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('chongyun_infusion_duration', charTalentTables.Chongyun.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('chongyun_field_duration', charTalentTables.Chongyun.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Chongyun.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Chongyun.s3_id,
        title: 'talent_name.chongyun_cloud_parting_star',
        description: 'talent_descr.chongyun_cloud_parting_star',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Chongyun.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Chongyun.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Chongyun.s3.p3),
            },
        ],
    },
});

const TalentValues = {
    A1AtkSpeed: 8,
    A4Damage: 100,
    A4ResCryo: -10,
    C1Damage: 50,
    C2CdRecovery: 15,
    C6BurstDamage: 15,
};

export const Chongyun = new DbObjectChar({
    name: 'chongyun',
    serializeId: 6,
    gameId: 10000036,
    iconClass: "char-icon-chongyun",
    rarity: 4,
    element: 'cryo',
    weapon: 'claymore',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Chongyun,
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
        new FeatureDamage({
            category: 'attack',
            element: 'cryo',
            name: 'chongyun_ice_unleashed',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation1',
                    values: new ValueTable([TalentValues.C1Damage]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamageCharged({
            name: 'charged_spin',
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
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_burst_chongyun'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                allowed_infusion_cryo: 1,
            },
        }),
        new ConditionBoolean({
            name: 'chongyun_frost_field',
            serializeId: 1,
            title: 'talent_name.chongyun_frost_field',
            description: 'talent_descr.chongyun_frost_field',
        }),
        new ConditionStatic({
            title: 'talent_name.chongyun_steady_breathing',
            description: 'talent_descr.chongyun_steady_breathing',
            stats: {
                atk_speed_normal: TalentValues.A1AtkSpeed,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBoolean({
                    name: 'chongyun_frost_field',
                }),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.chongyun_layered_frost',
            description: 'talent_descr.chongyun_layered_frost',
            settings: {
                attack_infusion_cryo: 1,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionBoolean({
                    name: 'chongyun_frost_field',
                }),
            ],
        }),
        new ConditionStatic({
            name: 'chongyun_rimechaser_blade',
            title: 'talent_name.chongyun_rimechaser_blade',
            description: 'talent_descr.chongyun_rimechaser_blade_1',
            stats: {
                text_percent_dmg: TalentValues.A4Damage,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionBoolean({
            name: 'chongyun_rimechaser_blade',
            serializeId: 2,
            title: 'talent_name.chongyun_rimechaser_blade',
            description: 'talent_descr.chongyun_rimechaser_blade_2',
            stats: {
                enemy_res_cryo: TalentValues.A4ResCryo,
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
                    title: 'talent_name.chongyun_ice_unleashed',
                    description: 'talent_descr.chongyun_ice_unleashed',
                    stats: {
                        text_percent_dmg: TalentValues.C1Damage,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.chongyun_atmospheric_revolution',
                    description: 'talent_descr.chongyun_atmospheric_revolution',
                    stats: {
                        text_percent_cd: TalentValues.C2CdRecovery,
                    },
                }),
                new Condition({
                    stats: {
                        recovery: TalentValues.C2CdRecovery,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'chongyun_frost_field'}),
                    ],
                })
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
                    title: 'talent_name.chongyun_frozen_skies',
                    description: 'talent_descr.chongyun_frozen_skies',
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
                    name: 'chongyun_rally_of_four_blades',
                    serializeId: 3,
                    title: 'talent_name.chongyun_rally_of_four_blades',
                    description: 'talent_descr.chongyun_rally_of_four_blades',
                    stats: {
                        dmg_burst_chongyun: TalentValues.C6BurstDamage,
                    },
                }),
            ]
        },
    ]),
    partyData: {
        conditions: [
            new Condition({
                settings: {
                    allowed_infusion_cryo: 1,
                },
                subConditions: [
                    new ConditionBooleanWeaponType({
                        types: ['sword', 'claymore', 'polearm'],
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'party.chongyun_layered_frost',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.chongyun_layered_frost',
                description: 'talent_descr.chongyun_layered_frost',
                settings: {
                    attack_infusion_cryo: 1,
                },
            }),
            new ConditionBoolean({
                name: 'party.chongyun_frost_field',
                serializeId: 2,
                title: 'talent_name.chongyun_steady_breathing',
                description: 'talent_descr.chongyun_steady_breathing',
                info: {ascension: 1},
                stats: {
                    atk_speed_normal: TalentValues.A1AtkSpeed,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.chongyun_layered_frost'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.chongyun_rimechaser_blade',
                serializeId: 3,
                title: 'talent_name.chongyun_rimechaser_blade',
                description: 'talent_descr.chongyun_rimechaser_blade_2',
                info: {ascension: 4},
                stats: {
                    enemy_res_cryo: TalentValues.A4ResCryo,
                },
            }),
            new ConditionBoolean({
                name: 'party.chongyun_atmospheric_revolution',
                serializeId: 4,
                title: 'talent_name.chongyun_atmospheric_revolution',
                description: 'talent_descr.chongyun_atmospheric_revolution',
                info: {constellation: 2},
                stats: {
                    text_percent_cd: TalentValues.C2CdRecovery,
                    recovery: TalentValues.C2CdRecovery,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party.chongyun_layered_frost'}),
                ],
            }),
        ],
    },
});
