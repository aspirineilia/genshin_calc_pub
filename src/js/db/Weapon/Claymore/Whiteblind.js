import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Whiteblind = new DbObjectWeapon({
    name: 'whiteblind',
    serializeId: 72,
    gameId: 12407,
    iconClass: "weapon-icon-claymore-whiteblind",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.Whiteblind,
    conditions: [
        new ConditionStacks({
            name: 'weapon_whiteblind',
            serializeId: 1,
            title: 'talent_name.weapon_infusion_blade',
            description: 'talent_descr.weapon_infusion_blade',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [6, 7.5, 9, 10.5, 12]),
                new StatTable('def_percent', [6, 7.5, 9, 10.5, 12]),
            ],
        })
    ],
});
