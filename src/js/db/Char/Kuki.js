import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionConstellation } from "../../classes/Condition/Constellation";
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
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../classes/StatTable";
import { ValueTable } from "../../classes/ValueTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Kuki.s1_id,
        title: 'talent_name.kuki_shinobu_shinobus_shadowsword',
        description: 'talent_descr.kuki_shinobu_shinobus_shadowsword',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kuki.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Kuki.s1.p2),
            },
            {
                table: new StatTable('normal_hit_3', charTalentTables.Kuki.s1.p3),
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Kuki.s1.p4),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Kuki.s1.p5),
                    new StatTable('charged_hit_2', charTalentTables.Kuki.s1.p6),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Kuki.s1.p7),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kuki.s1.p8),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kuki.s1.p9),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kuki.s1.p10),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kuki.s2_id,
        title: 'talent_name.kuki_shinobu_sanctifying_ring',
        description: 'talent_descr.kuki_shinobu_sanctifying_ring',
        items: [
            {
                table: new StatTable('skill_dmg', charTalentTables.Kuki.s2.p1),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('kuki_shinobu_ring_healing', charTalentTables.Kuki.s2.p2),
                    new StatTable('', charTalentTables.Kuki.s2.p3),
                ],
            },
            {
                table: new StatTable('kuki_shinobu_ring_dmg', charTalentTables.Kuki.s2.p4),
            },
            {
                unit: 'current_hp',
                table: new StatTable('kuki_shinobu_activation_cost', charTalentTables.Kuki.s2.p5),
            },
            {
                unit: 'sec',
                table: new StatTable('duration', charTalentTables.Kuki.s2.p6),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kuki.s2.p7),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kuki.s3_id,
        title: 'talent_name.kuki_shinobu_gyoei_narukami_kariyama_rite',
        description: 'talent_descr.kuki_shinobu_gyoei_narukami_kariyama_rite',
        items: [
            {
                unit: 'hp',
                table: new StatTable('kuki_shinobu_burst_dmg', charTalentTables.Kuki.s3.p1),
            },
            {
                unit: 'hp',
                type: 'separated',
                separator: ' / ',
                unitLast: true,
                table: [
                    new StatTable('kuki_shinobu_burst_total_dmg', charTalentTables.Kuki.s3.p2),
                    new StatTable('', charTalentTables.Kuki.s3.p3),
                ],
            },
            {
                unit: 'sec',
                type: 'separated',
                separator: ' / ',
                unitLast: true,
                table: [
                    new StatTable('duration', charTalentTables.Kuki.s3.p4),
                    new StatTable('', charTalentTables.Kuki.s3.p5),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kuki.s3.p6),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kuki.s3.p7),
            },
        ],
    },
});

const A1Healing = 15;
const A4MasteryDmg = 25;
const A4MasteryHeal = 75;
const C4SkillDmg = 9.7;
const C6Mastery = 150;

export const KukiShinobu = new DbObjectChar({
    name: 'kuki_shinobu',
    serializeId: 52,
    gameId: 10000065,
    iconClass: "char-icon-kuki-shinobu",
    rarity: 4,
    element: 'electro',
    weapon: 'sword',
    origin: 'inadzuma',
    talents: Talents,
    statTable: charTables.Kuki,
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
        new FeatureDamageSkill({
            name: 'skill_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.skill_dmg'),
                }),
            ],
        }),
        new FeatureHeal({
            name: 'kuki_shinobu_ring_healing',
            category: 'skill',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.kuki_shinobu_ring_healing'),
                }),
                new FeatureMultiplier({
                    scaling: 'mastery*',
                    source: 'ascension4',
                    values: new ValueTable([A4MasteryHeal]),
                    condition: new ConditionAscensionChar({ascension: 4}),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'kuki_shinobu_ring_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kuki_shinobu_ring_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'kuki_shinobu_burst_dmg',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.kuki_shinobu_burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'kuki_shinobu_to_sever_sealing_dmg',
            category: 'other',
            element: 'electro',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    source: 'constellation4',
                    values: new ValueTable([C4SkillDmg]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            source: 'ascension4',
            values: new ValueTable([A4MasteryDmg]),
            condition: new ConditionAscensionChar({ascension: 4}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
    ],
    conditions: [
        new ConditionBoolean({
            name: 'kuki_shinobu_breaking_free',
            serializeId: 1,
            title: 'talent_name.kuki_shinobu_breaking_free',
            description: 'talent_descr.kuki_shinobu_breaking_free',
            stats: {
                healing: A1Healing,
            },
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kuki_shinobu_hearts_repose',
            description: 'talent_descr.kuki_shinobu_hearts_repose',
            info: {ascension: 4},
            stats: {
                text_percent_healing: A4MasteryHeal,
                text_percent_dmg: A4MasteryDmg,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kuki_shinobu_to_cloister_compassion',
                    description: 'talent_descr.kuki_shinobu_to_cloister_compassion',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kuki_shinobu_to_forsake_fortune',
                    description: 'talent_descr.kuki_shinobu_to_forsake_fortune',
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
                    title: 'talent_name.kuki_shinobu_to_sever_sealing',
                    description: 'talent_descr.kuki_shinobu_to_sever_sealing',
                    stats: {
                        text_percent: C4SkillDmg,
                    }
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
                    name: 'kuki_shinobu_to_ward_weakness',
                    serializeId: 2,
                    title: 'talent_name.kuki_shinobu_to_ward_weakness',
                    description: 'talent_descr.kuki_shinobu_to_ward_weakness',
                    stats: {
                        mastery: C6Mastery,
                    },
                }),
            ],
        },
    ]),
});
