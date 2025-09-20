import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionCalcElements } from "../../classes/Condition/CalcElements";
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
        gameId: charTalentTables.Lynette.s1_id,
        title: 'talent_name.lynette_rapid_ritesword',
        description: 'talent_descr.lynette_rapid_ritesword',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Lynette.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Lynette.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Lynette.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Lynette.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Lynette.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Lynette.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.Lynette.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Lynette.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Lynette.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Lynette.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Lynette.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Lynette.s2_id,
        title: 'talent_name.lynette_enigmatic_feint',
        description: 'talent_descr.lynette_enigmatic_feint',
        items: [
            {
                table: new StatTable('lynette_enigma_thrust_dmg', charTalentTables.Lynette.s2.p1),
            },
            {
                table: new StatTable('surging_blade_dmg', charTalentTables.Lynette.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Lynette.s2.p8),
            },
            {
                unit: 'hp',
                table: new StatTable('lynette_hp_regeneration', charTalentTables.Lynette.s2.p4),
            },
            {
                unit: 'hp',
                table: new StatTable('hp_cost', charTalentTables.Lynette.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('lynette_max_duration', charTalentTables.Lynette.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lynette.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Lynette.s3_id,
        title: 'talent_name.lynette_astonishing_shift',
        description: 'talent_descr.lynette_astonishing_shift',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Lynette.s3.p1),
            },
            {
                table: new StatTable('lynette_bogglecat_box_dmg', charTalentTables.Lynette.s3.p2),
            },
            {
                table: new StatTable('lynette_vivid_shot_dmg', charTalentTables.Lynette.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('lynette_duration', charTalentTables.Lynette.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Lynette.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Lynette.s3.p6),
            },
        ],
    },
});

const A1AtkBonus = [8, 12, 16, 20];
const A4BurstBonus = 15;
const C6AnemoBonus = 20;

export const Lynette = new DbObjectChar({
    name: 'lynette',
    serializeId: 72,
    gameId: 10000083,
    iconClass: 'char-icon-lynette',
    rarity: 4,
    element: 'anemo',
    weapon: 'sword',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Lynette,
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
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
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
            name: 'lynette_enigma_thrust_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.lynette_enigma_thrust_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'surging_blade_dmg',
            element: 'anemo',
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
            element: 'anemo',
            damageBonuses: ['dmg_burst_lynette'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'lynette_bogglecat_box_dmg',
            element: 'anemo',
            damageBonuses: ['dmg_burst_lynette'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lynette_bogglecat_box_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'lynette_vivid_shot_hydro_dmg',
            element: 'hydro',
            damageBonuses: ['dmg_burst_lynette'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lynette_vivid_shot_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'lynette_vivid_shot_pyro_dmg',
            element: 'pyro',
            damageBonuses: ['dmg_burst_lynette'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lynette_vivid_shot_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'lynette_vivid_shot_cryo_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_burst_lynette'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lynette_vivid_shot_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'lynette_vivid_shot_electro_dmg',
            element: 'electro',
            damageBonuses: ['dmg_burst_lynette'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.lynette_vivid_shot_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionCalcElements({
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBooleanLevels({
            name: 'lynette_sophisticated_synergy',
            serializeId: 1,
            title: 'talent_name.lynette_sophisticated_synergy',
            description: 'talent_descr.lynette_sophisticated_synergy',
            levelSetting: 'party_elements_count_level',
            stats: [
                new StatTable('text_number', [1, 2, 3, 4]),
                new StatTable('atk_percent', A1AtkBonus),
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'lynette_props_positively_prepped',
            serializeId: 2,
            title: 'talent_name.lynette_props_positively_prepped',
            description: 'talent_descr.lynette_props_positively_prepped',
            info: {ascension: 4},
            stats: {
                dmg_burst_lynette: A4BurstBonus,
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
                    title: 'talent_name.lynette_a_cold_blade_like_a_shadow',
                    description: 'talent_descr.lynette_a_cold_blade_like_a_shadow',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.lynette_endless_mysteries',
                    description: 'talent_descr.lynette_endless_mysteries',
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
                    title: 'talent_name.lynette_tacit_coordination',
                    description: 'talent_descr.lynette_tacit_coordination',
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
                new Condition({
                    settings: {
                        allowed_infusion_anemo: 1,
                    },
                }),
                new ConditionBoolean({
                    name: 'lynette_watchful_eye',
                    serializeId: 3,
                    title: 'talent_name.lynette_watchful_eye',
                    description: 'talent_descr.lynette_watchful_eye',
                    stats: {
                        dmg_anemo: C6AnemoBonus,
                    },
                    settings: {
                        attack_infusion_anemo: 1,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionCalcElements({}),
            new ConditionBooleanLevels({
                name: 'party.lynette_sophisticated_synergy',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.lynette_sophisticated_synergy',
                description: 'talent_descr.lynette_sophisticated_synergy',
                levelSetting: 'party_elements_count_level',
                info: {ascension: 1},
                stats: [
                    new StatTable('text_number', [1, 2, 3, 4]),
                    new StatTable('atk_percent', A1AtkBonus),
                ],
            }),
        ],
    },
});
