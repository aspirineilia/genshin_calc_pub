import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const LuxuriousSeaLord = new DbObjectWeapon({
    name: 'luxurious_sea_lord',
    serializeId: 110,
    gameId: 12412,
    iconClass: "weapon-icon-claymore-luxurious-sea-lord",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.LuxuriousSeaLord,
    conditions: [
        new ConditionStaticRefine({
            // title: 'talent_name.weapon_luxurious_sea_lord',
            title: 'weapon_name.luxurious_sea_lord',
            description: 'talent_descr.weapon_luxurious_sea_lord',
            stats: [
                new StatTable('dmg_burst', [12, 15, 18, 21, 24]),
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
                    values: new StatTable('titanic_tuna_dmg', [100, 125, 150, 175, 200]),
                }),
            ],
        }),
    ],
});
