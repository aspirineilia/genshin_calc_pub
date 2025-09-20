import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsMastery } from "../../../classes/PostEffect/Stats/Mastery";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const weaponPost = new PostEffectStatsMastery({
    levelSetting: 'weapon_refine',
    percent: new StatTable('atk', [0.52, 0.65, 0.78, 0.91, 1.04]),
    percentBonusLevel: 'weapon_refine',
    percentBonus: new StatTable('atk', [0.28, 0.35, 0.42, 0.49, 0.56]),
    bonusStackSettings: 'weapon_staff_of_the_scarlet_sands',
    bonusCondition: new ConditionBoolean({name: 'weapon_staff_of_the_scarlet_sands'})
});

export const StaffOfScarletSands = new DbObjectWeapon({
    name: 'staff_of_the_scarlet_sands',
    serializeId: 132,
    gameId: 13511,
    iconClass: "weapon-icon-polearm-staff-of-the-scarlet-sands",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.StaffOfScarletSands,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.heat_haze_at_horizons_end',
            description: 'talent_descr.heat_haze_at_horizons_end_1',
            stats: [
                new StatTable('text_percent', [52, 65, 78, 91, 104]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_staff_of_the_scarlet_sands',
            serializeId: 1,
            title: 'talent_name.heat_haze_at_horizons_end',
            description: 'talent_descr.heat_haze_at_horizons_end_2',
            levelSetting: 'weapon_refine',
            maxStacks: 3,
            stats: [
                new StatTable('text_percent', [28, 35, 42, 49, 56]),
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
            digits: 1,
        }),
    ],
});

