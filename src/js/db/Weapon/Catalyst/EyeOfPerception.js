import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const EyeOfPerception = new DbObjectWeapon({
    name: 'eye_of_perception',
    serializeId: 49,
    gameId: 14409,
    iconClass: "weapon-icon-catalyst-eye-of-perception",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.EyeofPerception,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_eye_of_perception',
            description: 'talent_descr.weapon_eye_of_perception',
            stats: [
                new StatTable('text_percent_dmg', [240, 270, 300, 330, 360]),
                new StatTable('text_percent_chance', [50]),
                new StatTable('text_cd', [12, 11, 10, 9, 8]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('eye_of_perception_bolt', [240, 270, 300, 330, 360]),
                }),
            ],
        }),
    ],
});
