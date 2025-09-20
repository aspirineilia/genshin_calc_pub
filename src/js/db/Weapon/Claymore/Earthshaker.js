import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Earthshaker = new DbObjectWeapon({
    name: 'earthshaker',
    serializeId: 182,
    gameId: 12431,
    iconClass: "weapon-icon-claymore-earth-shaker",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.Earthshaker,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_earthshaker',
            serializeId: 1,
            title: 'talent_name.weapon_earthshaker',
            description: 'talent_descr.weapon_earthshaker',
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_skill', [16, 20, 24, 28, 32]),
            ],
        })
    ],
});
