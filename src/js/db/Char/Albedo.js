import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Albedo.s1_id,
        title: 'talent_name.albedo_favonius_bladework_weiss',
        description: 'talent_descr.albedo_favonius_bladework_weiss',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Albedo.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Albedo.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Albedo.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Albedo.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Albedo.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Albedo.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.Albedo.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Albedo.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Albedo.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Albedo.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Albedo.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Albedo.s2_id,
        title: 'talent_name.albedo_solar_isotoma',
        description: 'talent_descr.albedo_solar_isotoma',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Albedo.s2.p1),
            },
            {
                unit: 'def',
                table: new StatTable('albedo_blossom', charTalentTables.Albedo.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Albedo.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Albedo.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Albedo.s3_id,
        title: 'talent_name.albedo_tectonic_tide',
        description: 'talent_descr.albedo_tectonic_tide',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Albedo.s3.p1),
            },
            {
                table: new StatTable('albedo_fatal_blossom', charTalentTables.Albedo.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Albedo.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Albedo.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A1HpThreshold: 50,
    A1SkillBonus: 25,
    A4Mastery: 125,
    C1Energy: 1.2,
    C2DefBonus: 30,
    C4PlungeDmg: 30,
    C6ShieldDmg: 17,
};

export const Albedo = new DbObjectChar({
    name: 'albedo',
    serializeId: 1,
    gameId: 10000038,
    iconClass: "char-icon-albedo",
    rarity: 5,
    element: 'geo',
    weapon: 'sword',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Albedo,
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
            name: 'skill_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'albedo_blossom',
            element: 'geo',
            damageBonuses: ['dmg_skill_albedo'],
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.albedo_blossom'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'albedo_fatal_blossom',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.albedo_fatal_blossom'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'albedo_calcite_might',
            serializeId: 1,
            title: 'talent_name.albedo_calcite_might',
            description: 'talent_descr.albedo_calcite_might',
            stats: {
                text_percent_hp: TalentValues.A1HpThreshold,
                dmg_skill_albedo: TalentValues.A1SkillBonus,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'albedo_homuncular_nature',
            serializeId: 2,
            title: 'talent_name.albedo_homuncular_nature',
            description: 'talent_descr.albedo_homuncular_nature',
            stats: {
                mastery: TalentValues.A4Mastery,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            source: 'constellation2',
            leveling: 'albedo_opening_of_hanerozoic',
            values: new ValueTable([
                TalentValues.C2DefBonus,
                TalentValues.C2DefBonus * 2,
                TalentValues.C2DefBonus * 3,
                TalentValues.C2DefBonus * 4,
            ]),
            condition: new ConditionAnd([
                new ConditionConstellation({constellation: 2}),
                new ConditionBoolean({name: 'albedo_opening_of_hanerozoic'}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['burst'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.albedo_flower_of_eden',
                    description: 'talent_descr.albedo_flower_of_eden',
                    stats: {
                        text_decimal_energy: TalentValues.C1Energy,
                    },
                })
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'albedo_opening_of_hanerozoic',
                    serializeId: 3,
                    title: 'talent_name.albedo_opening_of_phanerozoic',
                    description: 'talent_descr.albedo_opening_of_phanerozoic',
                    maxStacks: 4,
                    stats: [
                        new StatTable('text_percent_dmg', [TalentValues.C2DefBonus]),
                    ],
                })
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
                    name: 'albedo_descent_of_divinity',
                    serializeId: 4,
                    title: 'talent_name.albedo_descent_of_divinity',
                    description: 'talent_descr.albedo_descent_of_divinity',
                    stats: {
                        dmg_plunge: TalentValues.C4PlungeDmg,
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
                    name: 'albedo_dust_of_purification',
                    serializeId: 5,
                    title: 'talent_name.albedo_dust_of_purification',
                    description: 'talent_descr.albedo_dust_of_purification',
                    stats: {
                        dmg_all: TalentValues.C6ShieldDmg,
                    },
                }),
            ]
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.albedo_homuncular_nature',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.albedo_homuncular_nature',
                description: 'talent_descr.albedo_homuncular_nature',
                stats: {
                    mastery: TalentValues.A4Mastery,
                },
                info: {
                    ascension: 4,
                },
            }),
            new ConditionBoolean({
                name: 'party.albedo_descent_of_divinity',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.albedo_descent_of_divinity',
                description: 'talent_descr.albedo_descent_of_divinity',
                stats: {
                    dmg_plunge: TalentValues.C4PlungeDmg,
                },
                info: {
                    constellation: 4,
                },
            }),
            new ConditionBoolean({
                name: 'party.albedo_dust_of_purification',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.albedo_dust_of_purification',
                statTitle: 'talent_name.whisper_of_the_jinn_mastery',
                description: 'talent_descr.albedo_dust_of_purification',
                stats: {
                    dmg_all: TalentValues.C6ShieldDmg,
                },
                info: {
                    constellation: 6,
                },
            }),
        ],
    }
});

