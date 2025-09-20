import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SkyriderSword = new DbObjectWeapon({
    name: 'skyrider_sword',
    serializeId: 18,
    gameId: 11306,
    iconClass: "weapon-icon-sword-skyrider-sword",
    rarity: 3,
    weapon: 'sword',
    statTable: weaponStatTables.SkyriderSword,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_skyrider_sword',
            serializeId: 1,
            title: 'talent_name.weapon_skyrider_sword',
            description: 'talent_descr.weapon_skyrider_sword',
            stats: [
                new StatTable('atk_percent', [12, 15, 18, 21, 24]),
                new StatTable('move_speed', [12, 15, 18, 21, 24]),
            ],
        })
    ],
});
