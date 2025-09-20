import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStacks } from "../../classes/Condition/Stacks";
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
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Eula.s1_id,
        title: 'talent_name.eula_favonius_bladework_edel',
        description: 'talent_descr.eula_favonius_bladework_edel',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Eula.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Eula.s1.p2),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Eula.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Eula.s1.p4),
            },
            {
                type: 'multihit_sum',
                hits: 2,
                table: new StatTable('normal_hit_5', charTalentTables.Eula.s1.p5),
            },
            {
                table: new StatTable('charged_spin', charTalentTables.Eula.s1.p6),
            },
            {
                table: new StatTable('charged_final', charTalentTables.Eula.s1.p7),
            },
            {
                unit: 'per_sec',
                table: new StatTable('stamina_cost', charTalentTables.Eula.s1.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('max_duration', charTalentTables.Eula.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Eula.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Eula.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Eula.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Eula.s2_id,
        title: 'talent_name.eula_icetide_vortex',
        description: 'talent_descr.eula_icetide_vortex',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Eula.s2.p1),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Eula.s2.p2),
            },
            {
                table: new StatTable('eula_icewhirl_brand', charTalentTables.Eula.s2.p3),
            },
            {
                unit: 'percent_per_stack',
                table: new StatTable('eula_def_bonus', charTalentTables.Eula.s2.p9),
            },
            {
                unit: 'sec',
                table: new StatTable('eula_heart_duration', charTalentTables.Eula.s2.p13),
            },
            {
                table: new StatTable('eula_phys_res_decrease', charTalentTables.Eula.s2.p4),
            },
            {
                table: new StatTable('eula_cryo_res_decrease', charTalentTables.Eula.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('eula_res_duration', charTalentTables.Eula.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Eula.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Eula.s2.p8),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Eula.s3_id,
        title: 'talent_name.eula_glacial_illumination',
        description: 'talent_descr.eula_glacial_illumination',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Eula.s3.p1),
            },
            {
                table: new StatTable('eula_lightfall_base_dmg', charTalentTables.Eula.s3.p2),
            },
            {
                table: new StatTable('eula_lightfall_stack_dmg', charTalentTables.Eula.s3.p3),
            },
            {
                unit: '',
                table: new StatTable('eula_lightsword_max_stacks', charTalentTables.Eula.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Eula.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Eula.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    SkillDefBonus: 30,
    BurstMaxStacks: 30,
    A1Damage: 50,
    C1PhysBonus: 30,
    C4BurstBonus: 25,
};

export const Eula = new DbObjectChar({
    name: 'eula',
    serializeId: 33,
    gameId: 10000051,
    iconClass: "char-icon-eula",
    rarity: 5,
    element: 'cryo',
    weapon: 'claymore',
    origin: 'mondstadt',
    talents: Talents,
    statTable: charTables.Eula,
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
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'normal',
            name: 'normal_hit_5',
            allowInfusion: true,
            items: [
                {
                    hits: 2,
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_5'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5_1',
            isChild: true,
            hits: 2,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
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
            name: 'press_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'hold_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'eula_icewhirl_brand',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.eula_icewhirl_brand'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'eula_lightfall_dmg',
            damageBonuses: ['dmg_burst_eula'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.eula_lightfall_base_dmg'),
                }),
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    stacksLeveling: 'eula_lightfall_stacks',
                    maxStacks: TalentValues.BurstMaxStacks,
                    values: Talents.get('burst.eula_lightfall_stack_dmg'),
                    condition: new ConditionBoolean({name: 'eula_lightfall_stacks'}),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'eula_roiling_rime',
            damageBonuses: ['dmg_burst_eula'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    scalingSource: 'ascension1',
                    scalingMultiplier: TalentValues.A1Damage / 100,
                    values: Talents.get('burst.eula_lightfall_base_dmg'),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                char_skill_elemental_bonus: 3,
            },
            subConditions: [
                new ConditionConstellation({constellation: 5}),
            ],
        }),
        new ConditionStacks({
            name: 'eula_grimheart',
            serializeId: 4,
            title: 'talent_name.eula_grimheart',
            description: 'talent_descr.eula_grimheart',
            maxStacks: 2,
            stats: [
                new StatTable('def_percent', [TalentValues.SkillDefBonus]),
            ],
        }),
        new ConditionBooleanLevels({
            name: 'eula_icewhirl_brand',
            serializeId: 1,
            title: 'talent_name.eula_icewhirl_brand',
            description: 'talent_descr.eula_icewhirl_brand',
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getMulti({
                    name: 'enemy_res_phys',
                    from: 'skill.eula_phys_res_decrease',
                    multi: -1,
                }),
                Talents.getMulti({
                    name: 'enemy_res_cryo',
                    from: 'skill.eula_cryo_res_decrease',
                    multi: -1,
                }),
            ],
        }),
        new ConditionNumber({
            name: 'eula_lightfall_stacks',
            serializeId: 5,
            title: 'talent_name.eula_lightfall_stacks',
            description: 'talent_descr.eula_lightfall_stacks',
            max: TalentValues.BurstMaxStacks,
        }),
        new ConditionStatic({
            title: 'talent_name.eula_roiling_rime',
            description: 'talent_descr.eula_roiling_rime',
            stats: {
                text_percent_dmg: TalentValues.A1Damage,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.eula_wellspring_of_war_lust',
            description: 'talent_descr.eula_wellspring_of_war_lust',
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
                    name: 'eula_tidal_illusion',
                    serializeId: 2,
                    title: 'talent_name.eula_tidal_illusion',
                    description: 'talent_descr.eula_tidal_illusion',
                    stats: {
                        dmg_phys: TalentValues.C1PhysBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.eula_lady_of_seafoam',
                    description: 'talent_descr.eula_lady_of_seafoam',
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
                    name: 'eula_obstinacy',
                    serializeId: 3,
                    title: 'talent_name.eula_the_obstinacy_of_ones_inferiors',
                    description: 'talent_descr.eula_the_obstinacy_of_ones_inferiors',
                    stats: {
                        dmg_burst_eula: TalentValues.C4BurstBonus,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.eula_noble_obligation',
                    description: 'talent_descr.eula_noble_obligation',
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['char_skill_elemental'],
        },
        conditions: [
            new ConditionNumberTalent({
                name: 'eula_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 1,
            }),
            new ConditionBoolean({
                name: 'party.eula_constellation_5',
                serializeId: 3,
                title: 'talent_name.eula_chivalric_quality',
                description: 'talent_descr.char_constellation_skill',
                info: {constellation: 5},
                settings: {
                    eula_char_skill_elemental_bonus: 3,
                },
            }),
            new ConditionBooleanLevels({
                name: 'party.eula_icewhirl_brand',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.eula_icewhirl_brand',
                description: 'talent_descr.eula_icewhirl_brand',
                levelSetting: 'eula_char_skill_elemental',
                stats: [
                    Talents.getMulti({
                        name: 'enemy_res_phys',
                        from: 'skill.eula_phys_res_decrease',
                        multi: -1,
                    }),
                    Talents.getMulti({
                        name: 'enemy_res_cryo',
                        from: 'skill.eula_cryo_res_decrease',
                        multi: -1,
                    }),
                ],
            }),
        ],
    },
});
