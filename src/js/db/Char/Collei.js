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
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Collei.s1_id,
        title: 'talent_name.collei_supplicants_bowmanship',
        description: 'talent_descr.collei_supplicants_bowmanship',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Collei.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Collei.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Collei.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Collei.s1.p4),
            },
            {
                table: new StatTable('aimed', charTalentTables.Collei.s1.p5),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Collei.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Collei.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Collei.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Collei.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Collei.s2_id,
        title: 'talent_name.collei_floral_brush',
        description: 'talent_descr.collei_floral_brush',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Collei.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Collei.s2.p2),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Collei.s3_id,
        title: 'talent_name.collei_trump_card_kitty',
        description: 'talent_descr.collei_trump_card_kitty',
        items: [
            {
                table: new StatTable('collei_explosion_dmg', charTalentTables.Collei.s3.p1),
            },
            {
                table: new StatTable('collei_leap_dmg', charTalentTables.Collei.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Collei.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Collei.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Collei.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    A1Damage: 40,
    C1Recharge: 20,
    C4Mastery: 60,
    C6Damage: 200,
};

export const Collei = new DbObjectChar({
    name: 'collei',
    serializeId: 55,
    gameId: 10000067,
    iconClass: "char-icon-collei",
    rarity: 4,
    element: 'dendro',
    weapon: 'bow',
    origin: 'sumeru',
    talents: Talents,
    statTable: charTables.Collei,
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
            element: 'dendro',
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
            name: 'skill_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'collei_explosion_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.collei_explosion_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'collei_leap_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.collei_leap_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'collei_floral_sidewinder_dmg',
            element: 'dendro',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1Damage]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamage({
            name: 'collei_forest_of_falling_arrows_dmg',
            element: 'dendro',
            category: 'other',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6Damage]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.collei_floral_sidewinder',
            description: 'talent_descr.collei_floral_sidewinder',
            maxStacks: 5,
            stats: {
                text_percent: TalentValues.A1Damage,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.collei_the_languid_wood',
            description: 'talent_descr.collei_the_languid_wood',
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
                    name: 'collei_deepwood_patrol',
                    serializeId: 1,
                    title: 'talent_name.collei_deepwood_patrol',
                    description: 'talent_descr.collei_deepwood_patrol',
                    stats: {
                        recharge: TalentValues.C1Recharge,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.collei_through_hill_and_copse',
                    description: 'talent_descr.collei_through_hill_and_copse',
                    stats: {
                        text_percent: TalentValues.A1Damage,
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
                    title: 'talent_name.collei_gift_of_the_woods',
                    description: 'talent_descr.collei_gift_of_the_woods',
                    stats: {
                        text_value: TalentValues.C4Mastery,
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
                    title: 'talent_name.collei_forest_of_falling_arrows',
                    description: 'talent_descr.collei_forest_of_falling_arrows',
                    stats: {
                        text_percent_dmg: TalentValues.C6Damage,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.collei_gift_of_the_woods',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.collei_gift_of_the_woods',
                description: 'talent_descr.collei_gift_of_the_woods',
                info: {
                    constellation: 4,
                },
                stats: {
                    text_value: TalentValues.C4Mastery,
                    mastery: TalentValues.C4Mastery,
                },
            }),
        ],
    },
});
