import { ConditionBoLStat } from "../../classes/Condition/BoLStat";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionMillenialMovement } from "../../classes/Condition/MillenialMovement";
import { DbObjectBuff } from "../../classes/DbObject/Buff";
import { PostEffectKhajNisut } from "../../classes/PostEffect/KhajNisut";
import { StatTable } from "../../classes/StatTable";

export const Static = new DbObjectBuff({
    name: 'static',
    invisible: true,
    conditions: [
        new ConditionMillenialMovement({
            atkBuff: [
                new StatTable('atk_percent', [20, 25, 30, 35, 40]),
            ],
            atkSpeedBuff: [
                new StatTable('atk_speed_normal', [12, 15, 18, 21, 24]),
            ],
            masteryBuff: [
                new StatTable('mastery', [100, 125, 150, 175, 200]),
            ],
            affixBuff: [
                new StatTable('dmg_normal', [16, 20, 24, 28, 32]),
                new StatTable('dmg_charged', [16, 20, 24, 28, 32]),
                new StatTable('dmg_plunge', [16, 20, 24, 28, 32]),
            ],
        }),
        new ConditionBoLStat({
            condition: new ConditionBoolean({name: 'common.bond_of_life'}),
        }),
    ],
    postEffects: [
        new PostEffectKhajNisut({
            percent: new StatTable('mastery', [0.002, 0.0025, 0.003, 0.0035, 0.004]),
        }),
    ],
});
