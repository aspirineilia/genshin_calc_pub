import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const PrototypeCrescent = new DbObjectWeapon({
    name: 'prototype_crescent',
    serializeId: 30,
    gameId: 15406,
    iconClass: "weapon-icon-bow-prototype-crescent",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.PrototypeCrescent,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_prototype_crescent',
            serializeId: 1,
            title: 'talent_name.weapon_prototype_crescent',
            description: 'talent_descr.weapon_prototype_crescent',
            stats: [
                new StatTable('atk_percent', [36, 45, 54, 63, 72]),
                new StatTable('move_speed', [10]),
            ],
        }),
    ],
});
