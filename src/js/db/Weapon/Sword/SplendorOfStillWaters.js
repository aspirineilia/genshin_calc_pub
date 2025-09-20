import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SplendorOfStillWaters = new DbObjectWeapon({
    name: 'splendor_of_tranquil_waters',
    serializeId: 165,
    gameId: 11513,
    iconClass: "weapon-icon-sword-splendor-of-tranquil-waters",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.SplendorOfStillWaters,
    conditions: [
        new ConditionStacks({
            name: 'weapon_splendor_of_tranquil_waters',
            serializeId: 1,
            title: 'talent_name.weapon_splendor_of_tranquil_waters',
            description: 'talent_descr.weapon_splendor_of_tranquil_waters_1',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_skill', [8, 10, 12, 14, 16]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_splendor_of_tranquil_waters_2',
            serializeId: 2,
            title: 'talent_name.weapon_splendor_of_tranquil_waters',
            description: 'talent_descr.weapon_splendor_of_tranquil_waters_2',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('hp_percent', [14, 16, 20, 24, 28]),
            ],
        }),
    ],
});

