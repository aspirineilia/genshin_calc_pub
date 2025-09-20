import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const WineAndSong = new DbObjectWeapon({
    name: 'wine_and_song',
    serializeId: 46,
    gameId: 14410,
    iconClass: "weapon-icon-catalyst-wine-and-song",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.WineandSong,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_wine_and_song',
            serializeId: 1,
            title: 'talent_name.weapon_wine_and_song',
            description: 'talent_descr.weapon_wine_and_song',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent', [14, 16, 18, 20, 22]),
            ],
        }),
    ],
});
