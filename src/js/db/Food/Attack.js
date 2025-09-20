import { DbObjectFood } from "../../classes/DbObject/Food";
import { DbObjectListSerialize } from "../../classes/DbObject/List/Serialize";
import { StatTable } from "../../classes/StatTable";

export const Attack = new DbObjectListSerialize({
    AdeptusTemptation: new DbObjectFood({
        serializeId: 1,
        rarity: 5,
        stats: [
            new StatTable('atk', [260, 316, 372]),
            new StatTable('crit_rate', [8, 10, 12]),
        ],
        items: [
            {
                name: 'adeptus_temptation',
                icon: 'food-icon-adeptus-temptation',
            },
        ],
    }),
    ChickenTofuPudding: new DbObjectFood({
        serializeId: 2,
        rarity: 4,
        stats: [
            new StatTable('atk', [224, 272, 320]),
            new StatTable('crit_rate', [6, 8, 10]),
        ],
        items: [
            {
                name: 'chicken_tofu_pudding',
                icon: 'food-icon-chicken-tofu-pudding',
                prefix: 'm',
            },
            {
                name: 'golden_fried_chicken',
                icon: 'food-icon-golden-fried-chicken',
            },
            {
                name: 'jade_parcels',
                icon: 'food-icon-jade-parcels',
            },
            {
                name: 'sashimi_platter',
                icon: 'food-icon-sashimi-platter',
            }
        ],
    }),
    TianshuMeat: new DbObjectFood({
        serializeId: 3,
        rarity: 4,
        stats: [
            new StatTable('dmg_phys', [25, 35, 45]),
            new StatTable('crit_rate', [6, 8, 10]),
        ],
        items: [
            {
                name: 'tianshu_meat',
                icon: 'food-icon-tianshu-meat',
            },
        ],
    }),
    AdventurersBreakfastSandwich: new DbObjectFood({
        serializeId: 4,
        rarity: 3,
        stats: [
            new StatTable('atk', [160, 194, 228]),
        ],
        items: [
            {
                name: 'adventurers_breakfast_sandwich',
                icon: 'food-icon-adventurers-breakfast-sandwich',
                prefix: 'f',
            },
            {
                name: 'fragrant_mashed_potatoes',
                icon: 'food-icon-fragrant-mashed-potatoes',
            },
            {
                name: 'qingce_stir_fry',
                icon: 'food-icon-qingce-stir-fry',
            },
            {
                name: 'sauteed_matsutake',
                icon: 'food-icon-sauteed-matsutake',
            },
            {
                name: 'tri_flavored_skewer',
                icon: 'food-icon-tri-flavored-skewer',
            },
        ],
    }),
    ColdCutPlatter: new DbObjectFood({
        serializeId: 5,
        rarity: 3,
        stats: [
            new StatTable('dmg_phys', [20, 30, 40, 55]),
        ],
        items: [
            {
                name: 'cold_cut_platter',
                icon: 'food-icon-cold-cut-platter',
            },
            {
                name: 'jueyun_guoba',
                icon: 'food-icon-jueyun-guoba',
            },
            {
                name: 'braised_meat',
                icon: 'food-icon-braised-meat',
            },
            {
                name: 'more_and_more',
                icon: 'food-icon-more-and-more',
            },
        ],
        special: {
            char: 'Fischl',
            name: 'die_heilige_sinfonie',
            icon: 'food-icon-die-heilige-sinfonie',
            prefix: 'f',
            original: {
                name: 'cold_cut_platter',
                icon: 'food-icon-cold-cut-platter',
            },
        },
    }),
    PileEmUp: new DbObjectFood({
        serializeId: 6,
        rarity: 3,
        stats: [
            new StatTable('crit_rate', [10, 15, 20, 20]),
            new StatTable('crit_dmg', [0, 0, 0, 20]),
        ],
        items: [
            {
                name: 'pile_em_up',
                icon: 'food-icon-pile-em-up',
            },
            {
                name: 'come_and_get_it',
                icon: 'food-icon-come-and-get-it',
            },
            {
                name: 'cured_pork_dry_hotpot',
                icon: 'food-icon-cured-pork-dry-hotpot',
            },
            {
                name: 'imported_poultry',
                icon: 'food-icon-imported-poultry',
            },
        ],
        special: {
            char: 'Diluc',
            name: 'once_upon_a_time_in_mondstadt',
            icon: 'food-icon-once-upon-a-time-in-mondstadt',
            original: {
                name: 'pile_em_up',
                icon: 'food-icon-pile-em-up',
            },
        },
    }),
    NoTomorrow: new DbObjectFood({
        serializeId: 9,
        rarity: 3,
        stats: [
            new StatTable('crit_rate', [0, 0, 0, 20]),
            new StatTable('crit_dmg', [0, 0, 0, 20]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Qiqi',
            name: 'no_tomorrow',
            icon: 'food-icon-no-tomorrow',
            original: {
                name: 'come_and_get_it',
                icon: 'food-icon-come-and-get-it',
            },
        },
    }),
    AlmondTofu: new DbObjectFood({
        serializeId: 7,
        rarity: 2,
        stats: [
            new StatTable('atk', [66, 81, 95, 114]),
        ],
        items: [
            {
                name: 'almond_tofu',
                icon: 'food-icon-almond-tofu',
                prefix: 'm',
            },
            {
                name: 'crab_roe_kourayaki',
                icon: 'food-icon-crab-roe-kourayaki',
            },
            {
                name: 'fried_radish_balls',
                icon: 'food-icon-fried-radish-balls',
            },
            {
                name: 'mint_salad',
                icon: 'food-icon-mint-salad',
            },
        ],
        special: {
            char: 'Xiao',
            name: 'sweet_dream',
            icon: 'food-icon-sweet-dream',
            prefix: 'm',
            original: {
                name: 'almond_tofu',
                icon: 'food-icon-almond-tofu',
            },
        },
    }),
    JueyunChiliChicken: new DbObjectFood({
        serializeId: 8,
        rarity: 2,
        stats: [
            new StatTable('crit_rate', [6, 8, 12, 16]),
        ],
        items: [
            {
                name: 'satisfying_salad',
                icon: 'food-icon-satisfying-salad',
                prefix: 'm',
            },
            {
                name: 'jueyun_chili_chicken',
                icon: 'food-icon-jueyun-chili-chicken',
            },
            {
                name: 'radish_and_fish_stew',
                icon: 'food-icon-radish-and-fish-stew',
            },
            {
                name: 'stone_harbor_delicacies',
                icon: 'food-icon-stone-harbor-delicacies',
            },
        ],
        special: {
            char: 'Mona',
            name: 'der_weisheit_letzter_schluss',
            icon: 'food-icon-der-weisheit-letzter-schluss',
            prefix: 'f',
            original: {
                name: 'satisfying_salad',
                icon: 'food-icon-satisfying-salad',
            },
        },
    }),
    RockinRiffinChicken: new DbObjectFood({
        serializeId: 10,
        rarity: 2,
        stats: [
            new StatTable('crit_rate', [0, 0, 0, 16]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Xinyan',
            name: 'rockin_riffin_chicken',
            icon: 'food-icon-rockin-riffin-chicken',
            prefix: 'f',
            original: {
                name: 'jueyun_chili_chicken',
                icon: 'food-icon-jueyun-chili-chicken',
            },
        },
    }),
    HeartstringNoodles: new DbObjectFood({
        serializeId: 11,
        rarity: 3,
        stats: [
            new StatTable('atk', [0, 0, 0, 274]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Shenhe',
            name: 'heartstring_noodles',
            icon: 'food-icon-heartstring-noodles',
            prefix: 'f',
        },
    }),
    OnlyTruth: new DbObjectFood({
        serializeId: 12,
        rarity: 2,
        stats: [
            new StatTable('atk', [0, 0, 0, 114]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Heizou',
            name: 'only_truth',
            icon: 'food-icon-only-truth',
            prefix: 'f',
        },
    }),
    ShowMeTheMora: new DbObjectFood({
        serializeId: 14,
        rarity: 3,
        stats: [
            new StatTable('atk', [0, 0, 0, 274]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Dori',
            name: 'show_me_the_mora',
            icon: 'food-icon-forest-show-me-the-mora',
        },
    }),
    Baklava: new DbObjectFood({
        serializeId: 15,
        rarity: 3,
        stats: [
            new StatTable('crit_rate', [10, 15, 20]),
        ],
        items: [
            {
                name: 'baklava',
                icon: 'food-icon-satisfying-salad',
                prefix: 'f',
            },
        ],
    }),
    QingceHouseholdDish: new DbObjectFood({
        serializeId: 16,
        rarity: 3,
        stats: [
            new StatTable('atk', [0, 0, 0, 274]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Yaoyao',
            name: 'qingce_household_dish',
            icon: 'food-icon-qingce-household-dish',
        },
    }),
    SurveyorsBreakfastSandwich: new DbObjectFood({
        serializeId: 17,
        rarity: 3,
        stats: [
            new StatTable('atk', [0, 0, 0, 274]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Mika',
            name: 'surveyors_breakfast_sandwich',
            icon: 'food-icon-surveyors-breakfast-sandwich',
            prefix: 'm',
        },
    }),
    CubicTricks: new DbObjectFood({
        serializeId: 18,
        rarity: 3,
        stats: [
            new StatTable('crit_rate', [0, 0, 0, 20]),
            new StatTable('crit_dmg', [0, 0, 0, 20]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Lyney',
            name: 'cubic_tricks',
            icon: 'food-icon-cubic-tricks',
            prefix: 'm',
        },
    }),
    ConsommePurete: new DbObjectFood({
        serializeId: 19,
        rarity: 3,
        stats: [
            new StatTable('crit_rate', [0, 0, 0, 20]),
            new StatTable('crit_dmg', [0, 0, 0, 20]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Neuvillette',
            name: 'consomme_purete',
            icon: 'food-icon-consomme-purete',
            prefix: 'f',
        },
    }),
    HymnOfGatheredFlame: new DbObjectFood({
        serializeId: 20,
        rarity: 3,
        stats: [
            new StatTable('crit_rate', [0, 0, 0, 20]),
            new StatTable('crit_dmg', [0, 0, 0, 20]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Mavuika',
            name: 'hymn_of_gathered_flame',
            icon: 'food-icon-hymn-of-gathered-flame',
            prefix: 'f',
        },
    }),
    MtMushroom: new DbObjectFood({
        serializeId: 21,
        rarity: 2,
        stats: [
            new StatTable('crit_rate', [0, 0, 0, 16]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Varesa',
            name: 'mt_mushroom',
            icon: 'food-icon-mt-mushroom',
            prefix: 'f',
        },
    }),
    GateauDebordMagnifique: new DbObjectFood({
        serializeId: 22,
        rarity: 4,
        stats: [
            new StatTable('atk', [0, 0, 0, 384]),
            new StatTable('crit_rate', [0, 0, 0, 14]),
        ],
        noCommon: true,
        items: [],
        special: {
            char: 'Escoffier',
            name: 'gateau_debord_magnifique',
            icon: 'food-icon-gateau-debord-magnifique',
            prefix: 'm',
        },
    }),
    VerdantGift: new DbObjectFood({
        serializeId: 23,
        rarity: 4,
        stats: [
            new StatTable('atk', [0, 0, 0, 320]),
            new StatTable('crit_rate', [0, 0, 0, 10]),
        ],
        noCommon: true,
        hideQuality: true,
        items: [],
        special: {
            char: 'Escoffier',
            name: 'verdant_gift',
            icon: 'food-icon-verdant-gift',
            prefix: 'm',
        },
    }),
    GildedHall: new DbObjectFood({
        serializeId: 24,
        rarity: 5,
        stats: [
            new StatTable('atk', [0, 0, 0, 372]),
            new StatTable('crit_dmg', [0, 0, 0, 24]),
        ],
        noCommon: true,
        hideQuality: true,
        items: [],
        special: {
            char: 'Escoffier',
            name: 'gilded_hall',
            icon: 'food-icon-gilded-hall',
            prefix: 'm',
        },
    }),
});
