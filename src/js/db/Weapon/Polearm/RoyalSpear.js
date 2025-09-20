import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const RoyalSpear = new DbObjectWeapon({
    name: 'royal_spear',
    serializeId: 91,
    gameId: 13408,
    iconClass: "weapon-icon-polearm-royal-spear",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.RoyalSpear,
    settingsSets: [
        {
            name: 'average',
            settings: {
                weapon_royal_bow: 0,
                weapon_royal_avg_crit_rate: 1,
            },
        },
    ],
    conditions: [
        new ConditionStacks({
            name: 'weapon_royal_spear',
            serializeId: 1,
            title: 'talent_name.weapon_focus',
            description: 'talent_descr.weapon_focus',
            maxStacks: 5,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('crit_rate', [8, 10, 12, 14, 16]),
            ],
            subConditions: [
                new ConditionBoolean({
                    name: 'weapon_royal_avg_crit_rate',
                    invert: true,
                }),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_royal_avg_crit_rate',
            serializeId: 2,
            title: 'talent_name.weapon_royal_avg_crit_rate',
            description: 'talent_descr.weapon_royal_avg_crit_rate',
            stats: [
                new StatTable('royal_crit_rate', [8, 10, 12, 14, 16]),
            ],
        }),
    ],
});
