import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumberBondOfLife } from "../../classes/Condition/Number/BondOfLife";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { StatTable } from "../../classes/StatTable";
import { charTalentTables } from "../generated/CharTalentTables";
import { charTables } from "../generated/CharTables";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { ValueTable } from "../../classes/ValueTable";
import { ConditionAnd } from "../../classes/Condition/And";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplierBondOfLife } from "../../classes/Feature2/Multiplier/BondOfLife";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeatureMultiplierClorinde } from "../../classes/Feature2/Multiplier/Clorinde";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Clorinde.s1_id,
        title: 'talent_name.clorinde_oath_of_hunting_shadows',
        description: 'talent_descr.clorinde_oath_of_hunting_shadows',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Clorinde.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Clorinde.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Clorinde.s1.p3),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('normal_hit_4', charTalentTables.Clorinde.s1.p5),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Clorinde.s1.p10),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Clorinde.s1.p11),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Clorinde.s1.p12),
            },
            {
                table: new StatTable('plunge', charTalentTables.Clorinde.s1.p13),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Clorinde.s1.p14),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Clorinde.s1.p15),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Clorinde.s2_id,
        title: 'talent_name.clorinde_hunters_vigil',
        description: 'talent_descr.clorinde_hunters_vigil',
        items: [
            {
                type: 'separated',
                table: [
                    new StatTable('clorinde_wild_hunt_dmg', charTalentTables.Clorinde.s2.p1),
                    new StatTable('clorinde_wild_hunt_2_dmg', charTalentTables.Clorinde.s2.p2),
                ],
            },
            {
                table: new StatTable('clorinde_wild_hunt_bol', charTalentTables.Clorinde.s2.p3),
            },
            {
                type: 'separated',
                table: [
                    new StatTable('clorinde_impale_the_night_dmg', charTalentTables.Clorinde.s2.p4),
                    new StatTable('clorinde_impale_the_night_2_dmg', charTalentTables.Clorinde.s2.p5),
                    new StatTable('clorinde_impale_the_night_3_dmg', charTalentTables.Clorinde.s2.p7),
                ],
                counts: ['', '', 3],
            },
            {
                type: 'separated',
                table: [
                    new StatTable('clorinde_impale_the_night_heal', [0]),
                    new StatTable('clorinde_impale_the_night_2_heal', charTalentTables.Clorinde.s2.p6),
                    new StatTable('clorinde_impale_the_night_3_heal', charTalentTables.Clorinde.s2.p8),
                ],
            },
            {
                table: new StatTable('clorinde_conversion', charTalentTables.Clorinde.s2.p9),
            },
            {
                table: new StatTable('surging_blade_dmg', charTalentTables.Clorinde.s2.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Clorinde.s2.p11),
            },
            {
                unit: 'sec',
                table: new StatTable('clorinde_duration', charTalentTables.Clorinde.s2.p12),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Clorinde.s2.p13),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Clorinde.s3_id,
        title: 'talent_name.clorinde_last_lightfall',
        description: 'talent_descr.clorinde_last_lightfall',
        items: [
            {
                type: 'multihit',
                hits: 5,
                table: new StatTable('burst_dmg', charTalentTables.Clorinde.s3.p1),
            },
            {
                table: new StatTable('clorinde_burst_bol', charTalentTables.Clorinde.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Clorinde.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Clorinde.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A4CritRate: 10,
    C0ElectroBonus: 20,
    C0ElectroBonusMax: 1800,
    C1Damage: 30,
    C2ElectroBonus: 30,
    C2ElectroBonusMax: 2700,
    C4BurstBonus: 2,
    C4BurstBonusCap: 200,
    C6CritRate: 10,
    C6CritDmg: 70,
    C6Damage: 200,
};

export const Clorinde = new DbObjectChar({
    name: 'clorinde',
    serializeId: 86,
    gameId: 10000098,
    iconClass: 'char-icon-clorinde',
    rarity: 5,
    element: 'electro',
    weapon: 'sword',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Clorinde,
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
                new ConditionBoolean({name: 'clorinde_night_watch'}),
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
                new ConditionBoolean({name: 'clorinde_night_watch'}),
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
                new ConditionBoolean({name: 'clorinde_night_watch'}),
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
                new ConditionBoolean({name: 'clorinde_night_watch'}),
            ]),
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
            condition: new ConditionNot([
                new ConditionBoolean({name: 'clorinde_night_watch'}),
            ]),
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
            condition: new ConditionNot([
                new ConditionBoolean({name: 'clorinde_night_watch'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'clorinde_night_watch'}),
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
        new FeatureDamageNormal({
            name: 'clorinde_wild_hunt_1_dmg',
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.clorinde_wild_hunt_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'clorinde_night_watch'}),
        }),
        new FeatureDamageNormal({
            name: 'clorinde_wild_hunt_2_dmg',
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.clorinde_wild_hunt_2_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'clorinde_night_watch'}),
        }),

        new FeatureDamageNormal({
            name: 'clorinde_impale_the_night_1_dmg',
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.clorinde_impale_the_night_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'clorinde_night_watch'}),
        }),
        new FeatureDamageNormal({
            name: 'clorinde_impale_the_night_2_dmg',
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.clorinde_impale_the_night_2_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'clorinde_night_watch'}),
        }),
        new FeatureDamageNormal({
            name: 'clorinde_impale_the_night_3_dmg',
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.clorinde_impale_the_night_3_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'clorinde_night_watch'}),
        }),
        new FeatureDamageNormal({
            name: 'clorinde_nightwatch_shade_dmg',
            element: 'electro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation1',
                    values: new ValueTable([TalentValues.C1Damage]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'clorinde_night_watch'}),
                new ConditionConstellation({constellation: 1}),
            ]),
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'clorinde_impale_the_night_2_heal',
            subtractBoL: true,
            multipliers: [
                new FeatureMultiplierBondOfLife({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.clorinde_impale_the_night_2_heal'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'clorinde_impale_the_night_3_heal',
            subtractBoL: true,
            multipliers: [
                new FeatureMultiplierBondOfLife({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.clorinde_impale_the_night_3_heal'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'surging_blade_dmg',
            element: 'electro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.surging_blade_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'electro',
            damageBonuses: ['dmg_burst_clorinde'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'clorinde_glimbright_shade_dmg',
            element: 'electro',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6Damage]),
                }),
            ],
            condition: new ConditionAnd([
                new ConditionConstellation({constellation: 6}),
            ]),
        }),
    ],
    conditions: [
        new ConditionNumberBondOfLife({
            serializeId: 1,
        }),
        new Condition({
            stats: {
                clorinde_electro_dmg_max: TalentValues.C0ElectroBonusMax,
            },
        }),
        new Condition({
            settings: {
                clorinde_stacks_level: 2,
            },
            subConditions: [
                new ConditionConstellation({constellation: 2}),
            ]
        }),
        new ConditionBoolean({
            name: 'clorinde_night_watch',
            serializeId: 2,
            title: 'talent_name.clorinde_night_watch',
            description: 'talent_descr.clorinde_night_watch',
        }),
        new ConditionStacks({
            name: 'clorinde_dark_shattering_flame',
            serializeId: 3,
            title: 'talent_name.clorinde_dark_shattering_flame',
            description: 'talent_descr.clorinde_dark_shattering_flame',
            maxStacks: 3,
            levelSetting: 'clorinde_stacks_level',
            info: {ascension: 1},
            stats: [
                new StatTable('dmg_electro_clorinde', [TalentValues.C0ElectroBonus, TalentValues.C2ElectroBonus]),
                new StatTable('text_value_max', [TalentValues.C0ElectroBonusMax]),
            ],
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'clorinde_lawful_remuneration',
            serializeId: 4,
            title: 'talent_name.clorinde_lawful_remuneration',
            description: 'talent_descr.clorinde_lawful_remuneration',
            maxStacks: 2,
            info: {ascension: 4},
            stats: [
                new StatTable('crit_rate', [TalentValues.A4CritRate]),
            ],
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        new PostEffectStats({
            from: 'bond_of_life',
            percent: new StatTable('dmg_burst_clorinde', [TalentValues.C4BurstBonus * 100]),
            statCap: new ValueTable([TalentValues.C4BurstBonusCap]),
            conditions: [
                new ConditionConstellation({constellation: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplierClorinde({
            source: 'ascension1',
            leveling: 'clorinde_stacks_level',
            stacksLeveling: 'clorinde_dark_shattering_flame',
            values: new ValueTable([TalentValues.C0ElectroBonus, TalentValues.C2ElectroBonus]),
            condition: new ConditionAscensionChar({ascension: 1}),
            target: new FeatureMultiplierTarget({
                damageElements: ['electro'],
                damageTypes: ['normal', 'burst'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.clorinde_from_this_day_i_pass_the_candles_shadow_veil',
                    description: 'talent_descr.clorinde_from_this_day_i_pass_the_candles_shadow_veil',
                    stats: {
                        text_percent_dmg: TalentValues.C1Damage,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.clorinde_now_as_we_face_the_perils_of_the_long_night',
                    description: 'talent_descr.clorinde_now_as_we_face_the_perils_of_the_long_night',
                    stats: {
                        text_percent: TalentValues.C2ElectroBonus,
                        text_value: TalentValues.C2ElectroBonusMax,
                        clorinde_electro_dmg_max: TalentValues.C2ElectroBonusMax - TalentValues.C0ElectroBonusMax,
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
                    title: 'talent_name.clorinde_to_enshrine_tears_life_and_love',
                    description: 'talent_descr.clorinde_to_enshrine_tears_life_and_love',
                    stats: {
                        text_percent: TalentValues.C4BurstBonus,
                        text_percent_max: TalentValues.C4BurstBonusCap,
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
                    name: 'clorinde_and_so_shall_i_never_despair',
                    serializeId: 6,
                    title: 'talent_name.clorinde_and_so_shall_i_never_despair',
                    description: 'talent_descr.clorinde_and_so_shall_i_never_despair_1',
                    stats: {
                        crit_rate: TalentValues.C6CritRate,
                        crit_dmg: TalentValues.C6CritDmg,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.clorinde_and_so_shall_i_never_despair',
                    description: 'talent_descr.clorinde_and_so_shall_i_never_despair_2',
                    stats: {
                        text_percent_dmg: TalentValues.C6Damage,
                    },
                }),
            ],
        },
    ]),
});
