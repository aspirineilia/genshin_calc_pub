import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkywardSpine = new DbObjectWeapon({
    name: 'skyward_spine',
    serializeId: 95,
    gameId: 13502,
    iconClass: "weapon-icon-polearm-skyward-spine",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.SkywardSpine,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_skyward_spine',
            description: 'talent_descr.weapon_skyward_spine',
            stats: [
                new StatTable('crit_rate', [8, 10, 12, 14, 16]),
                new StatTable('atk_speed_normal', [12]),
            ],
        }),

        new ConditionStaticRefine({
            title: 'talent_name.weapon_skyward_spine',
            description: 'talent_descr.weapon_skyward_spine_2',
            stats: [
                new StatTable('text_percent', [40, 55, 70, 85, 100]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('skyward_pride_vacuum_blade', [40, 55, 70, 85, 100]),
                }),
            ],
        }),
    ],
});
