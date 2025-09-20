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
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Gaming.s1_id,
        title: 'talent_name.gaming_stellar_rend',
        description: 'talent_descr.gaming_stellar_rend',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Gaming.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Gaming.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Gaming.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Gaming.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Gaming.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Gaming.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Gaming.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Gaming.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Gaming.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Gaming.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Gaming.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Gaming.s2_id,
        title: 'talent_name.gaming_bestial_ascent',
        description: 'talent_descr.gaming_bestial_ascent',
        items: [
            {
                table: new StatTable('gaming_charmed_cloudstrider_dmg', charTalentTables.Gaming.s2.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('hp_cost', charTalentTables.Gaming.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Gaming.s2.p3),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Gaming.s3_id,
        title: 'talent_name.gaming_suannis_gilded_dance',
        description: 'talent_descr.gaming_suannis_gilded_dance',
        items: [
            {
                table: new StatTable('gaming_suanni_man_dmg', charTalentTables.Gaming.s3.p1),
            },
            {
                unit: 'hp',
                table: new StatTable('heal', charTalentTables.Gaming.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('gaming_duration', charTalentTables.Gaming.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Gaming.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Gaming.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    A1Heal: 1.5,
    A4Healing: 20,
    A4SkillBonus: 20,
    C1Heal: 15,
    C2AtkBonus: 20,
    C6CritRate: 20,
    C6CritDmg: 40,
};

export const Gaming = new DbObjectChar({
    name: 'gaming',
    serializeId: 82,
    gameId: 10000092,
    iconClass: 'char-icon-gaming',
    rarity: 4,
    element: 'pyro',
    weapon: 'claymore',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Gaming,
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
            name: 'charged_spin',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_spin'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_final',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_final'),
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
        new FeatureDamagePlungeShockWave({
            name: 'gaming_charmed_cloudstrider_dmg',
            category: 'skill',
            element: 'pyro',
            damageBonuses: ['dmg_skill_gaming'],
            critRateBonuses: ['crit_rate_gaming'],
            critDamageBonuses: ['crit_dmg_gaming'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.gaming_charmed_cloudstrider_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'gaming_dance_of_amity_heal',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: new ValueTable([TalentValues.A1Heal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamageBurst({
            name: 'gaming_suanni_man_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.gaming_suanni_man_dmg'),
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
            name: 'gaming_bringer_of_blessing_heal',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: new ValueTable([TalentValues.C1Heal]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.gaming_dance_of_amity',
            description: 'talent_descr.gaming_dance_of_amity',
            info: {ascension: 1},
            stats: {
                text_percent_heal: TalentValues.A1Heal,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'gaming_air_of_prosperity',
            serializeId: 1,
            title: 'talent_name.gaming_air_of_prosperity',
            description: 'talent_descr.gaming_air_of_prosperity_1',
            stats: {
                healing_recv: TalentValues.A4Healing,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.gaming_air_of_prosperity',
            description: 'talent_descr.gaming_air_of_prosperity_2',
            info: {ascension: 4},
            stats: {
                dmg_skill_gaming: TalentValues.A4SkillBonus,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
                new ConditionNot([
                    new ConditionBoolean({name: 'gaming_air_of_prosperity'}),
                ]),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.gaming_bringer_of_blessing',
                    description: 'talent_descr.gaming_bringer_of_blessing',
                    stats: {
                        text_percent_heal: TalentValues.C1Heal,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'gaming_plum_blossoms_underfoot',
                    serializeId: 2,
                    title: 'talent_name.gaming_plum_blossoms_underfoot',
                    description: 'talent_descr.gaming_plum_blossoms_underfoot',
                    stats: {
                        atk_percent: TalentValues.C2AtkBonus,
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
                    title: 'talent_name.gaming_soar_across_mountains',
                    description: 'talent_descr.gaming_soar_across_mountains',
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
                    title: 'talent_name.gaming_to_tame_all_beasts',
                    description: 'talent_descr.gaming_to_tame_all_beasts',
                    stats: {
                        crit_rate_gaming: TalentValues.C6CritRate,
                        crit_dmg_gaming: TalentValues.C6CritDmg,
                    },
                }),
            ],
        },
    ]),
});
