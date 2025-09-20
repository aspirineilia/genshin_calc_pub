import { DbObjectFood } from "../../classes/DbObject/Food";
import { DbObjectListSerialize } from "../../classes/DbObject/List/Serialize";
import { StatTable } from "../../classes/StatTable";

export const Defence = new DbObjectListSerialize({
    ButterCrab: new DbObjectFood({
        serializeId: 1,
        rarity: 4,
        stats: [
            new StatTable('def', [215, 261, 308]),
            new StatTable('healing', [6, 8, 10]),
        ],
        items: [
            {
                name: 'butter_crab',
                icon: 'food-icon-butter-crab',
                prefix: 'm',
            },
            {
                name: 'golden_crab',
                icon: 'food-icon-golden-crab',
                prefix: 'm',
            },
        ],
    }),
    CallaLilySeafoodSoup: new DbObjectFood({
        serializeId: 2,
        rarity: 3,
        stats: [
            new StatTable('def', [165, 200, 235, 282]),
        ],
        items: [
            {
                name: 'calla_lily_seafood_soup',
                icon: 'food-icon-calla-lily-seafood-soup',
                prefix: 'm',
            },
            {
                name: 'lotus_flower_crisp',
                icon: 'food-icon-lotus-flower-crisp',
            },
            {
                name: 'rice_cake_soup',
                icon: 'food-icon-rice-cake-soup',
                prefix: 'm',
            },
        ],
        special: {
            char: 'Tartaglia',
            name: 'prize_catch',
            icon: 'food-icon-prize-catch',
            prefix: 'f',
            original: {
                name: 'calla_lily_seafood_soup',
                icon: 'food-icon-calla-lily-seafood-soup',
            },
        },
    }),
    ChiliMinceCornbreadBuns: new DbObjectFood({
        serializeId: 3,
        rarity: 4,
        stats: [
            new StatTable('shield', [25, 30, 35, 40]),
            new StatTable('def', [165, 200, 235, 282]),
        ],
        items: [
            {
                name: 'moon_pie',
                icon: 'food-icon-moon-pie',
                prefix: 'm',
            },
            {
                name: 'chili_mince_cornbread_buns',
                icon: 'food-icon-chili-mince-cornbread-buns',
                prefix: 'z',
            },
        ],
        special: {
            char: 'Eula',
            name: 'stormcrest_pie',
            icon: 'food-icon-stormcrest-pie',
            prefix: 'm',
            original: {
                name: 'moon_pie',
                icon: 'food-icon-moon-pie',
            },
        },
    }),
    FishermansToast: new DbObjectFood({
        serializeId: 4,
        rarity: 2,
        stats: [
            new StatTable('def', [88, 107, 126, 151]),
        ],
        items: [
            {
                name: 'fishermans_toast',
                icon: 'food-icon-fishermans-toast',
                prefix: 'm',
            },
            {
                name: 'jewelry_soup',
                icon: 'food-icon-jewelry-soup',
                prefix: 'm',
            },
            {
                name: 'wakatakeni',
                icon: 'food-icon-wakatakeni',
                prefix: 'm',
            },
        ],
        special: {
            char: 'Klee',
            name: 'fish_flavored_toast',
            icon: 'food-icon-fish-flavored-toast',
            prefix: 'm',
            original: {
                name: 'fishermans_toast',
                icon: 'food-icon-fishermans-toast',
            },
        },
    }),
    SakuraTempura: new DbObjectFood({
        serializeId: 5,
        rarity: 3,
        stats: [
            new StatTable('shield', [20, 25, 30, 35]),
        ],
        items: [
            {
                name: 'sunshine_sprat',
                icon: 'food-icon-sunshine-sprat',
                prefix: 'f',
            },
            {
                name: 'sakura_tempura',
                icon: 'food-icon-sakura-tempura',
                prefix: 'f',
            },
            {
                name: 'stir_fried_shrimp',
                icon: 'food-icon-stir-fried-shrimp',
                prefix: 'z',
            },
            {
                name: 'triple_layered_consomme',
                icon: 'food-icon-triple-layered-consomme',
                prefix: 'm',
            },
        ],
        special: {
            char: 'Albedo',
            name: 'woodland_dream',
            icon: 'food-icon-woodland-dream',
            prefix: 'm',
            original: {
                name: 'sunshine_sprat',
                icon: 'food-icon-sunshine-sprat',
            },
        },
    }),
    SakuraShrimpCrackers: new DbObjectFood({
        serializeId: 6,
        rarity: 3,
        stats: [
            new StatTable('hp_percent', [20, 22, 25]),
        ],
        items: [
            {
                name: 'sakura_shrimp_crackers',
                icon: 'food-icon-sakura-shrimp-crackers',
                prefix: 'z',
            },
        ],
    }),
    UnagiChazuke: new DbObjectFood({
        serializeId: 7,
        rarity: 3,
        stats: [
            new StatTable('healing', [15, 17, 20, 25]),
        ],
        items: [
            {
                name: 'unagi_chazuke',
                icon: 'food-icon-unagi-chazuke',
                prefix: 'm',
            },
        ],
        special: {
            char: 'Wanderer',
            name: 'shimi_chazuke',
            icon: 'food-icon-shimi-chazuke',
            prefix: 'm',
        },
    }),
    QuietElegance: new DbObjectFood({
        serializeId: 8,
        rarity: 3,
        stats: [
            new StatTable('shield', [0, 0, 0, 35]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Ayato',
            name: 'quiet_elegance',
            icon: 'food-icon-quiet-elegance',
            prefix: 'f',
            original: {
                name: 'sakura_tempura',
                icon: 'food-icon-sakura-tempura',
            },
        },
    }),
    ForestWatchersChoice: new DbObjectFood({
        serializeId: 9,
        rarity: 2,
        stats: [
            new StatTable('def', [0, 0, 0, 151]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Tighnari',
            name: 'forest_watchers_choice',
            icon: 'food-icon-forest-watchers-choice',
            prefix: 'm',
        },
    }),
    GoldflameTajine: new DbObjectFood({
        serializeId: 10,
        rarity: 3,
        stats: [
            new StatTable('hp_percent', [0, 0, 0, 30]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Dehya',
            name: 'goldflame_tajine',
            icon: 'food-icon-goldflame-tajine',
            prefix: 'm',
        },
    }),
    ALeisurelySip: new DbObjectFood({
        serializeId: 11,
        rarity: 3,
        stats: [
            new StatTable('healing', [0, 0, 0, 25]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Lynette',
            name: 'a_leisurely_sip',
            icon: 'food-icon-a-leisurely-sip',
            prefix: 'm',
        },
    }),
    CheesyCrabHotpot: new DbObjectFood({
        serializeId: 12,
        rarity: 5,
        stats: [
            new StatTable('hp_percent', [20, 25, 30]),
            new StatTable('recharge', [14, 17, 20]),
        ],
        items: [
            {
                name: 'cheesy_crab_hotpot',
                icon: 'food-icon-cheesy-crab-hotpot',
                prefix: 'm',
            },
        ],
    }),
    EmotionalSupport: new DbObjectFood({
        serializeId: 13,
        rarity: 3,
        stats: [
            new StatTable('def', [0, 0, 0, 282]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Ifa',
            name: 'emotional_support',
            icon: 'food-icon-emotional-support',
            prefix: 'f',
        },
    }),
});

