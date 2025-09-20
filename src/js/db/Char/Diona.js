import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Diona.s1_id,
        title: 'talent_name.diona_katzlein_style',
        description: 'talent_descr.diona_katzlein_style',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Diona.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Diona.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Diona.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Diona.s1.p4),
            },
            {
                table:  new StatTable('normal_hit_5', charTalentTables.Diona.s1.p5),
            },
            {
                table: new StatTable('aimed', charTalentTables.Diona.s1.p7),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Diona.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Diona.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Diona.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Diona.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Diona.s2_id,
        title: 'talent_name.diona_icy_paws',
        description: 'talent_descr.diona_icy_paws',
        items: [
            {
                table: new StatTable('diona_claw_dmg', charTalentTables.Diona.s2.p1),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('diona_base_shield_dmg_absorption', charTalentTables.Diona.s2.p2),
                    new StatTable('', charTalentTables.Diona.s2.p3),
                ],
            },
            {
                unit: 'per_paw',
                table: new StatTable('duration', charTalentTables.Diona.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Diona.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Diona.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Diona.s3_id,
        title: 'talent_name.diona_signature_mix',
        description: 'talent_descr.diona_signature_mix',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Diona.s3.p1),
            },
            {
                table: new StatTable('field_dmg', charTalentTables.Diona.s3.p2),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('heal_dot', charTalentTables.Diona.s3.p3),
                    new StatTable('', charTalentTables.Diona.s3.p4),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Diona.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Diona.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Diona.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    ShieldHoldRatio: 1.75,
    A1MoveSpeed: 10,
    A1StanimaConsume: 10,
    C2SkillDmg: 15,
    C2PartyShield: 50,
    C2ShieldBonus: 15,
    C6Mastery: 200,
    C6Healing: 30,
};

export const Diona = new DbObjectChar({
    name: 'diona',
    serializeId: 8,
    gameId: 10000039,
    iconClass: "char-icon-diona",
    rarity: 4,
    element: 'cryo',
    weapon: 'bow',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Diona,
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
            name: 'charged_aimed',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
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
            name: 'diona_claw_dmg',
            element: 'cryo',
            damageBonuses: ['dmg_skill_diona'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.diona_claw_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            name: 'shield_press',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.diona_base_shield_dmg_absorption'),
                    condition: new ConditionNot([
                        new ConditionConstellation({constellation: 2}),
                    ]),
                }),
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.diona_base_shield_dmg_absorption',
                        multi: 1 + (TalentValues.C2ShieldBonus / 100),
                    }),
                    condition: new ConditionConstellation({constellation: 2}),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            name: 'shield_hold',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.diona_base_shield_dmg_absorption',
                        multi: TalentValues.ShieldHoldRatio,
                    }),
                    condition: new ConditionNot([
                        new ConditionConstellation({constellation: 2}),
                    ]),
                }),
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.diona_base_shield_dmg_absorption',
                        multi: TalentValues.ShieldHoldRatio + (TalentValues.C2ShieldBonus / 100),
                    }),
                    condition: new ConditionConstellation({constellation: 2}),
                }),
            ],
        }),
        new FeatureShield({
            category: 'skill',
            name: 'party_shield_press',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.diona_base_shield_dmg_absorption',
                        multi: (1 + (TalentValues.C2ShieldBonus / 100)) * TalentValues.C2PartyShield / 100,
                    }),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureShield({
            category: 'skill',
            name: 'party_shield_hold',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.diona_base_shield_dmg_absorption',
                        multi: (TalentValues.ShieldHoldRatio + (TalentValues.C2ShieldBonus / 100)) * (TalentValues.C2PartyShield / 100),
                    }),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'field_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.field_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'heal_dot',
            category: 'burst',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal_dot'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'diona_secret_menu',
            serializeId: 1,
            title: 'talent_name.diona_cats_tail_secret_menu',
            description: 'talent_descr.diona_cats_tail_secret_menu',
            stats: {
                move_speed: TalentValues.A1MoveSpeed,
                stamina_consume: TalentValues.A1StanimaConsume,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.diona_drunkards_farce',
            description: 'talent_descr.diona_drunkards_farce',
            stats: {
                text_percent_dmg: 10,
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
                    title: 'talent_name.diona_a_lingering_flavor',
                    description: 'talent_descr.diona_a_lingering_flavor',
                }),
            ],
        },
        {

            conditions: [
                new ConditionStatic({
                    title: 'talent_name.diona_shaken_not_purred',
                    description: 'talent_descr.diona_shaken_not_purred',
                    stats: {
                        dmg_skill_diona: TalentValues.C2SkillDmg,
                        diona_shield: TalentValues.C2ShieldBonus,
                        text_percent: TalentValues.C2PartyShield,
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
                    title: 'talent_name.diona_wine_industry_slayer',
                    description: 'talent_descr.diona_wine_industry_slayer',
                    stats: {
                        text_percent: 60,
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
                    title: 'talent_name.diona_cats_tail_closing_time',
                    description: 'talent_descr.diona_cats_tail_closing_time_1',
                    stats: {
                        mastery: TalentValues.C6Mastery,
                    },
                    subConditions: [
                        new ConditionNot([
                            new ConditionBoolean({name: 'diona_cats_tail'}),
                        ]),
                    ],
                }),
                new ConditionBoolean({
                    name: 'diona_cats_tail',
                    serializeId: 2,
                    title: 'talent_name.diona_cats_tail_closing_time',
                    description: 'talent_descr.diona_cats_tail_closing_time_2',
                    stats: {
                        healing_recv: TalentValues.C6Healing,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.diona_secret_menu',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.diona_cats_tail_secret_menu',
                description: 'talent_descr.diona_cats_tail_secret_menu',
                info: {ascension: 1},
                stats: {
                    move_speed: TalentValues.A1MoveSpeed,
                    stamina_consume: TalentValues.A1StanimaConsume,
                },
            }),
            new ConditionBoolean({
                name: 'party.diona_cats_tail_1',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.diona_cats_tail_closing_time',
                description: 'talent_descr.diona_cats_tail_closing_time_1',
                info: {constellation: 6},
                stats: {
                    mastery: TalentValues.C6Mastery,
                },
            }),
            new ConditionBoolean({
                name: 'party.diona_cats_tail_2',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.diona_cats_tail_closing_time',
                description: 'talent_descr.diona_cats_tail_closing_time_2',
                info: {constellation: 6},
                stats: {
                    healing_recv: TalentValues.C6Healing,
                },
                subConditions: [
                    new ConditionNot([
                        new ConditionBoolean({name: 'party.diona_cats_tail_1'}),
                    ]),
                ],
            }),
        ],
    },
});
