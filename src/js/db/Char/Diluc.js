import { Condition } from '../../classes/Condition'
import { ConditionAscensionChar } from '../../classes/Condition/Ascension/Char';
import { ConditionBoolean } from '../../classes/Condition/Boolean'
import { ConditionStacks } from '../../classes/Condition/Stacks'
import { ConditionStatic } from '../../classes/Condition/Static';
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation"
import { DbObjectTalents } from '../../classes/DbObject/Talents';
import { FeatureDamageBurst } from '../../classes/Feature2/Damage/Burst';
import { FeatureDamageCharged } from '../../classes/Feature2/Damage/Charged';
import { FeatureDamageNormal } from '../../classes/Feature2/Damage/Normal';
import { FeatureDamagePlungeCollision } from '../../classes/Feature2/Damage/Plunge/Collision';
import { FeatureDamagePlungeShockWave } from '../../classes/Feature2/Damage/Plunge/ShockWave';
import { FeatureDamageSkill } from '../../classes/Feature2/Damage/Skill';
import { FeatureMultiplier } from '../../classes/Feature2/Multiplier';
import { StatTable } from "../../classes/StatTable"
import { charTables } from '../generated/CharTables';
import { charTalentTables } from '../generated/CharTalentTables';

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Diluc.s1_id,
        title: 'talent_name.diluc_tempered_sword',
        description: 'talent_descr.diluc_tempered_sword',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Diluc.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Diluc.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Diluc.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Diluc.s1.p4),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Diluc.s1.p5),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Diluc.s1.p6),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Diluc.s1.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Diluc.s1.p8),
            },
            {
                table: new StatTable('plunge', charTalentTables.Diluc.s1.p9),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Diluc.s1.p10),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Diluc.s1.p11),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Diluc.s2_id,
        title: 'talent_name.diluc_searing_onslaught',
        description: 'talent_descr.diluc_searing_onslaught',
        items: [
            {
                table: new StatTable('skill_hit_1', charTalentTables.Diluc.s2.p1),
            },
            {
                table: new StatTable('skill_hit_2', charTalentTables.Diluc.s2.p2),
            },
            {
                table: new StatTable('skill_hit_3', charTalentTables.Diluc.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Diluc.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Diluc.s3_id,
        title: 'talent_name.diluc_dawn',
        description: 'talent_descr.diluc_dawn',
        items: [
            {
                table: new StatTable('diluc_burst_slash', charTalentTables.Diluc.s3.p1),
            },
            {
                table: new StatTable('dilic_burst_dot', charTalentTables.Diluc.s3.p2),
            },
            {
                table: new StatTable('diluc_burst_explosion', charTalentTables.Diluc.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('diluc_infusion_duration', charTalentTables.Diluc.s3.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Diluc.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Diluc.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    A1StaminaCharged: 50,
    A4PyroDmg: 20,
    C1DmgAll: 15,
    C2AtkBonus: 10,
    C2AtkSpeed: 5,
    C4SkillBonus: 40,
    C6AtkBonus: 30,
    C6AtkSpeed: 30,
};

export const Diluc = new DbObjectChar({
    name: 'diluc',
    serializeId: 7,
    gameId: 10000016,
    iconClass: "char-icon-diluc",
    rarity: 5,
    element: 'pyro',
    weapon: 'claymore',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Diluc,
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
        new FeatureDamageSkill({
            name: 'skill_hit_1',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_hit_1'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'skill_hit_2',
            element: 'pyro',
            damageBonuses: ['dmg_skill_diluc_bonus'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_hit_2'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'skill_hit_3',
            element: 'pyro',
            damageBonuses: ['dmg_skill_diluc_bonus'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_hit_3'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'diluc_burst_slash',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.diluc_burst_slash'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'dilic_burst_dot',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dilic_burst_dot'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'diluc_burst_explosion',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.diluc_burst_explosion'),
                }),
            ],
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                allowed_infusion_pyro: 1,
            },
        }),
        new ConditionBoolean({
            name: 'diluc_dawn',
            serializeId: 1,
            title: 'talent_name.diluc_dawn',
            description: 'talent_descr.diluc_dawn_talent',
            settings: {
                attack_infusion_pyro: 1,
            },
        }),
        new ConditionStatic({
            title: 'talent_name.diluc_relentless',
            description: 'talent_descr.diluc_relentless',
            stats: {
                stamina_consume_charged: TalentValues.A1StaminaCharged,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            name: 'diluc_blessing',
            serializeId: 2,
            title: 'talent_name.diluc_blessing_of_phoenix',
            description: 'talent_descr.diluc_blessing_of_phoenix',
            stats: {
                dmg_pyro: TalentValues.A4PyroDmg,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
                new ConditionBoolean({name: 'diluc_dawn'}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'diluc_conviction',
                    serializeId: 3,
                    title: 'talent_name.diluc_conviction',
                    description: 'talent_descr.diluc_conviction',
                    stats: {
                        dmg_all: TalentValues.C1DmgAll,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStacks({
                    name: 'diluc_searing_ember',
                    serializeId: 4,
                    title: 'talent_name.diluc_searing_ember',
                    description: 'talent_descr.diluc_searing_ember',
                    maxStacks: 3,
                    stats: [
                        new StatTable('atk_percent', [TalentValues.C2AtkBonus]),
                        new StatTable('atk_speed_normal', [TalentValues.C2AtkSpeed]),
                    ],
                })
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
                    name: 'diluc_flowing_flame',
                    serializeId: 5,
                    title: 'talent_name.diluc_flowing_flame',
                    description: 'talent_descr.diluc_flowing_flame',
                    stats: {
                        dmg_skill_diluc_bonus: TalentValues.C4SkillBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new Condition({
                    settings: {
                        char_skill_burst_bonus : 3,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'diluc_flaming_sword_nemesis_of_the_dark',
                    serializeId: 6,
                    title: 'talent_name.diluc_flaming_sword_nemesis_of_the_dark',
                    description: 'talent_descr.diluc_flaming_sword_nemesis_of_the_dark',
                    stats: {
                        dmg_normal: TalentValues.C6AtkBonus,
                        atk_speed_normal: TalentValues.C6AtkSpeed,
                    },
                })
            ],
        },
    ]),
});
