import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionLevels } from "../../classes/Condition/Levels";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierStatic } from "../../classes/Feature2/Multiplier/Static";
import { FeatureStatic } from "../../classes/Feature2/Static";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Aloy.s1_id,
        title: 'talent_name.aloy_rapid_fire',
        description: 'talent_descr.aloy_rapid_fire',
        items: [
            {
                type: 'hits',
                name: 'normal_hit_1',
                table: [
                    new StatTable('normal_hit_1_1', charTalentTables.Aloy.s1.p1),
                    new StatTable('normal_hit_1_2', charTalentTables.Aloy.s1.p2),
                ],
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Aloy.s1.p3),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Aloy.s1.p4),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Aloy.s1.p5),
            },
            {
                table: new StatTable('aimed', charTalentTables.Aloy.s1.p6),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Aloy.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Aloy.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Aloy.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Aloy.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Aloy.s2_id,
        title: 'talent_name.aloy_frozen_wilds',
        description: 'talent_descr.aloy_frozen_wilds',
        items: [
            {
                table: new StatTable('aloy_freeze_bomb_dmg', charTalentTables.Aloy.s2.p1),
            },
            {
                table: new StatTable('aloy_chillwater_bomblets', charTalentTables.Aloy.s2.p2),
            },
            {
                table: new StatTable('aloy_atk_decrease', charTalentTables.Aloy.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('aloy_atk_decrease_duration', charTalentTables.Aloy.s2.p4),
            },
            {
                type: 'separated',
                table: [
                    new StatTable('aloy_coil_bonus', charTalentTables.Aloy.s2.p5),
                    new StatTable('aloy_coil_bonus_2', charTalentTables.Aloy.s2.p6),
                    new StatTable('aloy_coil_bonus_3', charTalentTables.Aloy.s2.p7),
                ],
            },
            {
                table: new StatTable('aloy_rushing_ice_bonus', charTalentTables.Aloy.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('aloy_rushing_ice_duration', charTalentTables.Aloy.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Aloy.s2.p10),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Aloy.s3_id,
        title: 'talent_name.aloy_prophecies_of_dawn',
        description: 'talent_descr.aloy_prophecies_of_dawn',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Aloy.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Aloy.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Aloy.s3.p3),
            },
        ],
    },
});

const TalentValues = {
    A1AtkSelf: 16,
    A1AtkOther: 8,
    A4CryoDmg: 3.5,
    A4CryoDmgMax: 35,
};

export const Aloy = new DbObjectChar({
    name: 'aloy',
    serializeId: 43,
    gameId: 10000062,
    iconClass: "char-icon-aloy",
    rarity: 5,
    element: 'cryo',
    weapon: 'bow',
    origin: 'foreign',
    talents: Talents,
    statTable: charTables.Aloy,
    features: [
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_1',
            allowInfusion: true,
            items: [
                {
                    hits: 1,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_1_1'),
                        }),
                    ],
                },
                {
                    hits: 1,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_1_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1_2'),
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
        new FeatureDamageChargedAimed({
            name: 'aimed',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'charged_aimed',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
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
            name: 'aloy_freeze_bomb_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.aloy_freeze_bomb_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'aloy_chillwater_bomblets',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.aloy_chillwater_bomblets'),
                }),
            ],
        }),
        new FeatureStatic({
            category: 'skill',
            name: 'aloy_atk_decrease',
            format: 'percent',
            digits: 1,
            multipliers: [
                new FeatureMultiplierStatic({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.aloy_atk_decrease'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'aloy_coils',
            serializeId: 1,
            title: 'talent_name.aloy_coils',
            description: 'talent_descr.aloy_coils',
            maxStacks: 4,
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.aloy_coil_bonus', 'dmg_normal'),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'aloy_coils',
                    cond: 'eq',
                    value: 1,
                }),
            ],
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.aloy_coil_bonus_2', 'dmg_normal'),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'aloy_coils',
                    cond: 'eq',
                    value: 2,
                }),
            ],
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.aloy_coil_bonus_3', 'dmg_normal'),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'aloy_coils',
                    cond: 'eq',
                    value: 3,
                }),
            ],
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.aloy_rushing_ice_bonus', 'dmg_normal'),
            ],
            settings: {
                attack_infusion: 'cryo',
            },
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'aloy_coils',
                    cond: 'eq',
                    value: 4,
                }),
            ],
        }),
        new ConditionBoolean({
            name: 'aloy_combat_override',
            serializeId: 2,
            title: 'talent_name.aloy_combat_override',
            description: 'talent_descr.aloy_combat_override',
            info: {ascension: 1},
            stats: {
                atk_percent: TalentValues.A1AtkSelf,
                text_percent_1: TalentValues.A1AtkSelf,
                text_percent_2: TalentValues.A1AtkOther,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'aloy_strong_strike',
            serializeId: 3,
            title: 'talent_name.aloy_strong_strike',
            description: 'talent_descr.aloy_strong_strike',
            maxStacks: 10,
            dropdownClass: 'two-digits',
            info: {ascension: 4},
            stats: [
                new StatTable('dmg_cryo', [TalentValues.A4CryoDmg]),
                new StatTable('text_percent', [TalentValues.A4CryoDmgMax]),
            ],
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.aloy_star_of_another_world',
                    description: 'talent_descr.aloy_star_of_another_world',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.aloy_combat_override',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.aloy_combat_override',
                description: 'talent_descr.aloy_combat_override',
                stats: {
                    atk_percent: TalentValues.A1AtkOther,
                    text_percent_1: TalentValues.A1AtkSelf,
                    text_percent_2: TalentValues.A1AtkOther,
                },
                info: {
                    ascension: 1,
                },
            }),
        ],
    },
});
