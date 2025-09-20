import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsExceedRecharge } from "../../../classes/PostEffect/Stats/ExceedRecharge";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const weaponPost = new PostEffectStatsExceedRecharge({
    levelSetting: 'weapon_refine',
    percent: new StatTable('atk_percent', [28, 35, 42, 49, 56]),
    statCap: new StatTable('', [80, 90, 100, 110, 120]),
});

export const GrasscuttersLight = new DbObjectWeapon({
    name: 'engulfing_lightning',
    serializeId: 107,
    gameId: 13509,
    iconClass: "weapon-icon-polearm-engulfing-lightning",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.GrasscuttersLight,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_grasscutters_light',
            description: 'talent_descr.weapon_grasscutters_light_1',
            stats: [
                new StatTable('text_percent', [28, 35, 42, 49, 56]),
                new StatTable('text_percent_max', [80, 90, 100, 110, 120]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_grasscutters_light',
            serializeId: 1,
            title: 'talent_name.weapon_grasscutters_light',
            description: 'talent_descr.weapon_grasscutters_light_2',
            stats: [
                new StatTable('recharge', [30, 35, 40, 45, 50]),
            ],
        }),
    ],
    postEffects: [
        weaponPost,
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'atk_bonus',
            postEffect: weaponPost,
            format: 'percent',
        }),
    ],
});
