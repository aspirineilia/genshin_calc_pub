import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsDef } from "../../../classes/PostEffect/Stats/Def";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const elemBonus = [10, 12.5, 15, 17.5, 20];
const elemBonus2 = [0.008, 0.01, 0.012, 0.014, 0.016];
const elemBonusCap = [25.6, 32, 38.4, 44.8, 51.2];

const weaponPost = new PostEffectStatsDef({
    levelSetting: 'weapon_refine',
    percent: [
        new StatTable('dmg_anemo', elemBonus2),
        new StatTable('dmg_electro', elemBonus2),
        new StatTable('dmg_pyro', elemBonus2),
        new StatTable('dmg_cryo', elemBonus2),
        new StatTable('dmg_hydro', elemBonus2),
        new StatTable('dmg_geo', elemBonus2),
        new StatTable('dmg_dendro', elemBonus2),
    ],
    statCap: new StatTable('', elemBonusCap),
    conditions: [
        new ConditionBoolean({name: 'weapon_peak_patrol_song_2'}),
    ],
});

export const PeakPatrolSong = new DbObjectWeapon({
    name: 'peak_patrol_song',
    serializeId: 185,
    gameId: 11516,
    iconClass: "weapon-icon-sword-peak-patrol-song",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.PeakPatrolSong,
    conditions: [
        new ConditionStacks({
            name: 'weapon_peak_patrol_song',
            serializeId: 1,
            title: 'talent_name.weapon_peak_patrol_song',
            description: 'talent_descr.weapon_peak_patrol_song_1',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('def_percent', [8, 10, 12, 14, 16]),
                new StatTable('dmg_anemo', elemBonus),
                new StatTable('dmg_electro', elemBonus),
                new StatTable('dmg_pyro', elemBonus),
                new StatTable('dmg_cryo', elemBonus),
                new StatTable('dmg_hydro', elemBonus),
                new StatTable('dmg_geo', elemBonus),
                new StatTable('dmg_dendro', elemBonus),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_peak_patrol_song_2',
            serializeId: 2,
            title: 'talent_name.weapon_peak_patrol_song',
            description: 'talent_descr.weapon_peak_patrol_song_2',
            stats: [
                new StatTable('text_percent', [8, 10, 12, 14, 16]),
                new StatTable('text_percent_max', elemBonusCap),
            ],
        }),
    ],
    postEffects: [
        weaponPost,
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'elem_dmg_bonus',
            postEffect: weaponPost,
            format: 'percent',
        }),
    ],
});
