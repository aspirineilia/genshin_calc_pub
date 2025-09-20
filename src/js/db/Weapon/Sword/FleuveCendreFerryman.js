import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const FleuveCendreFerryman = new DbObjectWeapon({
    name: 'fleuve_cendre_ferryman',
    serializeId: 148,
    gameId: 11426,
    iconClass: 'weapon-icon-sword-fleuve-cendre-ferryman',
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.FleuveCendreFerryman,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_fleuve_cendre_ferryman',
            description: 'talent_descr.weapon_fleuve_cendre_ferryman_1',
            stats: [
                new StatTable('crit_rate_skill', [8, 10, 12, 14, 16]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_fleuve_cendre_ferryman',
            serializeId: 1,
            title: 'talent_name.weapon_fleuve_cendre_ferryman',
            description: 'talent_descr.weapon_fleuve_cendre_ferryman_2',
            stats: [
                new StatTable('recharge', [16, 20, 24, 28, 32]),
            ],
        }),
    ],
});
