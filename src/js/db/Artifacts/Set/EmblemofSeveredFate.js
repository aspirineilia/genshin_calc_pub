import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBooleanPiecesCount } from "../../../classes/Condition/Boolean/PiecesCount";
import { ConditionFalse } from "../../../classes/Condition/False";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { PostEffectStatsRecharge } from "../../../classes/PostEffect/Stats/Recharge";
import { StatTable } from "../../../classes/StatTable";

export const EmblemofSeveredFate = new ArtifactSet({
    serializeId: 30,
    goodId: 'EmblemOfSeveredFate',
    gameId: 15020,
	itemIds: [94412, 94413, 94422, 94423, 94432, 94433, 94442, 94443, 94452, 94453, 94513, 94514, 94523, 94524, 94533, 94534, 94543, 94544, 94553, 94554, 23571, 23572, 23573, 23574, 23575, 23576, 23577, 23578, 23579, 23580, 24103, 24104, 24105, 24201, 24202, 24203, 24204, 24205, 24311, 24312, 24313, 24314, 24315, 24601, 24602, 24603, 24604, 24605, 24611, 24612, 24613, 24614, 24615, 24621, 24622, 24623, 24624, 24625, 24731, 24732, 24733, 24734, 24735, 24771, 24772, 24773, 24774, 24775, 24801, 24802, 24803, 24804, 24805],
    name: "artifact_set.emblem_of_severed_fate",
    iconClass: "artifact-icon-emblem-of-severed-fate",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.emblem_of_severed_fate_2',
                    description: 'set_descr.emblem_of_severed_fate_2',
                    stats: {
                        recharge: 20,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.emblem_of_severed_fate_4',
                    description: 'set_descr.emblem_of_severed_fate_4',
                    stats: {
                        text_percent: 25,
                        text_percent_max: 75,
                    },
                }),
            ],
        },
    ],
    postEffects: [
        new PostEffectStatsRecharge({
            percent: new StatTable('dmg_burst', [25]),
            statCap: new StatTable('', [75]),
            conditions: [
                new ConditionBooleanPiecesCount({
                    setName: 'EmblemofSeveredFate',
                    count: 4,
                }),
            ],
        }),
    ],
});
