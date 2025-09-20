import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanNightSoul } from "../../../classes/Condition/Boolean/NightSoul";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ObsidianCodex = new ArtifactSet({
    serializeId: 53,
    goodId: 'ObsidianCodex',
    gameId: 15038,
	itemIds: [38412, 38413, 38422, 38423, 38432, 38433, 38442, 38443, 38452, 38453, 38513, 38514, 38523, 38524, 38533, 38534, 38543, 38544, 38553, 38554, 23751, 23752, 23753, 23754, 23755, 23756, 23757, 23758, 23759, 23760],
    name: "artifact_set.obsidian_codex",
    iconClass: "artifact-icon-obsidian-codex",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'common.nightsoul_blessing_state',
                    serializeId: 41,
                    title: 'talent_name.nightsoul_blessing_state',
                    subConditions: [
                        new ConditionBooleanNightSoul(),
                    ],
                }),
                new ConditionStatic({
                    title: 'set_bonus.obsidian_codex_2',
                    description: 'set_descr.obsidian_codex_2',
                    stats: {
                        dmg_all: 15,
                    },
                    subConditions: [
                        new ConditionBooleanNightSoul(),
                        new ConditionBoolean({name: 'common.nightsoul_blessing_state'}),
                    ],
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.obsidian_codex_4',
                    serializeId: 42,
                    title: 'set_bonus.obsidian_codex_4',
                    description: 'set_descr.obsidian_codex_4',
                    stats: {
                        crit_rate: 40,
                    },
                    subConditions: [
                        new ConditionBooleanNightSoul(),
                    ],
                }),
            ],
        },
    ],
})

