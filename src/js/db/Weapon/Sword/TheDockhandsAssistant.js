import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const TheDockhandsAssistant = new DbObjectWeapon({
    name: 'the_dockhands_assistant',
    serializeId: 158,
    gameId: 11427,
    iconClass: 'weapon-icon-sword-the-dockhands-assistant',
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.TheDockhandsAssistant,
    conditions: [
        new ConditionStacks({
            name: 'weapon_sea_shanty',
            serializeId: 1,
            title: 'talent_name.weapon_sea_shanty',
            description: 'talent_descr.weapon_sea_shanty',
            maxStacks: 3,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [40, 50, 60, 70, 80]),
                new StatTable('text_decimal', [2, 2.5, 3, 3.5, 4]),
            ],
        }),
    ],
});
