import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../../classes/Feature2/Multiplier/Target";
import { StatTable } from "../../../classes/StatTable";
import { ValueTable } from "../../../classes/ValueTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const LightofFoliarIncision = new DbObjectWeapon({
    name: 'light_of_foliar_incision',
    serializeId: 141,
    gameId: 11512,
    iconClass: "weapon-icon-sword-light-of-foliar-incision",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.LightofFoliarIncision,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_light_of_foliar_incision',
            description: 'talent_descr.weapon_light_of_foliar_incision_1',
            stats: [
                new StatTable('crit_rate', [4, 5, 6, 7, 8]),
            ],
        }),
        new ConditionBooleanRefine({
            name: 'weapon_light_of_foliar_incision',
            serializeId: 1,
            title: 'talent_name.weapon_light_of_foliar_incision',
            description: 'talent_descr.weapon_light_of_foliar_incision_2',
            stats: [
                new StatTable('text_percent', [120, 150, 180, 210, 240]),
            ],
        }),
    ],
    multipliers: [
        new FeatureMultiplier({
            scaling: 'mastery*',
            leveling: 'weapon_refine',
            source: 'weapon',
            values: new ValueTable([120, 150, 180, 210, 240]),
            condition: new ConditionBoolean({name: 'weapon_light_of_foliar_incision'}),
            target: new FeatureMultiplierTarget({
                damageTypes: ['normal', 'skill'],
            }),
        }),
    ],
});
