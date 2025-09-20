import { Condition } from '../../classes/Condition'
import { ConditionAscensionChar } from '../../classes/Condition/Ascension/Char';
import { ConditionBoolean } from '../../classes/Condition/Boolean'
import { ConditionConstellation } from '../../classes/Condition/Constellation';
import { ConditionStatic } from '../../classes/Condition/Static';
import { DbObjectChar } from "../../classes/DbObject/Char";
import { DbObjectConstellation } from "../../classes/DbObject/Constellation"
import { DbObjectTalents } from '../../classes/DbObject/Talents';
import { FeatureDamageBurst } from '../../classes/Feature2/Damage/Burst';
import { FeatureDamageCharged } from '../../classes/Feature2/Damage/Charged';
import { FeatureDamageMultihit } from '../../classes/Feature2/Damage/Multihit';
import { FeatureDamageNormal } from '../../classes/Feature2/Damage/Normal';
import { FeatureDamagePlungeCollision } from '../../classes/Feature2/Damage/Plunge/Collision';
import { FeatureDamagePlungeShockWave } from '../../classes/Feature2/Damage/Plunge/ShockWave';
import { FeatureDamageSkill } from '../../classes/Feature2/Damage/Skill';
import { FeatureMultiplier } from '../../classes/Feature2/Multiplier';
import { FeatureMultiplierList } from '../../classes/Feature2/Multiplier/List';
import { FeatureMultiplierKiraraBurst } from '../../classes/Feature2/Multiplier/KiraraBurst';
import { FeatureShield } from '../../classes/Feature2/Shield';
import { PostEffectStatsHP } from '../../classes/PostEffect/Stats/HP';
import { StatTable } from "../../classes/StatTable"
import { ValueTable } from '../../classes/ValueTable';
import { charTables } from "../generated/CharTables";
import { charTalentTables } from '../generated/CharTalentTables';

const Talents = new DbObjectTalents({
    attack: {
        gameId: charTalentTables.Kirara.s1_id,
        title: 'talent_name.kirara_boxcutter',
        description: 'talent_descr.kirara_boxcutter',
        items: [
            {
                table: new StatTable('normal_hit_1', charTalentTables.Kirara.s1.p1),
            },
            {
                table: new StatTable('normal_hit_2', charTalentTables.Kirara.s1.p2),
            },
            {
                type: 'hits',
                name: 'normal_hit_3',
                table: [
                    new StatTable('normal_hit_3_1', charTalentTables.Kirara.s1.p3),
                    new StatTable('normal_hit_3_2', charTalentTables.Kirara.s1.p4),
                ],
            },
            {
                table: new StatTable('normal_hit_4', charTalentTables.Kirara.s1.p5),
            },
            {
                type: 'hits',
                name: 'charged_hit_total',
                table: [
                    new StatTable('charged_hit_1', charTalentTables.Kirara.s1.p6),
                    new StatTable('charged_hit_2', charTalentTables.Kirara.s1.p7),
                    new StatTable('charged_hit_3', charTalentTables.Kirara.s1.p8),
                ],
            },
            {
                unit: 'unit',
                table: new StatTable('stamina_cost', charTalentTables.Kirara.s1.p9),
            },
            {
                table: new StatTable('plunge', charTalentTables.Kirara.s1.p10),
            },
            {
                table: new StatTable('plunge_low', charTalentTables.Kirara.s1.p11),
            },
            {
                table: new StatTable('plunge_high', charTalentTables.Kirara.s1.p12),
            },
        ],
    },
    skill: {
        gameId: charTalentTables.Kirara.s2_id,
        title: 'talent_name.kirara_meow_teor_kick',
        description: 'talent_descr.kirara_meow_teor_kick',
        items: [
            {
                table: new StatTable('kirara_flying_kick_dmg', charTalentTables.Kirara.s2.p1),
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('shield_absorption', charTalentTables.Kirara.s2.p2),
                    new StatTable('', charTalentTables.Kirara.s2.p3),
                ],
            },
            {
                type: 'shield',
                unit: 'hp',
                table: [
                    new StatTable('shield_max_absorption', charTalentTables.Kirara.s2.p4),
                    new StatTable('', charTalentTables.Kirara.s2.p5),
                ],
            },
            {
                unit: 'sec',
                table: new StatTable('shield_duration', charTalentTables.Kirara.s2.p6),
            },
            {
                table: new StatTable('kirara_urgent_neko_parcel_dmg', charTalentTables.Kirara.s2.p7),
            },
            {
                unit: 'sec',
                table: new StatTable('kirara_urgent_neko_parcel_duration', charTalentTables.Kirara.s2.p8),
            },
            {
                table: new StatTable('kirara_flipclaw_strike_dmg', charTalentTables.Kirara.s2.p9),
            },
            {
                unit: 'sec',
                type: 'separated',
                separator: ' - ',
                unitLast: true,
                table: [
                    new StatTable('cd', charTalentTables.Kirara.s2.p10),
                    new StatTable('cd', charTalentTables.Kirara.s2.p11),
                ],
            },
        ],
    },
    burst: {
        gameId: charTalentTables.Kirara.s3_id,
        title: 'talent_name.kirara_surprise_dispatch',
        description: 'talent_descr.kirara_surprise_dispatch',
        items: [
            {
                table: new StatTable('burst_dmg', charTalentTables.Kirara.s3.p1),
            },
            {
                table: new StatTable('kirara_cat_grass_explosion_dmg', charTalentTables.Kirara.s3.p2),
            },
            {
                unit: 'sec',
                table: new StatTable('kirara_cat_grass_duration', charTalentTables.Kirara.s3.p3),
            },
            {
                unit: 'sec',
                table: new StatTable('cd', charTalentTables.Kirara.s3.p4),
            },
            {
                unit: '',
                table: new StatTable('energy_cost', charTalentTables.Kirara.s3.p5),
            },
        ],
    },
});

const TalentValues = {
    A1ShieldBonus: 20,
    A4SkillBonus: 0.4,
    A4BurstBonus: 0.3,
    C1SeedHp: 8000,
    C2PartyShield: 40,
    C4Damage: 200,
    C6ElementalBonus: 12,
};

export const Kirara = new DbObjectChar({
    name: 'kirara',
    serializeId: 71,
    gameId: 10000061,
    iconClass: "char-icon-kirara",
    rarity: 4,
    element: 'dendro',
    weapon: 'sword',
    origin: 'inazuma',
    talents: Talents,
    statTable: charTables.Kirara,
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
                {
                    multipliers: [
                        new FeatureMultiplier({
                            leveling: 'char_skill_attack',
                            values: Talents.get('attack.charged_hit_3'),
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
        new FeatureDamageCharged({
            name: 'charged_hit_3',
            isChild: true,
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_attack',
                    values: Talents.get('attack.charged_hit_3'),
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
            name: 'kirara_flying_kick_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_skill_kirara'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kirara_flying_kick_dmg'),
                }),
            ],
        }),
        new FeatureShield({
            name: 'shield',
            category: 'skill',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.shield_absorption'),
                }),
            ],
        }),
        new FeatureShield({
            name: 'shield_max_absorption',
            category: 'skill',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getList('skill.shield_max_absorption'),
                }),
            ],
        }),
        new FeatureShield({
            name: 'kirara_party_shield',
            category: 'skill',
            element: 'dendro',
            multipliers: [
                new FeatureMultiplierList({
                    scaling: 'hp*',
                    leveling: 'char_skill_elemental',
                    values: Talents.getMulti({
                        from: 'skill.shield_absorption',
                        multi: TalentValues.C2PartyShield / 100,
                    }),
                }),
            ],
            condition: new ConditionConstellation({constellation: 2}),
        }),
        new FeatureDamageSkill({
            name: 'kirara_urgent_neko_parcel_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_skill_kirara'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kirara_urgent_neko_parcel_dmg'),
                }),
            ],
        }),
        new FeatureDamageSkill({
            name: 'kirara_flipclaw_strike_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_skill_kirara'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_elemental',
                    values: Talents.get('skill.kirara_flipclaw_strike_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'burst_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_burst_kirara'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.burst_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'kirara_cat_grass_explosion_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_burst_kirara'],
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.kirara_cat_grass_explosion_dmg'),
                }),
            ],
        }),
        new FeatureDamageBurst({
            name: 'kirara_cat_grass_explosion_extra_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_burst_kirara'],
            cannotReact: true,
            multipliers: [
                new FeatureMultiplierKiraraBurst({
                    leveling: 'char_skill_burst',
                    values: Talents.get('burst.kirara_cat_grass_explosion_dmg'),
                }),
            ],
            condition: new ConditionConstellation({constellation: 1}),
        }),
        new FeatureDamageBurst({
            name: 'kirara_coordinated_dmg',
            element: 'dendro',
            damageBonuses: ['dmg_burst_kirara'],
            multipliers: [
                new FeatureMultiplier({
                    source: 'constellation4',
                    values: new ValueTable([TalentValues.C4Damage]),
                }),
            ],
            condition: new ConditionConstellation({constellation: 4}),
        }),
    ],
    conditions: [
        new ConditionStatic({
            title: 'talent_name.kirara_bewitching_betwitching_tails',
            description: 'talent_descr.kirara_bewitching_betwitching_tails',
            info: {ascension: 1},
            stats: {
                text_percent: TalentValues.A1ShieldBonus,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 1}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.kirara_pupillary_variance',
            description: 'talent_descr.kirara_pupillary_variance',
            info: {ascension: 4},
            stats: {
                text_percent_skill: TalentValues.A4SkillBonus,
                text_percent_burst: TalentValues.A4BurstBonus,
            },
            subConditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    postEffects: [
        new PostEffectStatsHP({
            percent: new StatTable('dmg_skill_kirara', [TalentValues.A4SkillBonus / 1000]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
        new PostEffectStatsHP({
            percent: new StatTable('dmg_burst_kirara', [TalentValues.A4BurstBonus / 1000]),
            conditions: [
                new ConditionAscensionChar({ascension: 4}),
            ],
        }),
    ],
    constellation: new DbObjectConstellation([
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kirara_material_circulation',
                    description: 'talent_descr.kirara_material_circulation',
                    stats: {
                        text_value_hp: TalentValues.C1SeedHp,
                    },
                }),
            ],
        },
        {
            conditions: [
                new ConditionStatic({
                    title: 'talent_name.kirara_perfectly_packaged',
                    description: 'talent_descr.kirara_perfectly_packaged',
                    stats: {
                        text_percent_shield: TalentValues.C2PartyShield,
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
                    title: 'talent_name.kirara_steed_of_skanda',
                    description: 'talent_descr.kirara_steed_of_skanda',
                    stats: {
                        text_percent_atk: TalentValues.C4Damage,
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
                new ConditionBoolean({
                    name: 'kirara_countless_sights_to_see',
                    serializeId: 1,
                    title: 'talent_name.kirara_countless_sights_to_see',
                    description: 'talent_descr.kirara_countless_sights_to_see',
                    stats: {
                        dmg_anemo: TalentValues.C6ElementalBonus,
                        dmg_geo: TalentValues.C6ElementalBonus,
                        dmg_pyro: TalentValues.C6ElementalBonus,
                        dmg_electro: TalentValues.C6ElementalBonus,
                        dmg_hydro: TalentValues.C6ElementalBonus,
                        dmg_cryo: TalentValues.C6ElementalBonus,
                        dmg_dendro: TalentValues.C6ElementalBonus,
                    },
                }),
            ],
        },
    ]),
    partyData: {
        conditions: [
            new ConditionBoolean({
                name: 'party.kirara_countless_sights_to_see',
                serializeId: 1,
                title: 'talent_name.kirara_countless_sights_to_see',
                description: 'talent_descr.kirara_countless_sights_to_see',
                rotation: 'party',
                info: {constellation: 6},
                stats: {
                    dmg_anemo: TalentValues.C6ElementalBonus,
                    dmg_geo: TalentValues.C6ElementalBonus,
                    dmg_pyro: TalentValues.C6ElementalBonus,
                    dmg_electro: TalentValues.C6ElementalBonus,
                    dmg_hydro: TalentValues.C6ElementalBonus,
                    dmg_cryo: TalentValues.C6ElementalBonus,
                    dmg_dendro: TalentValues.C6ElementalBonus,
                },
            }),
        ],
    },
});
