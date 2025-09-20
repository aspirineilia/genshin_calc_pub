import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SapwoodBlade = new DbObjectWeapon({
    name: 'sapwood_blade',
    serializeId: 126,
    gameId: 11417,
    iconClass: "weapon-icon-sword-sapwood-blade",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.SapwoodBlade,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_forest_sanctuary',
            serializeId: 1,
            title: 'talent_name.forest_sanctuary',
            description: 'talent_descr.forest_sanctuary',
            stats: [
                new StatTable('mastery', [60, 75, 90, 105, 120]),
            ],
        }),
    ],
});
