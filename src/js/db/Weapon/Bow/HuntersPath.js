import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../../classes/StatTable";
import { ValueTable } from "../../../classes/ValueTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const HuntersPath = new DbObjectWeapon({
    name: 'hunters_path',
    serializeId: 125,
    gameId: 15511,
    iconClass: "weapon-icon-bow-hunters-path",
    rarity: 5,
    weapon: 'bow',
    statTable: weaponStatTables.HuntersPath,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.at_the_end_of_the_beast_paths',
            description: 'talent_descr.at_the_end_of_the_beast_paths_1',
            stats: [
                new StatTable('dmg_anemo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_geo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_pyro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_electro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_hydro', [12, 15, 18, 21, 24]),
                new StatTable('dmg_cryo', [12, 15, 18, 21, 24]),
                new StatTable('dmg_dendro', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_hunters_path',
            serializeId: 1,
            title: 'talent_name.at_the_end_of_the_beast_paths',
            description: 'talent_descr.at_the_end_of_the_beast_paths_2',
            stats: [
                new StatTable('text_percent', [160, 200, 240, 280, 320]),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            leveling: 'weapon_refine',
            source: 'weapon',
            values: new ValueTable([160, 200, 240, 280, 320]),
            condition: new ConditionBoolean({name: 'weapon_hunters_path'}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['charged'],
            }),
        }),
    ],
});
