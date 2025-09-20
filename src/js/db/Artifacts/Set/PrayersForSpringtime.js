import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const PrayersForSpringtime = new ArtifactSet({
    serializeId: 32,
    goodId: 'PrayersToSpringtime',
    gameId: 15013,
	itemIds: [87330, 87331, 87332, 87333, 87334, 87430, 87431, 87432, 87433, 87434, 87530, 87531, 87532, 87533, 87534],
    name: "artifact_set.prayers_to_springtime",
    iconClass: "artifact-icon-prayers-to-springtime",
    iconPiece: 'circlet',
    minRarity: 3,
    maxRarity: 4,
    slots: ['circlet'],
    setBonus: [
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.prayers_to_springtime_1',
                    description: 'set_descr.prayers_to_springtime_1',
                    stats: {
                        text_percent: 40,
                    },
                })
            ],
        },
    ],
});

