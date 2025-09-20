import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionCalcElements } from "../../../classes/Condition/CalcElements";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStaticRefineDreamsOther } from "../../../classes/Condition/Static/Refine/DreamsOther";
import { ConditionStaticRefineDreamsSame } from "../../../classes/Condition/Static/Refine/DreamsSame";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const ThousandFloatingDreams = new DbObjectWeapon({
    name: 'a_thousand_floating_dreams',
    serializeId: 138,
    gameId: 14511,
    iconClass: "weapon-icon-catalyst-a-thousand-floating-dreams",
    rarity: 5,
    weapon: 'catalyst',
    statTable: weaponStatTables.ThousandFloatingDreams,
    conditions: [
        new ConditionCalcElements({}),
        new ConditionStatic({
            title: 'talent_name.weapon_thousand_floating_dreams',
            description: 'talent_descr.weapon_thousand_floating_dreams_static',
        }),
        new ConditionStaticRefineDreamsSame({
            title: 'talent_name.weapon_thousand_floating_dreams',
            description: 'talent_descr.weapon_thousand_floating_dreams_same',
            stats: [
                new StatTable('mastery', [32, 40, 48, 56, 64]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'party_elements_same'}),
            ],
        }),
        new ConditionStaticRefineDreamsOther({
            title: 'talent_name.weapon_thousand_floating_dreams',
            description: 'talent_descr.weapon_thousand_floating_dreams_other',
            stats: [
                new StatTable('dmg_own', [10, 14, 18, 22, 26]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'party_elements_different'}),
            ],
        }),
    ],
});

