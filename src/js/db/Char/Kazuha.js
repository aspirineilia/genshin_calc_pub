import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation";
import { DbObjectTalents } from "../../classes/DbObject/Talents";
import { FeatureDamageBurst } from "../../classes/Feature2/Damage/Burst";
import { FeatureDamageCharged } from "../../classes/Feature2/Damage/Charged";
import { FeatureDamageMultihit } from "../../classes/Feature2/Damage/Multihit";
import { FeatureDamageNormal } from "../../classes/Feature2/Damage/Normal";
import { FeatureDamagePlunge } from "../../classes/Feature2/Damage/Plunge";
import { FeatureDamagePlungeCollision } from "../../classes/Feature2/Damage/Plunge/Collision";
import { FeatureDamagePlungeShockWave } from "../../classes/Feature2/Damage/Plunge/ShockWave";
import { FeatureDamageSkill } from "../../classes/Feature2/Damage/Skill";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsMastery } from "../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Kazuha.s1_id,
        title: 'talent_name.kaedehara_kazuha_garyuu_bladework',
        description: 'talent_descr.kaedehara_kazuha_garyuu_bladework',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kazuha.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Kazuha.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Kazuha.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Kazuha.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Kazuha.s1.p5),
            },
            {
                type: 'multihit',
                hits: 3,
                table: new StatTable('normal_hit_5', charTalentTables.Kazuha.s1.p6),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Kazuha.s1.p7),
                    new StatTable('charged_hit_2', charTalentTables.Kazuha.s1.p8),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Kazuha.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kazuha.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kazuha.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kazuha.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kazuha.s2_id,
        title: 'talent_name.kaedehara_kazuha_chihayaburu',
        description: 'talent_descr.kaedehara_kazuha_chihayaburu',
        items: [
            {
                table: new StatTable('press_dmg', charTalentTables.Kazuha.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_press', charTalentTables.Kazuha.s2.p2),
            },
            {
                table: new StatTable('hold_dmg', charTalentTables.Kazuha.s2.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd_hold', charTalentTables.Kazuha.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kazuha.s3_id,
        title: 'talent_name.kaedehara_kazuha_kazuha_slash',
        description: 'talent_descr.kaedehara_kazuha_kazuha_slash',
        items: [
            {
                table: new StatTable('kazuha_slashing_dmg', charTalentTables.Kazuha.s3.p1),
            },
            {
                table: new StatTable('dot_dmg', charTalentTables.Kazuha.s3.p2),
            },
            {
                table: new StatTable('anemoskill_elemental_dmg', charTalentTables.Kazuha.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Kazuha.s3.p4),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kazuha.s3.p5),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kazuha.s3.p6),
            },
        ],
    },
});

const TalentValues = {
    A1PlungeDmg: 200,
    A4ElementalBonus: 0.04,
    C1SkillCd: 10,
    C2Mastery: 200,
    C6DmgBonus: 0.2,
};

const damageBonusPost = new PostEffectStatsMastery({
    percent: [
        new StatTable('dmg_normal', [TalentValues.C6DmgBonus]),
        new StatTable('dmg_charged', [TalentValues.C6DmgBonus]),
        new StatTable('dmg_plunge', [TalentValues.C6DmgBonus]),
    ],
    conditions: [
        new ConditionBoolean({name: 'kaedehara_kazuha_crimson_momiji'}),
        new ConditionConstellation({constellation: 6}),
    ],
});

export const Kazuha = new DbObjectChar({
    name: 'kaedehara_kazuha',
    serializeId: 35,
    gameId: 10000047,
    iconClass: "char-icon-kaedehara-kazuha",
    rarity: 5,
    element: 'anemo',
    weapon: 'sword',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Kazuha,
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
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.normal_hit_3_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3_2'),
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
                    hits: 3,
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
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_5'),
                }),
            ],
        }),
        new FeatureDamageMultihit({
            category: 'attack',
            damageType: 'charged',
            name: 'charged_hit_total',
            allowInfusion: true,
            items: [
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_1'),
                        }),
                    ],
                },
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_2'),
                        }),
                    ],
                },
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_1',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_1'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit_2',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_2'),
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
        new FeatureDamagePlungeCollision({
            name: 'kazuha_plunge',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'kazuha_plunge_low',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'kazuha_plunge_high',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'kazuha_plunge_hydro',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1PlungeDmg]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'kazuha_plunge_pyro',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1PlungeDmg]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'kazuha_plunge_cryo',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1PlungeDmg]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamagePlungeShockWave({
            name: 'kazuha_plunge_electro',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    source: 'ascension1',
                    values: new ValueTable([TalentValues.A1PlungeDmg]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
        new FeatureDamageSkill({
            name: 'press_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.press_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'hold_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.hold_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'kazuha_slashing_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.kazuha_slashing_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'dot_dmg',
            element: 'anemo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.dot_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_pyro_dmg',
            element: 'pyro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_hydro_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_cryo_dmg',
            element: 'cryo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_elemental_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'anemoskill_electro_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.anemoskill_elemental_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'kazuha_elemental_bonus',
            postEffect: new PostEffectStatsMastery({
                percent: new StatTable('dmg_cryo', [TalentValues.A4ElementalBonus]),
            }),
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'other',
            name: 'kazuha_crimson_momiji',
            postEffect: damageBonusPost,
            format: 'percent',
            condition: new ConditionConstellation({constellation: 6}),
        }),
    ],
    postEffects: [
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_cryo', [TalentValues.A4ElementalBonus]),
            conditions: [
                new ConditionBoolean({name: 'kazuha_windsong_poetics_cryo'}),
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_electro', [TalentValues.A4ElementalBonus]),
            conditions: [
                new ConditionBoolean({name: 'kazuha_windsong_poetics_electro'}),
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_hydro', [TalentValues.A4ElementalBonus]),
            conditions: [
                new ConditionBoolean({name: 'kazuha_windsong_poetics_hydro'}),
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new PostEffectStatsMastery({
            percent: new StatTable('dmg_pyro', [TalentValues.A4ElementalBonus]),
            conditions: [
                new ConditionBoolean({name: 'kazuha_windsong_poetics_pyro'}),
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        damageBonusPost,
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.kaedehara_kazuha_soumon_swordsmanship',
            description: 'talent_descr.kaedehara_kazuha_soumon_swordsmanship',
            stats: {
                text_percent_dmg: TalentValues.A1PlungeDmg,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionDropdownElement({
            name: 'kaedehara_kazuha_poetics_of_fuubutsu',
            serializeId: 3,
            multiple: true,
            hideEmpty: true,
            dropdownClass: 'select-element-multiple',
            title: 'talent_name.kaedehara_kazuha_poetics_of_fuubutsu',
            description: 'talent_descr.kaedehara_kazuha_poetics_of_fuubutsu',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
            settings: {
                kazuha_windsong_poetics_cryo: 0,
                kazuha_windsong_poetics_electro: 0,
                kazuha_windsong_poetics_hydro: 0,
                kazuha_windsong_poetics_pyro: 0,
            },
            values: [
                {
                    value: 'cryo',
                    serializeId: 1,
                    conditions: [
                        new Condition({
                            settings: {
                                kazuha_windsong_poetics_cryo: 1,
                            },
                        }),
                    ],
                },
                {
                    value: 'electro',
                    serializeId: 2,
                    conditions: [
                        new Condition({
                            settings: {
                                kazuha_windsong_poetics_electro: 1,
                            },
                        }),
                    ],
                },
                {
                    value: 'hydro',
                    serializeId: 3,
                    conditions: [
                        new Condition({
                            settings: {
                                kazuha_windsong_poetics_hydro: 1,
                            },
                        }),
                    ],
                },
                {
                    value: 'pyro',
                    serializeId: 4,
                    conditions: [
                        new Condition({
                            settings: {
                                kazuha_windsong_poetics_pyro: 1,
                            },
                        }),
                    ],
                },
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kaedehara_kazuha_scarlet_hills',
                    description: 'talent_descr.kaedehara_kazuha_scarlet_hills',
                    stats: {
                        text_percent_cd: TalentValues.C1SkillCd,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionBoolean({
                    name: 'kaedehara_kazuha_yamaarashi_tailwind',
                    serializeId: 1,
                    title: 'talent_name.kaedehara_kazuha_yamaarashi_tailwind',
                    description: 'talent_descr.kaedehara_kazuha_yamaarashi_tailwind',
                    stats: {
                        mastery: TalentValues.C2Mastery,
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
                    title: 'talent_name.kaedehara_kazuha_oozora_genpou',
                    description: 'talent_descr.kaedehara_kazuha_oozora_genpou',
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
                new Condition({
                    settings: {
                        allowed_infusion_anemo: 1,
                    },
                }),
                new ConditionBoolean({
                    name: 'kaedehara_kazuha_crimson_momiji',
                    serializeId: 2,
                    title: 'talent_name.kaedehara_kazuha_crimson_momiji',
                    description: 'talent_descr.kaedehara_kazuha_crimson_momiji',
                    stats: {
                        text_percent_dmg: TalentValues.C6DmgBonus,
                    },
                    settings: {
                        attack_infusion_anemo: 1,
                    },
                }),
            ],
        }
    ]),
    partyData: {
        loadStats: {
            stats: ['mastery_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'kazuha_mastery',
                title: 'stat.mastery',
                partyStat: 'mastery_total',
                serializeId: 1,
                rotation: 'party',
                max: 10000,
            }),
            new ConditionDropdownElement({
                name: 'party.kaedehara_kazuha_poetics_of_fuubutsu',
                serializeId: 2,
                rotation: 'party',
                multiple: true,
                hideEmpty: true,
                dropdownClass: 'select-element-multiple',
                title: 'talent_name.kaedehara_kazuha_poetics_of_fuubutsu',
                description: 'talent_descr.kaedehara_kazuha_poetics_of_fuubutsu',
                info: {
                    ascension: 4,
                },
                settings: {
                    party_kazuha_windsong_poetics_cryo: 0,
                    party_kazuha_windsong_poetics_electro: 0,
                    party_kazuha_windsong_poetics_hydro: 0,
                    party_kazuha_windsong_poetics_pyro: 0,
                },
                values: [
                    {
                        value: 'cryo',
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                settings: {
                                    party_kazuha_windsong_poetics_cryo: 1,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                settings: {
                                    party_kazuha_windsong_poetics_electro: 1,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({
                                settings: {
                                    party_kazuha_windsong_poetics_hydro: 1,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'pyro',
                        serializeId: 4,
                        conditions: [
                            new Condition({
                                settings: {
                                    party_kazuha_windsong_poetics_pyro: 1,
                                },
                            }),
                        ],
                    },
                ],
            }),
            new ConditionBoolean({
                name: 'kaedehara_kazuha_yamaarashi_tailwind',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.kaedehara_kazuha_yamaarashi_tailwind',
                description: 'talent_descr.kaedehara_kazuha_yamaarashi_tailwind',
                info: {constellation: 2},
                stats: {
                    mastery: TalentValues.C2Mastery,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'kazuha_mastery',
                percent: new StatTable('dmg_cryo', [TalentValues.A4ElementalBonus]),
                conditions: [
                    new ConditionBoolean({
                        name: 'party_kazuha_windsong_poetics_cryo',
                    }),
                ],
            }),
            new PostEffectStats({
                from: 'kazuha_mastery',
                percent: new StatTable('dmg_electro', [TalentValues.A4ElementalBonus]),
                conditions: [
                    new ConditionBoolean({
                        name: 'party_kazuha_windsong_poetics_electro',
                    }),
                ],
            }),
            new PostEffectStats({
                from: 'kazuha_mastery',
                percent: new StatTable('dmg_hydro', [TalentValues.A4ElementalBonus]),
                conditions: [
                    new ConditionBoolean({
                        name: 'party_kazuha_windsong_poetics_hydro',
                    }),
                ],
            }),
            new PostEffectStats({
                from: 'kazuha_mastery',
                percent: new StatTable('dmg_pyro', [TalentValues.A4ElementalBonus]),
                conditions: [
                    new ConditionBoolean({
                        name: 'party_kazuha_windsong_poetics_pyro',
                    }),
                ],
            }),
        ],
    },
});

