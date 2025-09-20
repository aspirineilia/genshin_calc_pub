import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { atkTables } from "../AtkTables";

export const TalkingStick = new DbObjectWeapon({
    name: 'talking_stick',
    serializeId: 149,
    gameId: 12424,
    iconClass: 'weapon-icon-claymore-talking-stick',
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.TalkingStick,
    settingsSets: [
        {
            name: 'unbuffed',
            settings: {
                "weapon_talking_stick_1": 0,
                "weapon_talking_stick_2": 0,
            },
        },
        {
            name: 'stick_pypo',
            settings: {
                "weapon_talking_stick_1": 1,
                "weapon_talking_stick_2": 0,
            },
        },
        {
            name: 'stick_other',
            settings: {
                "weapon_talking_stick_1": 0,
                "weapon_talking_stick_2": 1,
            },
        },
    ],
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_talking_stick_1',
            serializeId: 1,
            title: 'talent_name.weapon_talking_stick_1',
            description: 'talent_descr.weapon_talking_stick_1',
            stats: [
                new StatTable('atk_percent', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_talking_stick_2',
            serializeId: 2,
            title: 'talent_name.weapon_talking_stick_2',
            description: 'talent_descr.weapon_talking_stick_2',
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
    ],
});
