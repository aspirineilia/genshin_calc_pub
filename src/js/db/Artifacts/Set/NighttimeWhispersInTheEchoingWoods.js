import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";

export const NighttimeWhispersInTheEchoingWoods = new ArtifactSet({
    serializeId: 49,
    goodId: 'NighttimeWhispersInTheEchoingWoods',
    gameId: 15034,
	itemIds: [34412, 34413, 34422, 34423, 34432, 34433, 34442, 34443, 34452, 34453, 34513, 34514, 34523, 34524, 34533, 34534, 34543, 34544, 34553, 34554, 23711, 23712, 23713, 23714, 23715, 23716, 23717, 23718, 23719, 23720],
    name: "artifact_set.nighttime_whispers_in_the_echoing_woods",
    iconClass: "artifact-icon-nighttime-whispers-in-the-echoing-woods",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.nighttime_whispers_in_the_echoing_woods_2',
                    description: 'set_descr.nighttime_whispers_in_the_echoing_woods_2',
                    settings: {},
                    stats: {
                        atk_percent: 18,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.nighttime_whispers_in_the_echoing_woods_4_1',
                    serializeId: 37,
                    title: 'set_bonus.nighttime_whispers_in_the_echoing_woods_4',
                    description: 'set_descr.nighttime_whispers_in_the_echoing_woods_4_1',
                    settings: {},
                    stats: {
                        dmg_geo: 20,
                    },
                }),
                new ConditionBoolean({
                    name: 'set.nighttime_whispers_in_the_echoing_woods_4_2',
                    serializeId: 38,
                    title: 'set_bonus.nighttime_whispers_in_the_echoing_woods_4',
                    description: 'set_descr.nighttime_whispers_in_the_echoing_woods_4_2',
                    stats: {
                        dmg_geo: 30,
                    },
                    subConditions: [
                        new ConditionBoolean({name: 'set.nighttime_whispers_in_the_echoing_woods_4_1'}),
                    ],
                })
            ],
        },
    ],
})
