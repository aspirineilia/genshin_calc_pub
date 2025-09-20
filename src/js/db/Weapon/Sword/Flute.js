import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Flute = new DbObjectWeapon({
    name: 'the_flute',
    serializeId: 10,
    gameId: 11402,
    iconClass: "weapon-icon-sword-the-flute",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.Flute,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_flute',
            description: 'talent_descr.weapon_flute',
            stats: [
                new StatTable('text_percent_dmg', [100, 125, 150, 175, 200]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('flute_aoe', [100, 125, 150, 175, 200]),
                }),
            ],
        }),
    ],
});
