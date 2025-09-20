import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsMastery } from "../../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const weaponPost = new PostEffectStatsMastery({
    levelSetting: 'weapon_refine',
    percent: new StatTable('recharge', [0.036, 0.045, 0.054, 0.063, 0.072]),
    conditions: [
        new ConditionBoolean({name: 'whisper_of_the_jinn'}),
    ],
});

export const XiphosMoonlight = new DbObjectWeapon({
    name: 'xiphos_moonlight',
    serializeId: 134,
    gameId: 11418,
    iconClass: "weapon-icon-sword-xiphos-moonlight",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.XiphosMoonlight,
    conditions: [
        new ConditionBooleanRefine({
            name: 'whisper_of_the_jinn',
            serializeId: 1,
            title: 'talent_name.whisper_of_the_jinn',
            description: 'talent_descr.whisper_of_the_jinn',
            stats: [
                new StatTable('text_percent', [0.036, 0.045, 0.054, 0.063, 0.072]),
            ],
        }),
    ],
    postEffects: [
        weaponPost,
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'recharge_bonus',
            postEffect: weaponPost,
            format: 'percent',
        }),
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'recharge_party_bonus',
            postEffect: new PostEffectStatsMastery({
                levelSetting: 'weapon_refine',
                percent: new StatTable('recharge', [3.6 * 0.003, 4.5 * 0.003, 5.4 * 0.003, 6.3 * 0.003, 7.2 * 0.003]),
            }),
            format: 'percent',
        }),
    ],
});
