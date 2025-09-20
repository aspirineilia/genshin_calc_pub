import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsMastery } from "../../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const weaponPost = new PostEffectStatsMastery({
    levelSetting: 'weapon_refine',
    percent: new StatTable('atk', [0.24, 0.30, 0.36, 0.42, 0.48]),
    conditions: [
        new ConditionBoolean({name: 'weapon_desert_pavilion'}),
    ],
});

export const WanderingEvenstar = new DbObjectWeapon({
    name: 'wandering_evenstar',
    serializeId: 137,
    gameId: 14416,
    iconClass: "weapon-icon-catalyst-wandering-evenstar",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.WanderingEvenstar,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_desert_pavilion',
            serializeId: 1,
            title: 'talent_name.wildling_nightstar',
            description: 'talent_descr.desert_pavilion',
            stats: [
                new StatTable('text_percent', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
    postEffects: [
        weaponPost
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'atk_bonus',
            postEffect: weaponPost,
            digits: 1,
        }),
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'atk_bonus_bonus',
            postEffect: new PostEffectStatsMastery({
                levelSetting: 'weapon_refine',
                percent: new StatTable('atk', [0.24 * 0.3, 0.30 * 0.3, 0.36 * 0.3, 0.42 * 0.3, 0.48 * 0.3]),
            }),
            digits: 1,
        }),
    ],
});

