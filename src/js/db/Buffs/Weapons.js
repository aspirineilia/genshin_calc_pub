import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionLevelSelect } from "../../classes/Condition/LevelSelect";
import { ConditionNot } from "../../classes/Condition/Not";
import { ConditionPartyWeapon } from "../../classes/Condition/PartyWeapon";
import { DbObjectBuff } from "../../classes/DbObject/Buff";
import { PostEffectStats } from "../../classes/PostEffect/Stats";
import { PostEffectStatsDef } from "../../classes/PostEffect/Stats/Def";
import { StatTable } from "../../classes/StatTable";
import { CHARACTER_MAX_POSSIBLE_HP } from "../Constants";

export const Weapons = new DbObjectBuff({
    name: 'weapons',
    conditions: [
        new ConditionLevelSelect({
            name: 'weapon.thrilling_tales',
            serializeId: 13,
            rotation: 'buffs',
            title: 'weapon_name.thrilling_tales_of_dragon_slayers',
            description: 'talent_descr.weapon_thrilling_tales',
            maxStacks: 5,
            icon: {
                rarity: 3,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-thrilling-tales-of-dragon-slayers',
            },
            stats: [
                new StatTable('atk_percent', [24, 30, 36, 42, 48]),
                new StatTable('text_percent', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_wolfs_gravestone',
            serializeId: 14,
            rotation: 'buffs',
            title: 'weapon_name.wolfs_gravestone',
            description: 'talent_descr.weapon_wolfish_tracker',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-claymore weapon-icon-claymore-wolfs-gravestone',
            },
            stats: [
                new StatTable('atk_percent', [40, 50, 60, 70, 80]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_wolfs_gravestone',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_elegy_for_the_end',
            serializeId: 15,
            rotation: 'buffs',
            title: 'weapon_name.elegy_for_the_end',
            description: 'talent_descr.weapon_elegy_for_the_end',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-bow weapon-icon-bow-elegy-for-the-end',
            },
            stats: [
                new StatTable('text_value', [100, 125, 150, 175, 200]),
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_song_of_broken_pines',
            serializeId: 16,
            rotation: 'buffs',
            title: 'weapon_name.song_of_broken_pines',
            description: 'talent_descr.weapon_song_of_broken_pines',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-claymore weapon-icon-claymore-song-of-broken-pines',
            },
            stats: [
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent_2', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_freedom_sworn',
            serializeId: 18,
            rotation: 'buffs',
            title: 'weapon_name.freedom_sworn',
            description: 'talent_descr.weapon_freedom_sworn',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-sword weapon-icon-sword-freedom-sworn',
            },
            stats: [
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent_2', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.weapon_white_dragon_ring',
            serializeId: 19,
            rotation: 'buffs',
            title: 'weapon_name.hakushin_ring',
            description: 'talent_descr.weapon_white_dragon_ring',
            maxStacks: 5,
            icon: {
                rarity: 4,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-hakushin-ring',
            },
            stats: [
                new StatTable('dmg_own', [10, 12.5, 15, 17.5, 20]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_white_dragon_ring',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.forest_sanctuary',
            serializeId: 27,
            rotation: 'buffs',
            title: 'talent_name.forest_sanctuary',
            description: 'talent_descr.forest_sanctuary',
            maxStacks: 5,
            icon: {
                rarity: 4,
                name: 'sprite-weapon-sword weapon-icon-sword-sapwood-blade',
            },
            stats: [
                new StatTable('mastery', [60, 75, 90, 105, 120]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_forest_sanctuary',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon_other.stillwood_moonshadow',
            serializeId: 28,
            rotation: 'buffs',
            title: 'talent_name.stillwood_moonshadow',
            description: 'talent_descr.stillwood_moonshadow',
            maxStacks: 5,
            icon: {
                rarity: 4,
                name: 'sprite-weapon-polearm weapon-icon-polearm-moonpiercer',
            },
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_stillwood_moonshadow',
                    invert: true,
                }),
            ],
        }),
        new ConditionLevelSelect({
            name: 'weapon.cranes_echoing_call',
            serializeId: 52,
            rotation: 'buffs',
            title: 'weapon_name.cranes_echoing_call',
            description: 'talent_descr.weapon_cranes_echoing_call_1',
            maxStacks: 5,
            icon: {
                rarity: 5,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-cranes-echoing-call',
            },
            stats: [
                new StatTable('dmg_plunge', [28, 41, 54, 67, 80]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionBoolean({name: 'weapon_cranes_echoing_call'}),
                ]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.desert_pavilion',
            serializeIds: [34, 44, 46],
            statName: 'desert_pavilion_mastery',
            statSerializeIds: [33, 43, 45],
            partyStat: 'mastery',
            statMax: 10000,
            title: 'talent_name.desert_pavilion',
            statTitle: 'talent_name.desert_pavilion_mastery',
            description: 'talent_descr.desert_pavilion',
            icon: {
                rarity: 4,
                name: 'sprite-weapon-claymore weapon-icon-claymore-makhaira-aquamarine',
            },
            stats: [
                new StatTable('text_percent', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_key_of_khaj_nisut',
            serializeIds: [32, 40, 42],
            statName: 'sunken_song_of_the_sands_hp',
            statSerializeIds: [31, 39, 41],
            maxDisplay: 1,
            statClass: 'inputs-6digit',
            partyStat: 'hp',
            statMax: CHARACTER_MAX_POSSIBLE_HP,
            title: 'talent_name.sunken_song_of_the_sands',
            statTitle: 'talent_name.sunken_song_of_the_sands',
            description: 'talent_descr.sunken_song_of_the_sands_3',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-sword weapon-icon-sword-key-of-khaj-nisut',
            },
            stats: [
                new StatTable('text_percent', [0.2, 0.25, 0.3, 0.35, 0.4]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.whisper_of_the_jinn',
            serializeIds: [30, 36, 38],
            statName: 'whisper_of_the_jinn_mastery',
            statSerializeIds: [29, 35, 37],
            partyStat: 'mastery',
            statMax: 10000,
            title: 'talent_name.whisper_of_the_jinn',
            statTitle: 'talent_name.whisper_of_the_jinn_mastery',
            description: 'talent_descr.whisper_of_the_jinn',
            icon: {
                rarity: 4,
                name: 'sprite-weapon-sword weapon-icon-sword-xiphos-moonlight',
            },
            stats: [
                new StatTable('text_percent', [0.036, 0.045, 0.054, 0.063, 0.072]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_thousand_floating_dreams',
            serializeIds: [47, 48, 49],
            title: 'talent_name.weapon_thousand_floating_dreams',
            description: 'talent_descr.weapon_thousand_floating_dreams_party',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-a-thousand-floating-dreams',
            },
            stats: [
                new StatTable('mastery', [40, 42, 44, 46, 48]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_peak_patrol_song',
            serializeIds: [55],
            statName: 'peak_patrol_song_def',
            statSerializeIds: [56],
            statClass: 'inputs-6digit',
            partyStat: 'def',
            statMax: 20000,
            title: 'talent_name.weapon_peak_patrol_song',
            statTitle: 'talent_name.peak_patrol_song_def',
            description: 'talent_descr.weapon_peak_patrol_song_2',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-sword weapon-icon-sword-peak-patrol-song',
            },
            stats: [
                new StatTable('text_percent', [8, 10, 12, 14, 16]),
                new StatTable('text_percent_max', [25.6, 32, 38.4, 44.8, 51.2]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_starcallers_watch',
            serializeIds: [57],
            title: 'talent_name.weapon_starcallers_watch',
            description: 'talent_descr.weapon_starcallers_watch_2',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-catalyst weapon-icon-catalyst-starcallers-watch',
            },
            stats: [
                new StatTable('dmg_all', [28, 35, 42, 49, 56]),
            ],
            subConditions: [
                new ConditionNot([
                    new ConditionBoolean({name: 'weapon_starcallers_watch'}),
                ]),
            ],
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_symphonist_of_scents',
            serializeIds: [58],
            title: 'talent_name.weapon_symphonist_of_scents',
            description: 'talent_descr.weapon_symphonist_of_scents_3',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-polearm weapon-icon-polearm-symphonist-of-scents',
            },
            stats: [
                new StatTable('atk_percent', [32, 40, 48, 56, 64]),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'symphonist_of_scents_3'}),
            ]),
        }),
        new ConditionPartyWeapon({
            name: 'weapon_other.weapon_fractured_halo',
            serializeIds: [59],
            beta: true,
            title: 'talent_name.weapon_fractured_halo',
            description: 'talent_descr.weapon_fractured_halo_2',
            icon: {
                rarity: 5,
                name: 'sprite-weapon-polearm weapon-icon-polearm-fractured-halo',
            },
            stats: [
                new StatTable('dmg_reaction_lunarcharged', [40, 50, 60, 70, 80]),
            ],
            condition: new ConditionNot([
                new ConditionBoolean({name: 'weapon_fractured_halo_2'}),
            ]),
        }),
    ],
    postEffects: [
        new PostEffectStats({
            from: 'whisper_of_the_jinn_mastery',
            levelSetting: 'weapon_other.whisper_of_the_jinn',
            percent: new StatTable('recharge', [3.6 * 0.003, 4.5 * 0.003, 5.4 * 0.003, 6.3 * 0.003, 7.2 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.whisper_of_the_jinn'}),
            ],
        }),
        new PostEffectStats({
            from: 'whisper_of_the_jinn_mastery_2',
            levelSetting: 'weapon_other.whisper_of_the_jinn_2',
            percent: new StatTable('recharge', [3.6 * 0.003, 4.5 * 0.003, 5.4 * 0.003, 6.3 * 0.003, 7.2 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.whisper_of_the_jinn_2'}),
            ],
        }),
        new PostEffectStats({
            from: 'whisper_of_the_jinn_mastery_3',
            levelSetting: 'weapon_other.whisper_of_the_jinn_3',
            percent: new StatTable('recharge', [3.6 * 0.003, 4.5 * 0.003, 5.4 * 0.003, 6.3 * 0.003, 7.2 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.whisper_of_the_jinn_3'}),
            ],
        }),
        new PostEffectStats({
            from: 'desert_pavilion_mastery',
            levelSetting: 'weapon_other.desert_pavilion',
            percent: new StatTable('atk', [24 * 0.003, 30 * 0.003, 36 * 0.003, 42 * 0.003, 48 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.desert_pavilion'}),
            ],
        }),
        new PostEffectStats({
            from: 'desert_pavilion_mastery_2',
            levelSetting: 'weapon_other.desert_pavilion_2',
            percent: new StatTable('atk', [24 * 0.003, 30 * 0.003, 36 * 0.003, 42 * 0.003, 48 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.desert_pavilion_2'}),
            ],
        }),
        new PostEffectStats({
            from: 'desert_pavilion_mastery_3',
            levelSetting: 'weapon_other.desert_pavilion_3',
            percent: new StatTable('atk', [24 * 0.003, 30 * 0.003, 36 * 0.003, 42 * 0.003, 48 * 0.003]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.desert_pavilion_3'}),
            ],
        }),
        new PostEffectStats({
            from: 'peak_patrol_song_def',
            levelSetting: 'weapon_other.weapon_peak_patrol_song',
            percent: [
                new StatTable('dmg_anemo', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_electro', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_pyro', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_cryo', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_hydro', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_geo', [0.008, 0.01, 0.012, 0.014, 0.016]),
                new StatTable('dmg_dendro', [0.008, 0.01, 0.012, 0.014, 0.016]),
            ],
            statCap: new StatTable('', [25.6, 32, 38.4, 44.8, 51.2]),
            conditions: [
                new ConditionBoolean({name: 'weapon_other.weapon_peak_patrol_song'}),
                new ConditionNot([
                    new ConditionBoolean({name: 'weapon_peak_patrol_song_2'}),
                ]),
            ],
        }),
    ]
});
