import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const HaranGeppakuFutsu = new DbObjectWeapon({
    name: 'haran_geppaku_futsu',
    serializeId: 121,
    gameId: 11510,
    iconClass: "weapon-icon-sword-haran-geppaku-futsu",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.HaranGeppakuFutsu,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.haran_geppaku_futsu',
            description: 'talent_descr.haran_geppaku_futsu_1',
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
        new ConditionStacks({
            name: 'haran_geppaku_futsu',
            serializeId: 1,
            title: 'talent_name.haran_geppaku_futsu_2',
            description: 'talent_descr.haran_geppaku_futsu_2',
            maxStacks: 2,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('dmg_normal', [20, 25, 30, 35, 40]),
            ],
        }),
    ],
});

