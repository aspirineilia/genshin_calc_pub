import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanCharElement } from "../../classes/Condition/Boolean/CharElement";
import { ConditionBooleanChevreuseParty } from "../../classes/Condition/Boolean/ChevreuseParty";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Chevreuse.s1_id,
        title: 'talent_name.chevreuse_line_bayonet_thrust_ex',
        description: 'talent_descr.chevreuse_line_bayonet_thrust_ex',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Chevreuse.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Chevreuse.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Chevreuse.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Chevreuse.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Chevreuse.s1.p5),
            },

            {
                table: new StatTable('charged_hit', charTalentTables.Chevreuse.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Chevreuse.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Chevreuse.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Chevreuse.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Chevreuse.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Chevreuse.s2_id,
        title: 'talent_name.chevreuse_short_range_rapid_interdiction_fire',
        description: 'talent_descr.chevreuse_short_range_rapid_interdiction_fire',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Chevreuse.s2.p1),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Chevreuse.s2.p2),
            },
            {
                table: new StatTable('chevreuse_overcharge_dmg', charTalentTables.Chevreuse.s2.p3),
            },
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('heal_dot', charTalentTables.Chevreuse.s2.p5),
                    new StatTable('', charTalentTables.Chevreuse.s2.p6),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('chevreuse_heal_interval', charTalentTables.Chevreuse.s2.p4),
            },
            {
                table: new StatTable('surging_blade_dmg', charTalentTables.Chevreuse.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Chevreuse.s2.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Chevreuse.s2.p9),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Chevreuse.s3_id,
        title: 'talent_name.chevreuse_ring_of_bursting_grenades',
        description: 'talent_descr.chevreuse_ring_of_bursting_grenades',
        items: [
            {
                table: new StatTable('chevreuse_explosive_grenade_dmg', charTalentTables.Chevreuse.s3.p1),
            },
            {
                table: new StatTable('chevreuse_secondary_explosive_dmg', charTalentTables.Chevreuse.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Chevreuse.s3.p3),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Chevreuse.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    ResShred: -40,
    AtkBuffValue: 1,
    AtkBuffCap: 40,
    C2ChainDmg: 120,
    C6PartyHeal: 10,
    C6DmgBonus: 20,
}

const atkBuffPost = new PostEffectStatsHP({
    percent: new StatTable('atk_percent', [TalentValues.AtkBuffValue / 1000]),
    statCap: new StatTable('', [TalentValues.AtkBuffCap]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
        new ConditionBoolean({name: 'chevreuse_force_coordination'}),
    ],
});

export const Chevreuse = new DbObjectChar({
    name: 'chevreuse',
    serializeId: 80,
    gameId: 10000090,
    iconClass: 'char-icon-chevreuse',
    rarity: 4,
    element: 'pyro',
    weapon: 'polearm',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Chevreuse,
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
            name: 'press_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'hold_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'chevreuse_overcharge_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.chevreuse_overcharge_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'chevreuse_chain_explosion_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation2',
                    values: new ValueTable([TalentValues.C2ChainDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'heal_dot',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.heal_dot'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'chevreuse_heal_dot',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6PartyHeal]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureDamageSkill({
            name: 'surging_blade_dmg',
            element: 'pyro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.surging_blade_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'chevreuse_explosive_grenade_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.chevreuse_explosive_grenade_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'chevreuse_secondary_explosive_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.chevreuse_secondary_explosive_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'atk_bonus',
            postEffect: atkBuffPost,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'chevreuse_tactics',
            serializeId: 1,
            title: 'talent_name.chevreuse_vanguards_coordinated_tactics',
            description: 'talent_descr.chevreuse_vanguards_coordinated_tactics',
            info: {ascension: 1},
            stats: {
                enemy_res_pyro: TalentValues.ResShred,
                enemy_res_electro: TalentValues.ResShred,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionBooleanChevreuseParty(),
            ],
        }),
        new ConditionBoolean({
            name: 'chevreuse_force_coordination',
            serializeId: 2,
            title: 'talent_name.chevreuse_vertical_force_coordination',
            description: 'talent_descr.chevreuse_vertical_force_coordination',
            info: {ascension: 4},
            stats: {
                text_percent: TalentValues.AtkBuffValue,
                text_value: 1000,
                text_percent_max: TalentValues.AtkBuffCap,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [atkBuffPost],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.chevreuse_stable_front_lines_resolve',
                    description: 'talent_descr.chevreuse_stable_front_lines_resolve',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.chevreuse_sniper_induced_explosion',
                    description: 'talent_descr.chevreuse_sniper_induced_explosion',
                    stats: {
                        text_percent_dmg: TalentValues.C2ChainDmg,
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
                    title: 'talent_name.chevreuse_the_secret_to_rapid_fire_multishots',
                    description: 'talent_descr.chevreuse_the_secret_to_rapid_fire_multishots',
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
                new ConditionStacks({
                    name: 'chevreuse_in_pursuit',
                    serializeId: 3,
                    title: 'talent_name.chevreuse_in_pursuit_of_ending_evil',
                    description: 'talent_descr.chevreuse_in_pursuit_of_ending_evil',
                    maxStacks: 3,
                    stats: [
                        new StatTable('text_percent_heal', [TalentValues.C6PartyHeal]),
                        new StatTable('dmg_pyro', [TalentValues.C6DmgBonus]),
                        new StatTable('dmg_electro', [TalentValues.C6DmgBonus]),
                    ],
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
                name: 'chevreuse_hp_total',
                title: 'talent_name.stats_total_hp',
                partyStat: 'hp_total',
                serializeId: 1,
                class: "gi-inputs-5digit",
                max: CHARACTER_MAX_POSSIBLE_HP,
            }),
            new ConditionBoolean({
                name: 'party.chevreuse_tactics',
                serializeId: 2,
                title: 'talent_name.chevreuse_vanguards_coordinated_tactics',
                description: 'talent_descr.chevreuse_vanguards_coordinated_tactics',
                rotation: 'party',
                info: {ascension: 1},
                stats: {
                    enemy_res_pyro: TalentValues.ResShred,
                    enemy_res_electro: TalentValues.ResShred,
                },
                subConditions: [
                    new ConditionBooleanChevreuseParty(),
                ],
            }),
            new ConditionBoolean({
                name: 'party.chevreuse_force_coordination',
                serializeId: 3,
                title: 'talent_name.chevreuse_vertical_force_coordination',
                description: 'talent_descr.chevreuse_vertical_force_coordination',
                rotation: 'party',
                info: {ascension: 4},
                stats: {
                    text_percent: TalentValues.AtkBuffValue,
                    text_value: 1000,
                    text_percent_max: TalentValues.AtkBuffCap,
                },
                subConditions: [
                    new ConditionBooleanCharElement({element: ['pyro', 'electro']}),
                ],
            }),
            new ConditionStacks({
                name: 'party.chevreuse_in_pursuit',
                serializeId: 4,
                title: 'talent_name.chevreuse_in_pursuit_of_ending_evil',
                description: 'talent_descr.chevreuse_in_pursuit_of_ending_evil',
                rotation: 'party',
                maxStacks: 3,
                info: {constellation: 6},
                stats: [
                    new StatTable('text_percent_heal', [TalentValues.C6PartyHeal]),
                    new StatTable('dmg_pyro', [TalentValues.C6DmgBonus]),
                    new StatTable('dmg_electro', [TalentValues.C6DmgBonus]),
                ],
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'chevreuse_hp_total',
                percent: new StatTable('atk_percent', [TalentValues.AtkBuffValue / 1000]),
                statCap: new StatTable('', [TalentValues.AtkBuffCap]),
                conditions: [
                    new ConditionBoolean({name: 'party.chevreuse_force_coordination'}),
                    new ConditionBooleanCharElement({element: ['pyro', 'electro']}),
                ],
            }),
        ]
    },
});
