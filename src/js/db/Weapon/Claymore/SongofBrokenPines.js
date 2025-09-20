import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SongofBrokenPines = new DbObjectWeapon({
    name: 'song_of_broken_pines',
    serializeId: 96,
    gameId: 12503,
    iconClass: "weapon-icon-claymore-song-of-broken-pines",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.SongofBrokenPines,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_song_of_broken_pines_passive',
            description: 'talent_descr.weapon_song_of_broken_pines_passive',
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_song_of_broken_pines',
            serializeId: 1,
            title: 'talent_name.weapon_song_of_broken_pines',
            description: 'talent_descr.weapon_song_of_broken_pines',
            stats: [
                new StatTable('text_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent_2', [12, 15, 18, 21, 24]),
            ],
        })
    ],
});

