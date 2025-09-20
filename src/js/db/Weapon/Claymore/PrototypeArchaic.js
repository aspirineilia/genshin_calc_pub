import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const PrototypeArchaic = new DbObjectWeapon({
    name: 'prototype_archaic',
    serializeId: 68,
    gameId: 12406,
    iconClass: "weapon-icon-claymore-prototype-archaic",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.PrototypeArchaic,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_prototype_archaic',
            description: 'talent_descr.weapon_prototype_archaic',
            stats: [
                new StatTable('text_percent_dmg', [240, 300, 360, 420, 480]),
                new StatTable('text_percent_chance', [50]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('prototype_archaic_aoe', [240, 300, 360, 420, 480]),
                }),
            ],
        }),
    ],
});
