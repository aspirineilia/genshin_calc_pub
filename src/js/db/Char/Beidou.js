import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierStatic } from "../../classes/Feature2/Multiplier/Static";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { FeatureStatic } from "../../classes/Feature2/Static";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Beidou.s1_id,
        title: 'talent_name.beidou_oceanborne',
        description: 'talent_descr.beidou_oceanborne',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Beidou.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Beidou.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Beidou.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Beidou.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Beidou.s1.p5),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Beidou.s1.p6),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Beidou.s1.p7),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Beidou.s1.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Beidou.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Beidou.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Beidou.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Beidou.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Beidou.s2_id,
        title: 'talent_name.beidou_tidecaller',
        description: 'talent_descr.beidou_tidecaller',
        items: [
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('shield_absorption', charTalentTables.Beidou.s2.p1),
                    new StatTable('', charTalentTables.Beidou.s2.p2),
                ],
            },
            {
                table: new StatTable('skill_dmg', charTalentTables.Beidou.s2.p3),
            },
            {
                table: new StatTable('beidou_skill_dmg_bonus', charTalentTables.Beidou.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Beidou.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Beidou.s3_id,
        title: 'talent_name.beidou_stormbreaker',
        description: 'talent_descr.beidou_stormbreaker',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Beidou.s3.p1),
            },
            {
                table: new StatTable('beidou_lightning_dmg', charTalentTables.Beidou.s3.p2),
            },
            {
                table: new StatTable('dmg_reduction', charTalentTables.Beidou.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Beidou.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Beidou.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Beidou.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    A4NormalBonus: 15,
    A4ChargedBonus: 15,
    A4SpeedBonus: 15,
    C1Shield: 16,
    C4Damage: 20,
    C6ElectroRes: -15,
};

export const Beidou = new DbObjectChar({
    name: 'beidou',
    serializeId: 4,
    gameId: 10000024,
    iconClass: "char-icon-beidou",
    rarity: 4,
    element: 'electro',
    weapon: 'claymore',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Beidou,
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
        new FeatureDamage({
            category: 'attack',
            element: 'electro',
            name: 'beidou_stunning_revenge',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation4',
                    values: new ValueTable([TalentValues.C4Damage]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
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
        new FeatureShield({
            category: 'skill',
            name: 'shield',
            element: 'electro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.shield_absorption'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'beidou_damage_1_hit',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.beidou_skill_dmg_bonus'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'beidou_damage_2_hit',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    scalingMultiplier: 2,
                    scalingSource: 'stacks',
                    values: Talents.get('skill.beidou_skill_dmg_bonus'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'beidou_lightning_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.beidou_lightning_dmg'),
                }),
            ],
        }),
        new FeatureStatic({
            category: 'burst',
            name: 'dmg_reduction',
            format: 'percent',
            digits: 1,
            multipliers: [
                new FeatureMultiplierStatic({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dmg_reduction'),
                }),
            ],
        }),
        new FeatureShield({
            category: 'burst',
            name: 'beidou_stormbreaker_shield',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation1',
                    values: new ValueTable([TalentValues.C1Shield]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.beidou_retribution',
            description: 'talent_descr.beidou_retribution',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'beidou_lightning_storm',
            serializeId: 1,
            title: 'talent_name.beidou_lightning_storm',
            description: 'talent_descr.beidou_lightning_storm',
            settings: {},
            stats: {
                dmg_normal: TalentValues.A4NormalBonus,
                dmg_charged: TalentValues.A4ChargedBonus,
                atk_speed: TalentValues.A4SpeedBonus,
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
                    title: 'talent_name.beidou_sea_beasts_scourge',
                    description: 'talent_descr.beidou_sea_beasts_scourge',
                    stats: {
                        text_percent_shield: TalentValues.C1Shield,
                    }
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.beidou_upon_the_turbulent_sea_the_thunder_arises',
                    description: 'talent_descr.beidou_upon_the_turbulent_sea_the_thunder_arises',
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
                    serializeId: 2,
                    title: 'talent_name.beidou_stunning_revenge',
                    description: 'talent_descr.beidou_stunning_revenge',
                    stats: {
                        text_percent_dmg: TalentValues.C4Damage,
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
                    name: 'beidou_bane_of_the_evil',
                    serializeId: 3,
                    title: 'talent_name.beidou_bane_of_evil',
                    description: 'talent_descr.beidou_bane_of_evil',
                    stats: {
                        enemy_res_electro: TalentValues.C6ElectroRes,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.beidou_bane_of_the_evil',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.beidou_bane_of_evil',
                description: 'talent_descr.beidou_bane_of_evil',
                info: {constellation: 6},
                stats: {
                    enemy_res_electro: TalentValues.C6ElectroRes,
                },
            }),
        ],
    },
});
