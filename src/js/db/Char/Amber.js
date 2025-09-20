import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { StatTable } from "../../classes/StatTable";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureStatic } from "../../classes/Feature2/Static";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Amber.s1_id,
        title: 'talent_name.amber_sharpshooter',
        description: 'talent_descr.amber_sharpshooter',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Amber.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Amber.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Amber.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Amber.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Amber.s1.p5),
            },
            {
                table: new StatTable('aimed', charTalentTables.Amber.s1.p6),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Amber.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Amber.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Amber.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Amber.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Amber.s2_id,
        title: 'talent_name.amber_explosive_puppet',
        description: 'talent_descr.amber_explosive_puppet',
        items: [
            {
                table: new StatTable('amber_baron_hp', charTalentTables.Amber.s2.p1),
            },
            {
                table: new StatTable('explosion_dmg', charTalentTables.Amber.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Amber.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Amber.s3_id,
        title: 'talent_name.amber_fiery_rain',
        description: 'talent_descr.amber_fiery_rain',
        items: [
            {
                table: new StatTable('wave_dmg', charTalentTables.Amber.s3.p1),
            },
            {
                table: new StatTable('total_dmg', charTalentTables.Amber.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Amber.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Amber.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Amber.s3.p3),
            },
        ],
    },
});

const TalentValues = {
    A1BurstCritRate: 10,
    A1BurstAoe: 30,
    A4AtkBonus: 15,
    C1ArrowDmg: 20,
    C2DamageBonus: 200,
    C4SkillCd: 20,
    C6AtkBonus: 15,
    C6SpeedBonus: 15,
};

export const Amber = new DbObjectChar({
    name: 'amber',
    serializeId: 2,
    gameId: 10000021,
    iconClass: "char-icon-amber",
    rarity: 4,
    element: 'pyro',
    weapon: 'bow',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Amber,
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
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
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
            name: 'second_aimed',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                    scalingSource: 'constellation1',
                    scalingMultiplier: TalentValues.C1ArrowDmg / 100,
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamageChargedAimed({
            name: 'charged_aimed',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
        }),
        new FeatureDamageChargedAimed({
            name: 'second_charged_aimed',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    scalingSource: 'constellation1',
                    scalingMultiplier: TalentValues.C1ArrowDmg / 100,
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
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
            name: 'explosion_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.explosion_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'amber_explosion_dmg',
            element: 'pyro',
            damageBonuses: ['dmg_skill_amber'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.explosion_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureStatic({
            category: 'skill',
            icon: 'hp',
            name: 'amber_baron_hp',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.amber_baron_hp'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'wave_dmg',
            element: 'pyro',
            critRateBonuses: ['crit_rate_amber'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.wave_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.amber_every_arrow_finds_its_target',
            description: 'talent_descr.amber_every_arrow_finds_its_target',
            stats: {
                crit_rate_amber: TalentValues.A1BurstCritRate,
                text_percent_radius: TalentValues.A1BurstAoe,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'amber_precise_shot',
            serializeId: 1,
            title: 'talent_name.amber_precise_shot',
            description: 'talent_descr.amber_precise_shot',
            stats: {
                atk_percent: TalentValues.A4AtkBonus,
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

                    title: 'talent_name.amber_one_arrow_to_rule_them_all',
                    description: 'talent_descr.amber_one_arrow_to_rule_them_all',
                    stats: {
                        text_percent_dmg: TalentValues.C1ArrowDmg,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.amber_bunny_triggered',
                    description: 'talent_descr.amber_bunny_triggered',
                    stats: {
                        dmg_skill_amber: TalentValues.C2DamageBonus,
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
                    title: 'talent_name.amber_its_not_just_any_doll',
                    description: 'talent_descr.amber_its_not_just_any_doll',
                    stats: {
                        text_percent_cd: TalentValues.C4SkillCd,
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
                new ConditionBoolean({
                    name: 'amber_wildfire',
                    serializeId: 2,
                    title: 'talent_name.amber_wildfire',
                    description: 'talent_descr.amber_wildfire',
                    stats: {
                        atk_percent: TalentValues.C6AtkBonus,
                        move_speed: TalentValues.C6SpeedBonus,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.amber_wildfire',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.amber_wildfire',
                description: 'talent_descr.amber_wildfire',
                stats: {
                    atk_percent: TalentValues.C6AtkBonus,
                    move_speed: TalentValues.C6SpeedBonus,
                },
                info: {
                    constellation: 6,
                },
            }),
        ],
    },
});
