import { FeatureStat } from "../../classes/Feature2/Stat";

export const Stats = [
    new FeatureStat({
        stat: 'hp',
    }),
    new FeatureStat({
        stat: 'atk',
    }),
    new FeatureStat({
        stat: 'def',
    }),
    new FeatureStat({
        stat: 'mastery',
    }),
    new FeatureStat({
        stat: 'recharge',
        format: 'percent',
    }),
    new FeatureStat({
        stat: 'crit_rate',
        format: 'percent',
    }),
    new FeatureStat({
        stat: 'crit_dmg',
        format: 'percent',
    }),
    new FeatureStat({
        stat: 'crit_value',
        format: 'percent',
    }),
];
