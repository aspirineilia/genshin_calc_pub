import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionNumberLevels } from "../../../classes/Condition/Number/Levels";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsBondOfLife } from "../../../classes/PostEffect/Stats/BondOfLife";
import { StatTable } from "../../../classes/StatTable";
import { BOND_OF_LIFE_MAX_PERCENT } from "../../Constants";
import { weaponStatTables } from "../../generated/WeaponStatTables";

let bonusTable = [0.002, 0.0025, 0.003, 0.0035, 0.004];
let elementalBase = [8, 10, 12, 14, 16];
let elementalBonus = [12, 15, 18, 21, 24];

const weaponPost = new PostEffectStatsBondOfLife({
    levelSetting: 'weapon_refine',
    bolSettingName: 'weapon_flowing_purity_bol',
    percent: [
        new StatTable('dmg_anemo', bonusTable),
        new StatTable('dmg_geo', bonusTable),
        new StatTable('dmg_pyro', bonusTable),
        new StatTable('dmg_electro', bonusTable),
        new StatTable('dmg_hydro', bonusTable),
        new StatTable('dmg_cryo', bonusTable),
        new StatTable('dmg_dendro', bonusTable),
    ],
    statCap: new StatTable('', elementalBonus),
    conditions: [
        new ConditionBoolean({name: 'weapon_flowing_purity_bol'}),
    ],
});

export const FlowingPurity = new DbObjectWeapon({
    name: 'flowing_purity',
    serializeId: 154,
    gameId: 14425,
    iconClass: 'weapon-icon-catalyst-flowing-purity',
    rarity: 4,
    weapon: 'catalyst',
    statTable: weaponStatTables.FlowingPurity,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_flowing_purity_1',
            serializeId: 1,
            title: 'talent_name.weapon_flowing_purity_1',
            description: 'talent_descr.weapon_flowing_purity_1',
            stats: [
                new StatTable('dmg_anemo', elementalBase),
                new StatTable('dmg_geo', elementalBase),
                new StatTable('dmg_pyro', elementalBase),
                new StatTable('dmg_electro', elementalBase),
                new StatTable('dmg_hydro', elementalBase),
                new StatTable('dmg_cryo', elementalBase),
                new StatTable('dmg_dendro', elementalBase),
            ],
        }),
        new ConditionNumberLevels({
            name: 'weapon_flowing_purity_bol',
            serializeId: 2,
            max: BOND_OF_LIFE_MAX_PERCENT,
            levelSetting: 'weapon_refine',
            title: 'talent_name.weapon_flowing_purity_2',
            description: 'talent_descr.weapon_flowing_purity_2',
            stats: [
                new StatTable('text_percent', [2, 2.5, 3, 3.5, 4]),
                new StatTable('text_value_hp', [1000]),
                new StatTable('text_percent_max', elementalBonus),
            ],
        }),
    ],
    postEffects: [
        weaponPost,
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'weapon_finale_of_the_deep_bonus',
            postEffect: weaponPost,
            format: 'percent',
            digits: 2,
        }),
    ],
});
