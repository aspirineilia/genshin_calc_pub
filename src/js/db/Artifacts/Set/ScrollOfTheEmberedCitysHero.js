import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBoolean } from "../../../classes/Condition/Boolean";
import { ConditionBooleanNightSoul } from "../../../classes/Condition/Boolean/NightSoul";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ScrollOfTheEmberedCitysHero = new ArtifactSet({
    serializeId: 52,
    goodId: 'ScrollOfTheHeroOfCinderCity',
    gameId: 15037,
	itemIds: [37412, 37413, 37422, 37423, 37432, 37433, 37442, 37443, 37452, 37453, 37513, 37514, 37523, 37524, 37533, 37534, 37543, 37544, 37553, 37554, 23741, 23742, 23743, 23744, 23745, 23746, 23747, 23748, 23749, 23750],
    name: "artifact_set.scroll_of_the_hero_of_cinder_city",
    iconClass: "artifact-icon-scroll-of-the-hero-of-cinder-city",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    name: 'set.scroll_of_the_hero_of_cinder_city_2',
                    title: 'set_bonus.scroll_of_the_hero_of_cinder_city_2',
                    description: 'set_descr.scroll_of_the_hero_of_cinder_city_2',
                }),
            ],
        },
        {},
        {
            conditions: [
                new ConditionBoolean({
                    name: 'set.scroll_of_the_hero_of_cinder_city_4_1',
                    serializeId: 43,
                    title: 'set_bonus.scroll_of_the_hero_of_cinder_city_4',
                    description: 'set_descr.scroll_of_the_hero_of_cinder_city_4_1',
                    stats: {
                        text_percent: 12,
                    },
                }),
                new ConditionBoolean({
                    name: 'set.scroll_of_the_hero_of_cinder_city_4_2',
                    serializeId: 44,
                    title: 'set_bonus.scroll_of_the_hero_of_cinder_city_4',
                    description: 'set_descr.scroll_of_the_hero_of_cinder_city_4_2',
                    stats: {
                        text_percent: 28,
                    },
                    subConditions: [
                        new ConditionBooleanNightSoul(),
                    ],
                }),
            ],
        },
    ],
})

