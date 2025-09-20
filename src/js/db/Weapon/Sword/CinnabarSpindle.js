import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../../classes/StatTable";
import { ValueTable } from "../../../classes/ValueTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CinnabarSpindle = new DbObjectWeapon({
    name: 'cinnabar_spindle',
    serializeId: 116,
    gameId: 11415,
    iconClass: "weapon-icon-sword-cinnabar-spindle",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.CinnabarSpindle,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_cinnabar_spindle',
            serializeId: 1,
            title: 'talent_name.weapon_cinnabar_spindle',
            description: 'talent_descr.weapon_cinnabar_spindle',
            stats: [
                new StatTable('text_percent', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            leveling: 'weapon_refine',
            source: 'weapon',
            values: new ValueTable([40, 50, 60, 70, 80]),
            condition: new ConditionBoolean({name: 'weapon_cinnabar_spindle'}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['skill'],
            }),
        }),
    ],
});
