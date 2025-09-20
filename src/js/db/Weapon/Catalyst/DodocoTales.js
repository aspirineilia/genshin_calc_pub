import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const DodocoTales = new DbObjectWeapon({
    name: 'dodoco_tales',
    serializeId: 99,
    gameId: 14413,
    iconClass: "weapon-icon-catalyst-dodoco-tales",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.DodocoTales,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_dodoco_tales_1',
            serializeId: 1,
            title: 'talent_name.weapon_dodoco_tales',
            description: 'talent_descr.weapon_dodoco_tales_1',
            stats: [
                new StatTable('dmg_charged', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_dodoco_tales_2',
            serializeId: 2,
            title: 'talent_name.weapon_dodoco_tales',
            description: 'talent_descr.weapon_dodoco_tales_2',
            stats: [
                new StatTable('atk_percent', [8, 10, 12, 14, 16]),
            ],
        }),
    ],
});
