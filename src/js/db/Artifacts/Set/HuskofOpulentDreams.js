import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { StatTable } from "../../../classes/StatTable";

export const HuskofOpulentDreams = new ArtifactSet({
    serializeId: 36,
    goodId: 'HuskOfOpulentDreams',
    gameId: 15021,
	itemIds: [95412, 95413, 95422, 95423, 95432, 95433, 95442, 95443, 95452, 95453, 95513, 95514, 95523, 95524, 95533, 95534, 95543, 95544, 95553, 95554, 23581, 23582, 23583, 23584, 23585, 23586, 23587, 23588, 23589, 23590, 24291, 24292, 24293, 24294, 24295, 24301, 24302, 24303, 24304, 24305, 24811, 24812, 24813, 24814, 24815, 24821, 24822, 24823, 24824, 24825],
    name: "artifact_set.husk_of_opulent_dreams",
    iconClass: "artifact-icon-husk-of-opulent-dreams",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.husk_of_opulent_dreams_2',
                    description: 'set_descr.husk_of_opulent_dreams_2',
                    settings: {},
                    stats: {
                        def_percent: 30,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    name: 'set.husk_of_opulent_dreams_4',
                    title: 'set_bonus.husk_of_opulent_dreams_4',
                    description: 'set_descr.husk_of_opulent_dreams_4',
                }),
                new ConditionStacks({
                    name: 'set.husk_of_opulent_dreams_4_def',
                    serializeId: 19,
                    title: 'set_bonus.husk_of_opulent_dreams_4_def',
                    description: 'set_descr.husk_of_opulent_dreams_4_def',
                    maxStacks: 4,
                    stats: [
                        new StatTable('def_percent', [6, 12, 18, 24]),
                    ],
                }),
                new ConditionStacks({
                    name: 'set.husk_of_opulent_dreams_4_geo',
                    serializeId: 21,
                    title: 'set_bonus.husk_of_opulent_dreams_4_geo',
                    description: 'set_descr.husk_of_opulent_dreams_4_geo',
                    maxStacks: 4,
                    stats: [
                        new StatTable('dmg_geo', [6, 12, 18, 24]),
                    ],
                }),
            ],
        },
    ],
})
