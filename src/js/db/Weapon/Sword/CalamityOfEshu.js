import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const CalamityOfEshu = new DbObjectWeapon({
    name: 'calamity_of_eshu',
    serializeId: 191,
    gameId: 11432,
    iconClass: "weapon-icon-sword-calamity-of-eshu",
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.CalamityOfEshu,
    settingsSets: [
        {
            name: 'no_shield',
            settings: {
                "common.char_status_shield": 0,
            },
        },
        {
            name: 'with_shield',
            settings: {
                "common.char_status_shield": 1,
            },
        },
    ],
    conditions: [
        new ConditionBoolean({
            name: 'common.char_status_shield',
            serializeId: 1,
            title: 'buffs_name.resonance_geo_shield',
        }),
        new ConditionStaticRefine({
            title: 'talent_name.calamity_of_eshu',
            description: 'talent_descr.calamity_of_eshu',
            stats: [
                new StatTable('dmg_normal', [20, 25, 30, 35, 40]),
                new StatTable('dmg_charged', [20, 25, 30, 35, 40]),
                new StatTable('crit_rate_normal', [8, 10, 12, 14, 16]),
                new StatTable('crit_rate_charged', [8, 10, 12, 14, 16]),
            ],
            subConditions: [
                new ConditionBoolean({name: 'common.char_status_shield'}),
            ],
        }),
    ],
});
