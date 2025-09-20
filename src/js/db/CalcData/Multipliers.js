import { ConditionBooleanValue } from "../../classes/Condition/Boolean/Value";
import { FeatureMultiplierReactionAggravate } from "../../classes/Feature2/Multiplier/Reaction/Quicken/Aggravate";
import { FeatureMultiplierReactionSpread } from "../../classes/Feature2/Multiplier/Reaction/Quicken/Spread";
import { FeatureMultiplierTarget } from "../../classes/Feature2/Multiplier/Target";

export const Multipliers = [
    new FeatureMultiplierReactionSpread({
        condition: new ConditionBooleanValue({
            setting: 'reaction',
            cond: 'eq',
            value: 'quicken',
        }),
        target: new FeatureMultiplierTarget({
            damageElements: ['dendro'],
            options: ['reaction_flat'],
        }),
    }),
    new FeatureMultiplierReactionAggravate({
        condition: new ConditionBooleanValue({
            setting: 'reaction',
            cond: 'eq',
            value: 'quicken',
        }),
        target: new FeatureMultiplierTarget({
            damageElements: ['electro'],
            options: ['reaction_flat'],
        }),
    }),
];
