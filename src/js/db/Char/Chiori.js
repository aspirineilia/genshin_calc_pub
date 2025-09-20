import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Chiori.s1_id,
        title: 'talent_name.chiori_weaving_blade',
        description: 'talent_descr.chiori_weaving_blade',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Chiori.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Chiori.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Chiori.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Chiori.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Chiori.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.Chiori.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Chiori.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Chiori.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Chiori.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Chiori.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Chiori.s2_id,
        title: 'talent_name.chiori_fluttering_hasode',
        description: 'talent_descr.chiori_fluttering_hasode',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'def',
                ],
                table: [
                    new StatTable('chiori_sode_dmg', charTalentTables.Chiori.s2.p1),
                    new StatTable('chiori_sode_dmg_def', charTalentTables.Chiori.s2.p2),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('chiori_sode_duration', charTalentTables.Chiori.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('chiori_sode_attack_interval', charTalentTables.Chiori.s2.p4),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'def',
                ],
                table: [
                    new StatTable('chiori_upward_sweep_dmg', charTalentTables.Chiori.s2.p5),
                    new StatTable('chiori_upward_sweep_dmg_def', charTalentTables.Chiori.s2.p6),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Chiori.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Chiori.s3_id,
        title: 'talent_name.chiori_twin_blades',
        description: 'talent_descr.chiori_twin_blades',
        items: [
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'def',
                ],
                table: [
                    new StatTable('burst_dmg', charTalentTables.Chiori.s3.p1),
                    new StatTable('burst_dmg_def', charTalentTables.Chiori.s3.p2),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Chiori.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Chiori.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A1Damage: 100,
    C2DamageRatio: 170,
    C6DefScale: 235,
};

export const Chiori = new DbObjectChar({
    name: 'chiori',
    serializeId: 84,
    gameId: 10000094,
    iconClass: "char-icon-chiori",
    rarity: 5,
    element: 'geo',
    weapon: 'sword',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Chiori,
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
            name: 'chiori_sode_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chiori_sode_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chiori_sode_dmg_def'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'chiori_upward_sweep_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chiori_upward_sweep_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chiori_upward_sweep_dmg_def'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'chiori_kinu_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingSource: 'constellation2',
                    scalingMultiplier: TalentValues.C2DamageRatio / 100,
                    values: Talents.get('skill.chiori_sode_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    scalingSource: 'constellation2',
                    scalingMultiplier: TalentValues.C2DamageRatio / 100,
                    values: Talents.get('skill.chiori_sode_dmg_def'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg_def'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.chiori_tailor_made',
            description: 'talent_descr.chiori_tailor_made_1',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.chiori_tailor_made_2',
            description: 'talent_descr.chiori_tailor_made_2',
            info: {ascension: 1},
            stats: {
                text_percent_dmg: TalentValues.A1Damage,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'chiori_tailor_made',
            serializeId: 1,
            title: 'talent_name.chiori_tailor_made_3',
            description: 'talent_descr.chiori_tailor_made_3',
            info: {ascension: 1},
            settings: {
                attack_infusion: 'geo',
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'chiori_the_finishing_touch',
            serializeId: 2,
            title: 'talent_name.chiori_the_finishing_touch',
            description: 'talent_descr.chiori_the_finishing_touch',
            info: {ascension: 4},
            stats: {
                dmg_geo: 20,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            source: 'constellation6',
            values: new ValueTable([TalentValues.C6DefScale]),
            condition: new ConditionAnd([
                new ConditionConstellation({constellation: 6}),
                new ConditionBoolean({name: 'chiori_sole_principle_pursuit'}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.chiori_six_paths_of_sage_silkcraft',
                    description: 'talent_descr.chiori_six_paths_of_sage_silkcraft',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.chiori_in_five_colors_dyed',
                    description: 'talent_descr.chiori_in_five_colors_dyed',
                    stats: {
                        text_percent_dmg: TalentValues.C2DamageRatio,
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
                    title: 'talent_name.chiori_a_tailors_three_courtesies',
                    description: 'talent_descr.chiori_a_tailors_three_courtesies',
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
                    name: 'chiori_sole_principle_pursuit',
                    serializeId: 3,
                    title: 'talent_name.chiori_sole_principle_pursuit',
                    description: 'talent_descr.chiori_sole_principle_pursuit',
                    stats: {
                        text_percent_dmg: TalentValues.C6DefScale,
                    },
                }),
            ],
        },
    ]),
});

