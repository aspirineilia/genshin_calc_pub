import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionLevels } from "../../../classes/Condition/Levels";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { StatTable } from "../../../classes/StatTable";

export const NymphsDream = new ArtifactSet({
    serializeId: 44,
    goodId: 'NymphsDream',
    gameId: 15029,
	itemIds: [29412, 29413, 29422, 29423, 29432, 29433, 29442, 29443, 29452, 29453, 29513, 29514, 29523, 29524, 29533, 29534, 29543, 29544, 29553, 29554, 23661, 23662, 23663, 23664, 23665, 23666, 23667, 23668, 23669, 23670],
    name: "artifact_set.nymphs_dream",
    iconClass: "artifact-icon-nymphs-dream",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.nymphs_dream_2',
                    description: 'set_descr.nymphs_dream_2',
                    settings: {},
                    stats: {
                        dmg_hydro: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStacks({
                    name: 'set.nymphs_dream_4',
                    serializeId: 31,
                    title: 'set_bonus.nymphs_dream_4',
                    description: 'set_descr.nymphs_dream_4',
                    maxStacks: 3,
                }),
                new ConditionLevels({
                    levelSetting: 'set.nymphs_dream_4',
                    stats: [
                        new StatTable('atk_percent', [7, 16, 25]),
                        new StatTable('dmg_hydro', [4, 9, 15]),
                    ],
                    subConditions: [
                        new ConditionBooleanValue({
                            setting: 'set.nymphs_dream_4',
                            cond: 'ge',
                            value: 1,
                        }),
                    ],
                }),
            ],
        },
    ],
})
