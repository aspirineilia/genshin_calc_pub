import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Absolution = new DbObjectWeapon({
    name: 'absolution',
    serializeId: 173,
    gameId: 11515,
    iconClass: "weapon-icon-sword-absolution",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.Absolution,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_absolution',
            description: 'talent_descr.weapon_absolution_1',
            stats: [
                new StatTable('crit_dmg', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_absolution',
            serializeId: 1,
            title: 'talent_name.weapon_absolution',
            description: 'talent_descr.weapon_absolution_2',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_all', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
