import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionOr } from "../../classes/Condition/Or";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Mavuika.s1_id,
        title: 'talent_name.mavuika_flames_weave_life',
        description: 'talent_descr.mavuika_flames_weave_life',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Mavuika.s1.p1),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_2', charTalentTables.Mavuika.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Mavuika.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Mavuika.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Mavuika.s1.p5),
            },
            {
                unit: '',
                table: new StatTable('stamina_cost', charTalentTables.Mavuika.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Mavuika.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Mavuika.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Mavuika.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Mavuika.s2_id,
        title: 'talent_name.mavuika_the_named_moment',
        description: 'talent_descr.mavuika_the_named_moment',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Mavuika.s2.p1),
            },
            {
                table: new StatTable('mavuika_rings_of_searing_radiance_dmg', charTalentTables.Mavuika.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('mavuika_rings_of_searing_radiance_interval', charTalentTables.Mavuika.s2.p3),
            },
            {
                table: new StatTable('mavuika_flamestrider_normal_hit_1', charTalentTables.Mavuika.s2.p4),
            },
            {
                table: new StatTable('mavuika_flamestrider_normal_hit_2', charTalentTables.Mavuika.s2.p5),
            },
            {
                table: new StatTable('mavuika_flamestrider_normal_hit_3', charTalentTables.Mavuika.s2.p6),
            },
            {
                table: new StatTable('mavuika_flamestrider_normal_hit_4', charTalentTables.Mavuika.s2.p7),
            },
            {
                table: new StatTable('mavuika_flamestrider_normal_hit_5', charTalentTables.Mavuika.s2.p8),
            },
            {
                table: new StatTable('mavuika_flamestrider_sprint_dmg', charTalentTables.Mavuika.s2.p9),
            },
            {
                table: new StatTable('mavuika_flamestrider_charged_spin', charTalentTables.Mavuika.s2.p10),
            },
            {
                table: new StatTable('mavuika_flamestrider_charged_final', charTalentTables.Mavuika.s2.p11),
            },
            {
                table: new StatTable('mavuika_flamestrider_plunge_dmg', charTalentTables.Mavuika.s2.p12),
            },
            {
                unit: 'unit',
                table: new StatTable('xilonen_nightsoul', charTalentTables.Mavuika.s2.p13),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mavuika.s2.p14),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Mavuika.s3_id,
        title: 'talent_name.mavuika_hour_of_burning_skies',
        description: 'talent_descr.mavuika_hour_of_burning_skies',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Mavuika.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('mavuika_stance_duration', charTalentTables.Mavuika.s3.p2),
            },
            {
                digits: 2,
                table: new StatTable('mavuika_burst_bonus', charTalentTables.Mavuika.s3.p3),
            },
            {
                digits: 2,
                table: new StatTable('mavuika_normal_bonus', charTalentTables.Mavuika.s3.p4),
            },
            {
                digits: 2,
                table: new StatTable('mavuika_charged_bonus', charTalentTables.Mavuika.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mavuika.s3.p8),
            },
            {
                unit: '',
                table: new StatTable('mavuika_points_limit', charTalentTables.Mavuika.s3.p9),
            },
        ],
    },
});

const BurstMaxBonus = 40;
const A1AtkPercent = 30;
const C1AtkPercent = 40;
const C2AtkBase = 200;
const C2DefReduce = 20;
const C2NormalBonus = 60;
const C2ChargedBonus = 90;
const C2BurstBonus = 120;
const C4DmgBonus = 10;
const C6FlamestriderDmg = 200;
const C6SkillDmg = 500;
const C6DefReduce = 20;

export const Mavuika = new DbObjectChar({
    name: 'mavuika',
    serializeId: 96,
    gameId: 10000106,
    iconClass: 'char-icon-mavuika',
    rarity: 5,
    element: 'pyro',
    weapon: 'claymore',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Mavuika,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_2',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_2'),
                        }),
                    ],
                },
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_3',
            allowInfusion: true,
            items: [
                {
                    hits: 3,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3'),
                        }),
                    ],
                },
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamageCharged({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamagePlungeCollision({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
        }),
        new FeatureDamagePlungeShockWave({
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'mavuika_stance'}),
            ]),
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
        new FeatureDamageSkill({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_rings_of_searing_radiance_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            category: 'skill',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_normal_hit_1'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            category: 'skill',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_normal_hit_2'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            category: 'skill',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_normal_hit_3'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            category: 'skill',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_normal_hit_4'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamageNormal({
            element: 'pyro',
            category: 'skill',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_normal_hit_5'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            category: 'skill',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_charged_spin'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamageCharged({
            element: 'pyro',
            category: 'skill',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_charged_final'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamagePlungeShockWave({
            element: 'pyro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_plunge_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamage({
            element: 'pyro',
            category: 'skill',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mavuika_flamestrider_sprint_dmg'),
                }),
            ],
            condition: new ConditionBoolean({name: 'mavuika_stance'}),
        }),
        new FeatureDamageBurst({
            element: 'pyro',
            tags: ['flamestrider'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),

        new FeatureDamageSkill({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new StatTable('mavuika_c6_flamestrider_dmg', [C6FlamestriderDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureDamageSkill({
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new StatTable('mavuika_c6_ring_dmg', [C6SkillDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'atk*',
            leveling: 'char_skill_burst',
            stacksLeveling: 'mavuika_points',
            source: 'talent_burst',
            values: Talents.get('burst.mavuika_normal_bonus'),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'mavuika_crucible_of_death_and_life'}),
                new ConditionBooleanValue({setting: 'mavuika_points', cond: 'ge', value: 100}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal'],
                tags: ['flamestrider'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'atk*',
            source: 'talent_burst',
            values: new ValueTable([C2NormalBonus]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'mavuika_crucible_of_death_and_life'}),
                new ConditionBooleanValue({setting: 'mavuika_points', cond: 'ge', value: 100}),
                new ConditionConstellation({constellation: 2}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal'],
                tags: ['flamestrider'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'atk*',
            leveling: 'char_skill_burst',
            stacksLeveling: 'mavuika_points',
            source: 'talent_burst',
            values: Talents.get('burst.mavuika_charged_bonus'),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'mavuika_crucible_of_death_and_life'}),
                new ConditionBooleanValue({setting: 'mavuika_points', cond: 'ge', value: 100}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['charged'],
                tags: ['flamestrider'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'atk*',
            source: 'talent_burst',
            values: new ValueTable([C2ChargedBonus]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'mavuika_crucible_of_death_and_life'}),
                new ConditionConstellation({constellation: 2}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['charged'],
                tags: ['flamestrider'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'atk*',
            leveling: 'char_skill_burst',
            stacksLeveling: 'mavuika_points',
            source: 'talent_burst',
            values: Talents.get('burst.mavuika_burst_bonus'),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'mavuika_crucible_of_death_and_life'}),
                new ConditionBooleanValue({setting: 'mavuika_points', cond: 'ge', value: 100}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['burst'],
                tags: ['flamestrider'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'atk*',
            source: 'talent_burst',
            values: new ValueTable([C2BurstBonus]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'mavuika_crucible_of_death_and_life'}),
                new ConditionConstellation({constellation: 2}),
            ]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['burst'],
                tags: ['flamestrider'],
            }),
        }),
    ],
    conditions: [
        new Condition({
            stats: {
                enemy_def_reduce: C2DefReduce,
            },
            subConditions: [
                new ConditionOr([
                    new ConditionBoolean({name: 'mavuika_the_ashen_price'}),
                    new ConditionBoolean({name: 'mavuika_humanitys_name_unfettered'}),
                ]),
            ],
        }),
        new ConditionNumber({
            name: 'mavuika_points',
            serializeId: 1,
            title: 'talent_name.mavuika_points',
            allowMinZero: 1,
            max: 200,
        }),
        new ConditionBoolean({
            name: 'mavuika_stance',
            serializeId: 2,
            title: 'talent_name.mavuika_stance',
            description: 'talent_descr.mavuika_stance',
        }),
        new ConditionBoolean({
            name: 'mavuika_crucible_of_death_and_life',
            serializeId: 3,
            title: 'talent_name.mavuika_crucible_of_death_and_life',
            description: 'talent_descr.mavuika_crucible_of_death_and_life',
        }),
        new ConditionBoolean({
            name: 'mavuika_gift_of_flaming_flowers',
            serializeId: 4,
            title: 'talent_name.mavuika_gift_of_flaming_flowers',
            description: 'talent_descr.mavuika_gift_of_flaming_flowers',
            info: {ascension: 1},
            stats: {
                atk_percent: A1AtkPercent,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionNumber({
            name: 'mavuika_kiongozi',
            serializeId: 5,
            title: 'talent_name.mavuika_kiongozi',
            description: 'talent_descr.mavuika_kiongozi',
            stat: 'dmg_all',
            max: BurstMaxBonus,
            info: {ascension: 4},
            stats: {
                text_percent_dmg: 0.2,
                text_percent_max: BurstMaxBonus,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'mavuika_the_night_lords_explication',
                    serializeId: 6,
                    title: 'talent_name.mavuika_the_night_lords_explication',
                    description: 'talent_descr.mavuika_the_night_lords_explication',
                    stats: {
                        atk_percent: C1AtkPercent,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.mavuika_the_ashen_price',
                    description: 'talent_descr.mavuika_the_ashen_price_1',
                    stats: {
                        atk_base: C2AtkBase,
                    },
                }),
                new ConditionBoolean({
                    name: 'mavuika_the_ashen_price',
                    serializeId: 7,
                    title: 'talent_name.mavuika_the_ashen_price',
                    description: 'talent_descr.mavuika_the_ashen_price_2',
                    stats: {
                        text_percent_def: C2DefReduce,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.mavuika_the_ashen_price',
                    description: 'talent_descr.mavuika_the_ashen_price_3',
                    stats: {
                        text_percent_dmg1: C2NormalBonus,
                        text_percent_dmg2: C2ChargedBonus,
                        text_percent_dmg3: C2BurstBonus,
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
                    title: 'talent_name.mavuika_the_leaders_resolve',
                    description: 'talent_descr.mavuika_the_leaders_resolve',
                    stats: {
                        dmg_all: C4DmgBonus,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'mavuika_kiongozi'}),
                    ],
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
                    title: 'talent_name.mavuika_humanitys_name_unfettered',
                    description: 'talent_descr.mavuika_humanitys_name_unfettered_1',
                    stats: {
                        text_percent_dmg1: C6FlamestriderDmg,
                    },
                }),
                new ConditionBoolean({
                    name: 'mavuika_humanitys_name_unfettered',
                    serializeId: 8,
                    title: 'talent_name.mavuika_humanitys_name_unfettered',
                    description: 'talent_descr.mavuika_humanitys_name_unfettered_2',
                    stats: {
                        text_percent_def: C6DefReduce,
                        text_percent_dmg2: C6SkillDmg,
                    },
                }),
                new ConditionStatic({
                    title: 'talent_name.mavuika_humanitys_name_unfettered',
                    description: 'talent_descr.mavuika_humanitys_name_unfettered_3',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new Condition({
                stats: {
                    enemy_def_reduce: C2DefReduce,
                },
                subConditions: [
                    new ConditionOr([
                        new ConditionBoolean({name: 'party.mavuika_the_ashen_price'}),
                        new ConditionBoolean({name: 'party.mavuika_humanitys_name_unfettered'}),
                    ]),
                ],
            }),
            new ConditionNumber({
                name: 'party_mavuika_kiongozi',
                serializeId: 1,
                title: 'talent_name.mavuika_kiongozi',
                description: 'talent_descr.mavuika_kiongozi',
                stat: 'dmg_all',
                max: BurstMaxBonus,
                rotation: 'party',
                info: {ascension: 4},
                stats: {
                    text_percent_dmg: 0.2,
                    text_percent_max: BurstMaxBonus,
                },
            }),
            new ConditionBoolean({
                name: 'party.mavuika_the_ashen_price',
                serializeId: 2,
                title: 'talent_name.mavuika_the_ashen_price',
                description: 'talent_descr.mavuika_the_ashen_price_2',
                rotation: 'party',
                info: {constellation: 2},
                stats: {
                    text_percent_def: C2DefReduce,
                },
            }),
            new ConditionBoolean({
                name: 'mavuika_the_leaders_resolve',
                serializeId: 3,
                title: 'talent_name.mavuika_the_leaders_resolve',
                description: 'talent_descr.mavuika_the_leaders_resolve',
                rotation: 'party',
                info: {constellation: 4},
                stats: {
                    dmg_all: C4DmgBonus,
                },
                subConditions: [
                    new ConditionBoolean({name: 'party_mavuika_kiongozi'}),
                ],
            }),
            new ConditionBoolean({
                name: 'party.mavuika_humanitys_name_unfettered',
                serializeId: 8,
                title: 'talent_name.mavuika_humanitys_name_unfettered',
                description: 'talent_descr.mavuika_humanitys_name_unfettered_2',
                rotation: 'party',
                info: {constellation: 6},
                stats: {
                    text_percent_def: C6DefReduce,
                    text_percent_dmg2: C6SkillDmg,
                },
            }),
        ],
    },
});
