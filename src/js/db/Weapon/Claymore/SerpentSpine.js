import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SerpentSpine = new DbObjectWeapon({
    name: 'serpent_spine',
    serializeId: 42,
    gameId: 12409,
    iconClass: "weapon-icon-claymore-serpent-spine",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.SerpentSpine,
    conditions: [
        new ConditionStacks({
            name: 'weapon_serpent_spine',
            serializeId: 1,
            title: 'talent_name.weapon_wavesplitter',
            description: 'talent_descr.weapon_wavesplitter',
            maxStacks: 5,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_all', [6, 7, 8, 9, 10]),
                new StatTable('dmg_recieved', [3, 2.7, 2.4, 2.2, 2]),
            ],
        }),
    ],
});

