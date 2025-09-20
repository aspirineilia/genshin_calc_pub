import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const Thundersoother = new ArtifactSet({
    serializeId: 23,
    goodId: 'Thundersoother',
    gameId: 14002,
	itemIds: [72310, 72311, 72312, 72313, 72314, 72320, 72321, 72322, 72323, 72324, 72330, 72331, 72332, 72333, 72334, 72340, 72341, 72342, 72343, 72344, 72350, 72351, 72352, 72353, 72354, 72410, 72411, 72412, 72413, 72414, 72420, 72421, 72422, 72423, 72424, 72430, 72431, 72432, 72433, 72434, 72440, 72441, 72442, 72443, 72444, 72450, 72451, 72452, 72453, 72454, 72510, 72511, 72512, 72513, 72514, 72520, 72521, 72522, 72523, 72524, 72530, 72531, 72532, 72533, 72534, 72540, 72541, 72542, 72543, 72544, 72550, 72551, 72552, 72553, 72554, 23441, 23442, 23443, 23444, 23445, 23446, 23447, 23448, 23449, 23450],
    name: "artifact_set.thundersoother",
    minRarity: 4,
    maxRarity: 5,
    iconClass: 'artifact-icon-thundersoother',
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.thundersoother_2',
                    description: 'set_descr.thundersoother_2',
                    stats: {
                        res_electro: 40,
                    },
                })
            ],
        },
        {},
        {
            suggesterSettings: {
                "common.enemy_status": 'electro',
            },
            conditions: [
                new ConditionStatic({
                    serializeId: 14,
                    title: 'set_bonus.thundersoother_4',
                    description: 'set_descr.thundersoother_4',
                    stats: {
                        dmg_all: 35,
                    },
                    subConditions: [
                        new ConditionEnemyStatus({
                            status: ['electro'],
                        }),
                    ],
                }),
            ],
        },
    ],
})
