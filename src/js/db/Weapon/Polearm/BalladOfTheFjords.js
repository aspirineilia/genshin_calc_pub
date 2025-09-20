import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionCalcElements } from "../../../classes/Condition/CalcElements";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const BalladOfTheFjords = new DbObjectWeapon({
    name: 'ballad_of_the_fjords',
    serializeId: 151,
    gameId: 13424,
    iconClass: 'weapon-icon-polearm-ballad-of-the-fjords',
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.BalladOfTheFjords,
    conditions: [
        new ConditionCalcElements({}),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_ballad_of_the_fjords',
            description: 'talent_descr.weapon_ballad_of_the_fjords',
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('mastery', [120, 150, 180, 210, 240]),
            ],
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'party_elements_count_level',
                    cond: 'ge',
                    value: 3,
                }),
            ],
        }),
    ],
});
