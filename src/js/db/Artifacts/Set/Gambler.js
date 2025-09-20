import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const Gambler = new ArtifactSet({
    serializeId: 10,
    goodId: 'Gambler',
    gameId: 10008,
	itemIds: [58210, 58211, 58212, 58213, 58214, 58220, 58221, 58222, 58223, 58224, 58230, 58231, 58232, 58233, 58234, 58240, 58241, 58242, 58243, 58244, 58250, 58251, 58252, 58253, 58254, 58310, 58311, 58312, 58313, 58314, 58320, 58321, 58322, 58323, 58324, 58330, 58331, 58332, 58333, 58334, 58340, 58341, 58342, 58343, 58344, 58350, 58351, 58352, 58353, 58354, 58410, 58411, 58412, 58413, 58414, 58420, 58421, 58422, 58423, 58424, 58430, 58431, 58432, 58433, 58434, 58440, 58441, 58442, 58443, 58444, 58450, 58451, 58452, 58453, 58454, 58510, 58511, 58512, 58513, 58514, 58520, 58521, 58522, 58523, 58524, 58530, 58531, 58532, 58533, 58534, 58540, 58541, 58542, 58543, 58544, 58550, 58551, 58552, 58553, 58554],
    name: "artifact_set.gambler",
    iconClass: "artifact-icon-gambler",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.gambler_2',
                    description: 'set_descr.gambler_2',
                    stats: {
                        dmg_skill: 20,
                    },
                })
            ],
        },
    ],
})

