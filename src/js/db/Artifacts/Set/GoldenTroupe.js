import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const GoldenTroupe = new ArtifactSet({
    serializeId: 47,
    goodId: 'GoldenTroupe',
    gameId: 15032,
	itemIds: [32412, 32413, 32422, 32423, 32432, 32433, 32442, 32443, 32452, 32453, 32513, 32514, 32523, 32524, 32533, 32534, 32543, 32544, 32553, 32554, 23691, 23692, 23693, 23694, 23695, 23696, 23697, 23698, 23699, 23700],
    name: 'artifact_set.golden_troupe',
    iconClass: 'artifact-icon-golden-troupe',
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.golden_troupe_2',
                    description: 'set_descr.golden_troupe_2',
                    stats: {
                        dmg_skill: 20,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.golden_troupe_4',
                    description: 'set_descr.golden_troupe_4_1',
                    stats: {
                        dmg_skill: 25,
                    },
                }),
                new ConditionBoolean({
                    name: 'set.golden_troupe_4',
                    serializeId: 34,
                    title: 'set_bonus.golden_troupe_4',
                    description: 'set_descr.golden_troupe_4_2',
                    stats: {
                        dmg_skill: 25,
                    },
                }),
            ],
        },
    ],
});
