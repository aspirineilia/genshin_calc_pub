import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanNightSoul } from "../../../classes/Condition/Boolean/NightSoul";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";
import { atkTables } from "../AtkTables";

const NightSoulRatio = 0.75;

export const AThousandBlazingSuns = new DbObjectWeapon({
    name: 'a_thousand_blazing_suns',
    serializeId: 193,
    gameId: 12514,
    iconClass: "weapon-icon-claymore-a-thousand-blazing-suns",
    rarity: 5,
    weapon: 'claymore',
    statTable: weaponStatTables.AThousandBlazingSuns,
    conditions: [
        new ConditionBoolean({
            name: 'common.nightsoul_blessing_state',
            serializeId: 1,
            title: 'talent_name.nightsoul_blessing_state',
            subConditions: [
                new ConditionBooleanNightSoul(),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_a_thousand_blazing_suns',
            serializeId: 2,
            title: 'talent_name.weapon_a_thousand_blazing_suns',
            description: 'talent_descr.weapon_a_thousand_blazing_suns_1',
            stats: [
                new StatTable('crit_dmg', [20, 25, 30, 35, 40]),
                new StatTable('atk_percent', [28, 37, 42, 49, 56]),
            ],
        }),
        new ConditionStaticRefine({
            title: 'talent_name.weapon_a_thousand_blazing_suns',
            description: 'talent_descr.weapon_a_thousand_blazing_suns_2',
            stats: [
                new StatTable('text_petcent', [100 * NightSoulRatio]),
                new StatTable('crit_dmg', [20 * NightSoulRatio, 25 * NightSoulRatio, 30 * NightSoulRatio, 35 * NightSoulRatio, 40 * NightSoulRatio]),
                new StatTable('atk_percent', [28 * NightSoulRatio, 37 * NightSoulRatio, 42 * NightSoulRatio, 49 * NightSoulRatio, 56 * NightSoulRatio]),
            ],
            subConditions: [
                new ConditionBooleanNightSoul(),
                new ConditionBoolean({name: 'common.nightsoul_blessing_state'}),
                new ConditionBooleanRefine({name: 'weapon_a_thousand_blazing_suns'}),
            ],
        }),
    ],
});

