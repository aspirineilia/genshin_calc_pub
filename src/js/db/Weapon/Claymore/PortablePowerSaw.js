import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const PortablePowerSaw = new DbObjectWeapon({
    name: 'portable_power_saw',
    serializeId: 159,
    gameId: 12427,
    iconClass: 'weapon-icon-claymore-portable-power-saw',
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.PortablePowerSaw,
    conditions: [
        new ConditionStacks({
            name: 'weapon_sea_shanty',
            serializeId: 1,
            title: 'talent_name.weapon_sea_shanty',
            description: 'talent_descr.weapon_sea_shanty',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [40, 50, 60, 70, 80]),
                new StatTable('text_decimal', [2, 2.5, 3, 3.5, 4]),
            ],
        }),
    ],
});
