import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { StatTable } from "../../../classes/StatTable";

export const FlowerOfParadiseLost = new ArtifactSet({
    serializeId: 43,
    goodId: 'FlowerOfParadiseLost',
    gameId: 15028,
	itemIds: [28412, 28413, 28422, 28423, 28432, 28433, 28442, 28443, 28452, 28453, 28513, 28514, 28523, 28524, 28533, 28534, 28543, 28544, 28553, 28554, 23651, 23652, 23653, 23654, 23655, 23656, 23657, 23658, 23659, 23660],
    name: "artifact_set.flower_of_paradise_lost",
    iconClass: "artifact-icon-flower-of-paradise-lost",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.flower_of_paradise_lost_2',
                    description: 'set_descr.flower_of_paradise_lost_2',
                    stats: {
                        mastery: 80,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.flower_of_paradise_lost_4',
                    description: 'set_descr.flower_of_paradise_lost_4_1',
                    stacks: 4,
                    stats: {
                        'dmg_reaction_bloom': 40,
                    },
                }),
                new ConditionStacks({
                    name: 'set.flower_of_paradise_lost_4',
                    serializeId: 30,
                    title: 'set_bonus.flower_of_paradise_lost_4',
                    description: 'set_descr.flower_of_paradise_lost_4_2',
                    maxStacks: 4,
                    stats: [
                        new StatTable('dmg_reaction_bloom', [10]),
                    ],
                }),
            ],
        },
    ],
})
