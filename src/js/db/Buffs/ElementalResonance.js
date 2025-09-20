import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionEnemyStatus } from "../../classes/Condition/Boolean/EnemyStatus";
import { ConditionBooleanResonanceEnabled } from "../../classes/Condition/Boolean/ResonanceEnabled";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionChars } from "../../classes/Condition/Chars";
import { ConditionCustomBuffs } from "../../classes/Condition/CustomBuffs";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionResonance } from "../../classes/Condition/Resonance";
import { ConditionStatic } from "../../classes/Condition/Static";
import { DbObjectBuff } from "../../classes/DbObject/Buff";

const elementValues = [
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
    {
        value: 'anemo',
        serializeId: 5,
    },
    {
        value: 'geo',
        serializeId: 6,
    },
    {
        value: 'dendro',
        serializeId: 7,
    },
];

export const ElementalResonance = new DbObjectBuff({
    name: 'elemental_resonance',
    type: 'elemental_resonance',
    conditions: [
        new ConditionDropdownElement({
            name: 'old_resonance_element_1',
            serializeId: 1,
            values: elementValues,
            isHidden: true,
        }),
        new ConditionDropdownElement({
            name: 'old_resonance_element_2',
            serializeId: 2,
            values: elementValues,
            isHidden: true,
        }),
        new ConditionDropdownElement({
            name: 'old_resonance_element_3',
            serializeId: 3,
            values: elementValues,
            isHidden: true,
        }),
        new ConditionChars({
            name: 'party_chars',
            serializeId: 17,
            isHidden: true,
        }),
        new ConditionCustomBuffs({
            name: 'custom_buffs',
            serializeId: 24,
            isHidden: true,
        }),
        new ConditionStatic({
            title: 'buffs_name.resonance_cryo',
            description: 'buffs_descr.resonance_cryo',
            stats: {
                text_percent: 40,
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'cryo',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'cryo',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            serializeId: 4,
            title: 'buffs_name.resonance_cryo_status',
            description: 'buffs_descr.resonance_cryo_status',
            stats: {
                crit_rate_enemy: 15,
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'cryo',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'cryo',
                }),
                new ConditionEnemyStatus({
                    status: ['cryo'],
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            title: 'buffs_name.resonance_electro',
            description: 'buffs_descr.resonance_electro',
            stats: {
                text_percent_1: 40,
                text_percent_2: 100,
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'electro',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'electro',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            title: 'buffs_name.resonance_hydro',
            description: 'buffs_descr.resonance_hydro',
            stats: {
                text_percent: 40,
                hp_percent: 25,
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'hydro',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'hydro',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            title: 'buffs_name.resonance_pyro',
            description: 'buffs_descr.resonance_pyro',
            stats: {
                text_percent: 40,
                atk_percent: 25,
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'pyro',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'pyro',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            title: 'buffs_name.resonance_anemo',
            description: 'buffs_descr.resonance_anemo',
            stats: {
                stamina_consume: 15,
                move_speed: 10,
                recovery: 5,
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'anemo',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'anemo',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            title: 'buffs_name.resonance_geo',
            description: 'buffs_descr.resonance_geo',
            stats: {
                shield: 15,
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'geo',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'geo',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionBoolean({
            name: 'common.char_status_shield',
            serializeId: 5,
            rotation: 'buffs',
            title: 'buffs_name.resonance_geo_shield',
            description: 'buffs_descr.resonance_geo_shield',
            stats: {
                dmg_all: 15,
            },
            icon: {
                name: 'icon-cover element-geo',
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'geo',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'geo',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionBoolean({
            name: 'buffs.resonance_geo_attack',
            serializeId: 6,
            rotation: 'buffs',
            title: 'buffs_name.resonance_geo_attack',
            description: 'buffs_descr.resonance_geo_attack',
            stats: {
                text_percent: 20,
                enemy_res_geo: -20,
            },
            icon: {
                name: 'icon-cover element-geo',
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'geo',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'geo',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            name: 'common.char_status_shield',
            rotation: 'buffs',
            title: 'buffs_name.resonance_dendro',
            description: 'buffs_descr.resonance_dendro_1',
            stats: {
                mastery: 50,
            },
            icon: {
                name: 'icon-cover element-dendro',
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'dendro',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'dendro',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionBoolean({
            name: 'buffs.resonance_dendro_1',
            serializeId: 22,
            rotation: 'buffs',
            title: 'buffs_name.resonance_dendro',
            description: 'buffs_descr.resonance_dendro_2',
            stats: {
                mastery: 30,
            },
            icon: {
                name: 'icon-cover element-dendro',
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'dendro',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'dendro',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionBoolean({
            name: 'buffs.resonance_dendro_2',
            serializeId: 23,
            rotation: 'buffs',
            title: 'buffs_name.resonance_dendro',
            description: 'buffs_descr.resonance_dendro_3',
            stats: {
                mastery: 20,
            },
            icon: {
                name: 'icon-cover element-dendro',
            },
            hideCondition: [
                new ConditionResonance({
                    element: 'dendro',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: 'dendro',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionStatic({
            title: 'buffs_name.resonance_none',
            description: 'buffs_descr.resonance_none',
            stats: {
                res_anemo: 15,
                res_phys: 15,
                res_geo: 15,
                res_pyro: 15,
                res_electro: 15,
                res_hydro: 15,
                res_cryo: 15,
                res_dendro: 15,
            },
            hideCondition: [
                new ConditionResonance({
                    element: '',
                    invert: true,
                }),
            ],
            subConditions: [
                new ConditionResonance({
                    element: '',
                }),
                new ConditionBooleanResonanceEnabled(),
            ],
        }),
        new ConditionBoolean({
            name: 'buffs.only_full_party_resonance',
            serializeId: 20,
            title: 'buffs_name.only_full_party_resonance',
            description: 'buffs_descr.only_full_party_resonances',
            hideInactive: true,
            subConditions: [
                new ConditionBooleanValue({
                    setting: 'party_size',
                    cond: 'lt',
                    value: 4,
                }),
            ],
        }),
    ],
});
