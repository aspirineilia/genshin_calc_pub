import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SurfingTime = new DbObjectWeapon({
    name: 'surfing_time',
    serializeId: 178,
    gameId: 14516,
    iconClass: "weapon-icon-catalyst-surfs-up",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.SurfingTime,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_surfing_time',
            description: 'talent_descr.weapon_surfing_time_1',
            stats: [
                new StatTable('hp_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_surfing_time',
            serializeId: 1,
            title: 'talent_name.weapon_surfing_time',
            description: 'talent_descr.weapon_surfing_time_2',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_normal', [12, 15, 18, 21, 24]),
            ],
        })
    ],
});

