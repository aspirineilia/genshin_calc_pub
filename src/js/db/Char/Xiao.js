import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
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
        gameId: charTalentTables.Xiao.s1_id,
        title: 'talent_name.xiao_whirlwind_thrust',
        description: 'talent_descr.xiao_whirlwind_thrust',
        items: [
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_1', charTalentTables.Xiao.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Xiao.s1.p3),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Xiao.s1.p4),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_4', charTalentTables.Xiao.s1.p5),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Xiao.s1.p7),
            },
            {
                table: new StatTable('normal_hit_6', charTalentTables.Xiao.s1.p8),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Xiao.s1.p9),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Xiao.s1.p10),
            },
            {
                table: new StatTable('plunge', charTalentTables.Xiao.s1.p11),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Xiao.s1.p12),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Xiao.s1.p13),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Xiao.s2_id,
        title: 'talent_name.xiao_lemniscatic_wind_cycling',
        description: 'talent_descr.xiao_lemniscatic_wind_cycling',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Xiao.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Xiao.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Xiao.s3_id,
        title: 'talent_name.xiao_bane_of_all_evil',
        description: 'talent_descr.xiao_bane_of_all_evil',
        items: [
            {
                table: new StatTable('xiao_burst_bonus', charTalentTables.Xiao.s3.p1),
            },
            {
                unit: 'cur_hp_per_second',
                table: new StatTable('xiao_life_drain', charTalentTables.Xiao.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Xiao.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Xiao.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Xiao.s3.p5),
            },
        ],
    },
});

export const Xiao = new DbObjectChar({
    name: 'xiao',
    serializeId: 28,
    gameId: 10000026,
    iconClass: "char-icon-xiao",
    rarity: 5,
    element: 'anemo',
    weapon: 'polearm',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Xiao,
    features: [
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_1',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_1'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_1_1',
            hits: 2,
            isChild: true,
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_6'),
                }),
            ],
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
        new FeatureDamageSkill({
            element: 'anemo',
            damageBonuses: ['dmg_skill_xiao'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionConstellation({
            constellation: 3,
            settings: {
                char_skill_elemental_bonus: 3,
            }
        }),
        new ConditionConstellation({
            constellation: 5,
            settings: {
                char_skill_burst_bonus: 3,
            }
        }),
        new ConditionBooleanLevels({
            name: 'xiao_yaksha_mask',
            serializeId: 1,
            title: 'talent_name.xiao_yaksha_mask',
            description: 'talent_descr.xiao_yaksha_mask',
            levelSetting: 'char_skill_burst',
            settings: {
                attack_infusion: 'anemo',
            },
            stats: [
                Talents.getAlias('burst.xiao_burst_bonus', 'dmg_normal'),
                Talents.getAlias('burst.xiao_burst_bonus', 'dmg_charged'),
                Talents.getAlias('burst.xiao_burst_bonus', 'dmg_plunge'),
            ],
        }),
        new ConditionStacks({
            name: 'xiao_tamer_of_demons',
            serializeId: 2,
            title: 'talent_name.xiao_tamer_of_demons',
            description: 'talent_descr.xiao_tamer_of_demons',
            maxStacks: 5,
            stats: [
                new StatTable('dmg_all', [5]),
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'xiao_heaven_fall',
            serializeId: 3,
            title: 'talent_name.xiao_heaven_fall',
            description: 'talent_descr.xiao_heaven_fall',
            maxStacks: 3,
            stats: [
                new StatTable('dmg_skill_xiao', [15]),
            ],
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
                    title: 'talent_name.xiao_destroyer_of_worlds',
                    description: 'talent_descr.xiao_destroyer_of_worlds',
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'xiao_blossom_of_kaleidos',
                    serializeId: 5,
                    title: 'talent_name.xiao_blossom_of_kaleidos',
                    description: 'talent_descr.xiao_blossom_of_kaleidos',
                    stats: {
                        recharge: 25,
                    }
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'xiao_transcension',
                    serializeId: 4,
                    title: 'talent_name.xiao_extinction_of_suffering',
                    description: 'talent_descr.xiao_extinction_of_suffering',
                    stats: {
                        def_percent: 100,
                        text_percent_hp: 50,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.xiao_guardian_yaksha',
                    description: 'talent_descr.xiao_guardian_yaksha',
                }),
            ],
        },
    ]),
});
