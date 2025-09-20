import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";

export const DesertPavilionChronicle = new ArtifactSet({
    serializeId: 42,
    goodId: 'DesertPavilionChronicle',
    gameId: 15027,
	itemIds: [27412, 27413, 27422, 27423, 27432, 27433, 27442, 27443, 27452, 27453, 27513, 27514, 27523, 27524, 27533, 27534, 27543, 27544, 27553, 27554, 23641, 23642, 23643, 23644, 23645, 23646, 23647, 23648, 23649, 23650],
    name: "artifact_set.desert_pavilion_chronicle",
    iconClass: "artifact-icon-desert-pavilion-chronicle",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.desert_pavilion_chronicle_2',
                    description: 'set_descr.desert_pavilion_chronicle_2',
                    stats: {
                        dmg_anemo: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.desert_pavilion_chronicle_4',
                    serializeId: 29,
                    title: 'set_bonus.desert_pavilion_chronicle_4',
                    description: 'set_descr.desert_pavilion_chronicle_4',
                    stats: {
                        atk_speed_normal: 10,
                        dmg_normal: 40,
                        dmg_charged: 40,
                        dmg_plunge: 40,
                    },
                }),
            ],
        },
    ],
})
