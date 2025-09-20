import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const Instructor = new ArtifactSet({
    serializeId: 13,
    goodId: 'Instructor',
    gameId: 10007,
	itemIds: [57110, 57111, 57112, 57113, 57114, 57120, 57121, 57122, 57123, 57124, 57130, 57131, 57132, 57133, 57134, 57140, 57141, 57142, 57143, 57144, 57150, 57151, 57152, 57153, 57154, 57210, 57211, 57212, 57213, 57214, 57220, 57221, 57222, 57223, 57224, 57230, 57231, 57232, 57233, 57234, 57240, 57241, 57242, 57243, 57244, 57250, 57251, 57252, 57253, 57254, 57310, 57311, 57312, 57313, 57314, 57320, 57321, 57322, 57323, 57324, 57330, 57331, 57332, 57333, 57334, 57340, 57341, 57342, 57343, 57344, 57350, 57351, 57352, 57353, 57354, 57410, 57411, 57412, 57413, 57414, 57420, 57421, 57422, 57423, 57424, 57430, 57431, 57432, 57433, 57434, 57440, 57441, 57442, 57443, 57444, 57450, 57451, 57452, 57453, 57454, 57510, 57511, 57512, 57513, 57514, 57520, 57521, 57522, 57523, 57524, 57530, 57531, 57532, 57533, 57534, 57540, 57541, 57542, 57543, 57544, 57550, 57551, 57552, 57553, 57554, 23511, 23512, 23513, 23514, 23515, 23516, 23517, 23518, 23519, 23520],
    name: "artifact_set.instructor",
    iconClass: "artifact-icon-instructor",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.instructor_2',
                    description: 'set_descr.instructor_2',
                    stats: {
                        mastery: 80,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.instructor_4',
                    serializeId: 8,
                    title: 'set_bonus.instructor_4',
                    description: 'set_descr.instructor_4',
                    stats: {
                        text_value: 120,
                    },
                })
            ],
        },
    ],
})
