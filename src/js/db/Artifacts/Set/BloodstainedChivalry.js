import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const BloodstainedChivalry = new ArtifactSet({
    serializeId: 5,
    goodId: 'BloodstainedChivalry',
    gameId: 15008,
	itemIds: [82310, 82311, 82312, 82313, 82314, 82320, 82321, 82322, 82323, 82324, 82330, 82331, 82332, 82333, 82334, 82340, 82341, 82342, 82343, 82344, 82350, 82351, 82352, 82353, 82354, 82410, 82411, 82412, 82413, 82414, 82420, 82421, 82422, 82423, 82424, 82430, 82431, 82432, 82433, 82434, 82440, 82441, 82442, 82443, 82444, 82450, 82451, 82452, 82453, 82454, 82510, 82511, 82512, 82513, 82514, 82520, 82521, 82522, 82523, 82524, 82530, 82531, 82532, 82533, 82534, 82540, 82541, 82542, 82543, 82544, 82550, 82551, 82552, 82553, 82554, 23341, 23342, 23343, 23344, 23345, 23346, 23347, 23348, 23349, 23350, 24711, 24712, 24713, 24714, 24715],
    name: "artifact_set.bloodstained_chivalry",
    minRarity: 4,
    maxRarity: 5,
    iconClass: "artifact-icon-bloodstained-chivalry",
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.bloodstained_chivalry_2',
                    description: 'set_descr.bloodstained_chivalry_2',
                    stats: {
                        dmg_phys: 25,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.bloodstained_chivalry_4',
                    serializeId: 4,
                    title: 'set_bonus.bloodstained_chivalry_4',
                    description: 'set_descr.bloodstained_chivalry_4',
                    stats: {
                        dmg_charged: 50,
                    },
                }),
            ],
        },
    ],
});
