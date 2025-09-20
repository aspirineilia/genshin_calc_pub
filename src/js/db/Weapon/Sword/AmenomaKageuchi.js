import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const AmenomaKageuchi = new DbObjectWeapon({
    name: 'amenoma_kageuchi',
    serializeId: 100,
    gameId: 11414,
    iconClass: "weapon-icon-sword-amenoma-kageuchi",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.AmenomaKageuchi,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_amenoma_kageuta_blade',
            description: 'talent_descr.weapon_amenoma_kageuta_blade',
            stats: [
                new StatTable('text_decimal', [6, 7.5, 9, 10.5, 12]),
            ],
        }),
    ],
});

