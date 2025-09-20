import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const PrayersForWisdom = new ArtifactSet({
    serializeId: 33,
    goodId: 'PrayersForWisdom',
    gameId: 15011,
	itemIds: [85330, 85331, 85332, 85333, 85334, 85430, 85431, 85432, 85433, 85434, 85530, 85531, 85532, 85533, 85534],
    name: "artifact_set.prayers_for_wisdom",
    iconClass: "artifact-icon-prayers-for-wisdom",
    iconPiece: 'circlet',
    minRarity: 3,
    maxRarity: 4,
    slots: ['circlet'],
    setBonus: [
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.prayers_for_wisdom_1',
                    description: 'set_descr.prayers_for_wisdom_1',
                    stats: {
                        text_percent: 40,
                    },
                })
            ],
        },
    ],
});

