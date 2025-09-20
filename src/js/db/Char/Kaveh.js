import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionLevels } from "../../classes/Condition/Levels";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStacks } from "../../classes/Condition/Stacks";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Kaveh.s1_id,
        title: 'talent_name.kaveh_schematic_setup',
        description: 'talent_descr.kaveh_schematic_setup',
        items: [
            {
                table: new StatTable('normal_hit_1', [76.19, 82.39, 88.59, 97.45, 103.65, 110.73, 120.48, 130.22, 139.97, 150.6, 161.23, 171.86, 182.49, 193.12, 203.75]),
            },
            {
                table: new StatTable('normal_hit_2', [69.64, 75.31, 80.98, 89.07, 94.74, 101.22, 110.13, 119.03, 127.94, 137.66, 147.37, 157.09, 166.81, 176.53, 186.24]),
            },
            {
                table: new StatTable('normal_hit_3', [84.26, 91.12, 97.98, 107.78, 114.63, 122.47, 133.25, 144.03, 154.81, 166.56, 178.32, 190.08, 201.83, 213.59, 225.35]),
            },
            {
                table: new StatTable('normal_hit_4', [102.69, 111.05, 119.4, 131.35, 139.7, 149.26, 162.39, 175.53, 188.66, 202.99, 217.32, 231.65, 245.97, 260.3, 274.63]),
            },
            {
                table: new StatTable('charged_spin', [53.15, 57.47, 61.8, 67.98, 72.31, 77.25, 84.05, 90.85, 97.64, 105.06, 112.48, 119.89, 127.31, 134.72, 142.14]),
            },
            {
                table: new StatTable('charged_final', [96.15, 103.97, 111.8, 122.98, 130.81, 139.75, 152.05, 164.35, 176.64, 190.06, 203.48, 216.89, 230.31, 243.72, 257.14]),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', [40]),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', [5]),
            },
            {
                table: new StatTable('plunge', [74.59, 80.66, 86.73, 95.4, 101.47, 108.41, 117.95, 127.49, 137.03, 147.44, 157.85, 168.26, 178.66, 189.07, 199.48]),
            },
            {
                table: new StatTable('plunge_low', [149.14, 161.28, 173.42, 190.77, 202.91, 216.78, 235.86, 254.93, 274.01, 294.82, 315.63, 336.44, 357.25, 378.06, 398.87]),
            },
            {
                table: new StatTable('plunge_high', [186.29, 201.45, 216.62, 238.28, 253.44, 270.77, 294.6, 318.42, 342.25, 368.25, 394.24, 420.23, 446.23, 472.22, 498.21]),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kaveh.s2_id,
        title: 'talent_name.kaveh_artistic_ingenuity',
        description: 'talent_descr.kaveh_artistic_ingenuity',
        items: [
            {
                table: new StatTable('skill_dmg', [204, 219.3, 234.6, 255, 270.3, 285.6, 306, 326.4, 346.8, 367.2, 387.6, 408, 433.5, 459, 484.5]),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', [6]),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kaveh.s3_id,
        title: 'talent_name.kaveh_painted_dome',
        description: 'talent_descr.kaveh_painted_dome',
        items: [
            {
                table: new StatTable('burst_dmg', [160, 172, 184, 200, 212, 224, 240, 256, 272, 288, 304, 320, 340, 360, 380]),
            },
            {
                table: new StatTable('kaveh_bloom_dmg_bonus', [27.49, 29.55, 31.61, 34.36, 36.42, 38.48, 41.23, 43.98, 46.73, 49.48, 52.23, 54.98, 58.41, 61.85, 65.28]),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', [12]),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', [20]),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', [80]),
            },
        ],
    },
});

const TalentValues = {
    A1BloomHeal: 300,
    A4Mastery: 25,
    C1DendroRes: 50,
    C1Healing: 25,
    C2AtkSpeed: 15,
    C4BloomDmg: 60,
    C6Dmg: 61.8,
};

export const Kaveh = new DbObjectChar({
    name: 'kaveh',
    serializeId: 69,
    gameId: 10000081,
    iconClass: "char-icon-kaveh",
    rarity: 4,
    element: 'dendro',
    weapon: 'claymore',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Kaveh,
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
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'kaveh_pairidaezas_light_dmg',
            category: 'attack',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureHeal({
            name: 'kaveh_bloom_heal',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1BloomHeal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'kaveh_painted_dome',
            serializeId: 1,
            title: 'talent_name.kaveh_painted_dome',
            description: 'talent_descr.kaveh_painted_dome_talent',
            settings: {
                attack_infusion: 'dendro',
            },
        }),
        new ConditionLevels({
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.kaveh_bloom_dmg_bonus', 'dmg_reaction_rupture'),
            ],
            subConditions: [
                new ConditionBoolean({name: 'kaveh_painted_dome'}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kaveh_an_architects_undertaking',
            description: 'talent_descr.kaveh_an_architects_undertaking',
            info: {ascension: 1},
            stats: {
                text_percent_heal: TalentValues.A1BloomHeal,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'kaveh_a_craftsmans_curious_conceptions',
            serializeId: 2,
            title: 'talent_name.kaveh_a_craftsmans_curious_conceptions',
            description: 'talent_descr.kaveh_a_craftsmans_curious_conceptions',
            maxStacks: 4,
            info: {ascension: 4},
            stats: [
                new StatTable('mastery', [TalentValues.A4Mastery]),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'kaveh_sublime_salutations',
                    serializeId: 3,
                    title: 'talent_name.kaveh_sublime_salutations',
                    description: 'talent_descr.kaveh_sublime_salutations',
                    stats: {
                        res_dendro: TalentValues.C1DendroRes,
                        healing_recv: TalentValues.C1Healing,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kaveh_grace_of_royal_roads',
                    description: 'talent_descr.kaveh_grace_of_royal_roads',
                    stats: {
                        atk_speed_normal: TalentValues.C2AtkSpeed,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'kaveh_painted_dome'}),
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
                    title: 'talent_name.kaveh_feast_of_apadana',
                    description: 'talent_descr.kaveh_feast_of_apadana',
                    stats: {
                        dmg_reaction_rupture: TalentValues.C4BloomDmg,
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
                    title: 'talent_name.kaveh_pairidaezas_dreams',
                    description: 'talent_descr.kaveh_pairidaezas_dreams',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionNumberTalent({
                name: 'kaveh_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 1,
            }),
            new ConditionBoolean({
                name: 'party.kaveh_profferings_of_dur_untash',
                serializeId: 2,
                title: 'talent_name.kaveh_profferings_of_dur_untash',
                description: 'talent_descr.char_constellation_burst',
                settings: {
                    kaveh_char_skill_burst_bonus: 3,
                },
                info: {
                    constellation: 3,
                },
            }),
            new ConditionBooleanLevels({
                name: 'party.kaveh_painted_dome',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.kaveh_painted_dome',
                description: 'talent_descr.kaveh_painted_dome_talent_2',
                levelSetting: 'kaveh_char_skill_burst',
                stats: [
                    Talents.getAlias('burst.kaveh_bloom_dmg_bonus', 'dmg_reaction_rupture'),
                ],
            }),
        ],
    },
});
