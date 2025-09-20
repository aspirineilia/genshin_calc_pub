import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SharpshooterOath = new DbObjectWeapon({
    name: 'sharpshooters_oath',
    serializeId: 36,
    gameId: 15302,
    iconClass: "weapon-icon-bow-sharpshooters-oath",
    rarity: 3,
    weapon: 'bow',
    statTable: weaponStatTables.SharpshootersOath,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_sharpshooter_oath',
            description: 'talent_descr.weapon_sharpshooter_oath',
            stats: [
                new StatTable('dmg_weak', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
});
