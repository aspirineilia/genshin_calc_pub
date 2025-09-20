import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkywardHarp = new DbObjectWeapon({
    name: 'skyward_harp',
    serializeId: 37,
    gameId: 15501,
    iconClass: "weapon-icon-bow-skyward-harp",
    rarity: 5,
    weapon: 'bow',
    statTable: weaponStatTables.SkywardHarp,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_skyward_harp',
            description: 'talent_descr.bonus_crit_dmg',
            stats: [
                new StatTable('crit_dmg', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_skyward_harp',
            description: 'talent_descr.weapon_skyward_harp',
            stats: [
                new StatTable('text_percent_chance', [60, 70, 80, 90, 100]),
                new StatTable('text_percent_dmg', [125]),
                new StatTable('text_decimal_cd', [4, 3.5, 3, 2.5, 2]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('skyward_harp_aoe', [125]),
                }),
            ],
        }),
    ]
});
