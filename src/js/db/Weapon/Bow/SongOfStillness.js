import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SongOfStillness = new DbObjectWeapon({
    name: 'song_of_stillness',
    serializeId: 156,
    gameId: 15425,
    iconClass: "weapon-icon-bow-song-of-stillness",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.SongOfStillness,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_song_of_stillness',
            serializeId: 1,
            title: 'talent_name.weapon_song_of_stillness',
            description: 'talent_descr.weapon_song_of_stillness',
            stats: [
                new StatTable('dmg_all', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
