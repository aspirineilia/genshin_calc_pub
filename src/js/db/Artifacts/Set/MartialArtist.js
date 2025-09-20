import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const MartialArtist = new ArtifactSet({
    serializeId: 17,
    goodId: 'MartialArtist',
    gameId: 10006,
	itemIds: [56110, 56111, 56112, 56113, 56114, 56120, 56121, 56122, 56123, 56124, 56130, 56131, 56132, 56133, 56134, 56140, 56141, 56142, 56143, 56144, 56150, 56151, 56152, 56153, 56154, 56210, 56211, 56212, 56213, 56214, 56220, 56221, 56222, 56223, 56224, 56230, 56231, 56232, 56233, 56234, 56240, 56241, 56242, 56243, 56244, 56250, 56251, 56252, 56253, 56254, 56310, 56311, 56312, 56313, 56314, 56320, 56321, 56322, 56323, 56324, 56330, 56331, 56332, 56333, 56334, 56340, 56341, 56342, 56343, 56344, 56350, 56351, 56352, 56353, 56354, 56410, 56411, 56412, 56413, 56414, 56420, 56421, 56422, 56423, 56424, 56430, 56431, 56432, 56433, 56434, 56440, 56441, 56442, 56443, 56444, 56450, 56451, 56452, 56453, 56454, 56510, 56511, 56512, 56513, 56514, 56520, 56521, 56522, 56523, 56524, 56530, 56531, 56532, 56533, 56534, 56540, 56541, 56542, 56543, 56544, 56550, 56551, 56552, 56553, 56554],
    name: "artifact_set.martial_artist",
    iconClass: "artifact-icon-martial-artist",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.martial_artist_2',
                    description: 'set_descr.martial_artist_2',
                    stats: {
                        dmg_normal: 15,
                        dmg_charged: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.martial_artist_4',
                    serializeId: 11,
                    title: 'set_bonus.martial_artist_4',
                    description: 'set_descr.martial_artist_4',
                    stats: {
                        dmg_normal: 25,
                        dmg_charged: 25,
                    },
                })
            ],
        },
    ],
})

