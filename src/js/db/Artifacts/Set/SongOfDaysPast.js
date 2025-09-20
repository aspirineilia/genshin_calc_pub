import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionNumber } from "../../../classes/Condition/Number";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { FeatureMultiplierTarget } from "../../../classes/Feature2/Multiplier/Target";
import { ValueTable } from "../../../classes/ValueTable";

export const SongOfDaysPast = new ArtifactSet({
    serializeId: 48,
    goodId: 'SongOfDaysPast',
    gameId: 15033,
	itemIds: [33412, 33413, 33422, 33423, 33432, 33433, 33442, 33443, 33452, 33453, 33513, 33514, 33523, 33524, 33533, 33534, 33543, 33544, 33553, 33554, 23701, 23702, 23703, 23704, 23705, 23706, 23707, 23708, 23709, 23710],
    name: "artifact_set.song_of_days_past",
    iconClass: "artifact-icon-song-of-days-past",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.song_of_days_past_2',
                    description: 'set_descr.song_of_days_past_2',
                    settings: {},
                    stats: {
                        healing: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionNumber({
                    name: 'days_past_healing_recorded',
                    serializeId: 35,
                    title: 'set_bonus.song_of_days_past_4_stack',
                    class: "gi-inputs-5digit",
                    max: 15000,
                }),
                new ConditionBoolean({
                    name: 'set.song_of_days_past_4',
                    serializeId: 36,
                    title: 'set_bonus.song_of_days_past_4',
                    description: 'set_descr.song_of_days_past_4',
                    stats: {
                        text_percent_dmg: 8,
                        text_value_hp: 15000,
                    },
                    settings: {
                        'set_bonus.song_of_days_past_4': 1,
                    },
                }),
            ],
            multipliers: [
                new FeatureMultiplier({
                    source: 'artifacts',
                    scaling: 'days_past_healing_recorded',
                    values: new ValueTable([8]),
                    target: new FeatureMultiplierTarget({
                        damageTypes: ['normal', 'charged', 'plunge', 'skill', 'burst'],
                    }),
                    condition: new ConditionBoolean({name: 'set.song_of_days_past_4'}),
                }),
            ],
        },
    ],
})
