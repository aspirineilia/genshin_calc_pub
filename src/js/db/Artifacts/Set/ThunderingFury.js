import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ThunderingFury = new ArtifactSet({
    serializeId: 22,
    goodId: 'ThunderingFury',
    gameId: 15005,
	itemIds: [79310, 79311, 79312, 79313, 79314, 79320, 79321, 79322, 79323, 79324, 79330, 79331, 79332, 79333, 79334, 79340, 79341, 79342, 79343, 79344, 79350, 79351, 79352, 79353, 79354, 79410, 79411, 79412, 79413, 79414, 79420, 79421, 79422, 79423, 79424, 79430, 79431, 79432, 79433, 79434, 79440, 79441, 79442, 79443, 79444, 79450, 79451, 79452, 79453, 79454, 79510, 79511, 79512, 79513, 79514, 79520, 79521, 79522, 79523, 79524, 79530, 79531, 79532, 79533, 79534, 79540, 79541, 79542, 79543, 79544, 79550, 79551, 79552, 79553, 79554, 23371, 23372, 23373, 23374, 23375, 23376, 23377, 23378, 23379, 23380, 24241, 24242, 24324, 24325, 24721, 24722, 24723, 24724, 24725, 24753, 24754, 24755],
    name: "artifact_set.thundering_fury",
    iconClass: "artifact-icon-thundering-fury",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.thundering_fury_2',
                    description: 'set_descr.thundering_fury_2',
                    settings: {},
                    stats: {
                        dmg_electro: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.thundering_fury_4',
                    description: 'set_descr.thundering_fury_4',
                    settings: {},
                    stats: {
                        dmg_reaction_overloaded: 40,
                        dmg_reaction_electrocharged: 40,
                        dmg_reaction_superconduct: 40,
                        dmg_reaction_hyperbloom: 40,
                        dmg_reaction_aggravate: 20,
                        dmg_reaction_lunarcharged: 20,
                    },
                }),
            ],
        },
    ],
})
