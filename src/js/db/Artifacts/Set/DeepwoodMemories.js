import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const DeepwoodMemories = new ArtifactSet({
    serializeId: 41,
    goodId: 'DeepwoodMemories',
    gameId: 15025,
	itemIds: [20412, 20413, 20422, 20423, 20432, 20433, 20442, 20443, 20452, 20453, 20513, 20514, 20523, 20524, 20533, 20534, 20543, 20544, 20553, 20554, 23621, 23622, 23623, 23624, 23625, 23626, 23627, 23628, 23629, 23630],
    name: "artifact_set.deepwood_memories",
    iconClass: "artifact-icon-deepwood-memories",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.deepwood_memories_2',
                    description: 'set_descr.deepwood_memories_2',
                    stats: {
                        dmg_dendro: 15,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.deepwood_memories_4',
                    serializeId: 26,
                    title: 'set_bonus.deepwood_memories_4',
                    description: 'set_descr.deepwood_memories_4',
                    stats: {
                        text_percent: 30,
                    },
                }),
            ],
        },
    ],
});
