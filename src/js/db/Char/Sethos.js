import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";
import { ValueTable } from "../../classes/ValueTable";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Sethos.s1_id,
        title: 'talent_name.sethos_royal_reed_archery',
        description: 'talent_descr.sethos_royal_reed_archery',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Sethos.s1.p1),
            },
            {
                type: 'hits',
                name: 'normal_hit_2',
                table: [
                    new StatTable('normal_hit_2_1', charTalentTables.Sethos.s1.p2),
                    new StatTable('normal_hit_2_2', charTalentTables.Sethos.s1.p3),
                ],
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Sethos.s1.p4),
            },
            {
                table: new StatTable('aimed', charTalentTables.Sethos.s1.p5),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Sethos.s1.p6),
            },
            {
                type: 'multivalue',
                separator: ' + ',
                units: [
                    'atk',
                    'mastery',
                ],
                table: [
                    new StatTable('sethos_shadowpiercing_shot_dmg', charTalentTables.Sethos.s1.p7),
                    new StatTable('sethos_shadowpiercing_shot_mastery', charTalentTables.Sethos.s1.p8),
                ],
            },
            {
                table: new StatTable('plunge', charTalentTables.Sethos.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Sethos.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Sethos.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Sethos.s2_id,
        title: 'talent_name.sethos_the_thundering_sands',
        description: 'talent_descr.sethos_the_thundering_sands',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Sethos.s2.p1),
            },
            {
                unit: 'unit',
                table: new StatTable('sethos_recharge', charTalentTables.Sethos.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sethos.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Sethos.s3_id,
        title: 'talent_name.sethos_twilight_shadowpiercer',
        description: 'talent_descr.sethos_twilight_shadowpiercer',
        items: [
            {
                unit: 'mastery',
                table: new StatTable('sethos_dusk_bolt_dmg_increase', charTalentTables.Sethos.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('sethos_twilight_meditation_duration', charTalentTables.Sethos.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Sethos.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Sethos.s3.p4),
            },
        ],
    },
});

const TalentValues = {
    A4MasteryBonus: 700,
    C1CritRate: 15,
    C2ElectroDmg: 15,
    C4Mastery: 80,
}

export const Sethos = new DbObjectChar({
    name: 'sethos',
    serializeId: 88,
    gameId: 10000097,
    iconClass: 'char-icon-sethos',
    rarity: 4,
    element: 'electro',
    weapon: 'bow',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Sethos,
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_2',
            category: 'attack',
            damageType: 'normal',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_1'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
        }),
        new FeatureDamageNormal({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_2'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
        }),
        new FeatureDamageCharged({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'sethos_twilight_meditation'}),
        }),
        new FeatureDamageMultihit({
            name: 'normal_hit_2',
            element: 'electro',
            category: 'attack',
            damageType: 'charged',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionBoolean({name: 'sethos_twilight_meditation'}),
        }),
        new FeatureDamageCharged({
            element: 'electro',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'sethos_twilight_meditation'}),
        }),
        new FeatureDamageCharged({
            element: 'electro',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'sethos_twilight_meditation'}),
        }),
        new FeatureDamageCharged({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({name: 'sethos_twilight_meditation'}),
        }),
        new FeatureDamageChargedAimed({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.aimed'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
        }),
        new FeatureDamageChargedAimed({
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_aimed'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
        }),
        new FeatureDamageCharged({
            element: 'electro',
            critRateBonuses: ['crit_rate_sethos'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.sethos_shadowpiercing_shot_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.sethos_shadowpiercing_shot_mastery'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'ascension4',
                    values: new ValueTable([TalentValues.A4MasteryBonus]),
                    condition: new ConditionBoolean({name: 'sethos_sand_king_boon'}),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            ]),
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
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'sethos_twilight_meditation',
            serializeId: 1,
            title: 'talent_name.sethos_twilight_meditation',
            description: 'talent_descr.sethos_twilight_meditation',
        }),
        new ConditionStatic({
            title: 'talent_name.sethos_black_kites_enigma',
            description: 'talent_descr.sethos_black_kites_enigma',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'sethos_sand_king_boon',
            serializeId: 2,
            title: 'talent_name.sethos_the_sand_kings_boon',
            description: 'talent_descr.sethos_the_sand_kings_boon',
            info: {ascension: 4},
            stats: {
                text_percent: TalentValues.A4MasteryBonus,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            leveling: 'char_skill_burst',
            source: 'talent_burst',
            values: Talents.get('burst.sethos_dusk_bolt_dmg_increase'),
            condition: new ConditionBoolean({name: 'sethos_twilight_meditation'}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['charged'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.sethos_sealed_shrines_spiritsong',
                    description: 'talent_descr.sethos_sealed_shrines_spiritsong',
                    stats: {
                        crit_rate_sethos: TalentValues.C1CritRate,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'sethos_papyrus_scripture_of_silent_secrets',
                    serializeId: 3,
                    maxStacks: 2,
                    title: 'talent_name.sethos_papyrus_scripture_of_silent_secrets',
                    description: 'talent_descr.sethos_papyrus_scripture_of_silent_secrets',
                    stats: [
                        new StatTable('dmg_electro', [TalentValues.C2ElectroDmg]),
                    ],
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_attack_bonus: 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'sethos_beneficent_plumage',
                    serializeId: 4,
                    title: 'talent_name.sethos_beneficent_plumage',
                    description: 'talent_descr.sethos_beneficent_plumage',
                    stats: {
                        mastery: TalentValues.C4Mastery,
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
                    title: 'talent_name.sethos_pylon_of_the_sojourning_sun_temple',
                    description: 'talent_descr.sethos_pylon_of_the_sojourning_sun_temple',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'sethos_beneficent_plumage',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.sethos_beneficent_plumage',
                description: 'talent_descr.sethos_beneficent_plumage',
                info: {constellation: 4},
                stats: {
                    mastery: TalentValues.C4Mastery,
                },
            }),
        ],
    },
});
