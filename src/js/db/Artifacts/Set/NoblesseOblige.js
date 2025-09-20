import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const NoblesseOblige = new ArtifactSet({
    serializeId: 18,
    goodId: 'NoblesseOblige',
    gameId: 15007,
	itemIds: [81310, 81311, 81312, 81313, 81314, 81320, 81321, 81322, 81323, 81324, 81330, 81331, 81332, 81333, 81334, 81340, 81341, 81342, 81343, 81344, 81350, 81351, 81352, 81353, 81354, 81410, 81411, 81412, 81413, 81414, 81420, 81421, 81422, 81423, 81424, 81430, 81431, 81432, 81433, 81434, 81440, 81441, 81442, 81443, 81444, 81450, 81451, 81452, 81453, 81454, 81510, 81511, 81512, 81513, 81514, 81520, 81521, 81522, 81523, 81524, 81530, 81531, 81532, 81533, 81534, 81540, 81541, 81542, 81543, 81544, 81550, 81551, 81552, 81553, 81554, 23351, 23352, 23353, 23354, 23355, 23356, 23357, 23358, 23359, 23360, 24261, 24262, 24263, 24264, 24265, 24631, 24632, 24633, 24634, 24635, 24641, 24642, 24643, 24644, 24645, 24671, 24672, 24673, 24674, 24675],
    name: "artifact_set.noblesse_oblige",
    iconClass: "artifact-icon-noblesse-oblige",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.noblesse_oblige_2',
                    description: 'set_descr.noblesse_oblige_2',
                    stats: {
                        dmg_burst: 20,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.noblesse_oblige_4',
                    serializeId: 12,
                    title: 'set_bonus.noblesse_oblige_4',
                    description: 'set_descr.noblesse_oblige_4',
                    stats: {
                        text_percent: 20,
                    },
                }),
            ],
        },
    ],
})
