import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const WolfFang = new DbObjectWeapon({
    name: 'wolf_fang',
    serializeId: 146,
    gameId: 11424,
    iconClass: 'weapon-icon-sword-wolf-fang',
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.WolfFang,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_wolf_fang',
            description: 'talent_descr.weapon_wolf_fang_1',
            stats: [
                new StatTable('dmg_skill', [16, 20, 24, 28, 32]),
                new StatTable('dmg_burst', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_wolf_fang_1',
            serializeId: 1,
            title: 'talent_name.weapon_wolf_fang_2',
            description: 'talent_descr.weapon_wolf_fang_2',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('crit_rate_skill', [2, 2.5, 3, 3.5, 4]),
            ],
        }),
        new ConditionStacks({
            name: 'weapon_wolf_fang_2',
            serializeId: 2,
            title: 'talent_name.weapon_wolf_fang_3',
            description: 'talent_descr.weapon_wolf_fang_3',
            maxStacks: 4,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('crit_rate_burst', [2, 2.5, 3, 3.5, 4]),
            ],
        }),
    ],
});
