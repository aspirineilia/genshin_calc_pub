import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkywardAtlas = new DbObjectWeapon({
    name: 'skyward_atlas',
    serializeId: 44,
    gameId: 14501,
    iconClass: "weapon-icon-catalyst-skyward-atlas",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.SkywardAtlas,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_skyward_atlas',
            description: 'talent_descr.weapon_skyward_atlas',
            stats: [
                new StatTable('dmg_anemo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_geo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_pyro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_electro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_hydro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_cryo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_dendro', [12, 15, 18, 21, 24]),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('skyward_atlas_cloud', [160, 200, 240, 280, 320]),
                }),
            ],
        }),
    ],
});

