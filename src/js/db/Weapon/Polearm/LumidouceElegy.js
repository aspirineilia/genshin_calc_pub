
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const LumidouceElegy = new DbObjectWeapon({
    name: 'lumidouce_elegy',
    serializeId: 176,
    gameId: 13513,
    iconClass: "weapon-icon-polearm-lumidouce-elegy",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.LumidouceElegy,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_lumidouce_elegy',
            description: 'talent_descr.weapon_lumidouce_elegy_1',
            stats: [
                new StatTable('atk_percent', [15, 19, 23, 27, 31]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_lumidouce_elegy',
            serializeId: 1,
            title: 'talent_name.weapon_lumidouce_elegy',
            description: 'talent_descr.weapon_lumidouce_elegy_2',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_all', [18, 23, 28, 33, 38]),
                new StatTable('text_value_energy', [12, 13, 14, 15, 16]),
            ],
        }),
    ],
});
