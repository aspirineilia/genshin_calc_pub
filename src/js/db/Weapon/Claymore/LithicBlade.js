import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionLithic } from "../../../classes/Condition/Lithic";
import { ConditionStacksSetting } from "../../../classes/Condition/Stacks/Setting";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const LithicBlade = new DbObjectWeapon({
    name: 'lithic_blade',
    serializeId: 67,
    gameId: 12410,
    iconClass: "weapon-icon-claymore-lithic-blade",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.LithicBlade,
    conditions: [
        new ConditionLithic(),
        new ConditionStacksSetting({
            name: 'weapon_lithic_stacks',
            serializeId: 1,
            title: 'talent_name.weapon_lithic_axiome',
            description: 'talent_descr.weapon_lithic_axiome',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [7, 8, 9, 10, 11]),
                new StatTable('crit_rate', [3, 4, 5, 6, 7]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'weapon_lithic_stacks'}),
            ],
        }),
    ],
});
