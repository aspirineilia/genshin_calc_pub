import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const PrimordialJadeWingedSpear = new DbObjectWeapon({
    name: 'primordial_jade_winged_spear',
    serializeId: 94,
    gameId: 13505,
    iconClass: "weapon-icon-polearm-primordial-jade-winged-spear",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.PrimordialJadeWingedSpear,
    conditions: [
        new ConditionStacks({
            name: 'primordial_jade_winged_spear',
            serializeId: 1,
            title: 'talent_name.primordial_jade_winged_spear',
            description: 'talent_descr.primordial_jade_winged_spear_1',
            maxStacks: 7,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [3.2, 3.9, 4.6, 5.3, 6]),
                new StatTable('text_percent', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionBooleanValue({
            title: 'talent_name.primordial_jade_winged_spear',
            description: 'talent_descr.primordial_jade_winged_spear_2',
            levelSetting: 'weapon_refine',
            cond: 'ge',
            value: 7,
            setting: 'primordial_jade_winged_spear',
            stats: [
                new StatTable('dmg_all', [12, 15, 18, 21, 24]),
            ],
        }),
    ],
});
