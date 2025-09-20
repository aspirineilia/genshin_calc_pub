import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MitternachtsWaltz = new DbObjectWeapon({
    name: 'mitternachts_waltz',
    serializeId: 98,
    gameId: 15412,
    iconClass: "weapon-icon-bow-mitternachts-waltz",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.MitternachtsWaltz,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_mitternachts_waltz_1',
            serializeId: 1,
            title: 'talent_name.weapon_mitternachts_waltz',
            description: 'talent_descr.weapon_mitternachts_waltz_1',
            stats: [
                new StatTable('dmg_skill', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_mitternachts_waltz_2',
            serializeId: 2,
            title: 'talent_name.weapon_mitternachts_waltz',
            description: 'talent_descr.weapon_mitternachts_waltz_2',
            stats: [
                new StatTable('dmg_normal', [20, 25, 30, 35, 40]),
            ],
        }),
    ],
});

