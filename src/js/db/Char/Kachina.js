import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionDropdown } from "../../classes/Condition/Dropdown";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
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
        gameId: charTalentTables.Kachina.s1_id,
        title: 'talent_name.kachina_cragbiter',
        description: 'talent_descr.kachina_cragbiter',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kachina.s1.p1),
            },
            {
                type: 'hits',
                name: 'normal_hit_2',
                table: [
                    new StatTable('normal_hit_2_1', charTalentTables.Kachina.s1.p2),
                    new StatTable('normal_hit_2_2', charTalentTables.Kachina.s1.p3),
                ],
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Kachina.s1.p4),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Kachina.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Kachina.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Kachina.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kachina.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kachina.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kachina.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kachina.s2_id,
        title: 'talent_name.kachina_go_go_turbo_twirly',
        description: 'talent_descr.kachina_go_go_turbo_twirly',
        items: [
            {
                unit: 'def',
                table: new StatTable('kachina_ride_dmg', charTalentTables.Kachina.s2.p1),
            },
            {
                unit: 'def',
                table: new StatTable('kachina_independed_dmg', charTalentTables.Kachina.s2.p2),
            },
            {
                unit: '',
                table: new StatTable('nightsoul_points_limit', charTalentTables.Kachina.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kachina.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kachina.s3_id,
        title: 'talent_name.kachina_time_to_get_serious',
        description: 'talent_descr.kachina_time_to_get_serious',
        items: [
            {
                unit: 'def',
                table: new StatTable('burst_dmg', charTalentTables.Kachina.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('kachina_duration', charTalentTables.Kachina.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kachina.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kachina.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A1GeoDmg: 20,
    A4SkillDmg: 20,
    C4Stack1: 8,
    C4Stack2: 12,
    C4Stack3: 16,
    C4Stack4: 20,
    C6DefDmg: 200,
};

const C4Values = [
    {
        title: 1, value: 1, serializeId: 1,
        conditions: [ new Condition({stats: {def_percent: TalentValues.C4Stack1}}) ],
    },
    {
        title: 2, value: 2, serializeId: 2,
        conditions: [ new Condition({stats: {def_percent: TalentValues.C4Stack2}}) ],
    },
    {
        title: 3, value: 3, serializeId: 3,
        conditions: [ new Condition({stats: {def_percent: TalentValues.C4Stack3}}) ],
    },
    {
        title: 4, value: 4, serializeId: 4,
        conditions: [ new Condition({stats: {def_percent: TalentValues.C4Stack4}}) ],
    },
];

export const Kachina = new DbObjectChar({
    name: 'kachina',
    serializeId: 90,
    gameId: 10000100,
    iconClass: 'char-icon-kachina',
    rarity: 4,
    element: 'geo',
    weapon: 'polearm',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Kachina,
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
        new FeatureDamageMultihit({
            name: 'normal_hit_2',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_2'),
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
        new FeatureDamageCharged({
            name: 'charged_hit',
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
            name: 'kachina_ride_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kachina_ride_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'kachina_independed_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kachina_independed_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'kachina_shield_dmg',
            element: 'geo',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6DefDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'kachina_mountain_echoes',
            serializeId: 1,
            title: 'talent_name.kachina_mountain_echoes',
            description: 'talent_descr.kachina_mountain_echoes',
            stats: {
                dmg_geo: TalentValues.A1GeoDmg,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kachina_the_weight_of_stone',
            description: 'talent_descr.kachina_the_weight_of_stone',
            stats: {
                text_percent: TalentValues.A4SkillDmg,
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
            source: 'ascension4',
            values: new ValueTable([TalentValues.A4SkillDmg]),
            condition: new ConditionAscensionChar({ascension: 4}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kachina_shards_are_gems_too',
                    description: 'talent_descr.kachina_shards_are_gems_too',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kachina_never_leave_home_without_turbo_twirly',
                    description: 'talent_descr.kachina_never_leave_home_without_turbo_twirly',
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
                new ConditionDropdown({
                    name: 'kachina_more_foes_more_caution',
                    serializeId: 3,
                    title: 'talent_name.kachina_more_foes_more_caution',
                    description: 'talent_descr.kachina_more_foes_more_caution',
                    values: C4Values,
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
                    title: 'talent_name.kachina_this_time_ive_gotta_win',
                    description: 'talent_descr.kachina_this_time_ive_gotta_win',
                    stats: {
                        text_percent_dmg: TalentValues.C6DefDmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionDropdown({
                name: 'party.kachina_more_foes_more_caution',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.kachina_more_foes_more_caution',
                description: 'talent_descr.kachina_more_foes_more_caution',
                values: C4Values,
                info: {constellation: 4},
            }),
        ],
    },
});
