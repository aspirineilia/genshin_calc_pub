import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const PrayersForIllumination = new ArtifactSet({
    serializeId: 35,
    goodId: 'PrayersForIllumination',
    gameId: 15009,
	itemIds: [83330, 83331, 83332, 83333, 83334, 83430, 83431, 83432, 83433, 83434, 83530, 83531, 83532, 83533, 83534],
    name: "artifact_set.prayers_for_illumination",
    iconClass: "artifact-icon-prayers-for-illumination",
    iconPiece: 'circlet',
    minRarity: 3,
    maxRarity: 4,
    slots: ['circlet'],
    setBonus: [
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.prayers_for_illumination_1',
                    description: 'set_descr.prayers_for_illumination_1',
                    stats: {
                        text_percent: 40,
                    },
                })
            ],
        },
    ],
});
