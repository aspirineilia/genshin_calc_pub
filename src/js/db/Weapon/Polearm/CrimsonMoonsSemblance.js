import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionNumberBondOfLife } from "../../../classes/Condition/Number/BondOfLife";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CrimsonMoonsSemblance = new DbObjectWeapon({
    name: 'crimson_moons_semblance',
    serializeId: 172,
    gameId: 13512,
    iconClass: "weapon-icon-polearm-crimson-moons-semblance",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.CrimsonMoonsSemblance,
    conditions: [
        new ConditionNumberBondOfLife({
            serializeId: 1,
        }),
        new ConditionStaticRefine({
            title: 'talent_name.crimson_moons_semblance',
            description: 'talent_descr.crimson_moons_semblance_1',
            stats: [
                new StatTable('text_percent', [25]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.crimson_moons_semblance',
            description: 'talent_descr.crimson_moons_semblance_2',
            stats: [
                new StatTable('dmg_all', [12, 16, 20, 24, 28]),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'common.bond_of_life',
                    cond: 'ge',
                    value: 1,
                }),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.crimson_moons_semblance',
            description: 'talent_descr.crimson_moons_semblance_3',
            stats: [
                new StatTable('text_percent', [30]),
                new StatTable('dmg_all', [24, 32, 40, 48, 56]),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'common.bond_of_life',
                    cond: 'ge',
                    value: 30,
                }),
            ],
        }),
    ],
});
