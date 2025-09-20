import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { StatTable } from "../../../classes/StatTable";

export const UnfinishedReverie = new ArtifactSet({
    serializeId: 51,
    goodId: 'UnfinishedReverie',
    gameId: 15036,
	itemIds: [36412, 36413, 36422, 36423, 36432, 36433, 36442, 36443, 36452, 36453, 36513, 36514, 36523, 36524, 36533, 36534, 36543, 36544, 36553, 36554, 23731, 23732, 23733, 23734, 23735, 23736, 23737, 23738, 23739, 23740],
    name: "artifact_set.unfinished_reverie",
    iconClass: "artifact-icon-unfinished-reverie",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.unfinished_reverie_2',
                    description: 'set_descr.unfinished_reverie_2',
                    settings: {},
                    stats: {
                        atk_percent: 18,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStacks({
                    name: 'set.unfinished_reverie_4',
                    serializeId: 39,
                    title: 'set_bonus.unfinished_reverie_4',
                    description: 'set_descr.unfinished_reverie_4',
                    maxStacks: 5,
                    stats: [
                        new StatTable('text_percent_max', [50]),
                        new StatTable('dmg_all', [10]),
                    ],
                }),
            ],
        },
    ],
})
