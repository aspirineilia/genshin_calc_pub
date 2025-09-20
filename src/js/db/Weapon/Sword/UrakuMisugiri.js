import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const UrakuMisugiri = new DbObjectWeapon({
    name: 'uraku_misugiri',
    serializeId: 170,
    gameId: 11514,
    iconClass: "weapon-icon-sword-uraku-misugiri",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.UrakuMisugiri,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_uraku_misugiri',
            description: 'talent_descr.weapon_uraku_misugiri_1',
            stats: [
                new StatTable('dmg_normal', [16, 20, 24, 28, 32]),
                new StatTable('dmg_skill', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_uraku_misugiri',
            serializeId: 1,
            title: 'talent_name.weapon_uraku_misugiri',
            description: 'talent_descr.weapon_uraku_misugiri_2',
            stats: [
                new StatTable('dmg_normal', [16, 20, 24, 28, 32]),
                new StatTable('dmg_skill', [24, 30, 36, 42, 48]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_uraku_misugiri',
            description: 'talent_descr.weapon_uraku_misugiri_3',
            stats: [
                new StatTable('def_percent', [20, 25, 30, 35, 40]),
            ],
        }),
    ],
});
