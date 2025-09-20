import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../../classes/StatTable";
import { ValueTable } from "../../../classes/ValueTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const RedhornStonethresher = new DbObjectWeapon({
    name: 'redhorn_stonethresher',
    serializeId: 117,
    gameId: 12510,
    iconClass: "weapon-icon-claymore-redhorn-stonethresher",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.RedhornStonethresher,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_redhorn_stonethresher',
            description: 'talent_descr.weapon_redhorn_stonethresher',
            stats: [
                new StatTable('def_percent', [28, 35, 42, 49, 56]),
                new StatTable('normal_base_def_percent', [40, 50, 60, 70, 80]),
                new StatTable('charged_base_def_percent', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'def*',
            source: 'weapon',
            leveling: 'weapon_refine',
            values: new ValueTable([40, 50, 60, 70, 80]),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal', 'charged'],
            }),
        }),
    ],
});
