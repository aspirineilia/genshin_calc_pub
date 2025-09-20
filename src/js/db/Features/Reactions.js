import { ConditionBoolean } from "../../classes/Condition/Boolean";
import { ConditionBooleanCharElement } from "../../classes/Condition/Boolean/CharElement";
import { ConditionOr } from "../../classes/Condition/Or";
import { FeatureReactionSwirl } from "../../classes/Feature2/Reaction/Transformative/Swirl";
import { FeatureReactionElectroCharged } from "../../classes/Feature2/Reaction/Transformative/ElectroCharged";
import { FeatureReactionOverloaded } from "../../classes/Feature2/Reaction/Transformative/Overloaded";
import { FeatureReactionSuperConduct } from "../../classes/Feature2/Reaction/Transformative/SuperConduct";
import { FeatureReactionHyperBloom } from "../../classes/Feature2/Reaction/Transformative/HyperBloom";
import { FeatureReactionShattered } from "../../classes/Feature2/Reaction/Transformative/Shattered";
import { FeatureReactionBurning } from "../../classes/Feature2/Reaction/Transformative/Burning";
import { FeatureReactionHyperBurgeon } from "../../classes/Feature2/Reaction/Transformative/Burgeon";
import { FeatureReactionCrystallize } from "../../classes/Feature2/Reaction/Crystallize";
import { FeatureReactionRupture } from "../../classes/Feature2/Reaction/Transformative/Rupture";
import { ConditionAnd } from "../../classes/Condition/And";
import { ConditionNot } from "../../classes/Condition/Not";
import { FeatureReactionLunarCharged } from "../../classes/Feature2/Reaction/Transformative/Lunar/Charged";

const lunarchargedCond = new ConditionAnd([
    new ConditionBoolean({name: 'allowed_lunarcharged'}),
    new ConditionOr([
        new ConditionBooleanCharElement({element: ['hydro', 'electro', 'anemo']}),
        new ConditionBoolean({name: 'allowed_infusion_hydro'}),
        new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        new ConditionBoolean({name: 'allowed_infusion_electro'}),
    ]),
]);

export const Reactions = [
    new FeatureReactionSwirl({
        name: 'swirl_pyro',
        element: 'pyro',
        tags: ['swirl'],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionSwirl({
        name: 'swirl_hydro',
        cannotReact: true,
        element: 'hydro',
        tags: ['swirl'],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionSwirl({
        name: 'swirl_electro',
        element: 'electro',
        tags: ['swirl'],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionSwirl({
        name: 'swirl_cryo',
        element: 'cryo',
        tags: ['swirl'],
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionBurning({
        name: 'burning',
        element: 'pyro',
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['pyro', 'anemo', 'dendro']}),
            new ConditionBoolean({name: 'allowed_infusion_pyro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_dendro'}),
        ]),
    }),
    new FeatureReactionSuperConduct({
        name: 'superconduct',
        element: 'cryo',
        cannotReact: true,
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['cryo', 'electro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_cryo'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_electro'}),
        ]),
    }),
    new FeatureReactionElectroCharged({
        name: 'electrocharged',
        element: 'electro',
        cannotReact: true,
        condition: new ConditionNot([lunarchargedCond]),
    }),
    new FeatureReactionLunarCharged({
        name: 'lunarcharged_contrubution',
        element: 'electro',
        cannotReact: true,
        condition: lunarchargedCond,
    }),
    new FeatureReactionLunarCharged({
        name: 'lunarcharged_contrubution_2',
        element: 'electro',
        cannotReact: true,
        penalty: 1 / 2,
        condition: lunarchargedCond,
    }),
    new FeatureReactionLunarCharged({
        name: 'lunarcharged_contrubution_12',
        element: 'electro',
        cannotReact: true,
        penalty: 1 / 12,
        condition: lunarchargedCond,
    }),
    new FeatureReactionOverloaded({
        name: 'overloaded',
        element: 'pyro',
        cannotReact: true,
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['pyro', 'electro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_pyro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_electro'}),
        ]),
    }),
    new FeatureReactionRupture({
        name: 'rupture',
        element: 'dendro',
        cannotReact: true,
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['hydro', 'dendro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_hydro'}),
            new ConditionBoolean({name: 'allowed_infusion_dendro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionHyperBurgeon({
        name: 'burgeon',
        element: 'dendro',
        cannotReact: true,
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['pyro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_pyro'}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
        ]),
    }),
    new FeatureReactionHyperBloom({
        name: 'hyperbloom',
        element: 'dendro',
        cannotReact: true,
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['electro', 'anemo']}),
            new ConditionBoolean({name: 'allowed_infusion_anemo'}),
            new ConditionBoolean({name: 'allowed_infusion_electro'}),
        ]),
    }),
    new FeatureReactionCrystallize({
        name: 'crystalize',
        category: 'reaction',
        element: 'shield',
        cannotReact: true,
        condition: new ConditionOr([
            new ConditionBooleanCharElement({element: ['geo']}),
            new ConditionBoolean({name: 'allowed_infusion_geo'}),
        ]),
    }),
    new FeatureReactionShattered({
        name: 'shatter',
        element: 'phys',
        cannotReact: true,
    }),
];
