import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionShatteredChains } from "../../../classes/Condition/ShatteredChains";
import { ConditionStacksSetting } from "../../../classes/Condition/Stacks/Setting";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
// import { weaponStatTables } from "../../generated/WeaponStatTables";
import { atkTables } from "../AtkTables";

export const ShatteredChains = new DbObjectWeapon({
    name: 'shattered_chains',
    serializeId: 177,
    gameId: 15431,
    iconClass: "weapon-icon-bow-chain-breaker",
    rarity: 4,
    weapon: 'bow',
    statTable: [
        atkTables.s4atk44,
        atkTables.s4atkp6,
    ],
    conditions: [
        new ConditionShatteredChains(),
        new ConditionStacksSetting({
            name: 'weapon_shattered_chains_stacks',
            serializeId: 1,
            title: 'talent_name.weapon_shattered_chains',
            description: 'talent_descr.weapon_shattered_chains_1',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [4.8, 6, 7.2, 8.4, 9.6]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'weapon_shattered_chains_stacks'}),
            ],
        }),
        new ConditionBooleanValue({
            title: 'talent_name.weapon_shattered_chains',
            description: 'talent_descr.weapon_shattered_chains_2',
            levelSetting: 'weapon_refine',
            cond: 'ge',
            value: 3,
            setting: 'weapon_shattered_chains_stacks',
            stats: [
                new StatTable('mastery', [24, 30, 36, 42, 48]),
            ],
        }),
    ],
});
