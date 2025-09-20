import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Catch = new DbObjectWeapon({
    name: 'the_catch',
    serializeId: 109,
    gameId: 13415,
    iconClass: "weapon-icon-polearm-the-catch",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.Catch,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_catch',
            description: 'talent_descr.weapon_catch',
            stats: [
                new StatTable('dmg_burst', [16, 20, 24, 28, 32]),
                new StatTable('crit_rate_burst', [6, 7.5, 9, 10.5, 12]),
            ],
        }),
    ],
});
