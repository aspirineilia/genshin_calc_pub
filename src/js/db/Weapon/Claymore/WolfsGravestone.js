import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const WolfsGravestone = new DbObjectWeapon({
    name: 'wolfs_gravestone',
    serializeId: 63,
    gameId: 12502,
    iconClass: "weapon-icon-claymore-wolfs-gravestone",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.WolfsGravestone,
    settingsSets: [
        {
            name: 'unbuffed',
            settings: {
                "weapon_wolfs_gravestone": 0,
            },
        },
        {
            name: 'buffed',
            settings: {
                "weapon_wolfs_gravestone": 1,
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_wolfish_tracker',
            description: 'talent_descr.bonus_atk',
            stats: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_wolfs_gravestone',
            serializeId: 1,
            title: 'talent_name.weapon_wolfish_tracker',
            description: 'talent_descr.weapon_wolfish_tracker',
            stats: [
                new StatTable('atk_percent', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
});

