import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStacksHidden } from "../../../classes/Condition/Stacks/Hidden";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CalamityQueller = new DbObjectWeapon({
    name: 'calamity_queller',
    serializeId: 118,
    gameId: 13507,
    iconClass: "weapon-icon-polearm-calamity-queller",
    rarity: 5,
    weapon: 'polearm',
    statTable: weaponStatTables.CalamityQueller,
    settingsSets: [
        {
            name: 'on_field',
            settings: {
                weapon_calamity_queller: 6,
                weapon_calamity_queller_off_field: 0,
            },
        },
        {
            name: 'off_field',
            settings: {
                weapon_calamity_queller: 6,
                weapon_calamity_queller_off_field: 1,
            },
        },
    ],
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_calamity_queller',
            description: 'talent_descr.weapon_calamity_queller',
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
        new ConditionStacks({
            name: 'weapon_calamity_queller',
            serializeId: 1,
            title: 'talent_name.weapon_calamity_queller',
            description: 'talent_descr.weapon_calamity_queller_2',
            maxStacks: 6,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [3.2, 4, 4.8, 5.6, 6.4]),
            ],
        }),
        new ConditionBoolean({
            name: 'weapon_calamity_queller_off_field',
            serializeId: 2,
            title: 'talent_name.weapon_calamity_queller',
            description: 'talent_descr.weapon_calamity_queller_3',
        }),
        new ConditionStacksHidden({
            name: 'weapon_calamity_queller',
            maxStacks: 6,
            levelSetting: 'weapon_refine',
            stats: [
                new StatTable('atk_percent', [3.2, 4, 4.8, 5.6, 6.4]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'weapon_calamity_queller_off_field'}),
            ],
        }),
    ],
});
