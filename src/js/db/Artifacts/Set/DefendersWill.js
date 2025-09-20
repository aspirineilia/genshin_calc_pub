import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionDefendersWill } from "../../../classes/Condition/Static/DefendersWill";

export const DefendersWill = new ArtifactSet({
    serializeId: 8,
    goodId: 'DefendersWill',
    gameId: 10003,
	itemIds: [53110, 53111, 53112, 53113, 53114, 53120, 53121, 53122, 53123, 53124, 53130, 53131, 53132, 53133, 53134, 53140, 53141, 53142, 53143, 53144, 53150, 53151, 53152, 53153, 53154, 53210, 53211, 53212, 53213, 53214, 53220, 53221, 53222, 53223, 53224, 53230, 53231, 53232, 53233, 53234, 53240, 53241, 53242, 53243, 53244, 53250, 53251, 53252, 53253, 53254, 53310, 53311, 53312, 53313, 53314, 53320, 53321, 53322, 53323, 53324, 53330, 53331, 53332, 53333, 53334, 53340, 53341, 53342, 53343, 53344, 53350, 53351, 53352, 53353, 53354, 53410, 53411, 53412, 53413, 53414, 53420, 53421, 53422, 53423, 53424, 53430, 53431, 53432, 53433, 53434, 53440, 53441, 53442, 53443, 53444, 53450, 53451, 53452, 53453, 53454, 53510, 53511, 53512, 53513, 53514, 53520, 53521, 53522, 53523, 53524, 53530, 53531, 53532, 53533, 53534, 53540, 53541, 53542, 53543, 53544, 53550, 53551, 53552, 53553, 53554, 23481, 23482, 23483, 23484, 23485, 23486, 23487, 23488, 23489, 23490],
    name: "artifact_set.defenders_will",
    iconClass: "artifact-icon-defenders-will",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.defenders_will_2',
                    description: 'set_descr.defenders_will_2',
                    stats: {
                        def_percent: 30,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionDefendersWill({
                    title: 'set_bonus.defenders_will_4',
                    description: 'set_descr.defenders_will_4',
                })
            ],
        },
    ],
})

