import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CompoundBow = new DbObjectWeapon({
    name: 'compound_bow',
    serializeId: 26,
    gameId: 15407,
    iconClass: "weapon-icon-bow-compound-bow",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.CompoundBow,
    conditions: [
        new ConditionStacks({
            name: 'weapon_compound_bow',
            serializeId: 1,
            title: 'talent_name.weapon_compound_bow',
            description: 'talent_descr.weapon_compound_bow',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [4, 5, 6, 7, 8]),
                new StatTable('atk_speed_normal', [1.2, 1.5, 1.8, 2.1, 2.4]),
            ],
        })
    ],
});

