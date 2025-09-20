import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
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
        gameId: charTalentTables.Klee.s1_id,
        title: 'talent_name.klee_kaboom',
        description: 'talent_descr.klee_kaboom',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Klee.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Klee.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Klee.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Klee.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Klee.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Klee.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Klee.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Klee.s1.p8),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.Klee.s2_id,
        title: 'talent_name.klee_jumpy_dumpty',
        description: 'talent_descr.klee_jumpy_dumpty',
        items: [
            {
                table: new StatTable('klee_jumpy_dumpty', charTalentTables.Klee.s2.p1),
            },
            {
                table: new StatTable('klee_mine', charTalentTables.Klee.s2.p4),
            },
            {
                table: new StatTable('klee_mine_duration', charTalentTables.Klee.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Klee.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Klee.s3_id,
        title: 'talent_name.klee_sparks_n_splash',
        description: 'talent_descr.klee_sparks_n_splash',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Klee.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Klee.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Klee.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Klee.s3.p3),
            },
        ],
    },
});

const TalentValues = {
    A1ChargedBonus: 50,
    C1Damage: 120,
    C2DefReduce: 23,
    C4BurstDamage: 555,
    C6PyroBonus: 10,
};

export const Klee = new DbObjectChar({
    name: 'klee',
    serializeId: 15,
    gameId: 10000029,
    iconClass: "char-icon-klee",
    rarity: 5,
    element: 'pyro',
    weapon: 'catalyst',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Klee,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'klee_jumpy_dumpty',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.klee_jumpy_dumpty'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'klee_mine',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.klee_mine'),
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
        new FeatureDamageBurst({
            name: 'klee_chained_reactions',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    scalingSource: 'constellation1',
                    scalingMultiplier: TalentValues.C1Damage / 100,
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamage({
            name: 'klee_sparkly_explosion',
            category: 'burst',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation4',
                    values: new ValueTable([TalentValues.C4BurstDamage]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'klee_pounding_surprise',
            serializeId: 1,
            title: 'talent_name.klee_pounding_surprise',
            description: 'talent_descr.klee_pounding_surprise',
            stats: {
                dmg_charged: TalentValues.A1ChargedBonus,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.klee_sparkling_burst',
            description: 'talent_descr.klee_sparkling_burst',
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
                    title: 'talent_name.klee_chained_reactions',
                    description: 'talent_descr.klee_chained_reactions',
                    stats: {
                        text_percent_dmg: TalentValues.C1Damage,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'klee_explosive_frags',
                    serializeId: 3,
                    title: 'talent_name.klee_explosive_frags',
                    description: 'talent_descr.klee_explosive_frags',
                    stats: {
                        enemy_def_reduce: TalentValues.C2DefReduce,
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
                    title: 'talent_name.klee_sparkly_explosion',
                    description: 'talent_descr.klee_sparkly_explosion',
                    stats: {
                        text_percent_dmg: TalentValues.C4BurstDamage,
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
                    name: 'klee_blazing_delight',
                    serializeId: 4,
                    title: 'talent_name.klee_blazing_delight',
                    description: 'talent_descr.klee_blazing_delight',
                    stats: {
                        dmg_pyro: TalentValues.C6PyroBonus,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.klee_explosive_frags',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.klee_explosive_frags',
                description: 'talent_descr.klee_explosive_frags',
                info: {constellation: 2},
                stats: {
                    enemy_def_reduce: TalentValues.C2DefReduce,
                },
            }),
            new ConditionBoolean({
                name: 'party.klee_blazing_delight',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.klee_blazing_delight',
                description: 'talent_descr.klee_blazing_delight',
                info: {constellation: 6},
                stats: {
                    dmg_pyro: TalentValues.C6PyroBonus,
                },
            }),
        ],
    },
});
