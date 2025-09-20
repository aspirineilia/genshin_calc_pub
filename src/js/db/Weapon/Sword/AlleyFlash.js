import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const AlleyFlash = new DbObjectWeapon({
    name: 'the_alley_flash',
    serializeId: 1,
    gameId: 11410,
    iconClass: "weapon-icon-sword-the-alley-flash",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.AlleyFlash,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_alley_flash',
            serializeId: 1,
            title: 'talent_name.weapon_alley_flash',
            description: 'talent_descr.weapon_alley_flash',
            stats: [
                new StatTable('dmg_all', [12, 15, 18, 21, 24]),
            ],
        })
    ],
});
