import { ConditionStaticRefine } from "../../../classes/Condition/Static/Refine";
import { DbObjectWeapon } from "../../../classes/DbObject/Weapon";
import { FeaturePostEffectValue } from "../../../classes/Feature2/PostEffectValue";
import { PostEffectPartyEnergy } from "../../../classes/PostEffect/Stats/PartyEnergy";
import { StatTable } from "../../../classes/StatTable";
import { weaponStatTables } from "../../generated/WeaponStatTables";

const weaponPost = new PostEffectPartyEnergy({
    percent: new StatTable('dmg_burst', [0.12, 0.15, 0.18, 0.21, 0.24]),
    levelSetting: 'weapon_refine',
    statCap: new StatTable('', [40, 50, 60, 70, 80]),
});

export const Akoumaru = new DbObjectWeapon({
    name: 'akuoumaru',
    serializeId: 113,
    gameId: 12416,
    iconClass: "weapon-icon-claymore-akuoumaru",
    rarity: 4,
    weapon: 'claymore',
    statTable: weaponStatTables.Akuoumaru,
    conditions: [
        new ConditionStaticRefine({
            title: 'talent_name.weapon_watatsumi_wavewalker',
            description: 'talent_descr.weapon_watatsumi_wavewalker',
            stats: [
                new StatTable('text_percent_bonus', [0.12, 0.15, 0.18, 0.21, 0.24]),
                new StatTable('text_percent_cap', [40, 50, 60, 70, 80]),
            ],
        }),
    ],
    postEffects: [
        weaponPost,
    ],
    features: [
        new FeaturePostEffectValue({
            name: 'burst_dmg_bonus',
            category: 'weapon',
            postEffect: weaponPost,
            format: 'percent',
        }),
    ],
});
