import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FlameForgedInsight = new DbObjectWeapon({
    name: 'flame_forged_insight',
    serializeId: 223,
    gameId: 12432,
    iconClass: "weapon-icon-claymore-flame-forged-insight",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.FlameForgedInsight,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_flame_forged_insight',
            serializeId: 1,
            title: 'talent_name.weapon_flame_forged_insight',
            description: 'talent_descr.weapon_flame_forged_insight',
            stats: [
                new StatTable('text_value', [12, 15, 18, 21, 24]),
                new StatTable('mastery', [60, 75, 90, 105, 120]),
            ],
        })
    ],
});
