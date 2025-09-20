import { ArtifactSet } from "../../../classes/ArtifactSet";
import { ConditionStatic } from "../../../classes/Condition/Static";

export const TinyMiracle = new ArtifactSet({
    serializeId: 24,
    goodId: 'TinyMiracle',
    gameId: 10004,
	itemIds: [54110, 54111, 54112, 54113, 54114, 54120, 54121, 54122, 54123, 54124, 54130, 54131, 54132, 54133, 54134, 54140, 54141, 54142, 54143, 54144, 54150, 54151, 54152, 54153, 54154, 54210, 54211, 54212, 54213, 54214, 54220, 54221, 54222, 54223, 54224, 54230, 54231, 54232, 54233, 54234, 54240, 54241, 54242, 54243, 54244, 54250, 54251, 54252, 54253, 54254, 54310, 54311, 54312, 54313, 54314, 54320, 54321, 54322, 54323, 54324, 54330, 54331, 54332, 54333, 54334, 54340, 54341, 54342, 54343, 54344, 54350, 54351, 54352, 54353, 54354, 54410, 54411, 54412, 54413, 54414, 54420, 54421, 54422, 54423, 54424, 54430, 54431, 54432, 54433, 54434, 54440, 54441, 54442, 54443, 54444, 54450, 54451, 54452, 54453, 54454, 54510, 54511, 54512, 54513, 54514, 54520, 54521, 54522, 54523, 54524, 54530, 54531, 54532, 54533, 54534, 54540, 54541, 54542, 54543, 54544, 54550, 54551, 54552, 54553, 54554],
    name: "artifact_set.tiny_miracle",
    iconClass: "artifact-icon-tiny-miracle",
    minRarity: 3,
    maxRarity: 4,
    setBonus: [
        {},
        {
            conditions: [
                new ConditionStatic({
                    title: 'set_bonus.tiny_miracle_2',
                    description: 'set_descr.tiny_miracle_2',
                    stats: {
                        res_pyro: 20,
                        res_cryo: 20,
                        res_hydro: 20,
                        res_electro: 20,
                        res_enemo: 20,
                        res_geo: 20,
                        res_dendro: 20,
                    },
                })
            ],
        },
        // Incoming elemental DMG increases corresponding Elemental RES by 30% for 10s. Can only occur once every 10s.
    ],
})

