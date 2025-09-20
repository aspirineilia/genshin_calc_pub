import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const TravelingDoctor = new ArtifactSet({
    serializeId: 25,
    goodId: 'TravelingDoctor',
    gameId: 10013,
	itemIds: [63110, 63111, 63112, 63113, 63114, 63120, 63121, 63122, 63123, 63124, 63130, 63131, 63132, 63133, 63134, 63140, 63141, 63142, 63143, 63144, 63150, 63151, 63152, 63153, 63154, 63210, 63211, 63212, 63213, 63214, 63220, 63221, 63222, 63223, 63224, 63230, 63231, 63232, 63233, 63234, 63240, 63241, 63242, 63243, 63244, 63250, 63251, 63252, 63253, 63254, 63310, 63311, 63312, 63313, 63314, 63320, 63321, 63322, 63323, 63324, 63330, 63331, 63332, 63333, 63334, 63340, 63341, 63342, 63343, 63344, 63350, 63351, 63352, 63353, 63354, 63410, 63411, 63412, 63413, 63414, 63420, 63421, 63422, 63423, 63424, 63430, 63431, 63432, 63433, 63434, 63440, 63441, 63442, 63443, 63444, 63450, 63451, 63452, 63453, 63454],
    name: "artifact_set.traveling_doctor",
    iconClass: "artifact-icon-traveling-doctor",
    minRarity: 1,
    maxRarity: 3,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.traveling_doctor_2',
                    description: 'set_descr.traveling_doctor_2',
                    settings: {},
                    stats: {
                        healing_recv: 20,
                    },
                })
            ],
        },
    ],
})
