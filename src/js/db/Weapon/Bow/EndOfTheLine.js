import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const EndOfTheLine = new DbObjectWeapon({
    name: 'end_of_the_line',
    serializeId: 130,
    gameId: 15418,
    iconClass: "weapon-icon-bow-end-of-the-line",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.EndOfTheLine,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.net_snapper',
            description: 'talent_descr.net_snapper',
            stats: [
                new StatTable('text_percent_dmg', [80, 100, 120, 140, 160]),
            ]
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('trawler_dmg', [80, 100, 120, 140, 160]),
                }),
            ],
        }),
    ],
});
