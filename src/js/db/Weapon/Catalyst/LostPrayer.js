import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const LostPrayer = new DbObjectWeapon({
    name: 'lost_prayer_to_the_sacred_winds',
    serializeId: 45,
    gameId: 14502,
    iconClass: "weapon-icon-catalyst-lost-prayer-to-the-sacred-winds",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.LostPrayer,
    settingsSets: [
        {
            name: 'no_stacks',
            settings: {
                "weapon_lost_prayer": 0,
            },
        },
        {
            name: 'stacks_2',
            settings: {
                "weapon_lost_prayer": 2,
            },
        },
        {
            name: 'stacks_4',
            settings: {
                "weapon_lost_prayer": 4,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_lost_prayer',
            serializeId: 1,
            title: 'talent_name.weapon_lost_prayer',
            description: 'talent_descr.weapon_lost_prayer',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_anemo', [8, 10, 12, 14, 16]),
                new StatTable('dmg_geo', [8, 10, 12, 14, 16]),
                new StatTable('dmg_pyro', [8, 10, 12, 14, 16]),
                new StatTable('dmg_electro', [8, 10, 12, 14, 16]),
                new StatTable('dmg_hydro', [8, 10, 12, 14, 16]),
                new StatTable('dmg_cryo', [8, 10, 12, 14, 16]),
                new StatTable('dmg_dendro', [8, 10, 12, 14, 16]),
            ],
        }),
    ]
});
