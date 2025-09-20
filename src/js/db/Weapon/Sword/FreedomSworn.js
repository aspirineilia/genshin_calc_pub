import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FreedomSworn = new DbObjectWeapon({
    name: 'freedom_sworn',
    serializeId: 97,
    gameId: 11503,
    iconClass: "weapon-icon-sword-freedom-sworn",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.FreedomSworn,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_freedom_sworn_passive',
            description: 'talent_descr.weapon_freedom_sworn_passive',
            stats: [
                new StatTable('dmg_all', [10, 12.5, 15, 17.5, 20]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_freedom_sworn',
            serializeId: 1,
            title: 'talent_name.weapon_freedom_sworn',
            description: 'talent_descr.weapon_freedom_sworn',
            stats: [
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent_2', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});

