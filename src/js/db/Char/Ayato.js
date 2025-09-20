import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanLevels } from "../../classes/Condition/Boolean/Levels";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumberTalent } from "../../classes/Condition/Number/Talent";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Ayato.s1_id,
        title: 'talent_name.kamisato_ayato_marobashi',
        description: 'talent_descr.kamisato_ayato_marobashi',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Ayato.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Ayato.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Ayato.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Ayato.s1.p4),
            },
            {
                table: new StatTable('normal_hit_5', charTalentTables.Ayato.s1.p5),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Ayato.s1.p6),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Ayato.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Ayato.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Ayato.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Ayato.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Ayato.s2_id,
        title: 'talent_name.kamisato_ayato_kyouka',
        description: 'talent_descr.kamisato_ayato_kyouka',
        items: [
            {
                table: new StatTable('ayato_shunsuiken_1', charTalentTables.Ayato.s2.p1),
            },
            {
                table: new StatTable('ayato_shunsuiken_2', charTalentTables.Ayato.s2.p2),
            },
            {
                table: new StatTable('ayato_shunsuiken_3', charTalentTables.Ayato.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('ayato_duration', charTalentTables.Ayato.s2.p4),
            },
            {
                unit: 'hp',
                digits: 2,
                table: new StatTable('ayato_namisen_bonus', charTalentTables.Ayato.s2.p5),
            },
            {
                table: new StatTable('ayato_water_illusion_dmg', charTalentTables.Ayato.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('ayato_duration_2', charTalentTables.Ayato.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ayato.s2.p8),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Ayato.s3_id,
        title: 'talent_name.kamisato_ayato_suiyuu',
        description: 'talent_descr.kamisato_ayato_suiyuu',
        items: [
            {
                table: new StatTable('ayato_bloomwater_blade_dmg', charTalentTables.Ayato.s3.p1),
            },
            {
                table: new StatTable('ayato_normal_attack_bonus', charTalentTables.Ayato.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Ayato.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ayato.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Ayato.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    C1DamageBonus: 40,
    C2HpBonus: 50,
    C4AtkSpeed: 15,
    C6AttackDmg: 450,
};

const condStance = new ConditionBoolean({name: 'ayato_takimeguri_kanka'});
const condNotStance = new ConditionNot([
    new ConditionBoolean({name: 'ayato_takimeguri_kanka'}),
]);
const maxStacksFunc = function(settings) {
    if (settings.char_constellation >= 2) {return 5}
    return 4;
}

export const Ayato = new DbObjectChar({
    name: 'kamisato_ayato',
    serializeId: 50,
    gameId: 10000066,
    iconClass: "char-icon-kamisato-ayato",
    rarity: 5,
    element: 'hydro',
    weapon: 'sword',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Ayato,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_5',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamageNormal({
            name: 'ayato_shunsuiken_1',
            element: 'hydro',
            damageBonuses: ['dmg_normal_ayato'],
            tags: ['shunsuiken'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.ayato_shunsuiken_1'),
                }),
            ],
            condition: condStance,
        }),
        new FeatureDamageNormal({
            name: 'ayato_shunsuiken_2',
            element: 'hydro',
            damageBonuses: ['dmg_normal_ayato'],
            tags: ['shunsuiken'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.ayato_shunsuiken_2'),
                }),
            ],
            condition: condStance,
        }),
        new FeatureDamageNormal({
            name: 'ayato_shunsuiken_3',
            element: 'hydro',
            damageBonuses: ['dmg_normal_ayato'],
            tags: ['shunsuiken'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.ayato_shunsuiken_3'),
                }),
            ],
            condition: condStance,
        }),
        new FeatureDamageNormal({
            name: 'ayato_boundless_origin_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6AttackDmg]),
                }),
            ],
            condition: new ConditionAnd([
                condStance,
                new ConditionConstellation({constellation: 6}),
            ]),
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
            condition: condNotStance,
        }),
        new FeatureDamageSkill({
            name: 'ayato_water_illusion_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.ayato_water_illusion_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'ayato_bloomwater_blade_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.ayato_bloomwater_blade_dmg'),
                }),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            leveling: 'char_skill_elemental',
            stacksLeveling: 'ayato_namisen',
            maxStacks: maxStacksFunc,
            values: Talents.get('skill.ayato_namisen_bonus'),
            condition: new ConditionBooleanValue({
                setting: 'ayato_namisen',
                cond: 'ge',
                value: 1,
            }),
            target: new FeatureMultiplierTarget({
                tags: ['shunsuiken'],
            }),
        }),
    ],
    conditions: [
        new Condition({
            settings: {
                char_skill_elemental_bonus: 3,
            },
            subConditions: [
                new ConditionConstellation({constellation: 3}),
            ],
        }),
        new Condition({
            settings: {
                char_skill_burst_bonus : 3,
            },
            subConditions: [
                new ConditionConstellation({constellation: 5}),
            ],
        }),
        new ConditionBoolean({
            name: 'ayato_takimeguri_kanka',
            serializeId: 1,
            title: 'talent_name.ayato_takimeguri_kanka',
            description: 'talent_descr.ayato_takimeguri_kanka',
        }),
        new ConditionStacks({
            name: 'ayato_namisen',
            serializeId: 2,
            title: 'talent_name.ayato_namisen',
            description: 'talent_descr.ayato_namisen',
            maxStacks: maxStacksFunc,
        }),
        new ConditionBooleanLevels({
            name: 'ayato_bloomwater_blades',
            serializeId: 3,
            title: 'talent_name.ayato_bloomwater_blades',
            description: 'talent_descr.ayato_bloomwater_blades',
            levelSetting: 'char_skill_burst',
            stats: [
                Talents.getAlias('burst.ayato_normal_attack_bonus', 'dmg_normal'),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kamisato_ayato_mine_wo_matoishi_kiyotaki',
            description: 'talent_descr.kamisato_ayato_mine_wo_matoishi_kiyotaki',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kamisato_ayato_michiyuku_hagetsu',
            description: 'talent_descr.kamisato_ayato_michiyuku_hagetsu',
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
                    name: 'kamisato_ayato_kyouka_fuushi',
                    serializeId: 4,
                    title: 'talent_name.kamisato_ayato_kyouka_fuushi',
                    description: 'talent_descr.kamisato_ayato_kyouka_fuushi',
                    stats: {
                        dmg_normal_ayato: TalentValues.C1DamageBonus,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kamisato_ayato_world_source',
                    description: 'talent_descr.kamisato_ayato_world_source_1',
                }),
                new ConditionStatic({
                    title: 'talent_name.kamisato_ayato_world_source',
                    description: 'talent_descr.kamisato_ayato_world_source_2',
                    stats: {
                        hp_percent: TalentValues.C2HpBonus,
                    },
                    subConditions: [
                        new ConditionBooleanValue({
                            setting: 'ayato_namisen',
                            cond: 'ge',
                            value: 3,
                        }),
                    ],
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'kamisato_ayato_endless_flow',
                    serializeId: 5,
                    title: 'talent_name.kamisato_ayato_endless_flow',
                    description: 'talent_descr.kamisato_ayato_endless_flow',
                    stats: {
                        atk_speed_normal: TalentValues.C4AtkSpeed,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kamisato_ayato_boundless_origin',
                    description: 'talent_descr.kamisato_ayato_boundless_origin',
                    stats: {
                        text_percent_dmg: TalentValues.C6AttackDmg,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            settings: ['char_skill_burst'],
        },
        conditions: [
            new ConditionNumberTalent({
                name: 'ayato_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 1,
            }),
            new Condition({
                settings: {
                    ayato_char_skill_burst_bonus: 3,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'party.ayato_constellation_5',
                    }),
                ],
            }),
            new ConditionBooleanLevels({
                name: 'party.ayato_bloomwater_blades',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.ayato_bloomwater_blades',
                description: 'talent_descr.ayato_bloomwater_blades',
                levelSetting: 'ayato_char_skill_burst',
                stats: [
                    Talents.getAlias('burst.ayato_normal_attack_bonus', 'dmg_normal'),
                ],
            }),
            new ConditionBoolean({
                name: 'party.kamisato_ayato_endless_flow',
                serializeId: 3,
                title: 'talent_name.kamisato_ayato_endless_flow',
                description: 'talent_descr.kamisato_ayato_endless_flow',
                info: {
                    constellation: 4,
                },
                stats: {
                    atk_speed_normal: TalentValues.C4AtkSpeed,
                },
            }),
            new ConditionBoolean({
                name: 'party.ayato_constellation_5',
                serializeId: 4,
                title: 'talent_name.kamisato_ayato_bansui_ichiro',
                description: 'talent_descr.char_constellation_burst',
                info: {
                    constellation: 5,
                },
            }),
        ],
    },
});
