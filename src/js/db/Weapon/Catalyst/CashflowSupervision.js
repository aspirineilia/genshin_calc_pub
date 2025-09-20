import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CashflowSupervision = new DbObjectWeapon({
    name: 'cashflow_supervision',
    serializeId: 163,
    gameId: 14513,
    iconClass: "weapon-icon-catalyst-cashflow-supervision",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.CashflowSupervision,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_cashflow_supervision',
            description: 'talent_descr.weapon_cashflow_supervision_1',
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_cashflow_supervision',
            serializeId: 1,
            title: 'talent_name.weapon_cashflow_supervision',
            description: 'talent_descr.weapon_cashflow_supervision_2',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_normal', [16, 20, 24, 28, 32]),
                new StatTable('dmg_charged', [14, 17.5, 21, 24.5, 28]),
            ],
        }),
        new ConditionBooleanValue({
            title: 'talent_name.weapon_cashflow_supervision',
            description: 'talent_descr.weapon_cashflow_supervision_3',
            levelSetting: 'weapon_refine',
            cond: 'ge',
            value: 3,
            setting: 'weapon_cashflow_supervision',
            stats: [
                new StatTable('atk_speed_normal', [8, 10, 12, 14, 16]),
            ],
        }),
    ],
});

