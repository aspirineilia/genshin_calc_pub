import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const ToukabouShigure = new DbObjectWeapon({
    name: 'toukabou_shigure',
    serializeId: 140,
    gameId: 11422,
    iconClass: "weapon-icon-sword-toukabou-shigure",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.ToukabouShigure,
    conditions: [
        new ConditionBooleanRefine({
            name: 'whisper_toukabou_shigure',
            serializeId: 1,
            title: 'talent_name.whisper_toukabou_shigure',
            description: 'talent_descr.whisper_toukabou_shigure',
            stats: [
                new StatTable('dmg_all', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
