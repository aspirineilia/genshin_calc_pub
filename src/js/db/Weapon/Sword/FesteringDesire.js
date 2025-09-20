import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FesteringDesire = new DbObjectWeapon({
    name: 'festering_desire',
    serializeId: 8,
    gameId: 11413,
    iconClass: "weapon-icon-sword-festering-desire",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.FesteringDesire,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_festering_desire',
            description: 'talent_descr.weapon_festering_desire',
            stats: [
                new StatTable('dmg_skill', [16, 20, 24, 28, 32]),
                new StatTable('crit_rate_skill', [6, 7.5, 9, 10.5, 12]),
            ],
        }),
    ],
});
