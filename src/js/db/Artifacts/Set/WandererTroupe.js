import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBooleanWeaponType } from "../../../classes/Condition/Boolean/WeaponType";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const WandererTroupe = new ArtifactSet({
    serializeId: 27,
    goodId: 'WanderersTroupe',
    gameId: 15003,
	itemIds: [77310, 77311, 77312, 77313, 77314, 77320, 77321, 77322, 77323, 77324, 77330, 77331, 77332, 77333, 77334, 77340, 77341, 77342, 77343, 77344, 77350, 77351, 77352, 77353, 77354, 77410, 77411, 77412, 77413, 77414, 77420, 77421, 77422, 77423, 77424, 77430, 77431, 77432, 77433, 77434, 77440, 77441, 77442, 77443, 77444, 77450, 77451, 77452, 77453, 77454, 77510, 77511, 77512, 77513, 77514, 77520, 77521, 77522, 77523, 77524, 77530, 77531, 77532, 77533, 77534, 77540, 77541, 77542, 77543, 77544, 77550, 77551, 77552, 77553, 77554, 23391, 23392, 23393, 23394, 23395, 23396, 23397, 23398, 23399, 23400],
    name: "artifact_set.wanderers_troupe",
    iconClass: "artifact-icon-wanderers-troupe",
    minRarity: 4,
    maxRarity: 5,
    setBonus:  [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.wanderers_troupe_2',
                    description: 'set_descr.wanderers_troupe_2',
                    stats: {
                        mastery: 80,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.wanderers_troupe_4',
                    description: 'set_descr.wanderers_troupe_4',
                    stats: {
                        dmg_charged: 35,
                    },
                    conditions: new ConditionBooleanWeaponType({types: ['bow', 'catalyst']}),
                })
            ],
        },
    ],
});
