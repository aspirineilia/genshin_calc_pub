import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const HarbingerofDawn = new DbObjectWeapon({
    name: 'harbinger_of_dawn',
    serializeId: 11,
    gameId: 11302,
    iconClass: "weapon-icon-sword-harbinger-of-dawn",
    rarity: 3,
    weapon: 'sword',
    statTable: weaponStatTables.HarbingerofDawn,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_harbinger_of_dawn',
            serializeId: 1,
            title: 'talent_name.weapon_harbinger_of_dawn',
            description: 'talent_descr.weapon_harbinger_of_dawn',
            stats: [
                new StatTable('crit_rate', [14, 17.5, 21, 24.5, 28]),
            ],
        })
    ],
});
