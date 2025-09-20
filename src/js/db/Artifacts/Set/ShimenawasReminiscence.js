import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ShimenawasReminiscence = new ArtifactSet({
    serializeId: 31,
    goodId: 'ShimenawasReminiscence',
    gameId: 15019,
	itemIds: [93412, 93413, 93422, 93423, 93432, 93433, 93442, 93443, 93452, 93453, 93513, 93514, 93523, 93524, 93533, 93534, 93543, 93544, 93553, 93554, 23561, 23562, 23563, 23564, 23565, 23566, 23567, 23568, 23569, 23570, 24191, 24192, 24193, 24194, 24195],
    name: "artifact_set.shimenawas_reminiscence",
    iconClass: "artifact-icon-shimenawas-reminiscence",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.shimenawas_reminiscence_2',
                    description: 'set_descr.shimenawas_reminiscence_2',
                    stats: {
                        atk_percent: 18,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.shimenawas_reminiscence_4',
                    serializeId: 18,
                    title: 'set_bonus.shimenawas_reminiscence_4',
                    description: 'set_descr.shimenawas_reminiscence_4',
                    stats: {
                        text_percent: 50,
                        dmg_normal: 50,
                        dmg_charged: 50,
                        dmg_plunge: 50,
                    },
                }),
            ],
        },
    ],
})
