import { ArtifactSet } from "../../../classes/ArtifactSet";
import { Condition } from "../../../classes/Condition";
import { ConditionBooleanValue } from "../../../classes/Condition/Boolean/Value";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { StatTable } from "../../../classes/StatTable";

export const PaleFlame = new ArtifactSet({
    serializeId: 29,
    goodId: 'PaleFlame',
    gameId: 15018,
	itemIds: [92310, 92311, 92312, 92313, 92314, 92320, 92321, 92322, 92323, 92324, 92330, 92331, 92332, 92333, 92334, 92340, 92341, 92342, 92343, 92344, 92350, 92351, 92352, 92353, 92354, 92410, 92411, 92412, 92413, 92414, 92420, 92421, 92422, 92423, 92424, 92430, 92431, 92432, 92433, 92434, 92440, 92441, 92442, 92443, 92444, 92450, 92451, 92452, 92453, 92454, 92510, 92511, 92512, 92513, 92514, 92520, 92521, 92522, 92523, 92524, 92530, 92531, 92532, 92533, 92534, 92540, 92541, 92542, 92543, 92544, 92550, 92551, 92552, 92553, 92554, 23551, 23552, 23553, 23554, 23555, 23556, 23557, 23558, 23559, 23560, 24151, 24152, 24153, 24154, 24155, 24661, 24662, 24663, 24664, 24665],
    name: "artifact_set.pale_flame",
    iconClass: "artifact-icon-pale-flame",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.pale_flame_2',
                    description: 'set_descr.pale_flame_2',
                    stats: {
                        dmg_phys: 25,
                    },
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionStacks({
                    name: 'set.pale_flame_4',
                    serializeId: 16,
                    title: 'set_bonus.pale_flame_4',
                    description: 'set_descr.pale_flame_4',
                    maxStacks: 2,
                    stats: [
                        new StatTable('atk_percent', [9]),
                    ],
                }),
                new Condition({
                    stats: {
                        dmg_phys: 25,
                    },
                    condition: new ConditionBooleanValue({
                        setting: 'set.pale_flame_4',
                        cond: 'ge',
                        value: 2,
                    }),
                })
            ],
        },
    ],
})
