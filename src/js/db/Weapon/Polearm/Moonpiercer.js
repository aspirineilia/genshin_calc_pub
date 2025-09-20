import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Moonpiercer = new DbObjectWeapon({
    name: 'moonpiercer',
    serializeId: 128,
    gameId: 13417,
    iconClass: "weapon-icon-polearm-moonpiercer",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.Moonpiercer,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_stillwood_moonshadow',
            serializeId: 1,
            title: 'talent_name.stillwood_moonshadow',
            description: 'talent_descr.stillwood_moonshadow',
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
