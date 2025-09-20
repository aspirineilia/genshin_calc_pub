import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const DialoguesOfTheDesertSages = new DbObjectWeapon({
    name: 'weapon_dialogues_of_the_desert_sages',
    serializeId: 171,
    gameId: 13426,
    iconClass: 'weapon-icon-polearm-dialogues-of-the-desert-sages',
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.DialoguesOfTheDesertSages,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_dialogues_of_the_desert_sages',
            description: 'talent_descr.weapon_dialogues_of_the_desert_sages',
            stats: [
                new StatTable('text_number', [8, 10, 12, 14, 16]),
            ],
        }),
    ],
});
