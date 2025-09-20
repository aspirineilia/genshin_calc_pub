import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { FeatureShield } from "../../../classes/Feature2/Shield";
import { StatTable } from "../../../classes/StatTable";
import { ValueTable } from "../../../classes/ValueTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Bell = new DbObjectWeapon({
    name: 'the_bell',
    serializeId: 71,
    gameId: 12402,
    iconClass: "weapon-icon-claymore-the-bell",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.Bell,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_rebellious_guardian',
            description: 'talent_descr.weapon_rebellious_guardian_passive',
            stats: [
                new StatTable('text_percent_hp', [20, 23, 26, 29, 32]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_bell',
            serializeId: 1,
            title: 'talent_name.weapon_rebellious_guardian',
            description: 'talent_descr.weapon_rebellious_guardian',
            stats: [
                new StatTable('dmg_all', [12, 15, 18, 21, 24]),
            ],
        }),
    ],
    features: [
        new FeatureShield({
            category: 'weapon',
            name: 'bell_shield',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'weapon_refine',
                    values: new ValueTable([20, 23, 26, 29, 32]),
                }),
            ],
        }),
    ],
});

