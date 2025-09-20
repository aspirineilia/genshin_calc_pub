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
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Xiangling.s1_id,
        title: 'talent_name.xiangling_dough_fu',
        description: 'talent_descr.xiangling_dough_fu',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Xiangling.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Xiangling.s1.p2),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Xiangling.s1.p3),
            },
            {
                type: 'multihit',
                hits: 4,
                table: new StatTable('normal_hit_4', charTalentTables.Xiangling.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Xiangling.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Xiangling.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Xiangling.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Xiangling.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Xiangling.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Xiangling.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Xiangling.s2_id,
        title: 'talent_name.xiangling_guoba_attack',
        description: 'talent_descr.xiangling_guoba_attack',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Xiangling.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Xiangling.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Xiangling.s3_id,
        title: 'talent_name.xiangling_pyronado',
        description: 'talent_descr.xiangling_pyronado',
        items: [
            {
                table: new StatTable('xiangling_swing_hit_1', charTalentTables.Xiangling.s3.p1),
            },
            {
                table: new StatTable('xiangling_swing_hit_2', charTalentTables.Xiangling.s3.p2),
            },
            {
                table: new StatTable('xiangling_swing_hit_3', charTalentTables.Xiangling.s3.p3),
            },
            {
                table: new StatTable('xiangling_pyronado', charTalentTables.Xiangling.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Xiangling.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Xiangling.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Xiangling.s3.p7),
            },
        ],
    },
});

export const Xiangling = new DbObjectChar({
    name: 'xiangling',
    serializeId: 27,
    gameId: 10000023,
    iconClass: "char-icon-xiangling",
    rarity: 4,
    element: 'pyro',
    weapon: 'polearm',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Xiangling,
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
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_4',
            allowInfusion: true,
            items: [
                {
                    hits: 4,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_4'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4_1',
            isChild: true,
            hits: 4,
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
        new FeatureDamage({
            category: 'attack',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: new StatTable('xiangling_oil_meets_fire', [75]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
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
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.xiangling_swing_hit_1'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.xiangling_swing_hit_2'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.xiangling_swing_hit_3'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.xiangling_pyronado'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.xiangling_crossfire',
            description: 'talent_descr.xiangling_crossfire',
            stats: {
                text_percent: 20,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'xiangling_beware',
            serializeId: 1,
            title: 'talent_name.xiangling_beware_its_super_hot',
            description: 'talent_descr.xiangling_beware_its_super_hot',
            stats: {
                atk_percent: 10,
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
                new ConditionBoolean({
                    name: 'xiangling_crispy',
                    serializeId: 2,
                    title: 'talent_name.xiangling_crispy_outside_tender_inside',
                    description: 'talent_descr.xiangling_crispy_outside_tender_inside',
                    stats: {
                        enemy_res_pyro: -15,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.xiangling_oil_meets_fire',
                    description: 'talent_descr.xiangling_oil_meets_fire',
                    stats: {
                        text_percent_dmg: 75,
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
                    title: 'talent_name.xiangling_slowbake',
                    description: 'talent_descr.xiangling_slowbake',
                    stats: {
                        text_percent: 40,
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
                new ConditionBoolean({
                    name: 'xiangling_condensed_pyronado',
                    serializeId: 3,
                    title: 'talent_name.xiangling_condensed_pyronado',
                    description: 'talent_descr.xiangling_condensed_pyronado',
                    stats: {
                        dmg_pyro: 15,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.xiangling_beware',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.xiangling_beware_its_super_hot',
                description: 'talent_descr.xiangling_beware_its_super_hot',
                info: {ascension: 2},
                stats: {
                    atk_percent: 10,
                },
            }),
            new ConditionBoolean({
                name: 'party.xiangling_crispy',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.xiangling_crispy_outside_tender_inside',
                description: 'talent_descr.xiangling_crispy_outside_tender_inside',
                info: {constellation: 1},
                stats: {
                    enemy_res_pyro: -15,
                },
            }),
            new ConditionBoolean({
                name: 'party.xiangling_condensed_pyronado',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.xiangling_condensed_pyronado',
                description: 'talent_descr.xiangling_condensed_pyronado',
                info: {constellation: 6},
                stats: {
                    dmg_pyro: 15,
                },
            }),
        ],
    },
});



