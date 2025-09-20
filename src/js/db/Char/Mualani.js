import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionDropdown } from "../../classes/Condition/Dropdown";
import { ConditionStacks } from "../../classes/Condition/Stacks";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamageNormalMualani } from "../../classes/Feature2/Damage/Normal/Mualani";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Mualani.s1_id,
        title: 'talent_name.mualani_cooling_treatment',
        description: 'talent_descr.mualani_cooling_treatment',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Mualani.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Mualani.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Mualani.s1.p3),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Mualani.s1.p4),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Mualani.s1.p5),
            },
            {
                table: new StatTable('plunge', charTalentTables.Mualani.s1.p6),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Mualani.s1.p7),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Mualani.s1.p8),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Mualani.s2_id,
        title: 'talent_name.mualani_surfshark_wavebreaker',
        description: 'talent_descr.mualani_surfshark_wavebreaker',
        items: [
            {
                unit: 'hp',
                table: new StatTable('mualani_shark_base_dmg', charTalentTables.Mualani.s2.p1),
            },
            {
                unit: 'hp_per_stack',
                table: new StatTable('mualani_wave_monentum_dmg', charTalentTables.Mualani.s2.p2),
            },
            {
                unit: 'hp',
                table: new StatTable('mualani_shark_add_dmg', charTalentTables.Mualani.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('mualani_shark_cd', charTalentTables.Mualani.s2.p4),
            },
            {
                unit: '',
                table: new StatTable('nightsoul_points_limit', charTalentTables.Mualani.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mualani.s2.p6),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Mualani.s3_id,
        title: 'talent_name.mualani_boomsharka_laka',
        description: 'talent_descr.mualani_boomsharka_laka',
        items: [
            {
                unit: 'hp',
                table: new StatTable('burst_dmg', charTalentTables.Mualani.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Mualani.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Mualani.s3.p3),
            },
        ],
    },
});

const A4StackValue1 = 15;
const A4StackValue2 = 30;
const A4StackValue3 = 45;
const C1HpBonus = 66;
const C4DmgBonus = 75;

export const Mualani = new DbObjectChar({
    name: 'mualani',
    serializeId: 92,
    gameId: 10000102,
    iconClass: 'char-icon-mualani',
    rarity: 5,
    element: 'hydro',
    weapon: 'catalyst',
    origin: 'natlan',
    talents: Talents,
    statTable: charTables.Mualani,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageNormalMualani({
            name: 'mualani_shark_bite_dmg',
            category: 'skill',
            element: 'hydro',
            tags: ['shark_byte'],
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mualani_shark_base_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormalMualani({
            name: 'mualani_shark_missile_dmg',
            category: 'skill',
            element: 'hydro',
            tags: ['shark_byte'],
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.mualani_shark_base_dmg'),
                }),
            ],
            condition: new ConditionBooleanValue({
                setting: 'mualani_byte_targets',
                cond: 'ge',
                value: 2,
            }),
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'hydro',
            damageBonuses: ['dmg_burst_mualani'],
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension1',
                    leveling: 'mualani_natlans_greatest_guide',
                    values: new ValueTable([A4StackValue1, A4StackValue2, A4StackValue3]),
                    condition: new ConditionBoolean({name: 'mualani_natlans_greatest_guide'}),
                }),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            leveling: 'char_skill_elemental',
            stacksLeveling: 'mualani_wave_momentum',
            values: Talents.get('skill.mualani_wave_monentum_dmg'),
            target: new FeatureMultiplierTarget({
                tags: ['shark_byte'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            leveling: 'char_skill_elemental',
            values: Talents.get('skill.mualani_shark_add_dmg'),
            condition: new ConditionBooleanValue({
                setting: 'mualani_wave_momentum',
                cond: 'ge',
                value: 3,
            }),
            target: new FeatureMultiplierTarget({
                tags: ['shark_byte'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'constellation1',
            values: new ValueTable([C1HpBonus]),
            target: new FeatureMultiplierTarget({
                tags: ['shark_byte'],
            }),
            condition: new ConditionAnd([
                new ConditionConstellation({constellation: 1}),
                new ConditionBoolean({name: 'mualani_the_leisurely_meztli'}),
            ]),
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'mualani_wave_momentum',
            serializeId: 1,
            title: 'talent_name.mualani_wave_momentum',
            description: 'talent_descr.mualani_wave_momentum',
            maxStacks: 3,
        }),
        new ConditionDropdown({
            name: 'mualani_byte_targets',
            serializeId: 2,
            title: 'talent_name.mualani_byte_targets',
            description: 'talent_descr.mualani_byte_targets',
            hideEmpty: true,
            defaultValue: 1,
            values: [
                {title: 1, value: 1, serializeId: 1},
                {title: 2, value: 2, serializeId: 2},
                {title: 3, value: 3, serializeId: 3},
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.mualani_heat_resistant_freshwater_floater',
            description: 'talent_descr.mualani_heat_resistant_freshwater_floater',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStacks({
            name: 'mualani_natlans_greatest_guide',
            serializeId: 3,
            title: 'talent_name.mualani_natlans_greatest_guide',
            description: 'talent_descr.mualani_natlans_greatest_guide',
            maxStacks: 3,
            info: {ascension: 4},
            stats: [
                new StatTable('text_percent_1', [A4StackValue1]),
                new StatTable('text_percent_2', [A4StackValue2]),
                new StatTable('text_percent_3', [A4StackValue3]),
            ],
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionBoolean({
                    name: 'mualani_the_leisurely_meztli',
                    serializeId: 4,
                    title: 'talent_name.mualani_the_leisurely_meztli',
                    description: 'talent_descr.mualani_the_leisurely_meztli',
                    stats: {
                        text_percent_dmg: C1HpBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.mualani_mualani_going_all_out',
                    description: 'talent_descr.mualani_mualani_going_all_out',
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
                    name: 'mualani_sharky_eats_puffies',
                    serializeId: 5,
                    title: 'talent_name.mualani_sharky_eats_puffies',
                    description: 'talent_descr.mualani_sharky_eats_puffies',
                    stats: {
                        dmg_burst_mualani: C4DmgBonus,
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
                    title: 'talent_name.mualani_spirit_of_the_springs_people',
                    description: 'talent_descr.mualani_spirit_of_the_springs_people',
                }),
            ],
        },
    ]),
});
