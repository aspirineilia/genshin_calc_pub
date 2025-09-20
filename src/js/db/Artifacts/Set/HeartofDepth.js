import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const HeartofDepth = new ArtifactSet({
    serializeId: 12,
    goodId: 'HeartOfDepth',
    gameId: 15016,
	itemIds: [90310, 90311, 90312, 90313, 90314, 90320, 90321, 90322, 90323, 90324, 90330, 90331, 90332, 90333, 90334, 90340, 90341, 90342, 90343, 90344, 90350, 90351, 90352, 90353, 90354, 90410, 90411, 90412, 90413, 90414, 90420, 90421, 90422, 90423, 90424, 90430, 90431, 90432, 90433, 90434, 90440, 90441, 90442, 90443, 90444, 90450, 90451, 90452, 90453, 90454, 90510, 90511, 90512, 90513, 90514, 90520, 90521, 90522, 90523, 90524, 90530, 90531, 90532, 90533, 90534, 90540, 90541, 90542, 90543, 90544, 90550, 90551, 90552, 90553, 90554, 23531, 23532, 23533, 23534, 23535, 23536, 23537, 23538, 23539, 23540, 24161, 24162, 24163, 24164, 24165, 24211, 24212, 24213, 24214, 24215],
    name: "artifact_set.heart_of_depth",
    iconClass: "artifact-icon-heart-of-depth",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.heart_of_depth_2',
                    description: 'set_descr.heart_of_depth_2',
                    stats: {
                        dmg_hydro: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.heart_of_depth_4',
                    serializeId: 7,
                    title: 'set_bonus.heart_of_depth_4',
                    description: 'set_descr.heart_of_depth_4',
                    stats: {
                        dmg_normal: 30,
                        dmg_charged: 30,
                    },
                }),
            ],
        },
    ],
})
