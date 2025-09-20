import { Condition } from "../../classes/Condition";
import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { ConditionDropdown } from "../../classes/Condition/Dropdown";
import { ConditionDropdownElement } from "../../classes/Condition/Dropdown/Element";
import { ConditionNot } from "../../classes/Condition/Not";
import { DbObjectEnemy } from "../../classes/DbObject/Enemy";
import { DbObjectListSerialize } from "../../classes/DbObject/List/Serialize";

export const Bosses = new DbObjectListSerialize({
    Stormterror: new DbObjectEnemy({
        name: 'stormterrorr',
        serializeId: 69,
        iconClass: "type-boss enemy-icon-dvalin",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
    }),
    Andrius: new DbObjectEnemy({
        name: 'lupus_boreas',
        serializeId: 70,
        iconClass: "type-boss enemy-icon-lupiboreas",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
        settings: {
            enemy_immune_anemo: 1,
            enemy_immune_cryo: 1,
        },
    }),
    Childe: new DbObjectEnemy({
        name: 'childe',
        serializeId: 71,
        iconClass: "type-boss enemy-icon-tartaglia",
        resistances: {
            phys: 0,
            pyro: 0,
            dendro: 0,
            hydro: 0,
            electro: 0,
            anemo: 0,
            cryo: 0,
            geo: 0,
        },
        conditions: [
            new ConditionDropdown({
                name: 'childe_phase',
                serializeId: 1,
                title: 'talent_name.bossfight_phase',
                description: 'talent_descr.childe_phase',
                hideEmpty: true,
                defaultValue: 1,
                values: [
                    {
                        title: 1,
                        value: 1,
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_hydro: 50,
                                },
                            }),
                        ],
                    },
                    {
                        title: 2,
                        value: 2,
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_electro: 50,
                                },
                            }),
                        ],
                    },
                    {
                        title: 3,
                        value: 3,
                        serializeId: 3,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_hydro: 70,
                                    enemy_res_electro: 70,
                                },
                            }),
                        ],
                    },
                ],
            }),
        ],
    }),
    Azhdaha: new DbObjectEnemy({
        name: 'azhdaha',
        serializeId: 78,
        iconClass: "type-boss enemy-icon-dahaka",
        resistances: {
            phys: 40,
            pyro: 10,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 70,
        },
        conditions: [
            new ConditionDropdownElement({
                name: 'azhdaha_infusion_1',
                serializeId: 1,
                title: 'talent_name.azhdaha_infusion_1',
                description: 'talent_descr.azhdaha_infusion_1',
                values: [
                    {
                        value: 'cryo',
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_cryo: 60,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_electro: 60,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_hydro: 60,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'pyro',
                        serializeId: 4,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_pyro: 60,
                                },
                            }),
                        ],
                    },
                ],
            }),
            new ConditionDropdownElement({
                name: 'azhdaha_infusion_2',
                serializeId: 2,
                title: 'talent_name.azhdaha_infusion_2',
                description: 'talent_descr.azhdaha_infusion_2',
                values: [
                    {
                        value: 'cryo',
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_cryo: 50,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'electro',
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_electro: 50,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'hydro',
                        serializeId: 3,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_hydro: 50,
                                },
                            }),
                        ],
                    },
                    {
                        value: 'pyro',
                        serializeId: 4,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_pyro: 50,
                                },
                            }),
                        ],
                    },
                ],
            }),
        ],
    }),
    Signora: new DbObjectEnemy({
        name: 'signora',
        serializeId: 108,
        iconClass: "type-boss enemy-icon-lasignora",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
        conditions: [
            new ConditionDropdown({
                name: 'signora_phase',
                serializeId: 1,
                title: 'talent_name.bossfight_phase',
                description: 'talent_descr.signora_phase',
                hideEmpty: true,
                defaultValue: 1,
                values: [
                    {
                        title: 1,
                        value: 1,
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_cryo: 40,
                                },
                            }),
                        ],
                    },
                    {
                        title: 2,
                        value: 2,
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_pyro: 60,
                                },
                            }),
                        ],
                    },
                ],
            }),
        ],
    }),
    Raiden: new DbObjectEnemy({
        name: 'raiden',
        serializeId: 126,
        iconClass: "type-boss enemy-icon-shougun-mitakenarukami",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
        conditions: [
            new ConditionBoolean({
                name: 'raiden_shield',
                serializeId: 1,
                title: 'talent_name.raiden_shield',
                description: 'talent_descr.raiden_shield',
                stats: {
                    enemy_res_phys: 200,
                    enemy_res_pyro: 200,
                    enemy_res_dendro: 200,
                    enemy_res_hydro: 200,
                    enemy_res_electro: 200,
                    enemy_res_anemo: 200,
                    enemy_res_cryo: 200,
                    enemy_res_geo: 200,
                },
                subConditions: [
                    new ConditionBoolean({
                        name: 'raiden_stunned',
                        invert: true,
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'raiden_stunned',
                serializeId: 2,
                title: 'talent_name.raiden_stunned',
                description: 'talent_descr.raiden_stunned',
                stats: {
                    enemy_res_phys: -60,
                    enemy_res_pyro: -60,
                    enemy_res_dendro: -60,
                    enemy_res_hydro: -60,
                    enemy_res_electro: -60,
                    enemy_res_anemo: -60,
                    enemy_res_cryo: -60,
                    enemy_res_geo: -60,
                },
            }),
        ],
    }),
    ShoukiNoKami: new DbObjectEnemy({
        name: 'shouki_no_kami',
        serializeId: 163,
        iconClass: "type-boss enemy-icon-nada",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
        conditions: [
            new ConditionDropdown({
                name: 'shouki_no_kami_phase',
                serializeId: 1,
                title: 'talent_name.bossfight_phase',
                description: 'talent_descr.shouki_no_kami_phase',
                hideEmpty: true,
                defaultValue: 1,
                values: [
                    {
                        title: 1,
                        value: 1,
                        serializeId: 1,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_electro: 40,
                                },
                            }),
                        ],
                    },
                    {
                        title: 2,
                        value: 2,
                        serializeId: 2,
                        conditions: [
                            new Condition({
                                stats: {
                                    enemy_res_phys: 20,
                                    enemy_res_pyro: 20,
                                    enemy_res_dendro: 20,
                                    enemy_res_hydro: 20,
                                    enemy_res_electro: 80,
                                    enemy_res_anemo: 20,
                                    enemy_res_cryo: 20,
                                    enemy_res_geo: 20,
                                },
                            }),
                        ],
                    },
                ],
            }),
            new ConditionBoolean({
                name: 'shouki_no_kami_shielded',
                serializeId: 2,
                title: 'talent_name.shouki_no_kami_shielded',
                description: 'talent_descr.shouki_no_kami_shielded',
                stats: {
                    enemy_res_phys: 200,
                    enemy_res_pyro: 200,
                    enemy_res_dendro: 200,
                    enemy_res_hydro: 200,
                    enemy_res_electro: 200,
                    enemy_res_anemo: 200,
                    enemy_res_cryo: 200,
                    enemy_res_geo: 200,
                },
                subConditions: [
                    new ConditionBooleanValue({
                        setting: 'shouki_no_kami_phase',
                        cond: 'eq',
                        value: 2,
                    }),
                ],
            }),
            new ConditionBoolean({
                name: 'shouki_no_kami_stunned',
                serializeId: 3,
                title: 'talent_name.shouki_no_kami_stunned',
                description: 'talent_descr.shouki_no_kami_stunned',
                stats: {
                    enemy_res_phys: -170,
                    enemy_res_pyro: -170,
                    enemy_res_dendro: -170,
                    enemy_res_hydro: -170,
                    enemy_res_electro: -170,
                    enemy_res_anemo: -170,
                    enemy_res_cryo: -170,
                    enemy_res_geo: -170,
                },
                subConditions: [
                    new ConditionBooleanValue({
                        setting: 'shouki_no_kami_phase',
                        cond: 'eq',
                        value: 2,
                    }),
                    new ConditionNot([
                        new ConditionBoolean({name: 'shouki_no_kami_shielded'}),
                    ]),
                ],
            }),
        ],
    }),
    GuardianofApepsOasis: new DbObjectEnemy({
        name: 'guardian_of_apeps_oasis',
        serializeId: 178,
        iconClass: "type-boss enemy-icon-apep",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 70,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
    }),
    AllDevouringNarwhal: new DbObjectEnemy({
        name: 'all_devouring_narwhal',
        serializeId: 213,
        iconClass: "type-boss enemy-icon-ptahur-devourer",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 10,
            hydro: 70,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
        conditions: [
            new ConditionBoolean({
                name: 'all_devouring_narwhal_shadow',
                serializeId: 1,
                title: 'talent_name.all_devouring_narwhal_shadow',
                description: 'talent_descr.all_devouring_narwhal_shadow',
                stats: {
                    enemy_res_electro: 60,
                    enemy_res_hydro: -60,
                },
            }),
        ],
    }),
    TheKnave: new DbObjectEnemy({
        name: 'the_knave',
        serializeId: 226,
        iconClass: "type-boss enemy-icon-nihil",
        resistances: {
            phys: 10,
            pyro: 70,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
    }),
    LordofErodedPrimalFire: new DbObjectEnemy({
        name: 'lord_of_eroded_primal_fire',
        serializeId: 301,
        iconClass: "type-boss enemy-icon-theabyssxiuhcoatl",
        resistances: {
            phys: 10,
            pyro: 10,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 10,
            cryo: 10,
            geo: 10,
        },
    }),
    TheGameBeforeTheGate: new DbObjectEnemy({
        name: 'the_game_before_the_gate',
        serializeId: 322,
        iconClass: "type-boss enemy-icon-giantchess",
        resistances: {
            phys: 10,
            pyro: 70,
            dendro: 10,
            hydro: 10,
            electro: 10,
            anemo: 70,
            cryo: 10,
            geo: 10,
        },
        conditions: [
            new ConditionDropdown({
                name: 'enemy_chess_type',
                serializeId: 1,
                title: 'talent_name.enemy_variation',
                dropdownClass: 'medium-text',
                hideEmpty: true,
                defaultValue: 1,
                values: [
                    {
                        title_str: 'talent_name.variation_king',
                        value: 1, serializeId: 1,
                    },
                    {
                        title_str: 'talent_name.variation_queen',
                        value: 2, serializeId: 2,
                    },
                    {
                        title_str: 'talent_name.variation_king_ascended',
                        value: 3, serializeId: 3,
                    },
                    {
                        title_str: 'talent_name.variation_sublimated',
                        value: 4, serializeId: 4,
                    },
                ],
            }),
            new ConditionBoolean({
                name: 'enemy_summon_queen',
                serializeId: 2,
                title: 'talent_name.enemy_summon_queen',
                description: 'talent_descr.buff_all_resistances',
                stats: {
                    enemy_res_phys: 300,
                    enemy_res_pyro: 300,
                    enemy_res_dendro: 300,
                    enemy_res_hydro: 300,
                    enemy_res_electro: 300,
                    enemy_res_anemo: 300,
                    enemy_res_cryo: 300,
                    enemy_res_geo: 300,
                },
                condition: new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'le', value: 1}),
                hideCondition: [
                    new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'gt', value: 1}),
                ],
            }),
            new ConditionBoolean({
                name: 'enemy_queen_defeated',
                serializeId: 3,
                title: 'talent_name.enemy_queen_defeated',
                description: 'talent_descr.debuff_all_resistances',
                stats: {
                    enemy_res_phys: -80,
                    enemy_res_pyro: -80,
                    enemy_res_dendro: -80,
                    enemy_res_hydro: -80,
                    enemy_res_electro: -80,
                    enemy_res_anemo: -80,
                    enemy_res_cryo: -80,
                    enemy_res_geo: -80,
                },
                condition: new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'le', value: 1}),
                hideCondition: [
                    new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'gt', value: 1}),
                ],
            }),
            new ConditionBoolean({
                name: 'enemy_king_reviving',
                serializeId: 4,
                title: 'talent_name.enemy_king_reviving',
                description: 'talent_descr.buff_all_resistances',
                stats: {
                    enemy_res_phys: 300,
                    enemy_res_pyro: 300,
                    enemy_res_dendro: 300,
                    enemy_res_hydro: 300,
                    enemy_res_electro: 300,
                    enemy_res_anemo: 300,
                    enemy_res_cryo: 300,
                    enemy_res_geo: 300,
                },
                condition: new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'ge', value: 3}),
                hideCondition: [
                    new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'lt', value: 3}),
                ],
            }),
            new ConditionBoolean({
                name: 'enemy_king_berserk',
                serializeId: 5,
                title: 'talent_name.enemy_king_berserk',
                description: 'talent_descr.debuff_all_resistances',
                stats: {
                    enemy_res_phys: -80,
                    enemy_res_pyro: -80,
                    enemy_res_dendro: -80,
                    enemy_res_hydro: -80,
                    enemy_res_electro: -80,
                    enemy_res_anemo: -80,
                    enemy_res_cryo: -80,
                    enemy_res_geo: -80,
                },
                condition: new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'ge', value: 3}),
                hideCondition: [
                    new ConditionBooleanValue({setting: 'enemy_chess_type', cond: 'lt', value: 3}),
                ],
            }),
        ],
    }),
});
