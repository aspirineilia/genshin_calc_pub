import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const ViridescentHunt = new DbObjectWeapon({
    name: 'the_viridescent_hunt',
    serializeId: 40,
    gameId: 15409,
    iconClass: "weapon-icon-bow-the-viridescent-hunt",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.ViridescentHunt,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_viridescent_hunt',
            description: 'talent_descr.weapon_viridescent_hunt',
            stats: [
                new StatTable('text_percent_dmg', [40, 50, 60, 70, 80]),
                new StatTable('text_percent_chance', [50]),
                new StatTable('text_number_cd', [14, 13, 12, 11, 10]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('viridescent_hunt_whirl', [40, 50, 60, 70, 80]),
                }),
            ],
        }),
    ],
});
