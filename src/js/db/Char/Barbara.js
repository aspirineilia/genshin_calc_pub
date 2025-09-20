import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Barbara.s1_id,
        title: 'talent_name.barbara_whisper_of_water',
        description: 'talent_descr.barbara_whisper_of_water',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Barbara.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Barbara.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Barbara.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Barbara.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Barbara.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Barbara.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Barbara.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Barbara.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Barbara.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Barbara.s2_id,
        title: 'talent_name.barbara_let_the_show_begin',
        description: 'talent_descr.barbara_let_the_show_begin',
        items: [
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('heal_normal_atk', charTalentTables.Barbara.s2.p3),
                    new StatTable('', charTalentTables.Barbara.s2.p4),
                ],
            },
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('heal_dot', charTalentTables.Barbara.s2.p1),
                    new StatTable('', charTalentTables.Barbara.s2.p2),
                ],
            },
            {
                table: new StatTable('barbara_droplet_dmg', charTalentTables.Barbara.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Barbara.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Barbara.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Barbara.s3_id,
        title: 'talent_name.barbara_shining_miracle',
        description: 'talent_descr.barbara_shining_miracle',
        items: [
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('heal', charTalentTables.Barbara.s3.p1),
                    new StatTable('', charTalentTables.Barbara.s3.p2),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Barbara.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Barbara.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    ChargedHealRatio: 4,
    StaminaConsume: 12,
    C2CdBonus: 15,
    C2HydroBonus: 15,
};

export const Barbara = new DbObjectChar({
    name: 'barbara',
    serializeId: 3,
    gameId: 10000014,
    iconClass: "char-icon-barbara",
    rarity: 4,
    element: 'hydro',
    weapon: 'catalyst',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Barbara,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'heal_normal_atk',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.heal_normal_atk'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'heal_charged_atk',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        name: 'heal_charged_atk',
                        from: 'skill.heal_normal_atk',
                        multi: TalentValues.ChargedHealRatio,
                    }),
                }),
            ],
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
        new FeatureDamageSkill({
            name: 'barbara_droplet_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.barbara_droplet_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'heal',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.barbara_glorious_season',
            description: 'talent_descr.barbara_glorious_season',
            stats: {
                stamina_consume: TalentValues.StaminaConsume,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.barbara_encore',
            description: 'talent_descr.barbara_encore',
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
                    title: 'talent_name.barbara_gleeful_songs',
                    description: 'talent_descr.barbara_gleeful_songs',
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'barbara_vitality_burst',
                    serializeId: 1,
                    title: 'talent_name.barbara_vitality_burst',
                    description: 'talent_descr.barbara_vitality_burst',
                    stats: {
                        text_percent_cd: TalentValues.C2CdBonus,
                        dmg_hydro: TalentValues.C2HydroBonus,
                    }
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
                    title: 'talent_name.barbara_attentiveness_be_my_power',
                    description: 'talent_descr.barbara_attentiveness_be_my_power',
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
                    title: 'talent_name.barbara_dedicating_everything_to_you',
                    description: 'talent_descr.barbara_dedicating_everything_to_you',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.barbara_glorious_season',
                serializeId: 2,
                title: 'talent_name.barbara_glorious_season',
                description: 'talent_descr.barbara_glorious_season',
                info: {ascension: 1},
                stats: {
                    stamina_consume: TalentValues.StaminaConsume,
                },
            }),
            new ConditionBoolean({
                name: 'party.barbara_vitality_burst',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.barbara_vitality_burst',
                description: 'talent_descr.barbara_vitality_burst',
                info: {constellation: 2},
                stats: {
                    text_percent_cd: TalentValues.C2CdBonus,
                    dmg_hydro: TalentValues.C2HydroBonus,
                },
            }),
        ],
    },
});
