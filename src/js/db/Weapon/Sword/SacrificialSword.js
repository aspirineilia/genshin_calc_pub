import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SacrificialSword = new DbObjectWeapon({
    name: 'sacrificial_sword',
    serializeId: 17,
    gameId: 11403,
    iconClass: "weapon-icon-sword-sacrificial-sword",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.SacrificialSword,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_sacrificial_passive',
            description: 'talent_descr.weapon_sacrificial_passive',
            stats: [
                new StatTable('text_percent', [40, 50, 60, 70, 80]),
                new StatTable('text_cooldown', [30, 26, 22, 19, 16]),
            ],
        }),
    ],
});
