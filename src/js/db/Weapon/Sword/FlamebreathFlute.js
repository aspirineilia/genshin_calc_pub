import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FlamebreathFlute = new DbObjectWeapon({
    name: 'flamebreath_flute',
    serializeId: 184,
    gameId: 11431,
    iconClass: "weapon-icon-sword-flute-of-ezpitzal",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.FlamebreathFlute,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_flamebreath_flute',
            serializeId: 1,
            title: 'talent_name.weapon_flamebreath_flute',
            description: 'talent_descr.weapon_flamebreath_flute',
            stats: [
                new StatTable('def_percent', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
