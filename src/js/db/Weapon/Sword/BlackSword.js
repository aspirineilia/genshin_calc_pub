import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureHeal } from "../../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BlackSword = new DbObjectWeapon({
    name: 'the_black_sword',
    serializeId: 4,
    gameId: 11409,
    iconClass: "weapon-icon-sword-the-black-sword",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.BlackSword,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_black_sword',
            description: 'talent_descr.weapon_black_sword',
            stats: [
                new StatTable('dmg_normal', [20, 25, 30, 35, 40]),
                new StatTable('dmg_charged', [20, 25, 30, 35, 40]),
                new StatTable('text_percent', [60, 70, 80, 90, 100]),
            ],
        }),
    ],
    features: [
        new FeatureHeal({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('black_sword_heal', [60, 70, 80, 90, 100]),
                }),
            ],
        }),
    ],
});
