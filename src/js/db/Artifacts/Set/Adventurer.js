import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const Adventurer = new ArtifactSet({
    serializeId: 1,
    goodId: 'Adventurer',
    gameId: 10010,
	itemIds: [60110, 60111, 60112, 60113, 60114, 60120, 60121, 60122, 60123, 60124, 60130, 60131, 60132, 60133, 60134, 60140, 60141, 60142, 60143, 60144, 60150, 60151, 60152, 60153, 60154, 60210, 60211, 60212, 60213, 60214, 60220, 60221, 60222, 60223, 60224, 60230, 60231, 60232, 60233, 60234, 60240, 60241, 60242, 60243, 60244, 60250, 60251, 60252, 60253, 60254, 60310, 60311, 60312, 60313, 60314, 60320, 60321, 60322, 60323, 60324, 60330, 60331, 60332, 60333, 60334, 60340, 60341, 60342, 60343, 60344, 60350, 60351, 60352, 60353, 60354, 60410, 60411, 60412, 60413, 60414, 60420, 60421, 60422, 60423, 60424, 60430, 60431, 60432, 60433, 60434, 60440, 60441, 60442, 60443, 60444, 60450, 60451, 60452, 60453, 60454],
    name: "artifact_set.adventurer",
    iconClass: "artifact-icon-adventurer",
    minRarity: 1,
    maxRarity: 3,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.adventurer_2',
                    description: 'set_descr.adventurer_2',
                    settings: {},
                    stats: {
                        hp: 1000,
                    },
                })
            ],
        },
    ],
})
