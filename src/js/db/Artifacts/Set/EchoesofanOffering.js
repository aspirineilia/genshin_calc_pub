import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionAnd } from "../../../classes/Condition/And";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionNot } from "../../../classes/Condition/Not";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../../classes/Feature2/Multiplier/Target";
import { ValueTable } from "../../../classes/ValueTable";

export const EchoesofanOffering = new ArtifactSet({
    serializeId: 38,
    goodId: 'EchoesOfAnOffering',
    gameId: 15024,
	itemIds: [98412, 98413, 98422, 98423, 98432, 98433, 98442, 98443, 98452, 98453, 98513, 98514, 98523, 98524, 98533, 98534, 98543, 98544, 98553, 98554, 23611, 23612, 23613, 23614, 23615, 23616, 23617, 23618, 23619, 23620],
    name: "artifact_set.echoes_of_an_offering",
    iconClass: "artifact-icon-echoes-of-an-offering",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.echoes_of_an_offering_2',
                    description: 'set_descr.echoes_of_an_offering_2',
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
                    name : 'set.echoes_of_an_offering_4',
                    serializeId: 22,
                    title: 'set_bonus.echoes_of_an_offering_4',
                    description: 'set_descr.echoes_of_an_offering_4',
                    stats: {
                        text_percent: 70,
                        text_percent_chance: 36,
                        text_percent_chance_2: 20,
                    },
                }),
                new ConditionBoolean({
                    name : 'set.echoes_of_an_offering_4_avg',
                    serializeId: 25,
                    title: 'set_bonus.echoes_of_an_offering_4_avg',
                    description: 'set_descr.echoes_of_an_offering_4_avg',
                    subConditions: [
                        new ConditionBoolean({
                            name : 'set.echoes_of_an_offering_4',
                        }),
                    ],
                }),
            ],
            multipliers: [
                new FeatureMultiplier({
                    source: 'artifacts',
                    values: new ValueTable([70]),
                    target: new FeatureMultiplierTarget({
                        damageTypes: ['normal'],
                    }),
                    condition: new ConditionAnd([
                        new ConditionBoolean({name: 'set.echoes_of_an_offering_4'}),
                        new ConditionNot([
                            new ConditionBoolean({name: 'set.echoes_of_an_offering_4_avg'}),
                        ]),
                    ]),
                }),
                new FeatureMultiplier({
                    source: 'artifacts',
                    values: new ValueTable([70 * 0.502]),
                    target: new FeatureMultiplierTarget({
                        damageTypes: ['normal'],
                    }),
                    condition: new ConditionAnd([
                        new ConditionBoolean({name: 'set.echoes_of_an_offering_4'}),
                        new ConditionBoolean({name: 'set.echoes_of_an_offering_4_avg'}),
                    ]),
                }),
            ],
        },
    ],
})
