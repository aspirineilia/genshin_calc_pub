import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const A1Dmg = 160;
const C1SkillDmg = 50;
const C2ElectroDmg = 8;
const C2ElectroDmgStacks = 4;
const C6AtkBonus = 10;
const C6AtkBonusStacks = 3;
const C6Dmg = 200;

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Ororon.s1_id,
        title: 'talent_name.ororon_spiritvessel_snapshot',
        description: 'talent_descr.ororon_spiritvessel_snapshot',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Ororon.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Ororon.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Ororon.s1.p3),
            },
            {
                table: new StatTable('aimed', charTalentTables.Ororon.s1.p4),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Ororon.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Ororon.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Ororon.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Ororon.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Ororon.s2_id,
        title: 'talent_name.ororon_nights_sling',
        description: 'talent_descr.ororon_nights_sling',
        items: [
            {
                table: new StatTable('ororon_spirit_orb_dmg', charTalentTables.Ororon.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ororon.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Ororon.s3_id,
        title: 'talent_name.ororon_dark_voices_echo',
        description: 'talent_descr.ororon_dark_voices_echo',
        items: [
            {
                table: new StatTable('ororon_activation_dmg', charTalentTables.Ororon.s3.p1),
            },
            {
                table: new StatTable('ororon_soundwave_collision_dmg', charTalentTables.Ororon.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Ororon.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ororon.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Ororon.s3.p5),
            },
        ],
    },
});

export const Ororon = new DbObjectChar({
    name: 'ororon',
    serializeId: 95,
    gameId: 10000105,
    iconClass: 'char-icon-ororon',
    rarity: 4,
    element: 'electro',
    weapon: 'bow',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Ororon,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.ororon_spirit_orb_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.ororon_activation_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.ororon_soundwave_collision_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            element: 'electro',
            category: 'other',
            damageBonuses: ['dmg_skill_ororon'],
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new StatTable('ororon_hypersense_dmg', [A1Dmg]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamage({
            element: 'electro',
            category: 'other',
            damageBonuses: ['dmg_skill_ororon'],
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new StatTable('ororon_hypersense_c6_dmg', [A1Dmg ]),
                    scalingSource: 'constellation6',
                    scalingMultiplier: C6Dmg / 100,
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.ororon_nightshade_synesthesia',
            description: 'talent_descr.ororon_nightshade_synesthesia_1',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.ororon_nightshade_synesthesia',
            description: 'talent_descr.ororon_nightshade_synesthesia_2',
            stats: {
                text_percent_dmg: A1Dmg,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.ororon_aspect_catalyst',
            description: 'talent_descr.ororon_aspect_catalyst',
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
                    name: 'ororon_trails_amidst_the_forest_fog',
                    serializeId: 1,
                    title: 'talent_name.ororon_trails_amidst_the_forest_fog',
                    description: 'talent_descr.ororon_trails_amidst_the_forest_fog',
                    stats: {
                        dmg_skill_ororon: C1SkillDmg,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    name: 'ororon_king_bee_of_the_hidden_honeyed_wine',
                    title: 'talent_name.ororon_king_bee_of_the_hidden_honeyed_wine',
                    description: 'talent_descr.ororon_king_bee_of_the_hidden_honeyed_wine_1',
                }),
                new ConditionStacks({
                    name: 'ororon_king_bee_of_the_hidden_honeyed_wine',
                    serializeId: 2,
                    title: 'talent_name.ororon_spiritual_supersensee',
                    description: 'talent_descr.ororon_king_bee_of_the_hidden_honeyed_wine_2',
                    maxStacks: C2ElectroDmgStacks,
                    stats: [
                        new StatTable('dmg_electro', [C2ElectroDmg]),
                        new StatTable('text_percent_max', [C2ElectroDmg * C2ElectroDmgStacks]),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {char_skill_burst_bonus: 3},
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.ororon_as_the_mysteries_of_the_night_wind',
                    description: 'talent_descr.ororon_as_the_mysteries_of_the_night_wind',
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {char_skill_elemental_bonus: 3},
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'ororon_ode_to_deep_springs',
                    serializeId: 3,
                    title: 'talent_name.ororon_ode_to_deep_springs',
                    description: 'talent_descr.ororon_ode_to_deep_springs_1',
                    maxStacks: C6AtkBonusStacks,
                    stats: [
                        new StatTable('atk_percent', [C6AtkBonus]),
                    ],
                }),
                new ConditionStatic({
                    title: 'talent_name.ororon_ode_to_deep_springs',
                    description: 'talent_descr.ororon_ode_to_deep_springs_2',
                    stats: {
                        text_percent_dmg: C6Dmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionStacks({
                name: 'ororon_ode_to_deep_springs',
                serializeId: 1,
                title: 'talent_name.ororon_ode_to_deep_springs',
                description: 'talent_descr.ororon_ode_to_deep_springs_1',
                rotation: 'party',
                maxStacks: C6AtkBonusStacks,
                info: {constellation: 6},
                stats: [
                    new StatTable('atk_percent', [C6AtkBonus]),
                ],
            }),
        ],
    },
});
