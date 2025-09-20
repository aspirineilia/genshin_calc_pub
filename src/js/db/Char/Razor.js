import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierRazorBurst } from "../../classes/Feature2/Multiplier/RazorBurst";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Razor.s1_id,
        title: 'talent_name.razor_steel_fang',
        description: 'talent_descr.razor_steel_fang',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Razor.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Razor.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Razor.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Razor.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Razor.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Razor.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Razor.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Razor.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Razor.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Razor.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Razor.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Razor.s2_id,
        title: 'talent_name.razor_claw_and_thunder',
        description: 'talent_descr.razor_claw_and_thunder',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Razor.s2.p1),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Razor.s2.p2),
            },
            {
                table: new StatTable('razor_recharge_bonus', charTalentTables.Razor.s2.p3),
            },
            {
                unit: '',
                table: new StatTable('razor_enregy_per_sigil', charTalentTables.Razor.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('razor_sigil_duration', charTalentTables.Razor.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Razor.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Razor.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Razor.s3_id,
        title: 'talent_name.razor_lightning_fang',
        description: 'talent_descr.razor_lightning_fang',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Razor.s3.p1),
            },
            {
                unit: 'normal_atk',
                table: new StatTable('razor_companion_dmg', charTalentTables.Razor.s3.p2),
            },
            {
                table: new StatTable('razor_atk_speed_bonus', charTalentTables.Razor.s3.p3),
            },
            {
                table: new StatTable('razor_res_bonus', charTalentTables.Razor.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Razor.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Razor.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Razor.s3.p7),
            },
        ],
    },
});

export const Razor = new DbObjectChar({
    name: 'razor',
    serializeId: 21,
    gameId: 10000020,
    iconClass: "char-icon-razor",
    rarity: 4,
    element: 'electro',
    weapon: 'claymore',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Razor,
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
        new FeatureDamageBurst({
            name: 'razor_normal_hit_1',
            category: 'attack',
            element: 'electro',
            multipliers: [
                new FeatureMultiplierRazorBurst({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                    burstValues: Talents.get('burst.razor_companion_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'razor_wolf_within'}),
        }),
        new FeatureDamageBurst({
            name: 'razor_normal_hit_2',
            category: 'attack',
            element: 'electro',
            multipliers: [
                new FeatureMultiplierRazorBurst({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                    burstValues: Talents.get('burst.razor_companion_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'razor_wolf_within'}),
        }),
        new FeatureDamageBurst({
            name: 'razor_normal_hit_3',
            category: 'attack',
            element: 'electro',
            multipliers: [
                new FeatureMultiplierRazorBurst({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                    burstValues: Talents.get('burst.razor_companion_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'razor_wolf_within'}),
        }),
        new FeatureDamageBurst({
            name: 'razor_normal_hit_4',
            category: 'attack',
            element: 'electro',
            multipliers: [
                new FeatureMultiplierRazorBurst({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                    burstValues: Talents.get('burst.razor_companion_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'razor_wolf_within'}),
        }),
        new FeatureDamageCharged({
            name: 'charged_spin',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_spin'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'razor_wolf_within'}),
            ]),
        }),
        new FeatureDamageCharged({
            name: 'charged_final',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_final'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'razor_wolf_within'}),
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
            name: 'press_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'hold_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'razor_lupus_fulguris',
            category: 'other',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([100]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new ConditionConstellation({
            constellation: 3,
            settings: {
                char_skill_burst_bonus: 3,
            }
        }),
        new ConditionConstellation({
            constellation: 5,
            settings: {
                char_skill_elemental_bonus: 3,
            }
        }),
        new ConditionStacks({
            name: 'razor_claw_and_thunder',
            serializeId: 1,
            title: 'talent_name.razor_claw_and_thunder',
            description: 'talent_descr.razor_claw_and_thunder_talent',
            maxStacks: 3,
            stats: [
                new StatTable('recharge', [20]),
            ],
        }),
        new ConditionBooleanLevels({
            name: 'razor_wolf_within',
            serializeId: 2,
            title: 'talent_name.razor_wolf_within',
            description: 'talent_descr.razor_wolf_within',
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.razor_atk_speed_bonus', 'atk_speed_normal'),
                Talents.getAlias('burst.razor_res_bonus', 'res_electro'),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.razor_awakening',
            description: 'talent_descr.razor_awakening',
            stats: {
                text_percent_cd: 18,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'razor_hunger',
            serializeId: 3,
            title: 'talent_name.razor_hunger',
            description: 'talent_descr.razor_hunger',
            stats: {
                recharge: 30,
                text_percent: 50,
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
                    name: 'razor_wolfs_instinct',
                    serializeId: 4,
                    title: 'talent_name.razor_wolfs_instinct',
                    description: 'talent_descr.razor_wolfs_instinct',
                    stats: {
                        dmg_all: 10,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'razor_suppression',
                    serializeId: 5,
                    title: 'talent_name.razor_suppression',
                    description: 'talent_descr.razor_suppression',
                    stats: {
                        crit_rate_enemy: 10,
                        text_percent_hp: 30,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'razor_bite',
                    serializeId: 6,
                    title: 'talent_name.razor_bite',
                    description: 'talent_descr.razor_bite',
                    stats: {
                        enemy_def_reduce: 15,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.razor_lupus_fulguris',
                    description: 'talent_descr.razor_lupus_fulguris',
                    stats: {
                        text_percent_dmg: 100,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.razor_bite',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.razor_bite',
                description: 'talent_descr.razor_bite',
                info: {constellation: 4},
                stats: {
                    enemy_def_reduce: 15,
                },
            }),
        ],
    },
});
