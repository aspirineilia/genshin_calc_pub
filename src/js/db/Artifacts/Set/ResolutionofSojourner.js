import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ResolutionofSojourner = new ArtifactSet({
    serializeId: 19,
    goodId: 'ResolutionOfSojourner',
    gameId: 10001,
    itemIds: [51110, 51111, 51112, 51113, 51114, 51120, 51121, 51122, 51123, 51124, 51130, 51131, 51132, 51133, 51134, 51140, 51141, 51142, 51143, 51144, 51150, 51151, 51152, 51153, 51154, 51210, 51211, 51212, 51213, 51214, 51220, 51221, 51222, 51223, 51224, 51230, 51231, 51232, 51233, 51234, 51240, 51241, 51242, 51243, 51244, 51250, 51251, 51252, 51253, 51254, 51310, 51311, 51312, 51313, 51314, 51320, 51321, 51322, 51323, 51324, 51330, 51331, 51332, 51333, 51334, 51340, 51341, 51342, 51343, 51344, 51350, 51351, 51352, 51353, 51354, 51410, 51411, 51412, 51413, 51414, 51420, 51421, 51422, 51423, 51424, 51430, 51431, 51432, 51433, 51434, 51440, 51441, 51442, 51443, 51444, 51450, 51451, 51452, 51453, 51454, 51510, 51511, 51512, 51513, 51514, 51520, 51521, 51522, 51523, 51524, 51530, 51531, 51532, 51533, 51534, 51540, 51541, 51542, 51543, 51544, 51550, 51551, 51552, 51553, 51554],
    name: "artifact_set.resolution_of_sojourner",
    iconClass: "artifact-icon-resolution-of-sojourner",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.resolution_of_sojourner_2',
                    description: 'set_descr.resolution_of_sojourner_2',
                    stats: {
                        atk_percent: 18,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.resolution_of_sojourner_4',
                    description: 'set_descr.resolution_of_sojourner_4',
                    stats: {
                        crit_rate_charged: 30,
                    },
                })
            ],
        },
    ],
})

