import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const IbisPiercer = new DbObjectWeapon({
    name: 'ibis_piercer',
    serializeId: 145,
    gameId: 15419,
    iconClass: "weapon-icon-bow-ibis-piercer",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.IbisPiercer,
    conditions: [
        new ConditionStacks({
            name: 'weapon_ibis_piercer',
            serializeId: 1,
            title: 'talent_name.weapon_ibis_piercer',
            description: 'talent_descr.weapon_ibis_piercer',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
});
