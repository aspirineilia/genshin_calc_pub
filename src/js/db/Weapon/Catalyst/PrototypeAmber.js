import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeatureHeal } from "../../../classes/Feature2/Heal";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const PrototypeAmber = new DbObjectWeapon({
    name: 'prototype_amber',
    serializeId: 53,
    gameId: 14406,
    iconClass: "weapon-icon-catalyst-prototype-amber",
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.PrototypeAmber,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_prototype_amber',
            description: 'talent_descr.weapon_prototype_amber',
            stats: [
                new StatTable('text_decimal', [4, 4.5, 5, 5.5, 6]),
                new StatTable('text_percent', [4, 4.5, 5, 5.5, 6]),
            ],
        }),
    ],
    features: [
        new FeatureHeal({
            category: 'weapon',
            multipliers: [
                new FeatureMultiplier({
                    scaling: 'hp*',
                    leveling: 'weapon_refine',
                    values: new StatTable('prototype_amber_heal', [4, 4.5, 5, 5.5, 6]),
                }),
            ],
        }),
    ],
});
