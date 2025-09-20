import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureHeal } from "../../../classes/Feature2/Heal";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const AquilaFavonia = new DbObjectWeapon({
    name: 'aquila_favonia',
    serializeId: 2,
    gameId: 11501,
    iconClass: "weapon-icon-sword-aquila-favonia",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.AquilaFavonia,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_aquila_favonia',
            description: 'talent_descr.bonus_atk',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_aquila_favonia',
            description: 'talent_descr.weapon_aquila_favonia',
            stats: [
                new StatTable('text_percent_hp', [100, 115, 130, 145, 160]),
                new StatTable('text_percent_dmg', [200, 230, 260, 290, 320]),
            ],
        }),
    ],
    features: [
        new FeatureHeal({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('aquila_favonia_heal', [100, 115, 130, 145, 160]),
                }),
            ],
        }),
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('aquila_favonia_aoe', [200, 230, 260, 290, 320]),
                }),
            ],
        }),
    ],
});
