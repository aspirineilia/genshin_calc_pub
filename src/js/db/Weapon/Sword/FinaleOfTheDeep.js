import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanRefine } from "../../../classes/Condition/Boolean/Refine";
import { ConditionNumberLevels } from "../../../classes/Condition/Number/Levels";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectStatsBondOfLife } from "../../../classes/PostEffect/Stats/BondOfLife";
import { StatTable } from "../../../classes/StatTable";
import { BOND_OF_LIFE_MAX_PERCENT } from "../../Constants";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const atkBuffPost = new PostEffectStatsBondOfLife({
    levelSetting: 'weapon_refine',
    bolSettingName: 'weapon_finale_of_the_deep_bol',
    percent: new StatTable('atk', [0.024, 0.03, 0.036, 0.042, 0.048]),
    statCap: new StatTable('', [150, 187.5, 225, 262.5, 300]),
    conditions: [
        new ConditionBoolean({name: 'weapon_finale_of_the_deep_bol'}),
    ],
});

export const FinaleOfTheDeep = new DbObjectWeapon({
    name: 'finale_of_the_deep',
    serializeId: 147,
    gameId: 11425,
    iconClass: 'weapon-icon-sword-finale-of-the-deep',
    rarity: 4,
    weapon: 'sword',
    statTable: weaponStatTables.FinaleOfTheDeep,
    conditions: [
        new ConditionBooleanRefine({
            name: 'weapon_finale_of_the_deep_1',
            serializeId: 1,
            title: 'talent_name.weapon_finale_of_the_deep',
            description: 'talent_descr.weapon_finale_of_the_deep_1',
            stats: [
                new StatTable('atk_percent', [12, 15, 18, 21, 24]),
            ],
        }),
        new ConditionNumberLevels({
            name: 'weapon_finale_of_the_deep_bol',
            serializeId: 2,
            max: BOND_OF_LIFE_MAX_PERCENT,
            levelSetting: 'weapon_refine',
            title: 'talent_name.weapon_finale_of_the_deep_2',
            description: 'talent_descr.weapon_finale_of_the_deep_2',
            stats: [
                new StatTable('text_decimal', [150, 187.5, 225, 262.5, 300]),
                new StatTable('text_percent_hp', [2.4, 3, 3.6, 4.2, 4.8]),
            ],
        }),
    ],
    postEffects: [
        atkBuffPost,
    ],
    features: [
        new FeaturePostEffectValue({
            category: 'weapon',
            name: 'weapon_finale_of_the_deep_bonus',
            postEffect: atkBuffPost,
            format: 'decimal',
            digits: 1,
        }),
    ],
});
