import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FavoniusLance = new DbObjectWeapon({
    name: 'favonius_lance',
    serializeId: 90,
    gameId: 13407,
    iconClass: "weapon-icon-polearm-favonius-lance",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.FavoniusLance,
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
