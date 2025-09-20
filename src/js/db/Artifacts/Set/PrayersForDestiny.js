import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const PrayersForDestiny = new ArtifactSet({
    serializeId: 34,
    goodId: 'PrayersForDestiny',
    gameId: 15010,
	itemIds: [84330, 84331, 84332, 84333, 84334, 84430, 84431, 84432, 84433, 84434, 84530, 84531, 84532, 84533, 84534],
    name: "artifact_set.prayers_for_destiny",
    iconClass: "artifact-icon-prayers-for-destiny",
    iconPiece: 'circlet',
    minRarity: 3,
    maxRarity: 4,
    slots: ['circlet'],
    setBonus: [
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.prayers_for_destiny_1',
                    description: 'set_descr.prayers_for_destiny_1',
                    stats: {
                        text_percent: 40,
                    },
                })
            ],
        },
    ],
});
