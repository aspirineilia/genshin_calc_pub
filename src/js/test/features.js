export function getFeatureResult(data) {
    return data.feature.getResult(data.stats, data.settings)[data.featureName];
}
