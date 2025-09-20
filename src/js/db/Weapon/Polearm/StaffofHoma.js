import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHP } from "../../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const weaponPost = new PostEffectStatsHP({
    levelSetting: 'weapon_refine',
    percent: new StatTable('atk', [0.008, 0.01, 0.012, 0.014, 0.016]),
    percentBonusLevel: 'weapon_refine',
    percentBonus: new StatTable('atk', [0.01, 0.012, 0.014, 0.016, 0.018]),
    bonusCondition: new ConditionBoolean({name: 'weapon_staff_of_homa'}),
});

export const StaffofHoma = new DbObjectWeapon({
    name: 'staff_of_homa',
    serializeId: 80,
    gameId: 13501,
    iconClass: "weapon-icon-polearm-staff-of-homa",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.StaffofHoma,
    settingsSets: [
        {
            name: 'unbuffed',
            settings: {
                "weapon_staff_of_homa": 0,
            },
        },
        {
            name: 'buffed',
            settings: {
                "weapon_staff_of_homa": 1,
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_staff_of_homa',
            description: 'talent_descr.weapon_staff_of_homa_passive',
            stats: [
                new StatTable('hp_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent', [0.8, 1, 1.2, 1.4, 1.6]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_staff_of_homa',
            serializeId: 1,
            title: 'talent_name.weapon_staff_of_homa',
            description: 'talent_descr.weapon_staff_of_homa',
            stats: [
                new StatTable('text_percent', [1, 1.2, 1.4, 1.6, 1.8]),
            ],
        })
    ],
    postEffects: [
        weaponPost,
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'atk_bonus',
            postEffect: weaponPost,
            digits: 1,
        }),
    ],
});

