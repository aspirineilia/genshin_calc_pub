import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
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
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Ayaka.s1_id,
        title: 'talent_name.kamisato_ayaka_kabuki',
        description: 'talent_descr.kamisato_ayaka_kabuki',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Ayaka.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Ayaka.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Ayaka.s1.p3),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('normal_hit_4', charTalentTables.Ayaka.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Ayaka.s1.p7),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('charged_hit', charTalentTables.Ayaka.s1.p8),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Ayaka.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Ayaka.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Ayaka.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Ayaka.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Ayaka.s2_id,
        title: 'talent_name.kamisato_ayaka_hyouka',
        description: 'talent_descr.kamisato_ayaka_hyouka',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Ayaka.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ayaka.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Ayaka.s4_id,
        title: 'talent_name.kamisato_ayaka_soumetsu',
        description: 'talent_descr.kamisato_ayaka_soumetsu',
        items: [
            {
                table: new StatTable('ayaka_slashing_dmg', charTalentTables.Ayaka.s4.p1),
            },
            {
                table: new StatTable('ayaka_bladestorm_dmg', charTalentTables.Ayaka.s4.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Ayaka.s4.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ayaka.s4.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Ayaka.s4.p5),
            },
        ],
    },
    other: {
        maxLevel: 1,
        title: 'talent_name.kamisato_ayaka_senho',
        description: 'talent_descr.kamisato_ayaka_senho',
        items: [
            {
                unit: 'unit',
                table: new StatTable('sprint_activation_cost', charTalentTables.Ayaka.s3.p1),
            },
            {
                unit: 'per_sec',
                table: new StatTable('sprint_stamina_drain', charTalentTables.Ayaka.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('ayaka_infusion_duration', charTalentTables.Ayaka.s3.p3),
            },
        ],
    },
});

const TalentValues = {
    A1NormalBonus: 30,
    A1ChargedBonus: 30,
    A4CryoDamage: 18,
    C2BurstDamage: 20,
    C4DefReduce: 30,
    C6ChargedDamage: 298,
};

export const Ayaka = new DbObjectChar({
    name: 'kamisato_ayaka',
    serializeId: 36,
    gameId: 10000002,
    iconClass: "char-icon-kamisato-ayaka",
    rarity: 5,
    element: 'cryo',
    weapon: 'sword',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Ayaka,
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    hits: 3,
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
            hits: 3,
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
                    hits: 3,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            isChild: true,
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
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
            name: 'ayaka_slashing_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.ayaka_slashing_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'ayaka_bladestorm_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.ayaka_bladestorm_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'ayaka_add_slashing_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    scalingSource: 'constellation2',
                    scalingMultiplier: TalentValues.C2BurstDamage / 100,
                    values: Talents.get('burst.ayaka_slashing_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureDamageBurst({
            name: 'ayaka_add_bladestorm_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    scalingSource: 'constellation2',
                    scalingMultiplier: TalentValues.C2BurstDamage / 100,
                    values: Talents.get('burst.ayaka_bladestorm_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                allowed_infusion_cryo: 1,
            },
        }),
        new ConditionBoolean({
            name: 'ayaka_senho',
            serializeId: 1,
            title: 'talent_name.kamisato_ayaka_senho',
            description: 'talent_descr.kamisato_ayaka_senho_talent',
            settings: {
                attack_infusion_cryo: 1,
            },
        }),
        new ConditionBoolean({
            name: 'ayaka_amatsumi_kunitsumi_ihahigoto',
            serializeId: 2,
            title: 'talent_name.kamisato_ayaka_amatsumi_kunitsumi_sanctification',
            description: 'talent_descr.kamisato_ayaka_amatsumi_kunitsumi_sanctification',
            stats: {
                dmg_normal: TalentValues.A1NormalBonus,
                dmg_charged: TalentValues.A1ChargedBonus,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'ayaka_kanten_senmyou_norito',
            serializeId: 3,
            title: 'talent_name.kamisato_ayaka_kanten_senmyou_blessing',
            description: 'talent_descr.kamisato_ayaka_kanten_senmyou_blessing',
            stats: {
                dmg_cryo: TalentValues.A4CryoDamage,
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
                    title: 'talent_name.kamisato_ayaka_snowswept_sakura',
                    description: 'talent_descr.kamisato_ayaka_snowswept_sakura',
                    stats: {
                        text_percent_chance: 50,
                    },
                })
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kamisato_ayaka_blizzard_blade_seki_no_to',
                    description: 'talent_descr.kamisato_ayaka_blizzard_blade_seki_no_to',
                    stats: {
                        text_percent_dmg: TalentValues.C2BurstDamage,
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
                    name: 'ayaka_eikyo_ryuuhan',
                    serializeId: 4,
                    title: 'talent_name.kamisato_ayaka_ebb_and_flow',
                    description: 'talent_descr.kamisato_ayaka_ebb_and_flow',
                    stats: {
                        enemy_def_reduce: TalentValues.C4DefReduce,
                    },
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_elemental_bonus : 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'ayaka_ai_suigetsu',
                    serializeId: 5,
                    title: 'talent_name.kamisato_ayaka_dance_of_suigetsu',
                    description: 'talent_descr.kamisato_ayaka_dance_of_suigetsu',
                    stats: {
                        dmg_charged: TalentValues.C6ChargedDamage,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.ayaka_eikyo_ryuuhan',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.kamisato_ayaka_ebb_and_flow',
                description: 'talent_descr.kamisato_ayaka_ebb_and_flow',
                stats: {
                    enemy_def_reduce: TalentValues.C4DefReduce,
                },
                info: {
                    constellation: 4,
                },
            }),
        ],
    },
});
