import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const MorningHibernation = new DbObjectWeapon({
    name: 'morning_hibernation',
    serializeId: 196,
    gameId: 14518,
    iconClass: 'weapon-icon-catalyst-sunny-morning-sleep-in',
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.MorningHibernation,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_morning_hibernation_1',
            serializeId: 1,
            title: 'talent_name.weapon_morning_hibernation',
            description: 'talent_descr.weapon_morning_hibernation_1',
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [120, 150, 180, 210, 240]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_morning_hibernation_2',
            serializeId: 2,
            title: 'talent_name.weapon_morning_hibernation',
            description: 'talent_descr.weapon_morning_hibernation_2',
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [96, 120, 144, 168, 192]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_morning_hibernation_3',
            serializeId: 3,
            title: 'talent_name.weapon_morning_hibernation',
            description: 'talent_descr.weapon_morning_hibernation_3',
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [32, 40, 48, 56, 64]),
            ],
        }),
    ],
});

