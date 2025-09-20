import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { PostEffectStatsHP } from "../../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const KeyofKhajNisut = new DbObjectWeapon({
    name: 'key_of_khaj_nisut',
    serializeId: 135,
    gameId: 11511,
    iconClass: "weapon-icon-sword-key-of-khaj-nisut",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.KeyofKhajNisut,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.sunken_song_of_the_sands',
            description: 'talent_descr.sunken_song_of_the_sands_1',
            stats: [
                new StatTable('hp_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_key_of_khaj_nisut',
            serializeId: 1,
            title: 'talent_name.sunken_song_of_the_sands',
            description: 'talent_descr.sunken_song_of_the_sands_2',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('text_percent', [0.12, 0.15, 0.18, 0.21, 0.24]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.sunken_song_of_the_sands',
            description: 'talent_descr.sunken_song_of_the_sands_3',
            stats: [
                new StatTable('text_percent', [0.2, 0.25, 0.3, 0.35, 0.4]),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    cond: 'ge',
                    value: 3,
                    setting: 'weapon_key_of_khaj_nisut',
                }),
            ],
        }),
    ],
    postEffects: [
        new PostEffectStatsHP({
            stacksSetting: 'weapon_key_of_khaj_nisut',
            percent: new StatTable('mastery', [0.0012, 0.0015, 0.0018, 0.0021, 0.0024]),
            conditions: [
                new ConditionBoolean({name: 'weapon_key_of_khaj_nisut'}),
            ],
        }),
    ],
});
