import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const ScionOfTheBlazingSun = new DbObjectWeapon({
    name: 'scion_of_the_blazing_sun',
    serializeId: 155,
    gameId: 15424,
    iconClass: "weapon-icon-bow-scion-of-the-blazing-sun",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.ScionOfTheBlazingSun,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_scion_of_the_blazing_sun',
            description: 'talent_descr.weapon_scion_of_the_blazing_sun_1',
            stats: [
                new StatTable('text_percent_dmg', [60, 75, 90, 105, 120]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_scion_of_the_blazing_sun',
            serializeId: 1,
            title: 'talent_name.weapon_scion_of_the_blazing_sun_2',
            description: 'talent_descr.weapon_scion_of_the_blazing_sun_2',
            stats: [
                new StatTable('dmg_charged_enemy', [28, 35, 42, 49, 56]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('scion_of_the_blazing_sun_dmg', [60, 75, 90, 105, 120]),
                }),
            ],
        }),
    ]
});
