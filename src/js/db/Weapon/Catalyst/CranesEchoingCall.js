import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CranesEchoingCall = new DbObjectWeapon({
    name: 'cranes_echoing_call',
    serializeId: 169,
    gameId: 14515,
    iconClass: "weapon-icon-catalyst-cranes-echoing-call",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.CranesEchoingCall,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_cranes_echoing_call',
            serializeId: 1,
            title: 'talent_name.weapon_cranes_echoing_call',
            description: 'talent_descr.weapon_cranes_echoing_call_1',
            stats: [
                new StatTable('dmg_plunge', [28, 41, 54, 67, 80]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_cranes_echoing_call',
            description: 'talent_descr.weapon_cranes_echoing_call_2',
            stats: [
                new StatTable('text_decimal', [2.5, 2.75, 3, 3.25, 3.5]),
            ],
        }),
    ],
});

