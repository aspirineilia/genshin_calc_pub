import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const KatsuragikiriNagamasa = new DbObjectWeapon({
    name: 'katsuragikiri_nagamasa',
    serializeId: 105,
    gameId: 12414,
    iconClass: "weapon-icon-claymore-katsuragikiri-nagamasa",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.KatsuragikiriNagamasa,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_samurai_conduct',
            description: 'talent_descr.weapon_samurai_conduct_1',
            stats: [
                new StatTable('dmg_skill', [6, 7.5, 9, 10.5, 12]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_samurai_conduct',
            description: 'talent_descr.weapon_samurai_conduct_2',
            stats: [
                new StatTable('text_decimal', [3, 3.5, 4, 4.5, 5]),
            ],
        }),
    ],
});
