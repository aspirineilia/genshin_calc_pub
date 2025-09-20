import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsHP } from "../../../classes/PostEffect/Stats/HP";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const atkBuff = new PostEffectStatsHP({
    levelSetting: 'weapon_refine',
    percent: new StatTable('atk', [0.012, 0.015, 0.018, 0.021, 0.024]),
});

export const PrimordialJadeCutter = new DbObjectWeapon({
    name: 'primordial_jade_cutter',
    serializeId: 14,
    gameId: 11505,
    iconClass: "weapon-icon-sword-primordial-jade-cutter",
    rarity: 5,
    weapon: 'sword',
    statTable: weaponStatTables.PrimordialJadeCutter,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_primordial_jade_cutter',
            description: 'talent_descr.weapon_primordial_jade_cutter',
            stats: [
                new StatTable('hp_percent', [20, 25, 30, 35, 40]),
                new StatTable('text_percent', [1.2, 1.5, 1.8, 2.1, 2.4]),
            ],
        }),
    ],
    postEffects: [atkBuff],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'atk_bonus',
            postEffect: atkBuff,
        }),
    ],
});
