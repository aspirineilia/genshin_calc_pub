import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FruitfulHook = new DbObjectWeapon({
    name: 'fruitful_hook',
    serializeId: 188,
    gameId: 12430,
    iconClass: "weapon-icon-claymore-fruitful-hook",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.FruitfulHook,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_fruitful_hook',
            description: 'talent_descr.weapon_fruitful_hook_1',
            stats: [
                new StatTable('crit_rate_plunge', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_fruitful_hook',
            serializeId: 1,
            title: 'talent_name.weapon_fruitful_hook',
            description: 'talent_descr.weapon_fruitful_hook_2',
            stats: [
                new StatTable('dmg_normal', [16, 20, 24, 28, 32]),
                new StatTable('dmg_charged', [16, 20, 24, 28, 32]),
                new StatTable('dmg_plunge', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
