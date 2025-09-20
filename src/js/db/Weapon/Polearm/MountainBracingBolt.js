import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MountainBracingBolt = new DbObjectWeapon({
    name: 'mountain_bracing_bolt',
    serializeId: 187,
    gameId: 13430,
    iconClass: "weapon-icon-polearm-mountain-bracing-bolt",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.MountainBracingBolt,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_mountain_bracing_bolt',
            description: 'talent_descr.weapon_mountain_bracing_bolt_1',
            stats: [
                new StatTable('dmg_skill', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_mountain_bracing_bolt',
            serializeId: 1,
            title: 'talent_name.weapon_mountain_bracing_bolt',
            description: 'talent_descr.weapon_mountain_bracing_bolt_2',
            stats: [
                new StatTable('dmg_skill', [12, 15, 18, 21, 24]),
            ],
        }),
    ],
});
