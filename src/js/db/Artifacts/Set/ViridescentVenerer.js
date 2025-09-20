import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionBooleanCharElement } from "../../../classes/Condition/Boolean/CharElement";
import { ConditionDropdownElement } from "../../../classes/Condition/Dropdown/Element";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ViridescentVenerer = new ArtifactSet({
    serializeId: 26,
    goodId: 'ViridescentVenerer',
    gameId: 15002,
	itemIds: [76310, 76311, 76312, 76313, 76314, 76320, 76321, 76322, 76323, 76324, 76330, 76331, 76332, 76333, 76334, 76340, 76341, 76342, 76343, 76344, 76350, 76351, 76352, 76353, 76354, 76410, 76411, 76412, 76413, 76414, 76420, 76421, 76422, 76423, 76424, 76430, 76431, 76432, 76433, 76434, 76440, 76441, 76442, 76443, 76444, 76450, 76451, 76452, 76453, 76454, 76510, 76511, 76512, 76513, 76514, 76520, 76521, 76522, 76523, 76524, 76530, 76531, 76532, 76533, 76534, 76540, 76541, 76542, 76543, 76544, 76550, 76551, 76552, 76553, 76554, 23401, 23402, 23403, 23404, 23405, 23406, 23407, 23408, 23409, 23410, 24121, 24122, 24141, 24142, 24143, 24144, 24145, 24171, 24172, 24173, 24174, 24175, 24271, 24272, 24273, 24274, 24275, 24651, 24652, 24653, 24654, 24655, 24691, 24692, 24693, 24694, 24695],
    name: "artifact_set.viridescent_venerer",
    iconClass: "artifact-icon-viridescent-venerer",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.viridescent_venerer_2',
                    description: 'set_descr.viridescent_venerer_2',
                    settings: {},
                    stats: {
                        dmg_anemo: 15,
                    },
                })
            ],
        },
        {},
        {
            suggesterSettings: {
                "set_bonus.viridescent_venerer_4": 'cryo;electro;hydro;pyro',
            },
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.viridescent_venerer_4',
                    description: 'set_descr.viridescent_venerer_4_1',
                    settings: {},
                    stats: {
                        dmg_reaction_swirl: 60,
                    },
                }),
                new ConditionDropdownElement({
                    name: 'set.viridescent_venerer_4',
                    serializeId: 17,
                    multiple: true,
                    hideEmpty: true,
                    dropdownClass: 'small select-element-multiple',
                    title: 'set_bonus.viridescent_venerer_4',
                    description: 'set_descr.viridescent_venerer_4_2',
                    values: [
                        {
                            value: 'cryo',
                            serializeId: 1,
                        },
                        {
                            value: 'electro',
                            serializeId: 2,
                        },
                        {
                            value: 'hydro',
                            serializeId: 3,
                        },
                        {
                            value: 'pyro',
                            serializeId: 4,
                        },
                    ],
                    subConditions: [
                        new ConditionBooleanCharElement({element: ['anemo']}),
                    ],
                }),
            ],
        },
    ],
})
