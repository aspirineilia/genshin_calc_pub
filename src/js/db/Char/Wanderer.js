import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionDropdownElementWanderer } from "../../classes/Condition/Dropdown/Element/Wanderer";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureMultiplierWanderer } from "../../classes/Feature2/Multiplier/Wanderer";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Wanderer.s1_id,
        title: 'talent_name.wanderer_yuuban_meigen',
        description: 'talent_descr.wanderer_yuuban_meigen',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Wanderer.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Wanderer.s1.p2),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Wanderer.s1.p3),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Wanderer.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Wanderer.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Wanderer.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Wanderer.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Wanderer.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Wanderer.s2_id,
        title: 'talent_name.wanderer_song_of_the_wind',
        description: 'talent_descr.wanderer_song_of_the_wind',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Wanderer.s2.p1),
            },
            {
                unit: 'normal_attack',
                table: new StatTable('wanderer_fushoudan', charTalentTables.Wanderer.s2.p2),
            },
            {
                unit: 'charged_attack',
                table: new StatTable('wanderer_toufukai', charTalentTables.Wanderer.s2.p3),
            },
            {
                unit: 'unit',
                table: new StatTable('wanderer_kuugoryoku_points', charTalentTables.Wanderer.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Wanderer.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Wanderer.s3_id,
        title: 'talent_name.wanderer_five_ceremonial_plays',
        description: 'talent_descr.wanderer_five_ceremonial_plays',
        items: [
            {
                type: 'multihit',
                hits: 5,
                table: new StatTable('burst_dmg', charTalentTables.Wanderer.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Wanderer.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Wanderer.s3.p3),
            },
        ],
    },
});

const c6cond = new ConditionAnd([
    new ConditionBoolean({name: 'wanderer_windfavored'}),
    new ConditionConstellation({constellation: 6}),
]);

export const Wanderer = new DbObjectChar({
    name: 'wanderer',
    serializeId: 63,
    gameId: 10000075,
    iconClass: "char-icon-wanderer",
    rarity: 5,
    element: 'anemo',
    weapon: 'catalyst',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Wanderer,
    features: [
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplierWanderer({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    scalingValues: Talents.get('skill.wanderer_fushoudan'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplierWanderer({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    scalingValues: Talents.get('skill.wanderer_fushoudan'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_3',
            element: 'anemo',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierWanderer({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
                            scalingValues: Talents.get('skill.wanderer_fushoudan'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            element: 'anemo',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplierWanderer({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    scalingValues: Talents.get('skill.wanderer_fushoudan'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'wanderer_normal_hit_1',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplierWanderer({
                    scalingMultiplier: 0.4,
                    scalingSource: 'constellation6',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    scalingValues: Talents.get('skill.wanderer_fushoudan'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageNormal({
            name: 'wanderer_normal_hit_2',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplierWanderer({
                    scalingMultiplier: 0.4,
                    scalingSource: 'constellation6',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    scalingValues: Talents.get('skill.wanderer_fushoudan'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageMultihit({
            name: 'wanderer_normal_hit_3',
            element: 'anemo',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplierWanderer({
                            scalingMultiplier: 0.4,
                            scalingSource: 'constellation6',
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
                            scalingValues: Talents.get('skill.wanderer_fushoudan'),
                        }),
                    ],
                },
            ],
            condition: c6cond,
        }),
        new FeatureDamageNormal({
            name: 'wanderer_normal_hit_3_1',
            element: 'anemo',
            hits: 2,
            isChild: true,
            multipliers: [
                new FeatureMultiplierWanderer({
                    scalingMultiplier: 0.4,
                    scalingSource: 'constellation6',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    scalingValues: Talents.get('skill.wanderer_fushoudan'),
                }),
            ],
            condition: c6cond,
        }),
        new FeatureDamageCharged({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplierWanderer({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                    scalingValues: Talents.get('skill.wanderer_toufukai'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'wanderer_wind_arrow_dmg',
            category: 'skill',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'wanderer_passive_level',
                    values: new ValueTable([35, 60]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            damageBonuses: ['dmg_burst_wanderer'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'wanderer_windfavored',
            serializeId: 1,
            title: 'talent_name.wanderer_windfavored',
            description: 'talent_descr.wanderer_windfavored',
        }),
        new ConditionDropdownElementWanderer({
            name: 'wanderer_jade_claimed_flower',
            serializeId: 2,
            title: 'talent_name.wanderer_jade_claimed_flower',
            description: 'talent_descr.wanderer_jade_claimed_flower',
            multiple: true,
            hideEmpty: true,
            limit: 2,
            dropdownClass: 'small select-element-multiple',
            values: [
                {
                    value: 'cryo',
                    serializeId: 1,
                    conditions: [
                        new Condition({
                            stats: {crit_rate: 20},
                        }),
                    ],
                },
                {
                    value: 'electro',
                    serializeId: 2,
                },
                {
                    value: 'hydro',
                    serializeId: 3,
                },
                {
                    value: 'pyro',
                    serializeId: 4,
                    conditions: [
                        new Condition({
                            stats: {atk_percent: 30},
                        }),
                    ],
                },
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.wanderer_gales_of_reverie',
            description: 'talent_descr.wanderer_gales_of_reverie',
            info: {ascension: 4},
            stats: {
                text_percent_dmg: 35,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    name: 'wanderer_ostentatious_plumage',
                    serializeId: 3,
                    title: 'talent_name.wanderer_ostentatious_plumage',
                    description: 'talent_descr.wanderer_ostentatious_plumage',
                    stats: {
                        atk_speed_normal: 10,
                        text_percent_dmg: 25,
                    },
                    settings: {
                        wanderer_passive_level: 2,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'wanderer_windfavored'}),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new ConditionNumber({
                    name: 'dmg_burst_wanderer',
                    serializeId: 4,
                    title: 'talent_name.wanderer_isle_amidst_white_waves',
                    description: 'talent_descr.wanderer_isle_amidst_white_waves',
                    max: 200,
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
                    title: 'talent_name.wanderer_set_adrift_into_spring',
                    description: 'talent_descr.wanderer_set_adrift_into_spring',
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
                    title: 'talent_name.wanderer_the_curtains_melancholic_sway',
                    description: 'talent_descr.wanderer_the_curtains_melancholic_sway',
                    stats: {
                        text_percent_dmg: 40,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [],
    },
});
