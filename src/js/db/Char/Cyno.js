import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
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
        gameId: charTalentTables.Cyno.s1_id,
        title: 'talent_name.cyno_invokers_spear',
        description: 'talent_descr.cyno_invokers_spear',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Cyno.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Cyno.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Cyno.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Cyno.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Cyno.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Cyno.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Cyno.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Cyno.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Cyno.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Cyno.s2_id,
        title: 'talent_name.cyno_chasmic_soulfarer',
        description: 'talent_descr.cyno_chasmic_soulfarer',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Cyno.s2.p1),
            },
            {
                table: new StatTable('cyno_mortuary_rite_dmg', charTalentTables.Cyno.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cyno_duration_bonus', charTalentTables.Cyno.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Cyno.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cyno_cd', charTalentTables.Cyno.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Cyno.s3_id,
        title: 'talent_name.cyno_wolfs_swiftness',
        description: 'talent_descr.cyno_wolfs_swiftness',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Cyno.s3.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Cyno.s3.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Cyno.s3.p3),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Cyno.s3.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Cyno.s3.p6),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Cyno.s3.p7),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Cyno.s3.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Cyno.s3.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Cyno.s3.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Cyno.s3.p11),
            },
            {
                unit: '',
                table: new StatTable('cyno_mastery_bonus', charTalentTables.Cyno.s3.p12),
            },
            {
                unit: 'sec',
                table: new StatTable('cyno_duration', charTalentTables.Cyno.s3.p13),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Cyno.s3.p14),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Cyno.s3.p15),
            },
        ],
    },
});

const TalentValues = {
    BurstMastery: 100,
    A1SkillDmgBonus: 35,
    A1DustStalkerDmg: 100,
    A4NormalMasteryDmg: 150,
    A4DustStalkerMasteryDmg: 250,
    C1AtkSpeed: 20,
    C2ElectroDmg: 10,
};

export const Cyno = new DbObjectChar({
    name: 'cyno',
    serializeId: 59,
    gameId: 10000071,
    iconClass: "char-icon-cyno",
    rarity: 5,
    element: 'electro',
    weapon: 'polearm',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Cyno,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
                        }),
                    ],
                },
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            category: 'attack',
            element: 'electro',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_burst',
                            values: Talents.get('burst.normal_hit_4'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            element: 'electro',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.normal_hit_5'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.charged_hit'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.plunge'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.plunge_low'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.plunge_high'),
                }),
            ],
            condition: new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'electro',
            damageBonuses: ['dmg_skill_cyno'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'cyno_mortuary_rite_dmg',
            element: 'electro',
            damageBonuses: ['dmg_skill_cyno'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.cyno_mortuary_rite_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'cyno_duststalker_bolt_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1DustStalkerDmg]),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'ascension4',
                    values: new ValueTable([TalentValues.A4DustStalkerMasteryDmg]),
                    condition: new ConditionAscensionChar({ascension: 4}),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
                new ConditionAscensionChar({ascension: 1}),
            ]),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            source: 'ascension4',
            values: new ValueTable([TalentValues.A4NormalMasteryDmg]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
                new ConditionAscensionChar({ascension: 4}),
            ]),
            target: new FeatureMultiplierTarget({
                damageElements: ['electro'],
                damageTypes: ['normal'],
            }),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'cyno_wolfs_swiftness',
            serializeId: 1,
            title: 'talent_name.cyno_pactsworn_pathclearer',
            description: 'talent_descr.cyno_pactsworn_pathclearer',
            stats: {
                mastery: TalentValues.BurstMastery,
            },
        }),
        new ConditionBoolean({
            name: 'cyno_featherfall_judgment',
            serializeId: 2,
            title: 'talent_name.cyno_featherfall_judgment',
            description: 'talent_descr.cyno_featherfall_judgment',
            info: {ascension: 1},
            stats: {
                dmg_skill_cyno: TalentValues.A1SkillDmgBonus,
                text_percent_dmg: TalentValues.A1DustStalkerDmg,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.cyno_authority_over_the_nine_bows',
            description: 'talent_descr.cyno_authority_over_the_nine_bows',
            info: {ascension: 4},
            stats: {
                text_percent_dmg: TalentValues.A4NormalMasteryDmg,
                text_percent_dmg2: TalentValues.A4DustStalkerMasteryDmg,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
                new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.cyno_unceasing_vigil',
                    description: 'talent_descr.cyno_unceasing_vigil',
                    stats: {
                        atk_speed_normal: TalentValues.C1AtkSpeed,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'cyno_wolfs_swiftness'}),
                        new ConditionBoolean({name: 'cyno_featherfall_judgment'}),
                        new ConditionAscensionChar({ascension: 1}),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'cyno_homecoming_of_spirits',
                    serializeId: 3,
                    title: 'talent_name.cyno_homecoming_of_spirits',
                    description: 'talent_descr.cyno_homecoming_of_spirits',
                    maxStacks: 5,
                    stats: [
                        new StatTable('dmg_electro', [TalentValues.C2ElectroDmg]),
                    ],
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
                    title: 'talent_name.cyno_forbidding_guard',
                    description: 'talent_descr.cyno_forbidding_guard',
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
                    title: 'talent_name.cyno_just_scales',
                    description: 'talent_descr.cyno_just_scales',
                }),
            ],
        },
    ]),
});
