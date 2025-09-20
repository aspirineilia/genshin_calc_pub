import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const TenacityofMillelith = new ArtifactSet({
    serializeId: 28,
    goodId: 'TenacityOfTheMillelith',
    gameId: 15017,
	itemIds: [91310, 91311, 91312, 91313, 91314, 91320, 91321, 91322, 91323, 91324, 91330, 91331, 91332, 91333, 91334, 91340, 91341, 91342, 91343, 91344, 91350, 91351, 91352, 91353, 91354, 91410, 91411, 91412, 91413, 91414, 91420, 91421, 91422, 91423, 91424, 91430, 91431, 91432, 91433, 91434, 91440, 91441, 91442, 91443, 91444, 91450, 91451, 91452, 91453, 91454, 91510, 91511, 91512, 91513, 91514, 91520, 91521, 91522, 91523, 91524, 91530, 91531, 91532, 91533, 91534, 91540, 91541, 91542, 91543, 91544, 91550, 91551, 91552, 91553, 91554, 23541, 23542, 23543, 23544, 23545, 23546, 23547, 23548, 23549, 23550, 24221, 24222, 24223, 24224, 24225, 24701, 24702, 24703, 24704, 24705],
    name: "artifact_set.tenacity_of_the_millelith",
    iconClass: "artifact-icon-tenacity-of-the-millelith",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.tenacity_of_the_millelith_2',
                    description: 'set_descr.tenacity_of_the_millelith_2',
                    stats: {
                        hp_percent: 20,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.tenacity_of_the_millelith_4',
                    serializeId: 15,
                    title: 'set_bonus.tenacity_of_the_millelith_4',
                    description: 'set_descr.tenacity_of_the_millelith_4',
                    stats: {
                        text_percent: 30,
                        text_percent2: 20,
                    },
                }),
            ],
        },
    ],
})
