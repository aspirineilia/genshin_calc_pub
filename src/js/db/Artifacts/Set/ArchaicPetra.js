import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionDropdownElement } from "../../../classes/Condition/Dropdown/Element";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const ArchaicPetra = new ArtifactSet({
    serializeId: 2,
    goodId: 'ArchaicPetra',
    gameId: 15014,
	itemIds: [88310, 88311, 88312, 88313, 88314, 88320, 88321, 88322, 88323, 88324, 88330, 88331, 88332, 88333, 88334, 88340, 88341, 88342, 88343, 88344, 88350, 88351, 88352, 88353, 88354, 88410, 88411, 88412, 88413, 88414, 88420, 88421, 88422, 88423, 88424, 88430, 88431, 88432, 88433, 88434, 88440, 88441, 88442, 88443, 88444, 88450, 88451, 88452, 88453, 88454, 88510, 88511, 88512, 88513, 88514, 88520, 88521, 88522, 88523, 88524, 88530, 88531, 88532, 88533, 88534, 88540, 88541, 88542, 88543, 88544, 88550, 88551, 88552, 88553, 88554, 23491, 23492, 23493, 23494, 23495, 23496, 23497, 23498, 23499, 23500, 24743, 24744, 24745],
    name: "artifact_set.archaic_petra",
    iconClass: "artifact-icon-archaic-petra",
    minRarity: 4,
    maxRarity: 5,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.archaic_petra_2',
                    description: 'set_descr.archaic_petra_2',
                    settings: {},
                    stats: {
                        dmg_geo: 15,
                    },
                })
            ],
        },
        {},
        {
            conditions: [
                new ConditionDropdownElement({
                    name: 'set_bonus.archaic_petra_4',
                    serializeId: 28,
                    title: 'set_bonus.archaic_petra_4',
                    description: 'set_descr.archaic_petra_4',
                    dropdownClass: 'select-element',
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
                }),
            ],
        },
    ],
})
