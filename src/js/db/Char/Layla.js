import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Layla.s1_id,
        title: 'talent_name.layla_sword_of_the_radiant_path',
        description: 'talent_descr.layla_sword_of_the_radiant_path',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Layla.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Layla.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Layla.s1.p3),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Layla.s1.p4),
                    new StatTable('charged_hit_2', charTalentTables.Layla.s1.p5),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Layla.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Layla.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Layla.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Layla.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Layla.s2_id,
        title: 'talent_name.layla_nights_of_formal_focus',
        description: 'talent_descr.layla_nights_of_formal_focus',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Layla.s2.p1),
            },
            {
                table: new StatTable('layla_shooting_star_dmg', charTalentTables.Layla.s2.p2),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('layla_base_shield_dmg_absorption', charTalentTables.Layla.s2.p3),
                    new StatTable('', charTalentTables.Layla.s2.p4),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('layla_shield_duration', charTalentTables.Layla.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Layla.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Layla.s3_id,
        title: 'talent_name.layla_dream_of_the_star_stream_shaker',
        description: 'talent_descr.layla_dream_of_the_star_stream_shaker',
        items: [
            {
                unit: 'hp',
                table: new StatTable('layla_starlight_slug_dmg', charTalentTables.Layla.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Layla.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Layla.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Layla.s3.p4),
            },
        ],
    },
});

const A1ShieldBonus = 6;
const A4SkillScale = 1.5;
const C1ShieldBonus = 20;
const C1PartyShield = 35;
const C4NormalBonus = 5;
const C6SkillBonus = 40;
const C6BurstBonus = 40;

export const Layla = new DbObjectChar({
    name: 'layla',
    serializeId: 62,
    gameId: 10000074,
    iconClass: "char-icon-layla",
    rarity: 4,
    element: 'cryo',
    weapon: 'sword',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Layla,
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
            name: 'skill_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'layla_shooting_star_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_skill_layla'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.layla_shooting_star_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new ValueTable([A4SkillScale]),
                    condition: new ConditionAscensionChar({ascension: 4}),
                }),
            ],
        }),
        new FeatureShield({
            name: 'layla_base_shield_dmg_absorption',
            category: 'skill',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.layla_base_shield_dmg_absorption'),
                    condition: new ConditionNot([
                        new ConditionConstellation({constellation: 1}),
                    ]),
                }),
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    scalingSource: 'constellation1',
                    scalingMultiplier: 1 + C1ShieldBonus / 100,
                    values: Talents.getList('skill.layla_base_shield_dmg_absorption'),
                    condition: new ConditionConstellation({constellation: 1}),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'layla_starlight_slug_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_burst_layla'],
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.layla_starlight_slug_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            name: 'layla_party_shield',
            category: 'skill',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    scalingSource: 'constellation2',
                    scalingMultiplier: (1 + C1ShieldBonus / 100) * (C1PartyShield / 100),
                    values: Talents.getList('skill.layla_base_shield_dmg_absorption'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'constellation4',
            values: new ValueTable([C4NormalBonus]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'layla_starry_illumination'}),
                new ConditionConstellation({constellation: 4}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal', 'charged'],
            }),
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'layla_like_nascent_light',
            serializeId: 1,
            title: 'talent_name.layla_like_nascent_light',
            description: 'talent_descr.layla_like_nascent_light',
            maxStacks: 4,
            stats: [
                new StatTable('shield', [A1ShieldBonus]),
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.layla_sweet_slumber_undisturbed',
            description: 'talent_descr.layla_sweet_slumber_undisturbed',
            stats: {
                text_percent: A4SkillScale,
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
                new ConditionStatic({
                    title: 'talent_name.layla_fortress_of_fantasy',
                    description: 'talent_descr.layla_fortress_of_fantasy',
                    stats: {
                        text_percent_bonus: C1ShieldBonus,
                        text_percent_shield: C1PartyShield,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.layla_lights_remit',
                    description: 'talent_descr.layla_lights_remit',
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
                new ConditionBoolean({
                    name: 'layla_starry_illumination',
                    serializeId: 2,
                    title: 'talent_name.layla_starry_illumination',
                    description: 'talent_descr.layla_starry_illumination',
                    stats: {
                        text_percent_dmg: C4NormalBonus,
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
                new ConditionStatic({
                    title: 'talent_name.layla_radiant_soulfire',
                    description: 'talent_descr.layla_radiant_soulfire',
                    stats: {
                        dmg_skill_layla: C6SkillBonus,
                        dmg_burst_layla: C6BurstBonus,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['hp_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'layla_max_hp',
                title: 'talent_name.stats_total_hp',
                partyStat: 'hp_total',
                serializeId: 1,
                max: CHARACTER_MAX_POSSIBLE_HP,
                class: "gi-inputs-5digit",
            }),
            new ConditionStacks({
                name: 'party.layla_like_nascent_light',
                serializeId: 2,
                title: 'talent_name.layla_like_nascent_light',
                description: 'talent_descr.layla_like_nascent_light',
                maxStacks: 4,
                stats: [
                    new StatTable('shield', [A1ShieldBonus]),
                ],
                info: {ascension: 1},
            }),
            new ConditionBoolean({
                name: 'party.layla_starry_illumination',
                serializeId: 3,
                title: 'talent_name.layla_starry_illumination',
                description: 'talent_descr.layla_starry_illumination',
                info: {constellation: 4},
            }),
        ],
        multipliers: [
            new FeatureMultiplier({
                scaling: 'layla_max_hp',
                source: 'constellation4',
                values: new ValueTable([C4NormalBonus]),
                condition: new ConditionBoolean({name: 'party.layla_starry_illumination'}),
                target: new FeatureMultiplierTarget({
                    damageTypes: ['normal', 'charged'],
                }),
            }),
        ],
    },
});
