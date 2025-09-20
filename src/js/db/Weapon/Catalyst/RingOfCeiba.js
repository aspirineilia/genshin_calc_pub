import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHP } from "../../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

let weaponBuff = new PostEffectStatsHP({
    levelSetting: 'weapon_refine',
    percent: new StatTable('dmg_normal', [0.0006, 0.0007, 0.0008, 0.0009, 0.001]),
    statCap: new StatTable('', [16, 20, 24, 28, 32]),
    conditions: [
        new ConditionBoolean({name: 'weapon_ring_of_ceiba'}),
    ],
});

export const RingOfCeiba = new DbObjectWeapon({
    name: 'ring_of_ceiba',
    serializeId: 180,
    gameId: 14431,
    iconClass: "weapon-icon-catalyst-ring-of-yaxche",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.RingOfCeiba,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_ring_of_ceiba',
            serializeId: 1,
            title: 'talent_name.weapon_ring_of_ceiba',
            description: 'talent_descr.weapon_ring_of_ceiba',
            stats: [
                new StatTable('text_percent', [0.6, 0.7, 0.8, 0.9, 1]),
                new StatTable('text_percent_max', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
    postEffects: [weaponBuff],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'normal_dmg_bonus',
            postEffect: weaponBuff,
            format: 'percent',
        }),
    ],
});
