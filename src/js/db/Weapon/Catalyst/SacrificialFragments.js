import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SacrificialFragments = new DbObjectWeapon({
    name: 'sacrificial_fragments',
    serializeId: 51,
    gameId: 14403,
    iconClass: "weapon-icon-catalyst-sacrificial-fragments",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.SacrificialFragments,
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
