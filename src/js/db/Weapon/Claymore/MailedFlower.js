import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MailedFlower = new DbObjectWeapon({
    name: 'mailed_flower',
    serializeId: 142,
    gameId: 12418,
    iconClass: "weapon-icon-claymore-mailed-flower",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.MailedFlower,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_mailed_flower',
            serializeId: 1,
            title: 'talent_name.weapon_mailed_flower',
            description: 'talent_descr.weapon_mailed_flower',
            stats: [
                new StatTable('atk_percent', [12, 15, 18, 21, 24]),
                new StatTable('mastery', [48, 60, 72, 84, 96]),
            ],
        }),
    ],
});
