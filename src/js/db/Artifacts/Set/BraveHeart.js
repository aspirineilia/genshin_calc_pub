import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const BraveHeart = new ArtifactSet({
    serializeId: 6,
    goodId: 'BraveHeart',
    gameId: 10002,
    itemIds: [52110, 52111, 52112, 52113, 52114, 52120, 52121, 52122, 52123, 52124, 52130, 52131, 52132, 52133, 52134, 52140, 52141, 52142, 52143, 52144, 52150, 52151, 52152, 52153, 52154, 52210, 52211, 52212, 52213, 52214, 52220, 52221, 52222, 52223, 52224, 52230, 52231, 52232, 52233, 52234, 52240, 52241, 52242, 52243, 52244, 52250, 52251, 52252, 52253, 52254, 52310, 52311, 52312, 52313, 52314, 52320, 52321, 52322, 52323, 52324, 52330, 52331, 52332, 52333, 52334, 52340, 52341, 52342, 52343, 52344, 52350, 52351, 52352, 52353, 52354, 52410, 52411, 52412, 52413, 52414, 52420, 52421, 52422, 52423, 52424, 52430, 52431, 52432, 52433, 52434, 52440, 52441, 52442, 52443, 52444, 52450, 52451, 52452, 52453, 52454, 52510, 52511, 52512, 52513, 52514, 52520, 52521, 52522, 52523, 52524, 52530, 52531, 52532, 52533, 52534, 52540, 52541, 52542, 52543, 52544, 52550, 52551, 52552, 52553, 52554],
    name: "artifact_set.brave_heart",
    iconClass: "artifact-icon-brave-heart",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.brave_heart_2',
                    description: 'set_descr.brave_heart_2',
                    stats: {
                        atk_percent: 18,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'brave_heart_4',
                    serializeId: 5,
                    title: 'set_bonus.brave_heart_4',
                    description: 'set_descr.brave_heart_4',
                    stats: {
                        dmg_all: 30,
                    },
                })
            ],
        },
    ],
})
