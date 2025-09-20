import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const KingsSquire = new DbObjectWeapon({
    name: 'kings_squire',
    serializeId: 129,
    gameId: 15417,
    iconClass: "weapon-icon-bow-kings-squire",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.KingsSquire,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_kings_squire',
            serializeId: 1,
            title: 'talent_name.labyrinth_lords_instruction',
            description: 'talent_descr.labyrinth_lords_instruction',
            stats: [
                new StatTable('mastery', [60, 80, 100, 120, 140]),
                new StatTable('text_percent_dmg', [100, 120, 140, 160, 180]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('kings_squire_dmg', [100, 120, 140, 160, 180]),
                }),
            ],
        }),
    ],
});
