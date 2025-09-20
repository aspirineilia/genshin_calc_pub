import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Slingshot = new DbObjectWeapon({
    name: 'slingshot',
    serializeId: 38,
    gameId: 15304,
    iconClass: "weapon-icon-bow-slingshot",
    rarity: 3,
    weapon: 'bow',
    statTable: weaponStatTables.Slingshot,
    refineTable: [
        new StatTable('dmg_normal', [-10]),
        new StatTable('dmg_charged', [-10]),
    ],
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_slingshot',
            serializeId: 1,
            title: 'talent_name.weapon_slingshot',
            description: 'talent_descr.weapon_slingshot',
            stats: [
                new StatTable('text_percent', [36, 42, 48, 54, 60]),
                new StatTable('dmg_normal', [46, 52, 58, 64, 70]),
                new StatTable('dmg_charged', [46, 52, 58, 64, 70]),
            ],
        })
    ],
});
