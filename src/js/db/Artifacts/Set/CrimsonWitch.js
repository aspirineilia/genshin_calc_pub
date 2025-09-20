import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStacks } from "../../../classes/Condition/Stacks";
import { StatTable } from "../../../classes/StatTable";

export const CrimsonWitch = new ArtifactSet({
    serializeId: 7,
    goodId: 'CrimsonWitchOfFlames',
    gameId: 15006,
	itemIds: [80310, 80311, 80312, 80313, 80314, 80320, 80321, 80322, 80323, 80324, 80330, 80331, 80332, 80333, 80334, 80340, 80341, 80342, 80343, 80344, 80350, 80351, 80352, 80353, 80354, 80410, 80411, 80412, 80413, 80414, 80420, 80421, 80422, 80423, 80424, 80430, 80431, 80432, 80433, 80434, 80440, 80441, 80442, 80443, 80444, 80450, 80451, 80452, 80453, 80454, 80510, 80511, 80512, 80513, 80514, 80520, 80521, 80522, 80523, 80524, 80530, 80531, 80532, 80533, 80534, 80540, 80541, 80542, 80543, 80544, 80550, 80551, 80552, 80553, 80554, 23361, 23362, 23363, 23364, 23365, 23366, 23367, 23368, 23369, 23370, 24111, 24112, 24113, 24114, 24115, 24231, 24232, 24233, 24234, 24235, 24251, 24252, 24253, 24254, 24255, 24681, 24682, 24683, 24684, 24685],
    name: "artifact_set.crimson_witch_of_flames",
    iconClass: "artifact-icon-crimson-witch-of-flames",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.crimson_witch_of_flames_2',
                    description: 'set_descr.crimson_witch_of_flames_2',
                    settings: {},
                    stats: {
                        dmg_pyro: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.crimson_witch_of_flames_4',
                    description: 'set_descr.crimson_witch_of_flames_4_1',
                    settings: {},
                    stats: {
                        dmg_reaction_overloaded: 40,
                        dmg_reaction_burning: 40,
                        dmg_reaction_burgeon: 40,
                        dmg_reaction_vaporize: 15,
                        dmg_reaction_melt: 15,
                    },
                }),
                new ConditionStacks({
                    name: 'set.crimson_witch_of_flames_4',
                    serializeId: 6,
                    title: 'set_bonus.crimson_witch_of_flames_4',
                    description: 'set_descr.crimson_witch_of_flames_4_2',
                    maxStacks: 3,
                    stats: [
                        new StatTable('dmg_pyro', [7.5]),
                    ],
                })
            ],
        },
    ],
})
