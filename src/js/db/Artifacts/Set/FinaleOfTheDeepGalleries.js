import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionNot } from "../../../classes/Condition/Not";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const FinaleOfTheDeepGalleries = new ArtifactSet({
    serializeId: 55,
    goodId: 'FinaleOfTheDeepGalleries',
    gameId: 15040,
    itemIds: [40412, 40413, 40422, 40423, 40432, 40433, 40442, 40443, 40452, 40453, 40513, 40514, 40523, 40524, 40533, 40534, 40543, 40544, 40553, 40554, 23771, 23772, 23773, 23774, 23775, 23776, 23777, 23778, 23779, 23780],
    name: "artifact_set.finale_of_the_deep_galleries",
    iconClass: "artifact-icon-finale-of-the-deep-galleries",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.finale_of_the_deep_galleries_2',
                    description: 'set_descr.finale_of_the_deep_galleries_2',
                    stats: {
                        dmg_cryo: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.finale_of_the_deep_galleries_4',
                    description: 'set_descr.finale_of_the_deep_galleries_4',
                    stats: {
                        text_percent: 60,
                    },
                }),
                new ConditionBoolean({
                    name: 'set.finale_of_the_deep_galleries_4_1',
                    serializeId: 46,
                    title: 'set_bonus.finale_of_the_deep_galleries_4_1',
                    stats: {
                        dmg_normal: 60,
                    },
                }),
                new ConditionBoolean({
                    name: 'set.finale_of_the_deep_galleries_4_2',
                    serializeId: 47,
                    title: 'set_bonus.finale_of_the_deep_galleries_4_2',
                    stats: {
                        dmg_burst: 60,
                    },
                    condition: new ConditionNot([
                        new ConditionBoolean({name: 'set.finale_of_the_deep_galleries_4_1'}),
                    ]),
                }),
            ],
        },
    ],
})
