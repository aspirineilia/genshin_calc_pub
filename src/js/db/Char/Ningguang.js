import { Condition } from "../../classes/Condition";
import { ConditionAscensionChar } from "../../classes/Condition/Ascension/Char";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
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
import { FeaturePostEffectValue } from "../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHP } from "../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../classes/StatTable";
import { charTables } from "../generated/CharTables";
import { charTalentTables } from "../generated/CharTalentTables";

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Ningguang.s1_id,
        title: 'talent_name.ningguang_sparkling_scatter',
        description: 'talent_descr.ningguang_sparkling_scatter',
        items: [
            {
                table: new StatTable('normal_hit', charTalentTables.Ningguang.s1.p1),
            },
            {
                table: new StatTable('charged_hit', charTalentTables.Ningguang.s1.p2),
            },
            {
                table: new StatTable('ningguang_star_jade', charTalentTables.Ningguang.s1.p3),
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Ningguang.s1.p4),
            },
            {
                table: new StatTable('plunge', charTalentTables.Ningguang.s1.p5),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Ningguang.s1.p6),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Ningguang.s1.p7),

            },
        ],
    },
    skill: {
        gameId: charTalentTables.Ningguang.s2_id,
        title: 'talent_name.ningguang_jade_screen',
        description: 'talent_descr.ningguang_jade_screen',
        items: [
            {
                table: new StatTable('ningguang_jade_screen_hp', charTalentTables.Ningguang.s2.p3),
            },
            {
                table: new StatTable('skill_dmg', charTalentTables.Ningguang.s2.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ningguang.s2.p4),
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Ningguang.s3_id,
        title: 'talent_name.ningguang_starshatter',
        description: 'talent_descr.ningguang_starshatter',
        items: [
            {
                table: new StatTable('ningguang_gem_dmg', charTalentTables.Ningguang.s3.p1),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Ningguang.s3.p2),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Ningguang.s3.p3),
            },
        ],
    },
});

const A4GeoDmgBonus = 12;
const C4SkillRes = 10;

export const Ningguang = new DbObjectChar({
    name: 'ningguang',
    serializeId: 18,
    gameId: 10000027,
    iconClass: "char-icon-ningguang",
    rarity: 4,
    element: 'geo',
    weapon: 'catalyst',
    origin: 'liyue',
    talents: Talents,
    statTable: charTables.Ningguang,
    features: [
        new FeatureDamageNormal({
            name: 'normal_hit',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.normal_hit'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'charged_hit',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit'),
                }),
            ],
        }),
        new FeatureDamageCharged({
            name: 'ningguang_star_jade',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.ningguang_star_jade'),
                }),
            ],
        }),
        new FeatureDamagePlungeCollision({
            name: 'plunge',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_low',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.plunge_low'),
                }),
            ],
        }),
        new FeatureDamagePlungeShockWave({
            name: 'plunge_high',
            element: 'geo',
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
        new FeaturePostEffectValue({
            category: 'skill',
            name: 'ningguang_jade_screen_hp',
            postEffect: new PostEffectStatsHP({
                levelSetting: 'char_skill_elemental',
                percent: Talents.getMulti({
                    name: 'name',
                    from: 'skill.ningguang_jade_screen_hp',
                    multi: 0.01,
                }),
            }),
        }),
        new FeatureDamageBurst({
            name: 'ningguang_gem_dmg',
            element: 'geo',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.ningguang_gem_dmg'),
                }),
            ],
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.ningguang_backup_plan',
            description: 'talent_descr.ningguang_backup_plan',
            info: {ascension: 1},
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionBoolean({
            name: 'ningguang_strategic_reserve',
            serializeId: 1,
            title: 'talent_name.ningguang_strategic_reserve',
            description: 'talent_descr.ningguang_strategic_reserve',
            stats: {
                dmg_geo: A4GeoDmgBonus,
            },
            info: {ascension: 4},
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.ningguang_piercing_fragments',
                    description: 'talent_descr.ningguang_piercing_fragments',
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.ningguang_shock_effect',
                    description: 'talent_descr.ningguang_shock_effect',
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
                    name: 'ningguang_exquisite_be_the_jade_outshining_all_beneath',
                    serializeId: 2,
                    title: 'talent_name.ningguang_exquisite_be_the_jade_outshining_all_beneath',
                    description: 'talent_descr.ningguang_exquisite_be_the_jade_outshining_all_beneath',
                    stats: {
                        res_anemo: C4SkillRes,
                        res_pyro: C4SkillRes,
                        res_hydro: C4SkillRes,
                        res_cryo: C4SkillRes,
                        res_electro: C4SkillRes,
                        res_dendro: C4SkillRes,
                        res_geo: C4SkillRes,
                    },
                }),
            ]
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
                    title: 'talent_name.ningguang_grandeur_be_the_seven_stars',
                    description: 'talent_descr.ningguang_grandeur_be_the_seven_stars',
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.ningguang_strategic_reserve',
                serializeId: 1,
                rotation: 'party',
                title: 'talent_name.ningguang_strategic_reserve',
                description: 'talent_descr.ningguang_strategic_reserve',
                info: {ascension: 4},
                stats: {
                    dmg_geo: A4GeoDmgBonus,
                },
            }),
            new ConditionBoolean({
                name: 'party.ningguang_exquisite_be_the_jade_outshining_all_beneath',
                serializeId: 2,
                title: 'talent_name.ningguang_exquisite_be_the_jade_outshining_all_beneath',
                description: 'talent_descr.ningguang_exquisite_be_the_jade_outshining_all_beneath',
                info: {constellation: 4},
                stats: {
                    res_anemo: C4SkillRes,
                    res_pyro: C4SkillRes,
                    res_hydro: C4SkillRes,
                    res_cryo: C4SkillRes,
                    res_electro: C4SkillRes,
                    res_dendro: C4SkillRes,
                    res_geo: C4SkillRes,
                },
            }),
        ],
    },
});
