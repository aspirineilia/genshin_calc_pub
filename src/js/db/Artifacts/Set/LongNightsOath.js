import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { StatTable } from "../../../classes/StatTable";

export const LongNightsOath = new ArtifactSet({
    serializeId: 54,
    goodId: 'LongNightsOath',
    gameId: 15039,
    itemIds: [39412, 39413, 39422, 39423, 39432, 39433, 39442, 39443, 39452, 39453, 39513, 39514, 39523, 39524, 39533, 39534, 39543, 39544, 39553, 39554, 23761, 23762, 23763, 23764, 23765, 23766, 23767, 23768, 23769, 23770],
    name: "artifact_set.long_nights_oath",
    iconClass: "artifact-icon-long-nights-oath",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.long_nights_oath_2',
                    description: 'set_descr.long_nights_oath_2',
                    settings: {},
                    stats: {
                        dmg_plunge: 25,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStacks({
                    name: 'set.long_nights_oath_4',
                    serializeId: 45,
                    title: 'set_bonus.long_nights_oath_4',
                    description: 'set_descr.long_nights_oath_4',
                    maxStacks: 5,
                    stats: [
                        new StatTable('dmg_plunge', [15]),
                    ],
                }),
            ],
        },
    ],
})
