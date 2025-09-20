import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const WindblumeOde = new DbObjectWeapon({
    name: 'windblume_ode',
    serializeId: 41,
    gameId: 15413,
    iconClass: "weapon-icon-bow-windblume-ode",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.WindblumeOde,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_windblume_ode',
            serializeId: 1,
            title: 'talent_name.weapon_windblume_ode',
            description: 'talent_descr.weapon_windblume_ode',
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
            ],
        })
    ],
});
