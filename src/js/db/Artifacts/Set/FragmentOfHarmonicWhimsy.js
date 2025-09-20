import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { StatTable } from "../../../classes/StatTable";

export const FragmentOfHarmonicWhimsy = new ArtifactSet({
    serializeId: 50,
    goodId: 'FragmentOfHarmonicWhimsy',
    gameId: 15035,
	itemIds: [35412, 35413, 35422, 35423, 35432, 35433, 35442, 35443, 35452, 35453, 35513, 35514, 35523, 35524, 35533, 35534, 35543, 35544, 35553, 35554, 23721, 23722, 23723, 23724, 23725, 23726, 23727, 23728, 23729, 23730],
    name: "artifact_set.fragment_of_harmonic_whimsy",
    iconClass: "artifact-icon-fragment-of-harmonic-whimsy",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.fragment_of_harmonic_whimsy_2',
                    description: 'set_descr.fragment_of_harmonic_whimsy_2',
                    stats: {
                        atk_percent: 18,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStacks({
                    name: 'set.fragment_of_harmonic_whimsy_4',
                    serializeId: 40,
                    title: 'set_bonus.fragment_of_harmonic_whimsy_4',
                    description: 'set_descr.fragment_of_harmonic_whimsy_4',
                    maxStacks: 3,
                    stats: [
                        new StatTable('dmg_all', [18]),
                    ],
                }),
            ],
        },
    ],
})
