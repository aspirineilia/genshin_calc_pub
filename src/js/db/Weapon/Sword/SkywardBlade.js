import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkywardBlade = new DbObjectWeapon({
    name: 'skyward_blade',
    serializeId: 19,
    gameId: 11502,
    iconClass: "weapon-icon-sword-skyward-blade",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.SkywardBlade,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_skyward_blade',
            description: 'talent_descr.bonus_crit_rate',
            stats: [
                new StatTable('crit_rate', [4, 5, 6, 7, 8]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_skyward_blade',
            serializeId: 1,
            title: 'talent_name.weapon_skyward_blade',
            description: 'talent_descr.weapon_skyward_blade',
            stats: [
                new StatTable('atk_speed_normal', [10]),
                new StatTable('move_speed', [10]),
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('skyward_blade_dmg', [20, 25, 30, 35, 40]),
                }),
            ],
            // condition: new ConditionBooleanRefine({name: 'weapon_skyward_blade'}),
        }),
    ],
});
