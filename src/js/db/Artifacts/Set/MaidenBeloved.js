import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const MaidenBeloved = new ArtifactSet({
    serializeId: 16,
    goodId: 'MaidenBeloved',
    gameId: 14004,
	itemIds: [74310, 74311, 74312, 74313, 74314, 74320, 74321, 74322, 74323, 74324, 74330, 74331, 74332, 74333, 74334, 74340, 74341, 74342, 74343, 74344, 74350, 74351, 74352, 74353, 74354, 74410, 74411, 74412, 74413, 74414, 74420, 74421, 74422, 74423, 74424, 74430, 74431, 74432, 74433, 74434, 74440, 74441, 74442, 74443, 74444, 74450, 74451, 74452, 74453, 74454, 74510, 74511, 74512, 74513, 74514, 74520, 74521, 74522, 74523, 74524, 74530, 74531, 74532, 74533, 74534, 74540, 74541, 74542, 74543, 74544, 74550, 74551, 74552, 74553, 74554, 23421, 23422, 23423, 23424, 23425, 23426, 23427, 23428, 23429, 23430, 23461, 23462, 23463, 23464, 23465, 23466, 23467, 23468, 23469, 23470, 23471, 23472, 23473, 23474, 23475, 23476, 23477, 23478, 23479, 23480, 24281, 24282, 24283, 24284, 24285, 24791, 24792, 24793, 24794, 24795],
    name: "artifact_set.maiden_beloved",
    iconClass: "artifact-icon-maiden-beloved",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.maiden_beloved_2',
                    description: 'set_descr.maiden_beloved_2',
                    stats: {
                        healing: 15,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.maiden_beloved_4',
                    serializeId: 10,
                    title: 'set_bonus.maiden_beloved_4',
                    description: 'set_descr.maiden_beloved_4',
                    stats: {
                        text_percent: 20,
                        healing_recv: 20,
                    },
                }),
            ],
        },
    ],
});
