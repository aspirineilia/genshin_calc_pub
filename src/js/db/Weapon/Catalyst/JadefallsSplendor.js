import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHPJadefall } from "../../../classes/PostEffect/Stats/HP/Jadefall";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const weaponPost = new PostEffectStatsHPJadefall({
    levelSetting: 'weapon_refine',
    percent: new StatTable('dmg_value', [0.0003, 0.0005, 0.0007, 0.0009, 0.0011]),
    statCap: new StatTable('', [12, 20, 28, 36, 44]),
    conditions: [
        new ConditionBoolean({name: 'weapon_jadefalls_splendor'}),
    ],
});

export const JadefallsSplendor = new DbObjectWeapon({
    name: 'jadefalls_splendor',
    serializeId: 144,
    gameId: 14505,
    iconClass: "weapon-icon-catalyst-jadefalls-splendor",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.JadefallsSplendor,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_jadefalls_splendor',
            serializeId: 1,
            title: 'talent_name.weapon_jadefalls_splendor',
            description: 'talent_descr.weapon_jadefalls_splendor',
            stats: [
                new StatTable('text_percent', [0.3, 0.5, 0.7, 0.9, 1.1]),
                new StatTable('text_percent_max', [12, 20, 28, 36, 44]),
            ],
        }),
    ],
    postEffects: [
        weaponPost,
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'dmg_bonus',
            postEffect: weaponPost,
            format: 'percent',
        }),
    ],
});
