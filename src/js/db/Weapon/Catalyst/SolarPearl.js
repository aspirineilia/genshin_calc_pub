import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SolarPearl = new DbObjectWeapon({
    name: 'solar_pearl',
    serializeId: 43,
    gameId: 14405,
    iconClass: "weapon-icon-catalyst-solar-pearl",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.SolarPearl,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_solar_pearl_1',
            serializeId: 1,
            title: 'talent_name.weapon_solar_pearl',
            description: 'talent_descr.weapon_solar_pearl_1',
            stats: [
                new StatTable('dmg_skill', [20, 25, 30, 35, 40]),
                new StatTable('dmg_burst', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_solar_pearl_2',
            serializeId: 2,
            title: 'talent_name.weapon_solar_pearl',
            description: 'talent_descr.weapon_solar_pearl_2',
            stats: [
                new StatTable('dmg_normal', [20, 25, 30, 35, 40]),
            ],
        }),
    ],
});
