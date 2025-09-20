import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionOr } from "../../classes/Condition/Or";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
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
        gameId: charTalentTables.Varesa.s1_id,
        title: 'talent_name.varesa_by_the_horns',
        description: 'talent_descr.varesa_by_the_horns',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Varesa.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Varesa.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Varesa.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Varesa.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Varesa.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Varesa.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Varesa.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Varesa.s1.p8),
            },
            {
                table: new StatTable('varesa_normal_hit_1', charTalentTables.Varesa.s1.p9),
            },
            {
                table: new StatTable('varesa_normal_hit_2', charTalentTables.Varesa.s1.p10),
            },
            {
                table: new StatTable('varesa_normal_hit_3', charTalentTables.Varesa.s1.p11),
            },
            {
                table: new StatTable('varesa_charged_hit', charTalentTables.Varesa.s1.p12),
            },
            {
                unit: 'unit',
                table: new StatTable('varesa_stamina_cost', charTalentTables.Varesa.s1.p13),
            },
            {
                table: new StatTable('varesa_plunge', charTalentTables.Varesa.s1.p14),
            },
            {
                table: new StatTable('varesa_plunge_low', charTalentTables.Varesa.s1.p15),
            },
            {
                table: new StatTable('varesa_plunge_high', charTalentTables.Varesa.s1.p16),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Varesa.s2_id,
        title: 'talent_name.varesa_riding_the_night_rainbow',
        description: 'talent_descr.varesa_riding_the_night_rainbow',
        items: [
            {
                table: new StatTable('varesa_rush_dmg', charTalentTables.Varesa.s2.p1),
            },
            {
                table: new StatTable('varesa_fiery_passion_rush_dmg', charTalentTables.Varesa.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('varesa_duration', charTalentTables.Varesa.s2.p3),
            },
            {
                unit: 'unit',
                table: new StatTable('xilonen_nightsoul', charTalentTables.Varesa.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Varesa.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Varesa.s3_id,
        title: 'talent_name.varesa_guardian_vent',
        description: 'talent_descr.varesa_guardian_vent',
        items: [
            {
                table: new StatTable('varesa_flying_kick_dmg', charTalentTables.Varesa.s3.p1),
            },
            {
                table: new StatTable('varesa_fiery_passion_flying_kick_dmg', charTalentTables.Varesa.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Varesa.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Varesa.s3.p4),
            },
            {
                table: new StatTable('varesa_volcanic_collapse_dmg', charTalentTables.Varesa.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('varesa_energy_cost', charTalentTables.Varesa.s3.p6),
            },
        ],
    },
});

const A1PlungeDmg = 50;
const A1PlungeDmg2 = 180;
const A4AtkPercent = 35;
const C4AtkScale = 500;
const C4BonusMax = 20000;
const C4BurstBonus = 100;
const C6CritRate = 10;
const C6CritDmg = 100;

const stanceCond = new ConditionBoolean({name: 'varesa_fiery_passion'});
const stanceRevCond = new ConditionNot([stanceCond]);

export const Varesa = new DbObjectChar({
    name: 'varesa',
    serializeId: 103,
    gameId: 10000111,
    iconClass: 'char-icon-varesa',
    rarity: 5,
    element: 'electro',
    weapon: 'catalyst',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Varesa,
    features: [
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.varesa_normal_hit_1'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.varesa_normal_hit_2'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.varesa_normal_hit_3'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.varesa_charged_hit'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.varesa_plunge'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'electro',
            damageBonuses: ['dmg_plunge_varesa'],
            tags: ['varesa_plunge', 'varesa_plunge_c4'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.varesa_plunge_low'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'electro',
            damageBonuses: ['dmg_plunge_varesa'],
            tags: ['varesa_plunge', 'varesa_plunge_c4'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.varesa_plunge_high'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.varesa_rush_dmg'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.varesa_fiery_passion_rush_dmg'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'electro',
            damageBonuses: ['dmg_burst_varesa'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.varesa_flying_kick_dmg'),
                    condition: stanceRevCond,
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.varesa_fiery_passion_flying_kick_dmg'),
                    condition: stanceCond,
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'electro',
            category: 'burst',
            damageBonuses: ['dmg_burst_varesa'],
            tags: ['varesa_plunge_c4'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.varesa_volcanic_collapse_dmg'),
                }),
                new FeatureMultiplier({
                    source: 'ascension1',
                    leveling: 'varesa_a1_level',
                    values: new ValueTable([A1PlungeDmg, A1PlungeDmg2]),
                    condition: new ConditionAnd([
                        new ConditionAscensionChar({ascension: 1}),
                        new ConditionBoolean({name: 'varesa_tag_team_triple_jump'}),
                        new ConditionConstellation({constellation: 1}),
                    ]),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'varesa_fiery_passion',
            serializeId: 1,
            title: 'talent_name.varesa_fiery_passion',
        }),
        new ConditionBoolean({
            name: 'varesa_tag_team_triple_jump',
            serializeId: 2,
            title: 'talent_name.varesa_tag_team_triple_jump',
            description: 'talent_descr.varesa_tag_team_triple_jump_1',
            stats: {
                text_percent: A1PlungeDmg,
            },
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStatic({
            title: 'talent_name.varesa_tag_team_triple_jump',
            description: 'talent_descr.varesa_tag_team_triple_jump_2',
            stats: {
                text_percent: A1PlungeDmg2,
            },
            settings: {
                varesa_a1_level: 2,
            },
            info: {ascension: 1},
            condition: new ConditionAnd([
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBoolean({name: 'varesa_tag_team_triple_jump'}),
                new ConditionOr([
                    stanceCond,
                    new ConditionConstellation({constellation: 1}),
                ]),
            ]),
        }),
        new ConditionStacks({
            name: 'varesa_the_hero_twice_returned',
            serializeId: 3,
            title: 'talent_name.varesa_the_hero_twice_returned',
            description: 'talent_descr.varesa_the_hero_twice_returned',
            maxStacks: 2,
            stats: [
                new StatTable('atk_percent', [A4AtkPercent]),
            ],
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            source: 'ascension1',
            leveling: 'varesa_a1_level',
            values: new ValueTable([A1PlungeDmg, A1PlungeDmg2]),
            condition: new ConditionAnd([
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBoolean({name: 'varesa_tag_team_triple_jump'}),
            ]),
            target: new FeatureMultiplierTarget({
                tags: ['varesa_plunge'],
            }),
        }),
        new FeatureMultiplier({
            source: 'constellation4',
            values: new ValueTable([C4AtkScale]),
            capValue: new ValueTable([C4BonusMax]),
            condition: new ConditionAnd([
                new ConditionConstellation({constellation: 4}),
                new ConditionBoolean({name: 'varesa_the_courage_to_press_on_1'}),
            ]),
            target: new FeatureMultiplierTarget({
                tags: ['varesa_plunge_c4'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    serializeId: 4,
                    title: 'talent_name.varesa_undying_passion',
                    description: 'talent_descr.varesa_undying_passion',
                    stats: {
                        text_percent: A1PlungeDmg2,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.varesa_beyond_the_edge_of_light',
                    description: 'talent_descr.varesa_beyond_the_edge_of_light',
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
                    name: 'varesa_the_courage_to_press_on_1',
                    serializeId: 5,
                    title: 'talent_name.varesa_the_courage_to_press_on',
                    description: 'talent_descr.varesa_the_courage_to_press_on_1',
                    stats: {
                        text_percent: C4AtkScale,
                        text_value_max: C4BonusMax,
                    },
                }),
                new ConditionBoolean({
                    name: 'varesa_the_courage_to_press_on_2',
                    serializeId: 6,
                    title: 'talent_name.varesa_the_courage_to_press_on',
                    description: 'talent_descr.varesa_the_courage_to_press_on_2',
                    stats: {
                        dmg_burst_varesa: C4BurstBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_attack_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'varesa_a_hero_of_justices_triumph',
                    serializeId: 7,
                    title: 'talent_name.varesa_a_hero_of_justices_triumph',
                    description: 'talent_descr.varesa_a_hero_of_justices_triumph',
                    stats: {
                        crit_rate_plunge: C6CritRate,
                        crit_rate_burst: C6CritRate,
                        crit_dmg_plunge: C6CritDmg,
                        crit_dmg_burst: C6CritDmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {},
});
