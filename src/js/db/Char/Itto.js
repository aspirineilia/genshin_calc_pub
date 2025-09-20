import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsDef } from "../../classes/PostEffect/Stats/Def";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Itto.s1_id,
        title: 'talent_name.arataki_itto_fight_club_legend',
        description: 'talent_descr.arataki_itto_fight_club_legend',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Itto.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Itto.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Itto.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Itto.s1.p4),
            },
            {
                table: new StatTable('itto_kesagiri_combo_slash_dmg', charTalentTables.Itto.s1.p6),
            },
            {
                table: new StatTable('itto_kesagiri_final_slash_dmg', charTalentTables.Itto.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('itto_duration_strength', charTalentTables.Itto.s1.p12),
            },
            {
                table: new StatTable('itto_saichimonji_slash_dmg', charTalentTables.Itto.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('itto_stamina_cost', charTalentTables.Itto.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Itto.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Itto.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Itto.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Itto.s2_id,
        title: 'talent_name.arataki_itto_akaushi_burst',
        description: 'talent_descr.arataki_itto_akaushi_burst',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Itto.s2.p1),
            },
            {
                table: new StatTable('itto_hurls_ushi_hp', charTalentTables.Itto.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Itto.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Itto.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Itto.s3_id,
        title: 'talent_name.arataki_itto_behold_itto_the_evil',
        description: 'talent_descr.arataki_itto_behold_itto_the_evil',
        items: [
            {
                unit: 'def',
                table: new StatTable('itto_atk_bonus', charTalentTables.Itto.s3.p2),
            },
            {
                table: new StatTable('itto_atk_speed_bonus', charTalentTables.Itto.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Itto.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Itto.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Itto.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    BurstAtkSpeed: 10,
    BurstResistance: -20,
    A1AtkSpeed: 10,
    A1AtkSpeedCap: 30,
    A4ChargedDefBonus: 35,
    C4AtkPercent: 20,
    C4DefPercent: 20,
    C6CritDmg: 70,
};

const atkBuffPost = new PostEffectStatsDef({
    percent: Talents.getMulti({
        name: 'atk',
        from: 'burst.itto_atk_bonus',
        multi: 0.01,
    }),
    levelSetting: 'char_skill_burst',
    conditions: [
        new ConditionBoolean({name: 'itto_royal_descent'}),
    ],
});

export const Itto = new DbObjectChar({
    name: 'arataki_itto',
    serializeId: 46,
    gameId: 10000057,
    iconClass: "char-icon-arataki-itto",
    rarity: 5,
    element: 'geo',
    weapon: 'claymore',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Itto,
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
        new FeatureDamageCharged({
            name: 'itto_kesagiri_combo_slash_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.itto_kesagiri_combo_slash_dmg'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'itto_kesagiri_final_slash_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.itto_kesagiri_final_slash_dmg'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'itto_saichimonji_slash_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.itto_saichimonji_slash_dmg'),
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
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'itto_hurls_ushi_hp',
            postEffect: new PostEffectStatsHP({
                levelSetting: 'char_skill_elemental',
                percent: Talents.getMulti({
                    name: 'itto_hurls_ushi_hp',
                    from: 'skill.itto_hurls_ushi_hp',
                    multi: 0.01,
                }),
            }),
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'atk_bonus',
            postEffect: atkBuffPost,
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'itto_royal_descent',
            serializeId: 1,
            title: 'talent_name.itto_royal_descent',
            description: 'talent_descr.itto_royal_descent',
            stats: {
                atk_speed_normal: TalentValues.BurstAtkSpeed,
                res_pyro: TalentValues.BurstResistance,
                res_electro: TalentValues.BurstResistance,
                res_hydro: TalentValues.BurstResistance,
                res_cryo: TalentValues.BurstResistance,
                res_anemo: TalentValues.BurstResistance,
                res_geo: TalentValues.BurstResistance,
                res_dendro: TalentValues.BurstResistance,
                res_phys: TalentValues.BurstResistance,
            },
            settings: {
                attack_infusion: 'geo',
            },
        }),
        new ConditionStacks({
            name: 'itto_arataki_ichiban',
            serializeId: 3,
            title: 'talent_name.arataki_itto_arataki_ichiban',
            description: 'talent_descr.arataki_itto_arataki_ichiban',
            maxStacks: 3,
            stats: [
                new StatTable('atk_speed_charged', [TalentValues.A1AtkSpeed]),
                new StatTable('text_percent_max', [TalentValues.A1AtkSpeedCap]),
            ],
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.arataki_itto_bloodline_of_the_crimson_oni',
            description: 'talent_descr.arataki_itto_bloodline_of_the_crimson_oni',
            stats: {
                text_percent: TalentValues.A4ChargedDefBonus,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            source: 'ascension4',
            values: new ValueTable([TalentValues.A4ChargedDefBonus]),
            condition: new ConditionAscensionChar({ascension: 4}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['charged'],
            }),
        }),
    ],
    postEffects: [
        atkBuffPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.arataki_itto_stay_a_while_and_listen_up',
                    description: 'talent_descr.arataki_itto_stay_a_while_and_listen_up',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.arataki_itto_gather_round_its_a_brawl',
                    description: 'talent_descr.arataki_itto_gather_round_its_a_brawl',
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
                    name: 'itto_jailhouse_bread_and_butter',
                    serializeId: 2,
                    title: 'talent_name.arataki_itto_jailhouse_bread_and_butter',
                    description: 'talent_descr.arataki_itto_jailhouse_bread_and_butter',
                    stats: {
                        def_percent: TalentValues.C4DefPercent,
                        atk_percent: TalentValues.C4AtkPercent,
                    },
                }),
            ]
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
                    title: 'talent_name.arataki_itto_arataki_itto_present',
                    description: 'talent_descr.arataki_itto_arataki_itto_present',
                    stats: {
                        crit_dmg_charged: TalentValues.C6CritDmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.itto_jailhouse_bread_and_butter',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.arataki_itto_jailhouse_bread_and_butter',
                description: 'talent_descr.arataki_itto_jailhouse_bread_and_butter',
                info: {constellation: 4},
                stats: {
                    def_percent: TalentValues.C4DefPercent,
                    atk_percent: TalentValues.C4AtkPercent,
                },
            }),
        ],
    },
});
