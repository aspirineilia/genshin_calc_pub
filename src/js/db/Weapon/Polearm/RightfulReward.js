import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const RightfulReward = new DbObjectWeapon({
    name: 'rightful_reward',
    serializeId: 152,
    gameId: 13425,
    iconClass: 'weapon-icon-polearm-rightful-reward',
    rarity: 4,
    weapon: 'polearm',
    statTable: weaponStatTables.RightfulReward,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_rightful_reward',
            description: 'talent_descr.weapon_rightful_reward',
            stats: [
                new StatTable('text_number', [8, 10, 12, 14, 16]),
            ],
        }),
    ],
});
