import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FlowerWreathedFeathers = new DbObjectWeapon({
    name: 'flower_wreathed_feathers',
    serializeId: 189,
    gameId: 15430,
    iconClass: "weapon-icon-bow-flower-wreathed-feathers",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.FlowerWreathedFeathers,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.flower_wreathed_feathers',
            description: 'talent_descr.flower_wreathed_feathers_1',
            stats: [
                new StatTable('text_percent', [15]),
            ],
        }),
        new ConditionStacks({
            name: 'flower_wreathed_feathers',
            serializeId: 1,
            title: 'talent_name.flower_wreathed_feathers',
            description: 'talent_descr.flower_wreathed_feathers_2',
            maxStacks: 6,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_charged', [6, 7.5, 9, 10.5, 12]),
            ],
        }),
    ],
});

