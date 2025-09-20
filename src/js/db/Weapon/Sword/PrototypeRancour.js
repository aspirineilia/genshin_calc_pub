import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const PrototypeRancour = new DbObjectWeapon({
    name: 'prototype_rancour',
    serializeId: 15,
    gameId: 11406,
    iconClass: "weapon-icon-sword-prototype-rancour",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.PrototypeRancour,
    conditions: [
        new ConditionStacks({
            name: 'weapon_prototype_rancour',
            serializeId: 1,
            title: 'talent_name.weapon_prototype_rancour',
            description: 'talent_descr.weapon_prototype_rancour',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [4, 5, 6, 7, 8]),
                new StatTable('def_percent', [4, 5, 6, 7, 8]),
            ],
        })
    ],
});
