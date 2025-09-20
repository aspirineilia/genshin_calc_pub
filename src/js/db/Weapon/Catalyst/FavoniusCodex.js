import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FavoniusCodex = new DbObjectWeapon({
    name: 'favonius_codex',
    serializeId: 55,
    gameId: 14401,
    iconClass: "weapon-icon-catalyst-favonius-codex",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.FavoniusCodex,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_favonoius_passive',
            description: 'talent_descr.weapon_favonoius_passive',
            stats: [
                new StatTable('text_percent', [60, 70, 80, 90, 100]),
                new StatTable('text_cooldown', [12, 10.5, 9, 7.5, 6]),
            ],
        }),
    ],
});
