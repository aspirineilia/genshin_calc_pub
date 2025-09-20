import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const RetracingBolide = new ArtifactSet({
    serializeId: 20,
    goodId: 'RetracingBolide',
    gameId: 15015,
	itemIds: [89310, 89311, 89312, 89313, 89314, 89320, 89321, 89322, 89323, 89324, 89330, 89331, 89332, 89333, 89334, 89340, 89341, 89342, 89343, 89344, 89350, 89351, 89352, 89353, 89354, 89410, 89411, 89412, 89413, 89414, 89420, 89421, 89422, 89423, 89424, 89430, 89431, 89432, 89433, 89434, 89440, 89441, 89442, 89443, 89444, 89450, 89451, 89452, 89453, 89454, 89510, 89511, 89512, 89513, 89514, 89520, 89521, 89522, 89523, 89524, 89530, 89531, 89532, 89533, 89534, 89540, 89541, 89542, 89543, 89544, 89550, 89551, 89552, 89553, 89554, 23501, 23502, 23503, 23504, 23505, 23506, 23507, 23508, 23509, 23510, 24781, 24782, 24783, 24784, 24785],
    name: "artifact_set.retracing_bolide",
    iconClass: "artifact-icon-retracing-bolide",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.retracing_bolide_2',
                    description: 'set_descr.retracing_bolide_2',
                    stats: {
                        shield: 35,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'common.char_status_shield',
                    serializeId: 13,
                    title: 'set_bonus.retracing_bolide_4',
                    description: 'set_descr.retracing_bolide_4',
                    stats: {
                        dmg_normal: 40,
                        dmg_charged: 40,
                    },
                }),
            ],
        },
    ],
});
