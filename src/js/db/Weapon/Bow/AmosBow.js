import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const AmosBow = new DbObjectWeapon({
    name: 'amos_bow',
    serializeId: 24,
    gameId: 15502,
    iconClass: "weapon-icon-bow-amos-bow",
    rarity: 5,
    weapon: 'bow',
    statTable: weaponStatTables.AmosBow,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_amos_bow',
            description: 'talent_descr.weapon_amos_bow_passive',
            stats: [
                new StatTable('dmg_normal', [12, 15, 18, 21, 24]),
                new StatTable('dmg_charged', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_amos_bow',
            serializeId: 1,
            title: 'talent_name.weapon_amos_bow',
            description: 'talent_descr.weapon_amos_bow',
            maxStacks: 5,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_normal', [8, 10, 12, 14, 16]),
                new StatTable('dmg_charged', [8, 10, 12, 14, 16]),
            ],
        })
    ],
});
