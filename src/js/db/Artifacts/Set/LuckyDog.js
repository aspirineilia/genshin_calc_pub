import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const LuckyDog = new ArtifactSet({
    serializeId: 15,
    goodId: 'LuckyDog',
    gameId: 10011,
	itemIds: [61110, 61111, 61112, 61113, 61114, 61120, 61121, 61122, 61123, 61124, 61130, 61131, 61132, 61133, 61134, 61140, 61141, 61142, 61143, 61144, 61150, 61151, 61152, 61153, 61154, 61210, 61211, 61212, 61213, 61214, 61220, 61221, 61222, 61223, 61224, 61230, 61231, 61232, 61233, 61234, 61240, 61241, 61242, 61243, 61244, 61250, 61251, 61252, 61253, 61254, 61310, 61311, 61312, 61313, 61314, 61320, 61321, 61322, 61323, 61324, 61330, 61331, 61332, 61333, 61334, 61340, 61341, 61342, 61343, 61344, 61350, 61351, 61352, 61353, 61354, 61410, 61411, 61412, 61413, 61414, 61420, 61421, 61422, 61423, 61424, 61430, 61431, 61432, 61433, 61434, 61440, 61441, 61442, 61443, 61444, 61450, 61451, 61452, 61453, 61454],
    name: "artifact_set.lucky_dog",
    iconClass: "artifact-icon-lucky-dog",
    minRarity: 1,
    maxRarity: 3,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.lucky_dog_2',
                    description: 'set_descr.lucky_dog_2',
                    settings: {},
                    stats: {
                        def: 100,
                    },
                })
            ],
        },
    ],
})
