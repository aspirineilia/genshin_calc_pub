import { Condition } from '../../classes/Condition';
import { ConditionAscensionChar } from '../../classes/Condition/Ascension/Char';
import { ConditionBoolean } from '../../classes/Condition/Boolean';
import { ConditionStatic } from '../../classes/Condition/Static';
import { DbObjectChar } from '../../classes/DbObject/Char';
import { DbObjectConstellation } from '../../classes/DbObject/Constellation';
import { DbObjectTalents } from '../../classes/DbObject/Talents';
import { FeatureDamageBurst } from '../../classes/Feature2/Damage/Burst';
import { FeatureDamageCharged } from '../../classes/Feature2/Damage/Charged';
import { FeatureDamageNormal } from '../../classes/Feature2/Damage/Normal';
import { FeatureDamagePlungeCollision } from '../../classes/Feature2/Damage/Plunge/Collision';
import { FeatureDamagePlungeShockWave } from '../../classes/Feature2/Damage/Plunge/ShockWave';
import { FeatureDamageSkill } from '../../classes/Feature2/Damage/Skill';
import { FeatureHeal } from '../../classes/Feature2/Heal';
import { FeatureMultiplier } from '../../classes/Feature2/Multiplier';
import { FeatureMultiplierList } from '../../classes/Feature2/Multiplier/List';
import { StatTable } from '../../classes/StatTable';
import { ValueTable } from '../../classes/ValueTable';
import { charTables } from '../generated/CharTables';
import { charTalentTables } from '../generated/CharTalentTables';

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Jean.s1_id,
        title: 'talent_name.jean_favonius_bladework',
        description: 'talent_descr.jean_favonius_bladework',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Jean.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Jean.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Jean.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Jean.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Jean.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Jean.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Jean.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Jean.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Jean.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Jean.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Jean.s2_id,
        title: 'talent_name.jean_gale_blade',
        description: 'talent_descr.jean_gale_blade',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Jean.s2.p1),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_consume', charTalentTables.Jean.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Jean.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Jean.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Jean.s3_id,
        title: 'talent_name.jean_dandelion_breeze',
        description: 'talent_descr.jean_dandelion_breeze',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Jean.s3.p1),
            },
            {
                table: new StatTable('field_dmg', charTalentTables.Jean.s3.p2),
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('heal', charTalentTables.Jean.s3.p3),
                    new StatTable('', charTalentTables.Jean.s3.p4),
                ],
            },
            {
                type: 'shield',
                unit: 'atk',
                table: [
                    new StatTable('heal_dot', charTalentTables.Jean.s3.p5),
                    new StatTable('', charTalentTables.Jean.s3.p6),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Jean.s3.p7),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Jean.s3.p8),
            },
        ],
    },
});

const TalentValues = {
    A1Heal: 15,
    A4Enegry: 20,
    C1SkillDmg: 40,
    C2AtkSpeed: 15,
    C2MoveSpeed: 15,
    C4AnemoRes: -40,
    C6DmgReduction: 35,
};

export const Jean = new DbObjectChar({
    name: 'jean',
    serializeId: 12,
    gameId: 10000003,
    iconClass: "char-icon-jean",
    rarity: 5,
    element: 'anemo',
    weapon: 'sword',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Jean,
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
        new FeatureHeal({
            category: 'attack',
            name: 'party_heal_on_hit',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1Heal]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
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
            element: 'anemo',
            damageBonuses: ['dmg_skill_jean'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'field_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.field_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'heal',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'heal_dot',
            multipliers: [
                new FeatureMultiplierList({
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.heal_dot'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.jean_wind_companion',
            description: 'talent_descr.jean_wind_companion',
            stats: {
                text_percent_dmg: TalentValues.A1Heal,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.jean_let_the_wind_lead',
            description: 'talent_descr.jean_let_the_wind_lead',
            stats: {
                text_percent: TalentValues.A4Enegry,
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
                    name: 'jean',
                    serializeId: 1,
                    title: 'talent_name.jean_spiraling_tempest',
                    description: 'talent_descr.jean_spiraling_tempest',
                    stats: {
                        dmg_skill_jean: TalentValues.C1SkillDmg,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'jean_peoples_aegis',
                    serializeId: 2,
                    title: 'talent_name.jean_peoples_aegis',
                    description: 'talent_descr.jean_peoples_aegis',
                    stats: {
                        atk_speed_normal: TalentValues.C2AtkSpeed,
                        move_speed: TalentValues.C2MoveSpeed,
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
                    name: 'jean_lands_of_dandelion',
                    serializeId: 3,
                    title: 'talent_name.jean_lands_of_dandelion',
                    description: 'talent_descr.jean_lands_of_dandelion',
                    stats: {
                        enemy_res_anemo: TalentValues.C4AnemoRes,
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
                    title: 'talent_name.jean_lions_fang_fair_protector_of_mondstadt',
                    description: 'talent_descr.jean_lions_fang_fair_protector_of_mondstadt',
                    stats: {
                        dmg_reduction: TalentValues.C6DmgReduction,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.jean_peoples_aegis',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.jean_peoples_aegis',
                description: 'talent_descr.jean_peoples_aegis',
                info: {constellation: 2},
                stats: {
                    atk_speed_normal: TalentValues.C2AtkSpeed,
                    move_speed: TalentValues.C2MoveSpeed,
                },
            }),
            new ConditionBoolean({
                name: 'party.jean_lands_of_dandelion',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.jean_lands_of_dandelion',
                description: 'talent_descr.jean_lands_of_dandelion',
                info: {constellation: 4},
                stats: {
                    enemy_res_anemo: TalentValues.C4AnemoRes,
                },
            }),
        ],
    },
});
