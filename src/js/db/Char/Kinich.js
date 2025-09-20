import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
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
        gameId: charTalentTables.Kinich.s1_id,
        title: 'talent_name.kinich_nightsun_style',
        description: 'talent_descr.kinich_nightsun_style',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kinich.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Kinich.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Kinich.s1.p3),
            },
            {
                table: new StatTable('kinich_midair_dmg', charTalentTables.Kinich.s1.p9),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Kinich.s1.p4),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Kinich.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kinich.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kinich.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kinich.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kinich.s2_id,
        title: 'talent_name.kinich_riding_high',
        description: 'talent_descr.kinich_riding_high',
        items: [
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('kinich_loop_shot_dmg', charTalentTables.Kinich.s2.p1),
            },
            {
                table: new StatTable('kinich_scalespiker_cannon_dmg', charTalentTables.Kinich.s2.p2),
            },
            {
                unit: '',
                table: new StatTable('nightsoul_points_limit', charTalentTables.Kinich.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kinich.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kinich.s3_id,
        title: 'talent_name.kinich_hail_to_the_almighty_dragonlord',
        description: 'talent_descr.kinich_hail_to_the_almighty_dragonlord',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Kinich.s3.p1),
            },
            {
                table: new StatTable('kinich_laser_dmg', charTalentTables.Kinich.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('kinich_duration', charTalentTables.Kinich.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kinich.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kinich.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    A4BonusScale: 320,
    C1MoveSpeed: 30,
    C1CritDmg: 100,
    C2DendroRes: -30,
    C2SkillDmg: 100,
    C4BurstDmg: 70,
    C6BounceDmg: 700,
};

export const Kinich = new DbObjectChar({
    name: 'kinich',
    serializeId: 91,
    gameId: 10000101,
    iconClass: 'char-icon-kinich',
    rarity: 5,
    element: 'dendro',
    weapon: 'claymore',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Kinich,
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
            name: 'kinich_midair_dmg',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.kinich_midair_dmg'),
                }),
            ],
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
            name: 'kinich_loop_shot_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kinich_loop_shot_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'kinich_scalespiker_cannon_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_skill_kinich'],
            critDamageBonuses: ['crit_dmg_skill_kinich'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kinich_scalespiker_cannon_dmg'),
                }),
                new FeatureMultiplier({
                    stacksLeveling: 'kinich_flame_spirit_pact',
                    source: 'ascension4',
                    values: new ValueTable([TalentValues.A4BonusScale]),
                    condition: new ConditionBoolean({name: 'kinich_flame_spirit_pact'}),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'kinich_scalespiker_cannon_bounce_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_skill_kinich'],
            critDamageBonuses: ['crit_dmg_skill_kinich'],
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6BounceDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_burst_kinich'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'kinich_laser_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_burst_kinich'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.kinich_laser_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.kinich_the_price_of_desolation',
            description: 'talent_descr.kinich_the_price_of_desolation',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'kinich_flame_spirit_pact',
            serializeId: 1,
            title: 'talent_name.kinich_flame_spirit_pact',
            description: 'talent_descr.kinich_flame_spirit_pact',
            maxStacks: 2,
            stats: [
                new StatTable('text_percent', [TalentValues.A4BonusScale]),
            ],
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
                    name: 'kinich_parrots_beak',
                    serializeId: 2,
                    title: 'talent_name.kinich_parrots_beak',
                    description: 'talent_descr.kinich_parrots_beak',
                    stats: {
                        move_speed: TalentValues.C1MoveSpeed,
                        crit_dmg_skill_kinich: TalentValues.C1CritDmg,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'kinich_tiger_beetles_palm_1',
                    serializeId: 3,
                    title: 'talent_name.kinich_tiger_beetles_palm',
                    description: 'talent_descr.kinich_tiger_beetles_palm_1',
                    stats: {
                        enemy_res_dendro: TalentValues.C2DendroRes,
                    },
                }),
                new ConditionBoolean({
                    name: 'kinich_tiger_beetles_palm_2',
                    serializeId: 4,
                    title: 'talent_name.kinich_tiger_beetles_palm',
                    description: 'talent_descr.kinich_tiger_beetles_palm_2',
                    stats: {
                        dmg_skill_kinich: TalentValues.C2SkillDmg,
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
                    name: 'kinich_hummingbirds_feather',
                    serializeId: 5,
                    title: 'talent_name.kinich_hummingbirds_feather',
                    description: 'talent_descr.kinich_hummingbirds_feather',
                    stats: {
                        dmg_burst_kinich: TalentValues.C4BurstDmg,
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
                    title: 'talent_name.kinich_auspicious_beasts_shape',
                    description: 'talent_descr.kinich_auspicious_beasts_shape',
                    stats: {
                        text_percent_dmg: TalentValues.C6BounceDmg,
                    },
                }),
            ],
        },
    ]),
});
