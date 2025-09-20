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
        gameId: charTalentTables.Heizou.s1_id,
        title: 'talent_name.shikanoin_heizou_fudou_style_martial_arts',
        description: 'talent_descr.shikanoin_heizou_fudou_style_martial_arts',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Heizou.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Heizou.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Heizou.s1.p3),
            },
            {
                type: 'hits',
                name: 'normal_hit_4',
                table: [
                    new StatTable('normal_hit_4_1', charTalentTables.Heizou.s1.p4),
                    new StatTable('normal_hit_4_2', charTalentTables.Heizou.s1.p5),
                    new StatTable('normal_hit_4_3', charTalentTables.Heizou.s1.p6),
                ],
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Heizou.s1.p7),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Heizou.s1.p8),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Heizou.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Heizou.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Heizou.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Heizou.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Heizou.s2_id,
        title: 'talent_name.shikanoin_heizou_heartstopper_strike',
        description: 'talent_descr.shikanoin_heizou_heartstopper_strike',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Heizou.s2.p1),
            },
            {
                table: new StatTable('heizou_declension_dmg', charTalentTables.Heizou.s2.p2),
            },
            {
                table: new StatTable('heizou_conviction_dmg', charTalentTables.Heizou.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('heizou_duration', charTalentTables.Heizou.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Heizou.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Heizou.s3_id,
        title: 'talent_name.shikanoin_heizou_windmuster_kick',
        description: 'talent_descr.shikanoin_heizou_windmuster_kick',
        items: [
            {
                table: new StatTable('heizou_vacuum_slugger_dmg', charTalentTables.Heizou.s3.p1),
            },
            {
                table: new StatTable('heizou_windmuster_iris_dmg', charTalentTables.Heizou.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Heizou.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Heizou.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A4Mastery: 80,
    C1AtkSpeed: 15,
    C6CritRate: 4,
    C6CritDmg: 32,
};

export const Heizou = new DbObjectChar({
    name: 'shikanoin_heizou',
    serializeId: 53,
    gameId: 10000059,
    iconClass: "char-icon-shikanoin-heizou",
    rarity: 4,
    element: 'anemo',
    weapon: 'catalyst',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Heizou,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_4',
            category: 'attack',
            damageType: 'normal',
            element: 'anemo',
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_2'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4_3'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            element: 'anemo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_2',
            element: 'anemo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_3',
            element: 'anemo',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'heizo_skill_1_dmg',
            element: 'anemo',
            critRateBonuses: ['crit_rate_heizou1'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.heizou_declension_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'heizo_skill_2_dmg',
            element: 'anemo',
            critRateBonuses: ['crit_rate_heizou2'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: 2,
                    scalingSource: 'stacks',
                    values: Talents.get('skill.heizou_declension_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'heizo_skill_3_dmg',
            element: 'anemo',
            critRateBonuses: ['crit_rate_heizou3'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: 3,
                    scalingSource: 'stacks',
                    values: Talents.get('skill.heizou_declension_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'heizo_skill_4_dmg',
            element: 'anemo',
            critRateBonuses: ['crit_rate_heizou4'],
            critDamageBonuses: ['crit_dmg_heizou4'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: 4,
                    scalingSource: 'stacks',
                    values: Talents.get('skill.heizou_declension_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.heizou_conviction_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'heizou_vacuum_slugger_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.heizou_vacuum_slugger_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_pyro_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.heizou_windmuster_iris_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_hydro_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.heizou_windmuster_iris_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_cryo_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.heizou_windmuster_iris_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_electro_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.heizou_windmuster_iris_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'heizou_declension_stacks',
            serializeId: 1,
            maxStacks: 4,
            isHidden: true,
        }),
        new ConditionStatic({
            title: 'talent_name.shikanoin_heizou_paradoxical_practice',
            description: 'talent_descr.shikanoin_heizou_paradoxical_practice',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.shikanoin_heizou_penetrative_reasoning',
            description: 'talent_descr.shikanoin_heizou_penetrative_reasoning',
            stats: {
                text_value: TalentValues.A4Mastery,
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
                new ConditionBoolean({
                    name: 'party.shikanoin_heizou_named_juvenile_casebook',
                    serializeId: 2,
                    title: 'talent_name.shikanoin_heizou_named_juvenile_casebook',
                    description: 'talent_descr.shikanoin_heizou_named_juvenile_casebook',
                    stats: {
                        atk_speed_normal: TalentValues.C1AtkSpeed,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.shikanoin_heizou_investigative_collection',
                    description: 'talent_descr.shikanoin_heizou_investigative_collection',
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
                    title: 'talent_name.shikanoin_heizou_tome_of_lies',
                    description: 'talent_descr.shikanoin_heizou_tome_of_lies',
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
                    title: 'talent_name.shikanoin_heizou_curious_casefiles',
                    description: 'talent_descr.shikanoin_heizou_curious_casefiles',
                    stats: {
                        crit_rate_heizou1: TalentValues.C6CritRate,
                        crit_rate_heizou2: TalentValues.C6CritRate * 2,
                        crit_rate_heizou3: TalentValues.C6CritRate * 3,
                        crit_rate_heizou4: TalentValues.C6CritRate * 4,
                        crit_dmg_heizou4: TalentValues.C6CritDmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.shikanoin_heizou_penetrative_reasoning',
                serializeId: 1,
                title: 'talent_name.shikanoin_heizou_penetrative_reasoning',
                description: 'talent_descr.shikanoin_heizou_penetrative_reasoning',
                rotation: 'party',
                info: {ascension: 4},
                stats: {
                    text_value: TalentValues.A4Mastery,
                    mastery: TalentValues.A4Mastery,
                },
            }),
        ],
    },
});
