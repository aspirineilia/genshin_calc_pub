import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";

export const Azurelight = new DbObjectWeapon({
    name: 'azurelight',
    serializeId: 201,
    gameId: 11517,
    iconClass: "weapon-icon-sword-azurelight",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.Azurelight,
    settingsSets: [
        {
            name: 'unbuffed',
            settings: {
                "weapon_azurelight_1": 1,
                "weapon_azurelight_2": 0,
            },
        },
        {
            name: 'buffed',
            settings: {
                "weapon_azurelight_1": 1,
                "weapon_azurelight_2": 1,
            },
        },
    ],
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_azurelight_1',
            serializeId: 1,
            title: 'talent_name.weapon_azurelight',
            description: 'talent_descr.weapon_azurelight',
            stats: [
                new StatTable('atk_percent', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_azurelight_2',
            serializeId: 2,
            title: 'talent_name.weapon_azurelight',
            description: 'talent_descr.weapon_azurelight_2',
            stats: [
                new StatTable('atk_percent', [24, 30, 36, 42, 48]),
                new StatTable('crit_dmg', [40, 50, 60, 70, 80]),
            ],
            condition: new ConditionBoolean({name: 'weapon_azurelight_1'}),
        }),
    ],
});
