import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

export const Rust = new DbObjectWeapon({
    name: 'rust',
    serializeId: 34,
    gameId: 15405,
    iconClass: "weapon-icon-bow-rust",
    rarity: 4,
    weapon: 'bow',
    statTable: weaponStatTables.Rust,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_rust_passive',
            description: 'talent_descr.weapon_rust_passive',
            stats: [
                new StatTable('dmg_normal', [40, 50, 60, 70, 80]),
                new StatTable('dmg_charged', [-10]),
                new StatTable('text_percent', [10]),
            ],
        }),
    ],
});

