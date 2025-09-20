import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureMultiplierTravelerHydro } from "../../classes/Feature2/Multiplier/TravelerHydro";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { StatTable } from "../../classes/StatTable";
import { StatTableAscensionScale } from "../../classes/StatTable/Ascension/Scale";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";


const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.TravelerHydro.s1_id,
        title: 'talent_name.traveler_hydro_foreign_stream',
        description: 'talent_descr.traveler_hydro_foreign_stream',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.TravelerHydro.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.TravelerHydro.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.TravelerHydro.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.TravelerHydro.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.TravelerHydro.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.TravelerHydro.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.TravelerHydro.s1.p7),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.TravelerHydro.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.TravelerHydro.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.TravelerHydro.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.TravelerHydro.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.TravelerHydro.s2_id,
        title: 'talent_name.traveler_hydro_aquacrest_saber',
        description: 'talent_descr.traveler_hydro_aquacrest_saber',
        items: [
            {
                table: new StatTable('traveler_torrent_surge_dmg', charTalentTables.TravelerHydro.s2.p2),
            },
            {
                table: new StatTable('traveler_dewdrop_dmg', charTalentTables.TravelerHydro.s2.p1),
            },
            {
                table: new StatTable('spiritbreath_thorn_dmg', charTalentTables.TravelerHydro.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('spiritbreath_thorn_interval', charTalentTables.TravelerHydro.s2.p4),
            },
            {
                unit: 'hp',
                table: new StatTable('traveler_suffusion_hp_cost', charTalentTables.TravelerHydro.s2.p5),
            },
            {
                digits: 2,
                table: new StatTable('traveler_suffusion_dmg_bonus', charTalentTables.TravelerHydro.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('traveler_dewdrop_duration', charTalentTables.TravelerHydro.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerHydro.s2.p8),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.TravelerHydro.s3_id,
        title: 'talent_name.traveler_hydro_rising_waters',
        description: 'talent_descr.traveler_hydro_rising_waters',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.TravelerHydro.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.TravelerHydro.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.TravelerHydro.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.TravelerHydro.s3.p4),
            },
        ],
    },
});

const shield_hp_scale = 10;
const dew_heal = 7;
const skill_bonus_ratio = 45;
const skill_bonus_max = 5000;

export const TravelerHydro = new DbObjectChar({
    name: 'traveler_hydro',
    serializeId: 75,
    gameId: [10000005, 10000007],
    depotIds: [503, 703],
    iconClass: "char-icon-traveler-boy",
    rarity: 5,
    element: 'hydro',
    weapon: 'sword',
    origin: 'foreign',
    talents: Talents,
    statTable: [
        ...charTables.Traveler,
        new StatTableAscensionScale({
			stat: 'burst_energy_cost',
			base: Talents.get('burst.energy_cost').getValue(1),
		}),
    ],
    features: [
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit_total',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageCharged({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
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
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.traveler_torrent_surge_dmg'),
                }),
                new FeatureMultiplierTravelerHydro({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new ValueTable([skill_bonus_ratio]),
                    capValue: new ValueTable([skill_bonus_max]),
                    condition: new ConditionAscensionChar({ascension: 4}),
                }),
            ],
        }),
        // new FeatureTalentElementalTravelerHydro({
        //     element: "hydro",
        //     bonusRatio: skill_bonus_ratio,
        //     maxBonus: skill_bonus_max,
        //     talentMultiplier: [
        //         Talents.get('skill.traveler_torrent_surge_dmg'),
        //     ],
        // }),
        new FeatureDamageSkill({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.traveler_dewdrop_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.traveler_suffusion_dmg_bonus'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            element: 'hydro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.spiritbreath_thorn_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension1',
                    values: new StatTable('traveler_spotless_waters_heal', [dew_heal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureShield({
            category: 'skill',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension4',
                    values: new StatTable('traveler_pouring_descent_shield', [shield_hp_scale]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
        new FeatureDamageBurst({
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'traveler_suffusion',
            serializeId: 3,
            title: 'talent_name.traveler_suffusion',
            description: 'talent_descr.traveler_suffusion',
        }),
        new ConditionStatic({
            title: 'talent_name.traveler_hydro_spotless_waters',
            description: 'talent_descr.traveler_hydro_spotless_waters',
            stats: {
                text_percent_heal: dew_heal,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionNumber({
            name: 'traveler_clear_waters_percent',
            serializeId: 1,
            title: 'talent_name.traveler_clear_waters_full',
            description: 'talent_descr.traveler_hydro_clear_waters',
            max: 100,
            stats: {
                text_percent_dmg: skill_bonus_ratio,
                text_value_max: skill_bonus_max,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new ConditionBoolean({
            name: 'traveler_swordfighting_techniques',
            serializeId: 2,
            title: 'talent_name.traveler_swordfighting_techniques',
            description: 'talent_descr.traveler_swordfighting_techniques',
            stats: {
                atk_base: 3,
            },
        }),
        new ConditionBoolean({
            name: 'traveler_special_training',
            serializeId: 4,
            title: 'talent_name.traveler_special_training',
            description: 'talent_descr.traveler_special_training',
            stats: {
                atk_base: 7,
                mastery: 15,
                hp_base: 50,
            },
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.traveler_hydro_swelling_lake',
                    description: 'talent_descr.traveler_hydro_swelling_lake',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.traveler_hydro_trickling_purity',
                    description: 'talent_descr.traveler_hydro_trickling_purity',
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
                    title: 'talent_name.traveler_hydro_pouring_descent',
                    description: 'talent_descr.traveler_hydro_pouring_descent',
                    stats: {
                        text_percent_hp: shield_hp_scale,
                        text_percent_hp_2: 10,
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
                    title: 'talent_name.traveler_hydro_tides_of_justice',
                    description: 'talent_descr.traveler_hydro_tides_of_justice',
                    stats: {
                        text_percent_hp: 6,
                    },
                }),
            ],
        },
    ]),
});
