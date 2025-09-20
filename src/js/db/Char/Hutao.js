import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Hutao.s1_id,
        title: 'talent_name.hu_tao_secret_spear_of_wangsheng',
        description: 'talent_descr.hu_tao_secret_spear_of_wangsheng',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Hutao.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Hutao.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Hutao.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Hutao.s1.p4),
            },
            {
                type: 'hits',
                name: 'normal_hit_5',
                table: [
                    new StatTable('normal_hit_5_1', charTalentTables.Hutao.s1.p5),
                    new StatTable('normal_hit_5_2', charTalentTables.Hutao.s1.p6),
                ],
            },
            {
                table: new StatTable('normal_hit_6', charTalentTables.Hutao.s1.p7),
            },

            {
                table: new StatTable('charged_hit', charTalentTables.Hutao.s1.p8),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Hutao.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Hutao.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Hutao.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Hutao.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Hutao.s2_id,
        title: 'talent_name.hu_tao_guide_to_afterlife',
        description: 'talent_descr.hu_tao_guide_to_afterlife',
        items: [
            {
                unit: 'current_hp',
                table: new StatTable('hutao_skill_cost', charTalentTables.Hutao.s2.p1),
            },
            {
                table: new StatTable('hutao_atk_bonus', charTalentTables.Hutao.s2.p2),
            },
            {
                table: new StatTable('hutao_blood_blossom', charTalentTables.Hutao.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('hutao_blossom_duration', charTalentTables.Hutao.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Hutao.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Hutao.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Hutao.s3_id,
        title: 'talent_name.hu_tao_spirit_soother',
        description: 'talent_descr.hu_tao_spirit_soother',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Hutao.s3.p1),
            },
            {
                table: new StatTable('hutao_burst_dmg_lowhp', charTalentTables.Hutao.s3.p2),
            },
            {
                unit: 'hp',
                table: new StatTable('heal', charTalentTables.Hutao.s3.p3),
            },
            {
                unit: 'hp',
                table: new StatTable('hutao_heal_lowhp', charTalentTables.Hutao.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Hutao.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Hutao.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    SkillMaxBonus: 400,
    A1CritRate: 12,
    A4PyroDmg: 33,
    C2SkillHpBonus: 10,
    C4CritRate: 12,
    C6CritRate: 100,
    C6Resistance: 200,
};

const atkBuffPost = new PostEffectStatsHP({
    percent: Talents.getMulti({
        name: 'atk',
        from: 'skill.hutao_atk_bonus',
        multi: 0.01,
    }),
    levelSetting: 'char_skill_elemental',
    conditions: [
        new ConditionBoolean({name: 'hutao_paramita_papilio'}),
    ],
    statCapPost: new PostEffectStats({
        from: 'atk_base',
        percent: new StatTable('atk_percent', [TalentValues.SkillMaxBonus]),
    }),
});

export const Hutao = new DbObjectChar({
    name: 'hu_tao',
    serializeId: 11,
    gameId: 10000046,
    iconClass: "char-icon-hu-tao",
    rarity: 5,
    element: 'pyro',
    weapon: 'polearm',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Hutao,
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
        new FeatureDamageMultihit({
            name: 'normal_hit_5',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_5_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_5_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_6',
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
            name: 'hutao_blood_blossom',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hutao_blood_blossom'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'hutao_atk_bonus',
            postEffect: atkBuffPost,
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'hutao_max_hp_bonus',
            postEffect: new PostEffectStats({
                from: 'atk_base',
                levelSetting: 'char_skill_elemental',
                percent: Talents.getDivide({
                    name: 'hutao_max_hp_bonus',
                    from: 'skill.hutao_atk_bonus',
                    multi: TalentValues.SkillMaxBonus,
                }),
            }),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'hutao_burst_dmg_lowhp',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.hutao_burst_dmg_lowhp'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'heal',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.heal'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'hutao_heal_lowhp',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.hutao_heal_lowhp'),
                }),
            ],
        }),
    ],
    postEffects: [
        atkBuffPost,
    ],
    conditions: [
        new ConditionConstellation({
            constellation: 3,
            settings: {
                char_skill_elemental_bonus: 3,
            }
        }),
        new ConditionBoolean({
            name: 'hutao_paramita_papilio',
            serializeId: 1,
            title: 'talent_name.hutao_paramita_papilio',
            description: 'talent_descr.hutao_paramita_papilio',
            stats: {
                text_percent_hp: TalentValues.SkillMaxBonus,
            },
            settings: {
                attack_infusion: 'pyro',
            },
        }),
        new ConditionStatic({
            title: 'talent_name.hu_tao_flutter_by',
            description: 'talent_descr.hu_tao_flutter_by',
            stats: {
                text_percent: TalentValues.A1CritRate,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'hu_tao_sanguine_rouge',
            serializeId: 2,
            title: 'talent_name.hu_tao_sanguine_rouge',
            description: 'talent_descr.hu_tao_sanguine_rouge',
            stats: {
                dmg_pyro: TalentValues.A4PyroDmg,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'constellation2',
            values: new ValueTable([TalentValues.C2SkillHpBonus]),
            condition: new ConditionConstellation({constellation: 2}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.hu_tao_crimson_bouquet',
                    description: 'talent_descr.hu_tao_crimson_bouquet',
                    subConditions: [
                        new ConditionBoolean({name: 'hutao_paramita_papilio'}),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.hu_tao_ominous_rainfall',
                    description: 'talent_descr.hu_tao_ominous_rainfall',
                    stats: {
                        text_percent: TalentValues.C2SkillHpBonus,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.hu_tao_garden_of_eternal_rest',
                    description: 'talent_descr.hu_tao_garden_of_eternal_rest',
                    stats: {
                        text_percent: TalentValues.C4CritRate,
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
                    name: 'hu_tao_butterflys_embrace',
                    serializeId: 3,
                    title: 'talent_name.hu_tao_butterflys_embrace',
                    description: 'talent_descr.hu_tao_butterflys_embrace',
                    stats: {
                        res_phys: TalentValues.C6Resistance,
                        res_anemo: TalentValues.C6Resistance,
                        res_geo: TalentValues.C6Resistance,
                        res_pyro: TalentValues.C6Resistance,
                        res_electro: TalentValues.C6Resistance,
                        res_hydro: TalentValues.C6Resistance,
                        res_cryo: TalentValues.C6Resistance,
                        res_dendro: TalentValues.C6Resistance,
                        crit_rate: TalentValues.C6CritRate,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.hu_tao_flutter_by',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.hu_tao_flutter_by',
                description: 'talent_descr.hu_tao_flutter_by',
                info: {ascension: 1},
                stats: {
                    text_percent: TalentValues.A1CritRate,
                    crit_rate: TalentValues.A1CritRate,
                },
            }),
            new ConditionBoolean({
                name: 'party.hu_tao_garden_of_eternal_rest',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.hu_tao_garden_of_eternal_rest',
                description: 'talent_descr.hu_tao_garden_of_eternal_rest',
                info: {constellation: 4},
                stats: {
                    text_percent: TalentValues.C4CritRate,
                    crit_rate: TalentValues.C4CritRate,
                },
            }),
        ],
    },
});

