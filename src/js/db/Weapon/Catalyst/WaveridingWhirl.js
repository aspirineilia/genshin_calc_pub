import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { ConditionStaticRefineWaveridingWhirl } from "../../../classes/Condition/Static/Refine/WaveridingWhirl";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { atkTables } from "../AtkTables";

export const WaveridingWhirl = new DbObjectWeapon({
    name: 'waveriding_whirl',
    serializeId: 192,
    gameId: 14430,
    iconClass: "weapon-icon-catalyst-waveriding-whirl",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.WaveridingWhirl,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.waveriding_whirl',
            description: 'talent_descr.waveriding_whirl_1',
            stats: [
                new StatTable('text_percent', [15]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'waveriding_whirl',
            serializeId: 1,
            title: 'talent_name.waveriding_whirl',
            description: 'talent_descr.waveriding_whirl_2',
            stats: [
                new StatTable('hp_percent', [20, 25, 30, 35, 40]),
            ],
        }),
        new ConditionStaticRefineWaveridingWhirl({
            title: 'talent_name.waveriding_whirl',
            description: 'talent_descr.waveriding_whirl_3',
            levelSetting: 'weapon_refine',
            effectLevelSetting: 'party_elements_different',
            stats: [
                new StatTable('text_percent', [12, 15, 18, 21, 24]),
                new StatTable('text_percent_max', [24, 30, 36, 42, 48]),
            ],
            realStats: [
                new StatTable('', [
                    new StatTable('hp_percent', [12, 15, 18, 21, 24]),
                    new StatTable('hp_percent', [24, 30, 36, 42, 48]),
                ]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'waveriding_whirl'}),
            ],
        }),
    ],
});

