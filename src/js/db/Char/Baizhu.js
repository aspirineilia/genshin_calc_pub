import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionNumber } from "../../classes/Condition/Number";
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
import { FeatureHeal } from "../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../classes/Feature2/Multiplier";
import { FeatureMultiplierList } from "../../classes/Feature2/Multiplier/List";
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { FeatureShield } from "../../classes/Feature2/Shield";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Baizhu.s1_id,
        title: 'talent_name.baizhu_the_classics_of_acupuncture',
        description: 'talent_descr.baizhu_the_classics_of_acupuncture',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Baizhu.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Baizhu.s1.p2),
            },
            {
                type: 'multihit',
                hits: 2,
                table: new StatTable('normal_hit_3', charTalentTables.Baizhu.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Baizhu.s1.p4),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Baizhu.s1.p5),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Baizhu.s1.p6),
            },
            {
                table: new StatTable('plunge', charTalentTables.Baizhu.s1.p7),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Baizhu.s1.p8),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Baizhu.s1.p9),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.Baizhu.s2_id,
        title: 'talent_name.baizhu_universal_diagnosis',
        description: 'talent_descr.baizhu_universal_diagnosis',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Baizhu.s2.p1),
            },
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('heal', charTalentTables.Baizhu.s2.p2),
                    new StatTable('', charTalentTables.Baizhu.s2.p3),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Baizhu.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Baizhu.s3_id,
        title: 'talent_name.baizhu_holistic_revivification',
        description: 'talent_descr.baizhu_holistic_revivification',
        items: [
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('baizhu_seamless_shield', charTalentTables.Baizhu.s3.p1),
                    new StatTable('', charTalentTables.Baizhu.s3.p2),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('baichu_seamless_duration', charTalentTables.Baizhu.s3.p3),
            },
            {
                unit: 'hp',
                type: 'shield',
                table: [
                    new StatTable('baizhu_seamless_heal', charTalentTables.Baizhu.s3.p5),
                    new StatTable('', charTalentTables.Baizhu.s3.p6),
                ],
            },
            {
                table: new StatTable('baizu_spiritvein_dmg', charTalentTables.Baizhu.s3.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('baichu_duration', charTalentTables.Baizhu.s3.p8),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Baizhu.s3.p9),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Baizhu.s3.p10),
            },
        ],
    },
});

const A4BloomBonus = 0.002;
const A4BloomBonusCap = 100;
const A4QuickenBonus = 0.0008;
const A4QuickenBonusCap = 40;
const C2HealValue = 20;
const C2Damage = 250;
const C4MasteryBonus = 80;
const C6HpScale = 8;

const buffBloom = new PostEffectStatsHP({
    percent: new StatTable('dmg_reaction_bloom', [A4BloomBonus]),
    statCap: new StatTable('', [A4BloomBonusCap]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
        new ConditionBoolean({name: 'baizhu_all_things_are_of_the_earth'}),
    ],
});
const buffQuicken = new PostEffectStatsHP({
    percent: new StatTable('dmg_reaction_quicken', [A4QuickenBonus]),
    statCap: new StatTable('', [A4QuickenBonusCap]),
    conditions: [
        new ConditionAscensionChar({ascension: 4}),
        new ConditionBoolean({name: 'baizhu_all_things_are_of_the_earth'}),
    ],
});


export const Baizhu = new DbObjectChar({
    name: 'baizhu',
    serializeId: 70,
    gameId: 10000082,
    iconClass: "char-icon-baizhu",
    rarity: 5,
    element: 'dendro',
    weapon: 'catalyst',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Baizhu,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit_1',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_1'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_2',
            element: 'dendro',
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
            element: 'dendro',
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
            element: 'dendro',
            hits: 3,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_3'),
                }),
            ],
        }),
        new FeatureDamageNormal({
            name: 'normal_hit_4',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit_4'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'dendro',
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
        new FeatureDamageSkill({
            name: 'baizhu_gossamer_splice_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: new ValueTable([C2Damage]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'heal',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.heal'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'skill',
            name: 'baizhu_gossamer_splice_heal',
            partyHeal: 1,
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.heal',
                        multi: C2HealValue / 100,
                    }),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureDamageBurst({
            name: 'baizu_spiritvein_dmg',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.baizu_spiritvein_dmg'),
                }),
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation6',
                    values: new ValueTable([C6HpScale]),
                    condition: new ConditionConstellation({constellation: 6}),
                }),
            ],
        }),
        new FeatureShield({
            category: 'burst',
            element: 'dendro',
            name: 'baizhu_seamless_shield',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.baizhu_seamless_shield'),
                }),
            ],
        }),
        new FeatureHeal({
            category: 'burst',
            name: 'baizhu_seamless_heal',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.getList('burst.baizhu_seamless_heal'),
                }),
            ],
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'baizhu_bloom_bonus',
            postEffect: buffBloom,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'burst',
            name: 'baizhu_quicken_bonus',
            postEffect: buffQuicken,
            format: 'percent',
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.baizhu_five_fortunes_forever',
            description: 'talent_descr.baizhu_five_fortunes_forever_2',
            stats: {
                dmg_dendro: 25,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
                new ConditionNot([
                    new ConditionBoolean({name: 'baizhu_five_fortunes_forever'}),
                ]),
            ],
        }),
        new ConditionBoolean({
            name: 'baizhu_five_fortunes_forever',
            serializeId: 2,
            title: 'talent_name.baizhu_five_fortunes_forever',
            description: 'talent_descr.baizhu_five_fortunes_forever_1',
            info: {ascension: 1},
            stats: {
                healing: 20,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'baizhu_all_things_are_of_the_earth',
            serializeId: 3,
            title: 'talent_name.baizhu_all_things_are_of_the_earth',
            description: 'talent_descr.baizhu_all_things_are_of_the_earth',
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        new PostEffectStatsHP({
            percent: new StatTable('dmg_reaction_burning', [A4BloomBonus]),
            statCap: new StatTable('', [A4BloomBonusCap]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
                new ConditionBoolean({name: 'baizhu_all_things_are_of_the_earth'}),
            ],
        }),
        buffBloom,
        buffQuicken,
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.baizhu_attentive_observation',
                    description: 'talent_descr.baizhu_attentive_observation',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.baizhu_incisive_discernment',
                    description: 'talent_descr.baizhu_incisive_discernment',
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
                    name: 'baizhu_ancient_art_of_perception',
                    serializeId: 4,
                    title: 'talent_name.baizhu_ancient_art_of_perception',
                    description: 'talent_descr.baizhu_ancient_art_of_perception',
                    stats: {
                        mastery: C4MasteryBonus,
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
                    title: 'talent_name.baizhu_elimination_of_malicious_qi',
                    description: 'talent_descr.baizhu_elimination_of_malicious_qi',
                    stats: {
                        text_percent: C6HpScale,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        loadStats: {
            stats: ['hp_total'],
        },
        conditions: [
            new ConditionNumber({
                name: 'baizhu_max_hp',
                title: 'talent_name.stats_total_hp',
                partyStat: 'hp_total',
                serializeId: 1,
                max: CHARACTER_MAX_POSSIBLE_HP,
                class: "gi-inputs-5digit",
            }),
            new ConditionBoolean({
                name: 'party.baizhu_all_things_are_of_the_earth',
                serializeId: 2,
                rotation: 'party',
                title: 'talent_name.baizhu_all_things_are_of_the_earth',
                description: 'talent_descr.baizhu_all_things_are_of_the_earth',
                info: {ascension: 4},
            }),
            new ConditionBoolean({
                name: 'party.baizhu_ancient_art_of_perception',
                serializeId: 3,
                rotation: 'party',
                title: 'talent_name.baizhu_ancient_art_of_perception',
                description: 'talent_descr.baizhu_ancient_art_of_perception',
                info: {constellation: 4},
                stats: {
                    mastery: C4MasteryBonus,
                },
            }),
        ],
        postEffects: [
            new PostEffectStats({
                from: 'baizhu_max_hp',
                percent: new StatTable('dmg_reaction_burning', [A4BloomBonus]),
                statCap: new StatTable('', [A4BloomBonusCap]),
                conditions: [
                    new ConditionBoolean({name: 'party.baizhu_all_things_are_of_the_earth'}),
                ],
            }),
            new PostEffectStats({
                from: 'baizhu_max_hp',
                percent: new StatTable('dmg_reaction_bloom', [A4BloomBonus]),
                statCap: new StatTable('', [A4BloomBonusCap]),
                conditions: [
                    new ConditionBoolean({name: 'party.baizhu_all_things_are_of_the_earth'}),
                ],
            }),
            new PostEffectStats({
                from: 'baizhu_max_hp',
                percent: new StatTable('dmg_reaction_quicken', [A4QuickenBonus]),
                statCap: new StatTable('', [A4QuickenBonusCap]),
                conditions: [
                    new ConditionBoolean({name: 'party.baizhu_all_things_are_of_the_earth'}),
                ],
            }),
        ],
    },
});
