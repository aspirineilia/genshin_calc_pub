import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionEnemyStatus } from "../../../classes/Condition/Boolean/EnemyStatus";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const BlizzardStrayer = new ArtifactSet({
    serializeId: 4,
    goodId: 'BlizzardStrayer',
    gameId: 14001,
	itemIds: [71310, 71311, 71312, 71313, 71314, 71320, 71321, 71322, 71323, 71324, 71330, 71331, 71332, 71333, 71334, 71340, 71341, 71342, 71343, 71344, 71350, 71351, 71352, 71353, 71354, 71410, 71411, 71412, 71413, 71414, 71420, 71421, 71422, 71423, 71424, 71430, 71431, 71432, 71433, 71434, 71440, 71441, 71442, 71443, 71444, 71450, 71451, 71452, 71453, 71454, 71510, 71511, 71512, 71513, 71514, 71520, 71521, 71522, 71523, 71524, 71530, 71531, 71532, 71533, 71534, 71540, 71541, 71542, 71543, 71544, 71550, 71551, 71552, 71553, 71554, 23451, 23452, 23453, 23454, 23455, 23456, 23457, 23458, 23459, 23460, 24131, 24132, 24133, 24134, 24135, 24181, 24182, 24183, 24184, 24185],
    name: "artifact_set.blizzard_strayer",
    iconClass: "artifact-icon-blizzard-strayer",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.blizzard_strayer_2',
                    description: 'set_descr.blizzard_strayer_2',
                    settings: {},
                    stats: {
                        dmg_cryo: 15,
                    },
                }),
            ],
        },
        {},
        {
            suggesterSettings: {
                "common.enemy_status": 'cryo',
                "enemy_frozen": 1,
            },
            conditions: [
                new ConditionStatic({
                    serializeId: 2,
                    title: 'set_bonus.blizzard_strayer_4',
                    description: 'set_descr.blizzard_strayer_4_1',
                    stats: {
                        crit_rate_enemy: 20,
                    },
                    subConditions: [
                        new ConditionEnemyStatus({
                            status: ['cryo'],
                        }),
                    ],
                }),
                new ConditionStatic({
                    serializeId: 3,
                    title: 'set_bonus.blizzard_strayer_4',
                    description: 'set_descr.blizzard_strayer_4_2',
                    stats: {
                        crit_rate_enemy: 20,
                    },
                    subConditions: [
                        new ConditionEnemyStatus({
                            status: ['cryo'],
                        }),
                        new ConditionBoolean({
                            name: 'enemy_frozen',
                        }),
                    ],
                }),
            ],
        }
    ],
})
