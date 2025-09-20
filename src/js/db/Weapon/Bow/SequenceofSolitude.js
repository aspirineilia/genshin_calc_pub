import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureDamage } from "../../../classes/Feature2/Damage";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const SequenceofSolitude = new DbObjectWeapon({
    name: 'sequence_of_solitude',
    serializeId: 200,
    gameId: 15432,
    iconClass: "weapon-icon-bow-sequence-of-solitude",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.SequenceofSolitude,
    conditions: [
        new ConditionStaticRefine({
            name: 'weapon_sequence_of_solitude',
            serializeId: 1,
            title: 'talent_name.weapon_sequence_of_solitude',
            description: 'talent_descr.weapon_sequence_of_solitude',
            stats: [
                new StatTable('text_percent_dmg', [40, 50, 60, 70, 80]),
            ],
        })
    ],
    features: [
        new FeatureDamage({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'weapon_refine',
                    values: new StatTable('sequence_of_solitude_dmg', [40, 55, 70, 85, 100]),
                }),
            ],
        }),
    ],
});
