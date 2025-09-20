import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const EmeraldOrb = new DbObjectWeapon({
    name: 'emerald_orb',
    serializeId: 61,
    gameId: 14304,
    iconClass: "weapon-icon-catalyst-emerald-orb",
    rarity: 3,
    weapon: 'catalyst',
    statTable: weaponStatTables.EmeraldOrb,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_emerald_orb',
            serializeId: 1,
            title: 'talent_name.weapon_emerald_orb',
            description: 'talent_descr.weapon_emerald_orb',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
        }),
    ],
});

