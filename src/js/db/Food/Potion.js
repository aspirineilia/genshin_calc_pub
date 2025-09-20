import { DbObjectFood } from "../../classes/DbObject/Food";
import { DbObjectListSerialize } from "../../classes/DbObject/List/Serialize";
import { StatTable } from "../../classes/StatTable";

export const Potion = new DbObjectListSerialize({
    FlamingEssentialOil: new DbObjectFood({
        serializeId: 1,
        rarity: 3,
        hideQuality: true,
        stats: [
            new StatTable('dmg_pyro', [25]),
        ],
        items: [
            {
                name: 'flaming_essential_oil',
                icon: 'food-icon-flaming-essential-oil',
            },
        ],
    }),
    FrostingEssentialOil: new DbObjectFood({
        serializeId: 2,
        rarity: 3,
        hideQuality: true,
        stats: [
            new StatTable('dmg_cryo', [25]),
        ],
        items: [
            {
                name: 'frosting_essential_oil',
                icon: 'food-icon-frosting-essential-oil',
            },
        ],
    }),
    GushingEssentialOil: new DbObjectFood({
        serializeId: 3,
        rarity: 3,
        hideQuality: true,
        stats: [
            new StatTable('dmg_anemo', [25]),
        ],
        items: [
            {
                name: 'gushing_essential_oil',
                icon: 'food-icon-gushing-essential-oil',
            },
        ],
    }),
    ShockingEssentialOil: new DbObjectFood({
        serializeId: 4,
        rarity: 3,
        hideQuality: true,
        stats: [
            new StatTable('dmg_electro', [25]),
        ],
        items: [
            {
                name: 'shocking_essential_oil',
                icon: 'food-icon-shocking-essential-oil',
            },
        ],
    }),
    StreamingEssentialOil: new DbObjectFood({
        serializeId: 5,
        rarity: 3,
        hideQuality: true,
        stats: [
            new StatTable('dmg_hydro', [25]),
        ],
        items: [
            {
                name: 'streaming_essential_oil',
                icon: 'food-icon-streaming-essential-oil',
            },
        ],
    }),
    UnmovingEssentialOil: new DbObjectFood({
        serializeId: 6,
        rarity: 3,
        hideQuality: true,
        stats: [
            new StatTable('dmg_geo', [25]),
        ],
        items: [
            {
                name: 'unmoving_essential_oil',
                icon: 'food-icon-unmoving-essential-oil',
            },
        ],
    }),
    ForestEssentialOil: new DbObjectFood({
        serializeId: 7,
        rarity: 3,
        hideQuality: true,
        stats: [
            new StatTable('dmg_dendro', [25]),
        ],
        items: [
            {
                name: 'forest_essential_oil',
                icon: 'food-icon-forest-essential-oil',
            },
        ],
    }),
});
