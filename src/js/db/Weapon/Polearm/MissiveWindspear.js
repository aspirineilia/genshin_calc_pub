
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MissiveWindspear = new DbObjectWeapon({
    name: 'missive_windspear',
    serializeId: 133,
    gameId: 13419,
    iconClass: "weapon-icon-polearm-missive-windspear",
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.MissiveWindspear,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_missive_windspear',
            serializeId: 1,
            title: 'talent_name.the_wind_unattained',
            description: 'talent_descr.the_wind_unattained',
            stats: [
                new StatTable('atk_percent', [12, 15, 18, 21, 24]),
                new StatTable('mastery', [48, 60, 72, 84, 96]),
            ],
        }),
    ],
});
