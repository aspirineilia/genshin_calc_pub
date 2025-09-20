import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const AshGravenDrinkingHorn = new DbObjectWeapon({
    name: 'ash_graven_drinking_horn',
    serializeId: 179,
    gameId: 14427,
    iconClass: "weapon-icon-catalyst-ash-graven-drinking-horn",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.AshGravenDrinkingHorn,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_ash_graven_drinking_horn',
            description: 'talent_descr.weapon_ash_graven_drinking_horn',
            stats: [
                new StatTable('text_percent_dmg', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'weapon_refine',
                    values: new StatTable('ash_graven_drinking_horn_dmg', [40, 50, 60, 70, 80]),
                }),
            ],
        }),
    ],
});

