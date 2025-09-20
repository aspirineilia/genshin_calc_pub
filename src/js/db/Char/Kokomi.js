import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamage } from "../../classes/Feature2/Damage";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierKokomi } from "../../classes/Feature2/Multiplier/Kokomi";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Kokomi.s1_id,
        title: 'talent_name.sangonomiya_kokomi_the_shape_of_water',
        description: 'talent_descr.sangonomiya_kokomi_the_shape_of_water',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kokomi.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Kokomi.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Kokomi.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Kokomi.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Kokomi.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kokomi.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kokomi.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kokomi.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kokomi.s2_id,
        title: 'talent_name.sangonomiya_kokomi_kurages_oath',
        description: 'talent_descr.sangonomiya_kokomi_kurages_oath',
        items: [
            {
                type: 'shield',
                table: [
                    new StatTable('heal_dot', charTalentTables.Kokomi.s2.p1),
                    new StatTable('', charTalentTables.Kokomi.s2.p2),
                ],
            },
            {
                table: new StatTable('kokomi_ripple_dmg', charTalentTables.Kokomi.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Kokomi.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kokomi.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kokomi.s3_id,
        title: 'talent_name.sangonomiya_kokomi_nereids_ascension',
        description: 'talent_descr.sangonomiya_kokomi_nereids_ascension',
        items: [
            {
                unit: 'hp',
                table: new StatTable('burst_dmg', charTalentTables.Kokomi.s3.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('kokomi_normal_atk_bonus', charTalentTables.Kokomi.s3.p4),
            },
            {
                unit: 'hp',
                table: new StatTable('kokomi_charged_atk_bonus', charTalentTables.Kokomi.s3.p5),
            },
            {
                unit: 'hp',
                table: new StatTable('kokomi_skill_atk_bonus', charTalentTables.Kokomi.s3.p9),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('kokomi_burst_heal', charTalentTables.Kokomi.s3.p2),
                    new StatTable('', charTalentTables.Kokomi.s3.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Kokomi.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kokomi.s3.p7),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kokomi.s3.p8),
            },
        ],
    },
});

const TalentValues = {
    PassiveHealing: 25,
    PassiveCritRate: -100,
    A4HealingMultiplier: 15,
    C1AttackDmg: 30,
    C2SkillHeal: 4.5,
    C2BurstHeal: 0.6,
    C4AttackSpeed: 10,
    C6HydroDmg: 40,
};

export const Kokomi = new DbObjectChar({
    name: 'sangonomiya_kokomi',
    serializeId: 41,
    gameId: 10000054,
    rarity: 5,
    element: 'hydro',
    weapon: 'catalyst',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Kokomi,
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
        new FeatureDamageSkill({
            name: 'kokomi_ripple_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kokomi_ripple_dmg'),
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
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation2',
                    values: new ValueTable([TalentValues.C2SkillHeal]),
                    condition: new ConditionAnd([
                        new ConditionConstellation({constellation: 2}),
                        new ConditionBoolean({name: 'kokomi_clouds_like_waves'}),
                    ]),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'kokomi_burst_heal',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.kokomi_burst_heal'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation2',
                    values: new ValueTable([TalentValues.C2BurstHeal]),
                    condition: new ConditionAnd([
                        new ConditionConstellation({constellation: 2}),
                        new ConditionBoolean({name: 'kokomi_clouds_like_waves'}),
                    ]),
                }),
            ],
        }),
        new FeatureDamage({
            name: 'kokomi_swimming_fish_dmg',
            category: 'other',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_attack',
                    values: new ValueTable([TalentValues.C1AttackDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.kokomi_flawless_strategy',
            description: 'talent_descr.kokomi_flawless_strategy',
            stats: {
                healing: TalentValues.PassiveHealing,
                crit_rate: TalentValues.PassiveCritRate,
            },
        }),
        new ConditionBoolean({
            name: 'kokomi_ceremonial_garment',
            serializeId: 1,
            title: 'talent_name.kokomi_ceremonial_garment',
            description: 'talent_descr.kokomi_ceremonial_garment',
        }),
        new ConditionStatic({
            title: 'talent_name.sangonomiya_kokomi_tamakushi_casket',
            description: 'talent_descr.sangonomiya_kokomi_tamakushi_casket',
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStatic({
            title: 'talent_name.sangonomiya_kokomi_song_of_pearls',
            description: 'talent_descr.sangonomiya_kokomi_song_of_pearls',
            stats: {
                text_percent: TalentValues.A4HealingMultiplier,
            },
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            leveling: 'char_skill_burst',
            source: 'talent_burst',
            values: Talents.get('burst.kokomi_normal_atk_bonus'),
            condition: new ConditionBoolean({name: 'kokomi_ceremonial_garment'}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            leveling: 'char_skill_burst',
            source: 'talent_burst',
            values: Talents.get('burst.kokomi_charged_atk_bonus'),
            condition: new ConditionBoolean({name: 'kokomi_ceremonial_garment'}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['charged'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            leveling: 'char_skill_burst',
            source: 'talent_burst',
            values: Talents.get('burst.kokomi_skill_atk_bonus'),
            condition: new ConditionBoolean({name: 'kokomi_ceremonial_garment'}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
        new FeatureMultiplierKokomi({
            scaling: 'hp*',
            leveling: 'char_skill_burst',
            source: 'ascension4',
            values: new ValueTable([TalentValues.A4HealingMultiplier]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'kokomi_ceremonial_garment'}),
                new ConditionAscensionChar({ascension: 4}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal', 'charged'],
            }),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.sangonomiya_kokomi_at_waters_edge',
                    description: 'talent_descr.sangonomiya_kokomi_at_waters_edge',
                    stats: {
                        text_percent_dmg: TalentValues.C1AttackDmg,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'kokomi_clouds_like_waves',
                    serializeId: 2,
                    title: 'talent_name.sangonomiya_kokomi_the_clouds_like_waves_rippling',
                    description: 'talent_descr.sangonomiya_kokomi_the_clouds_like_waves_rippling',
                    stats: {
                        text_percent_1: TalentValues.C2SkillHeal,
                        text_percent_2: TalentValues.C2BurstHeal,
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
                    title: 'talent_name.sangonomiya_kokomi_the_moon_overlooks_the_waters',
                    description: 'talent_descr.sangonomiya_kokomi_the_moon_overlooks_the_waters',
                    stats: {
                        atk_speed_normal: TalentValues.C4AttackSpeed,
                    },
                    condition: new ConditionBooleanLevels({name: 'kokomi_ceremonial_garment'}),
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
                    name: 'sangonomiya_kokomi_sango_isshin',
                    serializeId: 3,
                    title: 'talent_name.sangonomiya_kokomi_sango_isshin',
                    description: 'talent_descr.sangonomiya_kokomi_sango_isshin',
                    stats: {
                        dmg_hydro: TalentValues.C6HydroDmg,
                    },
                    condition: new ConditionBoolean({name: 'kokomi_ceremonial_garment'}),
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [],
    },
});
