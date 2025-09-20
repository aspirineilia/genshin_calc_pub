import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberIfa } from "../../classes/Condition/Number/Ifa";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Ifa.s1_id,
        title: 'talent_name.ifa_rite_of_dispelling_winds',
        description: 'talent_descr.ifa_rite_of_dispelling_winds',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Ifa.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Ifa.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Ifa.s1.p3),
            },
            {
                table:  new StatTable('charged_hit', charTalentTables.Ifa.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Ifa.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Ifa.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Ifa.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Ifa.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Ifa.s2_id,
        title: 'talent_name.ifa_airborne_disease_prevention',
        description: 'talent_descr.ifa_airborne_disease_prevention',
        items: [
            {
                table: new StatTable('ifa_tonicshot_dmg', charTalentTables.Ifa.s2.p1),
            },
            {
                type: 'shield',
                unit: 'mastery',
                table: [
                    new StatTable('ifa_tonicshot_heal', charTalentTables.Ifa.s2.p2),
                    new StatTable('', charTalentTables.Ifa.s2.p3),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('xilonen_nightsoul', charTalentTables.Ifa.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ifa.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Ifa.s3_id,
        title: 'talent_name.ifa_compound_sedation_field',
        description: 'talent_descr.ifa_compound_sedation_field',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Ifa.s3.p1),
            },
            {
                table: new StatTable('ifa_sedation_mark_dmg', charTalentTables.Ifa.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ifa.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Ifa.s3.p4),
            },
        ],
    },
    links: [11130001, 11130002, 11130003, 11130004],
});

const A1Stacks = 150;
const A1ReactionDmg = 1.5;
const A1MoonReactionDmg = 0.2;
const A4Mastery = 80;
const C2Stacks = 50;
const C4Mastery = 100;
const C6Dmg = 120;

const reactionDmgPost = new PostEffectStats({
    from: 'ifa_field_medics_vision',
    percent: [
        new StatTable('dmg_reaction_swirl', [A1ReactionDmg]),
        new StatTable('dmg_reaction_electrocharged', [A1ReactionDmg]),
    ],
    condition: new ConditionAnd([
        new ConditionBoolean({name: 'common.nightsoul_blessing_state'}),
        new ConditionBoolean({name: 'ifa_field_medics_vision'}),
        new ConditionAscensionChar({ascension: 1}),
    ]),
});

const reactionDmgPost2 = new PostEffectStats({
    from: 'ifa_field_medics_vision',
    percent: [
        new StatTable('dmg_reaction_lunarcharged', [A1MoonReactionDmg]),
    ],
    condition: new ConditionAnd([
        new ConditionBoolean({name: 'common.nightsoul_blessing_state'}),
        new ConditionBoolean({name: 'ifa_field_medics_vision'}),
        new ConditionAscensionChar({ascension: 1}),
    ]),
});

export const Ifa = new DbObjectChar({
    name: 'ifa',
    serializeId: 105,
    gameId: 10000113,
    iconClass: 'char-icon-ifa',
    rarity: 4,
    element: 'anemo',
    weapon: 'catalyst',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Ifa,
    features: [
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'anemo',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.ifa_tonicshot_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'ifa_tonicshot_add_dmg',
            category: 'skill',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    source: 'constellation6',
                    values: new ValueTable([C6Dmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureHeal({
            category: 'skill',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'mastery*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.ifa_tonicshot_heal'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        ...['pyro', 'hydro', 'cryo', 'electro'].map((elem) => {
            return new FeatureDamageBurst({
                name: 'ifa_sedation_mark_'+ elem +'_dmg',
                element: elem,
                multipliers: [
                    new FeatureMultiplier({
                        leveling: 'char_skill_burst',
                        values: Talents.get('burst.ifa_sedation_mark_dmg'),
                    }),
                ],
            });
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'ifa_reaction_bonus',
            postEffect: reactionDmgPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'ifa_reaction_bonus_2',
            postEffect: reactionDmgPost2,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'common.nightsoul_blessing_state',
            serializeId: 1,
            title: 'talent_name.nightsoul_blessing_state',
        }),
        new ConditionNumberIfa({
            name: 'ifa_field_medics_vision',
            serializeId: 2,
            title: 'talent_name.ifa_field_medics_vision',
            description: 'talent_descr.ifa_field_medics_vision',
            max: A1Stacks,
            c2bonus: C2Stacks,
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionBoolean({
            name: 'ifa_mutual_aid_agreement',
            serializeId: 3,
            title: 'talent_name.ifa_mutual_aid_agreement',
            description: 'talent_descr.ifa_mutual_aid_agreement',
            stats: {
                mastery: A4Mastery,
            },
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    postEffects: [
        reactionDmgPost,
        reactionDmgPost2,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.ifa_vitiferous_elixirs_concoction',
                    description: 'talent_descr.ifa_vitiferous_elixirs_concoction',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.ifa_guiding_spirit_of_ballistic_prayer',
                    description: 'talent_descr.ifa_guiding_spirit_of_ballistic_prayer',
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
                    name: 'ifa_decayed_vessels_permutation',
                    serializeId: 4,
                    title: 'talent_name.ifa_decayed_vessels_permutation',
                    description: 'talent_descr.ifa_decayed_vessels_permutation',
                    stats: {
                        mastery: C4Mastery,
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
                    title: 'talent_name.ifa_oath_on_a_feathered_knot',
                    description: 'talent_descr.ifa_oath_on_a_feathered_knot',
                    stats: {
                        text_percent_dmg: C6Dmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionNumber({
                name: 'party_ifa_field_medics_vision',
                serializeId: 1,
                title: 'talent_name.ifa_field_medics_vision',
                description: 'talent_descr.ifa_field_medics_vision',
                max: A1Stacks + C2Stacks,
                rotation: 'party',
                info: {ascension: 1},
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'party_ifa_field_medics_vision',
                percent: [
                    new StatTable('dmg_reaction_swirl', [A1ReactionDmg]),
                    new StatTable('dmg_reaction_electrocharged', [A1ReactionDmg]),
                    new StatTable('dmg_reaction_lunarcharged', [A1MoonReactionDmg]),
                ],
                condition: new ConditionBoolean({name: 'party_ifa_field_medics_vision'}),
            }),
        ],
    },
});
