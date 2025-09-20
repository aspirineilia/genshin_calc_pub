import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MountainKingsFang = new DbObjectWeapon({
    name: 'mountain_kings_fang',
    serializeId: 181,
    gameId: 12513,
    iconClass: "weapon-icon-claymore-fang-of-the-mountain-king",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.MountainKingsFang,
    conditions: [
        new ConditionStacks({
            name: 'weapon_mountain_kings_fang',
            serializeId: 1,
            title: 'talent_name.weapon_mountain_kings_fang',
            description: 'talent_descr.weapon_mountain_kings_fang',
            maxStacks: 6,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_skill', [10, 12.5, 15, 17.5, 20]),
                new StatTable('dmg_burst', [10, 12.5, 15, 17.5, 20]),
            ],
        }),
    ],
});
