import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionCalcElementsChasca } from "../../classes/Condition/CalcElementsChasca";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
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
        gameId: charTalentTables.Chasca.s1_id,
        title: 'talent_name.chasca_phantom_feather_flurry',
        description: 'talent_descr.chasca_phantom_feather_flurry',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Chasca.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Chasca.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Chasca.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Chasca.s1.p4),
            },
            {
                table: new StatTable('aimed', charTalentTables.Chasca.s1.p5),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Chasca.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Chasca.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Chasca.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Chasca.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Chasca.s2_id,
        title: 'talent_name.chasca_spirit_reins_shadow_hunt',
        description: 'talent_descr.chasca_spirit_reins_shadow_hunt',
        items: [
            {
                table: new StatTable('chasca_activation_dmg', charTalentTables.Chasca.s2.p1),
            },
            {
                table: new StatTable('chasca_multi_aim_press_dmg', charTalentTables.Chasca.s2.p2),
            },
            {
                table: new StatTable('chasca_shadowhunt_shell_dmg', charTalentTables.Chasca.s2.p3),
            },
            {
                table: new StatTable('chasca_shining_shadowhunt_shell_dmg', charTalentTables.Chasca.s2.p4),
            },
            {
                unit: '',
                table: new StatTable('nightsoul_points_limit', charTalentTables.Chasca.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Chasca.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Chasca.s3_id,
        title: 'talent_name.chasca_soul_reapers_fatal_round',
        description: 'talent_descr.chasca_soul_reapers_fatal_round',
        items: [
            {
                table: new StatTable('chasca_galesplitting_soulreaper_shell_dmg', charTalentTables.Chasca.s3.p1),
            },
            {
                table: new StatTable('chasca_soulreaping_shell_dmg', charTalentTables.Chasca.s3.p2),
            },
            {
                table: new StatTable('chasca_radiant_soulreaping_shell_dmg', charTalentTables.Chasca.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Chasca.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Chasca.s3.p5),
            },
        ],
    },
});

const A1Bonus1 = 15;
const A1Bonus2 = 35;
const A1Bonus3 = 65;
const A4AnemoDmg = 150;
const A4ElementalDmg = 150;
const C2Dmg = 400;
const C4Dmg = 400;
const C6CritDmg = 120;

export const Chasca = new DbObjectChar({
    name: 'chasca',
    serializeId: 94,
    gameId: 10000104,
    iconClass: 'char-icon-chasca',
    rarity: 5,
    element: 'anemo',
    weapon: 'bow',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Chasca,
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
        new FeatureDamageMultihit({
            name: 'normal_hit_3',
            category: 'attack',
            damageType: 'normal',
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
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.getAlias('attack.normal_hit_3', 'normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
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
            element: 'anemo',
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
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chasca_activation_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chasca_multi_aim_press_dmg'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'anemo',
            category: 'skill',
            critDamageBonuses: ['crit_dmg_chasca'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chasca_shadowhunt_shell_dmg'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'electro', 'cryo'].map((elem) => {
            return new FeatureDamageCharged({
                name: 'chasca_shining_shadowhunt_shell_'+ elem +'_dmg',
                element: elem,
                category: 'skill',
                critDamageBonuses: ['crit_dmg_chasca'],
                damageBonuses: ['dmg_charged_elem_chasca'],
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_elemental',
                        values: Talents.get('skill.chasca_shining_shadowhunt_shell_dmg'),
                    }),
                ],
            });
        }),
        new FeatureDamageCharged({
            name: 'chasca_burning_shadowhunt_shot_dmg',
            element: 'anemo',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: A4AnemoDmg / 100,
                    scalingSource: 'ascension4',
                    values: Talents.get('skill.chasca_shadowhunt_shell_dmg'),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        ...['pyro', 'hydro', 'electro', 'cryo'].map((elem) => {
            return new FeatureDamageCharged({
                name: 'chasca_burning_shadowhunt_shot_'+ elem +'_dmg',
                element: elem,
                category: 'skill',
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_elemental',
                        scalingMultiplier: A4AnemoDmg / 100,
                        scalingSource: 'ascension4',
                        values: Talents.get('skill.chasca_shining_shadowhunt_shell_dmg'),
                    }),
                ],
                condition: new ConditionAscensionChar({ascension: 4}),
            });
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.chasca_galesplitting_soulreaper_shell_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.chasca_soulreaping_shell_dmg'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'electro', 'cryo'].map((elem) => {
            return new FeatureDamageBurst({
                name: 'chasca_radiant_soulreaping_shell_'+ elem +'_dmg',
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_burst',
                        values: Talents.get('burst.chasca_radiant_soulreaping_shell_dmg'),
                    }),
                ],
            });
        }),
        ...['pyro', 'hydro', 'electro', 'cryo'].map((elem) => {
            return new FeatureDamageCharged({
                element: elem,
                category: 'other',
                multipliers: [
                    new FeatureMultiplier({
                        source: 'constellation2',
                        values: new StatTable('chasca_c2_'+ elem +'_dmg', [C2Dmg]),
                    }),
                ],
                condition: new ConditionConstellation({constellation: 2}),
            });
        }),
    ],
    conditions: [
        new ConditionCalcElementsChasca({
            bonuses: new StatTable('dmg_charged_elem_chasca', [A1Bonus1, A1Bonus2, A1Bonus3]),
        }),
        new ConditionStatic({
            title: 'talent_name.chasca_bullet_trick',
            description: 'talent_descr.chasca_bullet_trick',
            info: {ascension: 1},
            stats: {
                text_percent_dmg_1: A1Bonus1,
                text_percent_dmg_2: A1Bonus2,
                text_percent_dmg_3: A1Bonus3,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.chasca_intent_to_cover',
            description: 'talent_descr.chasca_intent_to_cover',
            info: {ascension: 4},
            stats: {
                text_percent_anemo: A4AnemoDmg,
                text_percent_elemental: A4ElementalDmg,
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
                    title: 'talent_name.chasca_cylinder_the_restless_roulette',
                    description: 'talent_descr.chasca_cylinder_the_restless_roulette',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.chasca_muzzle_the_searing_smoke',
                    description: 'talent_descr.chasca_muzzle_the_searing_smoke_1',
                }),
                new ConditionStatic({
                    name: 'chasca_muzzle_the_searing_smoke',
                    title: 'talent_name.chasca_muzzle_the_searing_smoke',
                    description: 'talent_descr.chasca_muzzle_the_searing_smoke_2',
                    stats: {
                        text_percent_dmg: C2Dmg,
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
                    title: 'talent_name.chasca_sparks_the_sudden_shot',
                    description: 'talent_descr.chasca_sparks_the_sudden_shot',
                    stats: {
                        text_percent_dmg: C4Dmg,
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
                    name: 'chasca_showdown_the_glory_of_battle',
                    serializeId: 1,
                    title: 'talent_name.chasca_showdown_the_glory_of_battle',
                    description: 'talent_descr.chasca_showdown_the_glory_of_battle',
                    stats: {
                        crit_dmg_chasca: C6CritDmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [],
    },
});
