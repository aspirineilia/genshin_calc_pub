import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkywardPride = new DbObjectWeapon({
    name: 'skyward_pride',
    serializeId: 62,
    gameId: 12501,
    iconClass: "weapon-icon-claymore-skyward-pride",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.SkywardPride,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_skyward_pride',
            description: 'talent_descr.weapon_skyward_pride',
            stats: [
                new StatTable('dmg_all', [8, 10, 12, 14, 16]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('skyward_pride_vacuum_blade', [80, 100, 120, 140, 160]),
                }),
            ],
        }),
    ],
});

