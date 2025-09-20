import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanChar } from "../../../classes/Condition/Boolean/Char";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SwordofDescension = new DbObjectWeapon({
    name: 'sword_of_descension',
    serializeId: 21,
    gameId: 11412,
    iconClass: "weapon-icon-sword-sword-of-descension",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.SwordofDescension,
    conditions: [
        new ConditionBoolean({
            name: 'common.ps_network',
            serializeId: 1,
            title: 'talent_name.ps_network',
            description: 'talent_descr.ps_network',
        }),
        new ConditionStatic({
            title: 'talent_name.sword_of_descension',
            description: 'talent_descr.sword_of_descension_1',
            stats: {
                atk: 66,
            },
            subConditions: [
                new ConditionBooleanChar({
                    chars: ['traveler_anemo', 'traveler_geo', 'traveler_electro', 'taveler_dendro', 'traveler_hydro', 'traveler_pyro', 'traveler_cryo'],
                }),
                new ConditionBoolean({name: 'common.ps_network'}),
            ],
        }),
        new ConditionStatic({
            title: 'talent_name.sword_of_descension',
            description: 'talent_descr.sword_of_descension_2',
            stats: {
                text_percent_chance: 50,
                text_percent_dmg: 200,
            },
            subConditions: [
                new ConditionBoolean({name: 'common.ps_network'}),
            ],
        }),
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    leveling: 'weapon_refine',
                    values: new StatTable('sword_of_descension_dmg', [200]),
                }),
            ],
            condition: new ConditionBoolean({name: 'common.ps_network'}),
        }),
    ],
});
