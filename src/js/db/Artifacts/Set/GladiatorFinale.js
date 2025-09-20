import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBooleanWeaponType } from "../../../classes/Condition/Boolean/WeaponType";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const GladiatorFinale = new ArtifactSet({
    serializeId: 11,
    goodId: 'GladiatorsFinale',
    gameId: 15001,
	itemIds: [75310, 75311, 75312, 75313, 75314, 75320, 75321, 75322, 75323, 75324, 75330, 75331, 75332, 75333, 75334, 75340, 75341, 75342, 75343, 75344, 75350, 75351, 75352, 75353, 75354, 75410, 75411, 75412, 75413, 75414, 75420, 75421, 75422, 75423, 75424, 75430, 75431, 75432, 75433, 75434, 75440, 75441, 75442, 75443, 75444, 75450, 75451, 75452, 75453, 75454, 75510, 75511, 75512, 75513, 75514, 75520, 75521, 75522, 75523, 75524, 75530, 75531, 75532, 75533, 75534, 75540, 75541, 75542, 75543, 75544, 75550, 75551, 75552, 75553, 75554, 23411, 23412, 23413, 23414, 23415, 23416, 23417, 23418, 23419, 23420, 24101, 24102, 24123, 24124, 24125, 24243, 24244, 24245, 24321, 24322, 24323, 24331, 24332, 24333, 24334, 24335, 24341, 24342, 24343, 24344, 24345, 24351, 24352, 24353, 24354, 24355, 24361, 24362, 24363, 24364, 24365, 24741, 24742, 24751, 24752, 24761, 24762, 24763, 24764, 24765],
    name: "artifact_set.gladiators_finale",
    iconClass: "artifact-icon-gladiators-finale",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.gladiators_finale_2',
                    description: 'set_descr.gladiators_finale_2',
                    stats: {
                        atk_percent: 18,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.gladiators_finale_4',
                    description: 'set_descr.gladiators_finale_4',
                    stats: {
                        dmg_normal: 35,
                    },
                    subConditions: [
                        new ConditionBooleanWeaponType({types: ['sword', 'claymore', 'polearm']}),
                    ],
                })
            ],
        },
    ],
});
