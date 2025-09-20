import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const Berserker = new ArtifactSet({
    serializeId: 3,
    goodId: 'Berserker',
    gameId: 10005,
	itemIds: [55110, 55111, 55112, 55113, 55114, 55120, 55121, 55122, 55123, 55124, 55130, 55131, 55132, 55133, 55134, 55140, 55141, 55142, 55143, 55144, 55150, 55151, 55152, 55153, 55154, 55210, 55211, 55212, 55213, 55214, 55220, 55221, 55222, 55223, 55224, 55230, 55231, 55232, 55233, 55234, 55240, 55241, 55242, 55243, 55244, 55250, 55251, 55252, 55253, 55254, 55310, 55311, 55312, 55313, 55314, 55320, 55321, 55322, 55323, 55324, 55330, 55331, 55332, 55333, 55334, 55340, 55341, 55342, 55343, 55344, 55350, 55351, 55352, 55353, 55354, 55410, 55411, 55412, 55413, 55414, 55420, 55421, 55422, 55423, 55424, 55430, 55431, 55432, 55433, 55434, 55440, 55441, 55442, 55443, 55444, 55450, 55451, 55452, 55453, 55454, 55510, 55511, 55512, 55513, 55514, 55520, 55521, 55522, 55523, 55524, 55530, 55531, 55532, 55533, 55534, 55540, 55541, 55542, 55543, 55544, 55550, 55551, 55552, 55553, 55554, 23521, 23522, 23523, 23524, 23525, 23526, 23527, 23528, 23529, 23530],
    name: "artifact_set.berserker",
    iconClass: "artifact-icon-berserker",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.berserker_2',
                    description: 'set_descr.berserker_2',
                    stats: {
                        crit_rate: 12,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.berserker_4',
                    serializeId: 1,
                    title: 'set_bonus.berserker_4',
                    description: 'set_descr.berserker_4',
                    stats: {
                        crit_rate: 24,
                    },
                })
            ],
        },
    ],
})
