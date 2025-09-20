import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionElementsCount } from "../../classes/Condition/ElementsCount";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
import { ConditionStatic } from "../../classes/Condition/Static";
import { ConditionStaticLevel } from "../../classes/Condition/Static/Level";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageChargedAimed } from "../../classes/Feature2/Damage/Charged/Aimed";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierStatic } from "../../classes/Feature2/Multiplier/Static";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeatureStatic } from "../../classes/Feature2/Static";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Gorou.s1_id,
        title: 'talent_name.gorou_ripping_fang_fletching',
        description: 'talent_descr.gorou_ripping_fang_fletching',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Gorou.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Gorou.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Gorou.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Gorou.s1.p4),
            },
            {
                table: new StatTable('aimed', charTalentTables.Gorou.s1.p5),
            },
            {
                table: new StatTable('charged_aimed', charTalentTables.Gorou.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Gorou.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Gorou.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Gorou.s1.p9),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Gorou.s2_id,
        title: 'talent_name.gorou_inuzaka_all_round_defense',
        description: 'talent_descr.gorou_inuzaka_all_round_defense',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Gorou.s2.p1),
            },
            {
                unit: '',
                integer: true,
                table: new StatTable('gorou_def_bonus', charTalentTables.Gorou.s2.p2),
            },
            {
                table: new StatTable('gorou_geo_bonus', charTalentTables.Gorou.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Gorou.s2.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Gorou.s2.p5),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Gorou.s3_id,
        title: 'talent_name.gorou_forward_unto_victory',
        description: 'talent_descr.gorou_forward_unto_victory',
        items: [
            {
                unit: 'def',
                table: new StatTable('burst_dmg', charTalentTables.Gorou.s3.p1),
            },
            {
                unit: 'def',
                table: new StatTable('gorou_crystal_collapse_dmg', charTalentTables.Gorou.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Gorou.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Gorou.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Gorou.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    SkillGeoBonus: 15,
    A1DefBonus: 25,
    A4SkillDefScale: 156,
    A4BurstDefScale: 15.6,
    C4Heal: 50,
    C6CritDmgGeo1: 10,
    C6CritDmgGeo2: 10,
    C6CritDmgGeo3: 20,
};

export const Gorou = new DbObjectChar({
    name: 'gorou',
    serializeId: 45,
    gameId: 10000055,
    iconClass: "char-icon-gorou",
    rarity: 4,
    element: 'geo',
    weapon: 'bow',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Gorou,
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
            element: 'geo',
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
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureStatic({
            category: 'skill',
            name: 'gorou_def_bonus',
            multipliers: [
                new FeatureMultiplierStatic({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.gorou_def_bonus'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'gorou_crystal_collapse_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.gorou_crystal_collapse_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'gorou_lapping_hound_heal',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'def*',
                    leveling: 'char_skill_elemental',
                    values: new ValueTable([TalentValues.C4Heal])
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            source: 'ascension4',
            values: new ValueTable([TalentValues.A4SkillDefScale]),
            condition: new ConditionAscensionChar({ascension: 4}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'def*',
            source: 'ascension4',
            values: new ValueTable([TalentValues.A4BurstDefScale]),
            condition: new ConditionAscensionChar({ascension: 4}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['burst'],
            }),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                char_skill_elemental_bonus: 3,
            },
            condition: new ConditionConstellation({constellation: 3}),
        }),
        new ConditionBoolean({
            name: 'gorou_heedless_of_the_wind_and_weather',
            serializeId: 2,
            title: 'talent_name.gorou_heedless_of_the_wind_and_weather',
            description: 'talent_descr.gorou_heedless_of_the_wind_and_weather',
            stats: {
                def_percent: TalentValues.A1DefBonus,
            },
            info: {ascension: 1},
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new ConditionStatic({
            title: 'talent_name.gorou_a_favor_repaid',
            description: 'talent_descr.gorou_a_favor_repaid',
            stats: {
                text_percent_1: TalentValues.A4SkillDefScale,
                text_percent_2: TalentValues.A4BurstDefScale,
            },
            info: {ascension: 4},
            condition: new ConditionAscensionChar({ascension: 4}),
        }),
        new ConditionBoolean({
            name: 'gorou_generals_war_banner',
            serializeId: 1,
            title: 'talent_name.gorou_generals_war_banner',
            description: 'talent_descr.gorou_generals_war_banner',
        }),
        new ConditionStaticLevel({
            title: 'talent_name.gorou_standing_firm',
            description: 'talent_descr.gorou_standing_firm',
            levelSetting: 'char_skill_elemental',
            stats: [
                Talents.getAlias('skill.gorou_def_bonus', 'def'),
            ],
            condition: new ConditionBoolean({name: 'gorou_generals_war_banner'}),
        }),
        new ConditionStatic({
            title: 'talent_name.gorou_impregnable',
            description: 'talent_descr.gorou_impregnable',
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'gorou_generals_war_banner'}),
                new ConditionElementsCount({element: 'geo', count: 2}),
            ]),
        }),
        new ConditionStatic({
            title: 'talent_name.gorou_crunch',
            description: 'talent_descr.gorou_crunch',
            stats: {
                dmg_geo: TalentValues.SkillGeoBonus,
            },
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'gorou_generals_war_banner'}),
                new ConditionElementsCount({element: 'geo', count: 3}),
            ]),
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.gorou_swift_as_the_wind',
                    description: 'talent_descr.gorou_swift_as_the_wind',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.gorou_steady_as_a_clock',
                    description: 'talent_descr.gorou_steady_as_a_clock',
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.gorou_warm_as_water',
                    description: 'talent_descr.gorou_warm_as_water',
                    stats: {
                        text_percent: TalentValues.C4Heal,
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
                    title: 'talent_name.gorou_mountainous_fealty',
                    description: 'talent_descr.gorou_mountainous_fealty',
                }),
                new Condition({
                    stats: {
                        crit_dmg_geo: TalentValues.C6CritDmgGeo1,
                    },
                    condition: new ConditionBoolean({name: 'gorou_generals_war_banner'}),
                }),
                new Condition({
                    stats: {
                        crit_dmg_geo: TalentValues.C6CritDmgGeo2,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({name: 'gorou_generals_war_banner'}),
                        new ConditionElementsCount({element: 'geo', count: 2}),
                    ]),
                }),
                new Condition({
                    stats: {
                        crit_dmg_geo: TalentValues.C6CritDmgGeo3,
                    },
                    condition: new ConditionAnd([
                        new ConditionBoolean({name: 'gorou_generals_war_banner'}),
                        new ConditionElementsCount({element: 'geo', count: 3}),
                    ]),
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
                name: 'gorou_char_skill_elemental',
                title: 'talent_name.stats_level_skill',
                partySetting: 'char_skill_elemental',
                serializeId: 1,
            }),
            new ConditionBoolean({
                name: 'party.gorou_fierce_as_fire',
                serializeId: 5,
                title: 'talent_name.gorou_fierce_as_fire',
                description: 'talent_descr.char_constellation_skill',
                settings: {
                    gorou_char_skill_elemental_bonus: 3,
                },
                info: {constellation: 3},
            }),
            new ConditionBoolean({
                name: 'party.gorou_generals_war_banner',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.gorou_generals_war_banner',
                description: 'talent_descr.gorou_generals_war_banner',
            }),
            new ConditionBooleanLevels({
                name: 'party.gorou_standing_firm',
                serializeId: 6,
                rotation: 'party',
                title: 'talent_name.gorou_standing_firm',
                description: 'talent_descr.gorou_standing_firm',
                levelSetting: 'gorou_char_skill_elemental',
                stats: [
                    Talents.getAlias('skill.gorou_def_bonus', 'def'),
                ],
                condition: new ConditionBoolean({name: 'party.gorou_generals_war_banner'}),
            }),
            new ConditionStatic({
                title: 'talent_name.gorou_impregnable',
                description: 'talent_descr.gorou_impregnable',
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'party.gorou_generals_war_banner'}),
                    new ConditionElementsCount({element: 'geo', count: 2}),
                ]),
            }),
            new ConditionStatic({
                title: 'talent_name.gorou_crunch',
                description: 'talent_descr.gorou_crunch',
                stats: {
                    dmg_geo: TalentValues.SkillGeoBonus,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'party.gorou_generals_war_banner'}),
                    new ConditionElementsCount({element: 'geo', count: 3}),
                ]),
            }),
            new ConditionBoolean({
                name: 'party.gorou_heedless_of_the_wind_and_weather',
                serializeId: 3,
                title: 'talent_name.gorou_heedless_of_the_wind_and_weather',
                description: 'talent_descr.gorou_heedless_of_the_wind_and_weather',
                rotation: 'party',
                info: {ascension: 1},
                stats: {
                    def_percent: TalentValues.A1DefBonus,
                },
            }),
            new ConditionBoolean({
                name: 'party.gorou_mountainous_fealty',
                serializeId: 4,
                title: 'talent_name.gorou_mountainous_fealty',
                description: 'talent_descr.gorou_mountainous_fealty',
                rotation: 'party',
                info: {constellation: 6},
                condition: new ConditionBoolean({name: 'party.gorou_fierce_as_fire'}),
            }),
            new Condition({
                stats: {
                    crit_dmg_geo: TalentValues.C6CritDmgGeo1,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'party.gorou_mountainous_fealty'}),
                    new ConditionBoolean({name: 'party.gorou_fierce_as_fire'}),
                ]),
            }),
            new Condition({
                stats: {
                    crit_dmg_geo: TalentValues.C6CritDmgGeo2,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'party.gorou_mountainous_fealty'}),
                    new ConditionBoolean({name: 'party.gorou_fierce_as_fire'}),
                    new ConditionElementsCount({element: 'geo', count: 2}),
                ]),
            }),
            new Condition({
                stats: {
                    crit_dmg_geo: TalentValues.C6CritDmgGeo3,
                },
                condition: new ConditionAnd([
                    new ConditionBoolean({name: 'party.gorou_mountainous_fealty'}),
                    new ConditionBoolean({name: 'party.gorou_fierce_as_fire'}),
                    new ConditionElementsCount({element: 'geo', count: 3}),
                ]),
            }),
        ],
    },
});
