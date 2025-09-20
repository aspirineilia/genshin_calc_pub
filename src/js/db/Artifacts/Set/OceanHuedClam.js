import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionNumber } from "../../../classes/Condition/Number";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionStaticClam } from "../../../classes/Condition/Static/Clam";
import { FeatureDamageClam } from "../../../classes/Feature2/Damage/Clam";
import { FeatureMultiplier } from "../../../classes/Feature2/Multiplier";
import { ValueTable } from "../../../classes/ValueTable";

export const OceanHuedClam = new ArtifactSet({
    serializeId: 37,
    goodId: 'OceanHuedClam',
    gameId: 15022,
	itemIds: [96412, 96413, 96422, 96423, 96432, 96433, 96442, 96443, 96452, 96453, 96513, 96514, 96523, 96524, 96533, 96534, 96543, 96544, 96553, 96554, 23591, 23592, 23593, 23594, 23595, 23596, 23597, 23598, 23599, 23600],
    name: "artifact_set.ocean_hued_clam",
    iconClass: "artifact-icon-ocean-hued-clam",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.ocean_hued_clam_2',
                    description: 'set_descr.ocean_hued_clam_2',
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
                    name: 'accumulated_healing',
                    serializeId: 20,
                    title: 'set_bonus.ocean_hued_clam_4_stack',
                    class: "gi-inputs-5digit",
                    max: 30000,
                }),
                new ConditionStaticClam({
                    title: 'set_bonus.ocean_hued_clam_4',
                    description: 'set_descr.ocean_hued_clam_4',
                    stats: {
                        text_percent_hp: 90,
                    },
                    settings: {
                        'set_bonus.ocean_hued_clam_4': 1,
                        'rotation.recalc_on_healing': 1,
                    },
                }),
            ],
            features: [
                new FeatureDamageClam({
                    name: 'sea_dyed_foam_dmg',
                    category: 'other',
                    rotationHitDescription: 'ocean_hued_clam_4_value',
                    multipliers: [
                        new FeatureMultiplier({
                            scaling: 'accumulated_healing',
                            source: 'ocean_hued_clam',
                            values: new ValueTable([90]),
                            capValue: new ValueTable([30_000]),
                        }),
                    ],
                }),
            ],
        },
    ],
})
