import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FerrousShadow = new DbObjectWeapon({
    name: 'ferrous_shadow',
    serializeId: 77,
    gameId: 12301,
    iconClass: "weapon-icon-claymore-ferrous-shadow",
    rarity: 3,
    weapon: 'claymore',
    statTable: weaponStatTables.FerrousShadow,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_ferrous_shadow',
            serializeId: 1,
            title: 'talent_name.weapon_unbending',
            description: 'talent_descr.weapon_unbending',
            stats: [
                new StatTable('dmg_charged', [30, 35, 40, 45, 50]),
                new StatTable('text_percent_hp', [70, 75, 80, 85, 90]),
            ],
        })
    ],
});
