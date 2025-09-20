import { Condition } from "../../classes/Condition";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNumber } from "../../classes/Condition/Number";
import { ConditionNumberFurina } from "../../classes/Condition/Number/Furina";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierFurinaSkill } from "../../classes/Feature2/Multiplier/FurinaSkill";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Furina.s1_id,
        title: 'talent_name.furina_soloists_solicitation',
        description: 'talent_descr.furina_soloists_solicitation',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Furina.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Furina.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Furina.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Furina.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Furina.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Furina.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Furina.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Furina.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Furina.s1.p9),
            },
            {
                table: new StatTable('spiritbreath_thorn_dmg', charTalentTables.Furina.s1.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('spiritbreath_thorn_interval', charTalentTables.Furina.s1.p11),
            },
            {
                table: new StatTable('surging_blade_dmg', charTalentTables.Furina.s1.p10),
            },
            {
                unit: 'sec',
                table: new StatTable('surging_blade_interval', charTalentTables.Furina.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Furina.s2_id,
        title: 'talent_name.furina_salon_solitaire',
        description: 'talent_descr.furina_salon_solitaire',
        items: [
            {
                table: new StatTable('furina_ousia_bubble_dmg', charTalentTables.Furina.s2.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Furina.s2.p2),
            },
            {
                table: new StatTable('furina_gentilhomme_usher_dmg', charTalentTables.Furina.s2.p3),
            },
            {
                table: new StatTable('furina_surintendante_chevalmarin_dmg', charTalentTables.Furina.s2.p4),
            },
            {
                table: new StatTable('furina_mademoiselle_crabaletta_dmg', charTalentTables.Furina.s2.p5),
            },
            {
                table: new StatTable('furina_gentilhomme_usher_hp_consumption', charTalentTables.Furina.s2.p6),
            },
            {
                table: new StatTable('furina_surintendante_chevalmarin_hp_consumption', charTalentTables.Furina.s2.p7),
            },
            {
                table: new StatTable('furina_mademoiselle_crabaletta_hp_consumption', charTalentTables.Furina.s2.p8),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('furina_singers_of_the_streams_healing', charTalentTables.Furina.s2.p9),
                    new StatTable('', charTalentTables.Furina.s2.p10),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Furina.s2.p11),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Furina.s3_id,
        title: 'talent_name.furina_let_the_people_rejoice',
        description: 'talent_descr.furina_let_the_people_rejoice',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Furina.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Furina.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('furina_max_fanfare', charTalentTables.Furina.s3.p4),
            },
            {
                digits: 2,
                table: new StatTable('furina_fanfare_dmg_ratio', charTalentTables.Furina.s3.p5),
            },
            {
                digits: 2,
                table: new StatTable('furina_fanfare_heal_ratio', charTalentTables.Furina.s3.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Furina.s3.p7),
            },
            {
                unit: 'unit',
                table: new StatTable('energy_cost', charTalentTables.Furina.s3.p8),
            },
        ],
    },
});

const TalentValues = {
    BurstFanfareLimit: 300,
    C1FanfareGain: 150,
    C1FanfareLimit: 100,
    C2FanfareLimit: 400,
    C2MaxHpBonus: 0.35,
    C2MaxHpBonusCap: 140,
    C6HpDmg1: 18,
    C6HpDmg2: 25,
    C6Heal: 4,
};

const fanfareDmgPost = new PostEffectStats({
    from: 'furina_fanfare_stacks',
    levelSetting: 'char_skill_burst',
    maxBase: TalentValues.BurstFanfareLimit + TalentValues.C1FanfareLimit,
    percent: Talents.getMulti({
        name: 'dmg_all',
        from: 'burst.furina_fanfare_dmg_ratio',
    }),
});

const fanfareHealingPost = new PostEffectStats({
    from: 'furina_fanfare_stacks',
    levelSetting: 'char_skill_burst',
    maxBase: TalentValues.BurstFanfareLimit + TalentValues.C1FanfareLimit,
    percent: Talents.getMulti({
        name: 'healing_recv',
        from: 'burst.furina_fanfare_heal_ratio',
    }),
});

const fanfareHpPost = new PostEffectStats({
    from: 'furina_fanfare_stacks',
    exceed: TalentValues.BurstFanfareLimit + TalentValues.C1FanfareLimit,
    percent: new StatTable('hp_percent', [TalentValues.C2MaxHpBonus]),
    statCap: new ValueTable([TalentValues.C2MaxHpBonusCap]),
    conditions: [
        new ConditionConstellation({constellation: 2}),
    ],
});

export const Furina = new DbObjectChar({
    name: 'furina',
    serializeId: 79,
    gameId: 10000089,
    iconClass: 'char-icon-furina',
    rarity: 5,
    element: 'hydro',
    weapon: 'sword',
    origin: 'fontaine',
    talents: Talents,
    statTable: charTables.Furina,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_2'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_3',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            tags: ['furina_attack'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_high'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'spiritbreath_thorn_dmg',
            element: 'hydro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.spiritbreath_thorn_dmg'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'surging_blade_dmg',
            element: 'hydro',
            cannotReact: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.surging_blade_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'furina_ousia_bubble_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.furina_ousia_bubble_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'furina_gentilhomme_usher_dmg',
            element: 'hydro',
            damageBonuses: ['dmg_skill_furina'],
            multipliers: [
                new FeatureMultiplierFurinaSkill({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.furina_gentilhomme_usher_dmg'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'furina_surintendante_chevalmarin_dmg',
            element: 'hydro',
            damageBonuses: ['dmg_skill_furina'],
            multipliers: [
                new FeatureMultiplierFurinaSkill({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.furina_surintendante_chevalmarin_dmg'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'furina_mademoiselle_crabaletta_dmg',
            element: 'hydro',
            damageBonuses: ['dmg_skill_furina'],
            multipliers: [
                new FeatureMultiplierFurinaSkill({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.furina_mademoiselle_crabaletta_dmg'),
                    scalingSource: 'talent_elemental',
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'furina_singers_of_the_streams_healing',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.furina_singers_of_the_streams_healing'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'hydro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'furina_fanfare_dmg_bonus',
            postEffect: fanfareDmgPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'furina_fanfare_heal_bonus',
            postEffect: fanfareHealingPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'furina_max_hp',
            postEffect: fanfareHpPost,
            format: 'percent',
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'furina_c6_healing',
            partyHeal: true,
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation6',
                    values: new ValueTable([TalentValues.C6Heal]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 6}),
        }),
        new FeatureHeal({
            category: 'other',
            name: 'furina_heal_dot',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'ascension1',
                    values: new ValueTable([2]),
                }),
            ],
            condition: new ConditionAscensionChar({ascension: 1}),
        }),
    ],
    conditions: [
        new ConditionStacks({
            name: 'furina_hp_offers',
            serializeId: 1,
            title: 'talent_name.furina_hp_offers',
            description: 'talent_descr.furina_hp_offers',
            maxStacks: 4,
        }),
        new ConditionNumberFurina({
            name: 'furina_fanfare_stacks',
            serializeId: 2,
            title: 'talent_name.furina_fanfare_stacks',
            max: TalentValues.BurstFanfareLimit,
            allowMinZero: 1,
            c1bonus: TalentValues.C1FanfareLimit,
            c2bonus: TalentValues.C2FanfareLimit,
        }),
        new ConditionStatic({
            title: 'talent_name.furina_endless_waltz',
            description: 'talent_descr.furina_endless_waltz',
            info: {ascension: 1},
            stats: {
                text_percent_heal: 2,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.furina_unheard_confession',
            description: 'talent_descr.furina_unheard_confession',
            info: {ascension: 4},
            stats: {
                text_percent_dmg: 0.7,
                text_percent_dmg_max: 28,
                text_percent_heal: 0.4,
                text_percent_heal_max: 16,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'constellation6',
            values: new ValueTable([TalentValues.C6HpDmg1]),
            condition: new ConditionBoolean({name: 'furina_chalice_of_love'}),
            target: new FeatureMultiplierTarget({
                tags: ['furina_attack'],
            }),
        }),
        new FeatureMultiplier({
            scaling: 'hp*',
            source: 'constellation6',
            values: new ValueTable([TalentValues.C6HpDmg2]),
            condition: new ConditionAnd([
                new ConditionBoolean({name: 'furina_chalice_of_love'}),
                new ConditionBoolean({name: 'furina_pneuma'}),
            ]),
            target: new FeatureMultiplierTarget({
                tags: ['furina_attack'],
            }),
        }),
    ],
    postEffects: [
        new PostEffectStatsHP({
            percent: new StatTable('dmg_skill_furina', [0.0007]),
            statCap: new StatTable('', [28]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        fanfareDmgPost,
        fanfareHealingPost,
        fanfareHpPost,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.furina_love_is_a_rebellious_bird_that_none_can_tame',
                    description: 'talent_descr.furina_love_is_a_rebellious_bird_that_none_can_tame',
                    stats: {
                        text_value: TalentValues.C1FanfareGain,
                        text_value_max: TalentValues.C1FanfareLimit,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.furina_a_woman_adapts_like_duckweed_in_water',
                    description: 'talent_descr.furina_a_woman_adapts_like_duckweed_in_water',
                    stats: {
                        text_percent: TalentValues.C2MaxHpBonus,
                        text_percent_max: TalentValues.C2MaxHpBonusCap,
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
                    title: 'talent_name.furina_they_know_not_life_who_dwelt_in_the_netherworld_not',
                    description: 'talent_descr.furina_they_know_not_life_who_dwelt_in_the_netherworld_not',
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
                    name: 'furina_pneuma',
                    serializeId: 3,
                    title: 'talent_name.furina_pneuma',
                }),
                new ConditionBoolean({
                    name: 'furina_chalice_of_love',
                    serializeId: 4,
                    title: 'talent_name.furina_hear_me_let_us_raise_the_chalice_of_love',
                    description: 'talent_descr.furina_hear_me_let_us_raise_the_chalice_of_love',
                    stats: {
                        text_percent_dmg_1: TalentValues.C6HpDmg1,
                        text_percent_dmg_2: TalentValues.C6HpDmg2,
                        text_percent_heal: TalentValues.C6Heal,
                    },
                    settings: {
                        attack_infusion: 'hydro',
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
                name: 'furina_char_skill_burst',
                title: 'talent_name.stats_level_burst',
                partySetting: 'char_skill_burst',
                serializeId: 1,
            }),
            new ConditionNumber({
                name: 'party_furina_fanfare_stacks',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.furina_fanfare_stacks',
                max: TalentValues.BurstFanfareLimit + TalentValues.C1FanfareLimit,
                countable: true,
            }),
            new ConditionBoolean({
                name: 'party.furina_constellation_3',
                serializeId: 3,
                title: 'talent_name.furina_my_secret_is_hidden_within_me_no_one_will_know_my_name',
                description: 'talent_descr.char_constellation_burst',
                info: {constellation: 3},
                settings: {
                    furina_char_skill_burst_bonus: 3,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'party_furina_fanfare_stacks',
                maxBase: TalentValues.BurstFanfareLimit + TalentValues.C1FanfareLimit,
                levelSetting: 'furina_char_skill_burst',
                maxLevelSetting: 10,
                percent: [
                    Talents.getAlias('burst.furina_fanfare_dmg_ratio', 'dmg_all'),
                    Talents.getAlias('burst.furina_fanfare_heal_ratio', 'healing_recv'),
                ],
                condition: new ConditionBoolean({'name': 'party_furina_fanfare_stacks'}),
            }),
        ],
    },
});
