import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const TwinNephrite = new DbObjectWeapon({
    name: 'twin_nephrite',
    serializeId: 57,
    gameId: 14305,
    iconClass: "weapon-icon-catalyst-twin-nephrite",
    rarity: 3,
    weapon: 'catalyst',
    statTable: weaponStatTables.TwinNephrite,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_twin_nephrite',
            serializeId: 1,
            title: 'talent_name.weapon_twin_nephrite',
            description: 'talent_descr.weapon_twin_nephrite',
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [12, 14, 16, 18, 20]),
                new StatTable('move_speed', [12, 14, 16, 18, 20]),
            ],
        })
    ],
});

