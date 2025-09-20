import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const Lavawalker = new ArtifactSet({
    serializeId: 14,
    goodId: 'Lavawalker',
    gameId: 14003,
	itemIds: [73310, 73311, 73312, 73313, 73314, 73320, 73321, 73322, 73323, 73324, 73330, 73331, 73332, 73333, 73334, 73340, 73341, 73342, 73343, 73344, 73350, 73351, 73352, 73353, 73354, 73410, 73411, 73412, 73413, 73414, 73420, 73421, 73422, 73423, 73424, 73430, 73431, 73432, 73433, 73434, 73440, 73441, 73442, 73443, 73444, 73450, 73451, 73452, 73453, 73454, 73510, 73511, 73512, 73513, 73514, 73520, 73521, 73522, 73523, 73524, 73530, 73531, 73532, 73533, 73534, 73540, 73541, 73542, 73543, 73544, 73550, 73551, 73552, 73553, 73554, 23431, 23432, 23433, 23434, 23435, 23436, 23437, 23438, 23439, 23440],
    name: "artifact_set.lavawalker",
    iconClass: "artifact-icon-lavawalker",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.lavawalker_2',
                    description: 'set_descr.lavawalker_2',
                    stats: {
                        res_pyro: 40,
                    },
                })
            ],
        },
        {},
        {
            suggesterSettings: {
                "common.enemy_status": 'pyro',
            },
            conditions: [
                new ConditionStatic({
                    serializeId: 9,
                    title: 'set_bonus.lavawalker_4',
                    description: 'set_descr.lavawalker_4',
                    stats: {
                        dmg_all: 35,
                    },
                    subConditions: [
                        new ConditionEnemyStatus({
                            status: ['pyro'],
                        }),
                    ],
                }),
            ],
        },
    ],
})
