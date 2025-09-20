import { objectsNames } from "./CalcSet";
import { FeatureRotation } from "./Feature2/Rotation";
import { Rotation, reactionFeatures } from "./Rotation";
import { Stats } from "./Stats";

export class RotationCompiler {
    constructor(build, rotation, opts) {
        this.build = build;
        this.rotation = rotation;
        this.opts = Object.assign({}, opts);
    }

    buildFeaturesList() {
        let features = {};
        let featureNames = this.rotation.getfeaturesNames();

        for (let rId of Object.keys(reactionFeatures)) {
            featureNames.push(reactionFeatures[rId]);
        }

        for (let featureName of featureNames) {
            let items = this.build.getAllFeaturesByName(featureName, {ignoreRotation: true});
            if (items.length) {
                features[featureName] = items;
            }
        }

        // For artifact suggest all Artifact set features should be valid
        if (this.opts.loadArtifactsFeatures) {
            let base = this.build.getBuildData();

            for (let setData of DB.Artifacts.Sets.getList()) {
                for (let setFeature of setData.getFeatures(5)) {
                    let featureResult = setFeature.getResult(base.stats, base.settings);
                    for (let setFeatureName of Object.keys(featureResult)) {
                        features[setFeatureName] = setFeature;
                    }
                }
            }
        }

        return features;
    }

    processConditions(build) {
        if (this.conditions.length == 0) {
            return;
        }

        let base = build.getBuildData();
        let settingsDiff = {};
        let matched = 0;

        for (const condItem of this.conditions) {
            let settings = {};
            let object;

            if (condItem.static) {
                settings = condItem.getSettings(base.settings);
                object = condItem.object;
                ++matched;
            } else {
                let data = Rotation.getConditionData(condItem, build);
                if (!data.invalid && data.cond && data.cond.getName() && objectsNames.includes(data.object)) {
                    ++matched;
                    object = data.object;
                    let type = data.cond.getType();

                    if (type == 'dropdown' || type == 'dropdown_multiple') {
                        settings[data.cond.getName()] = data.cond.getValueById(condItem.value);
                    } else {
                        settings[data.cond.getName()] = condItem.value;
                    }
                }
            }

            if (object) {
                settingsDiff = Object.assign(settingsDiff, settings);
                build[object].addSettings(settings);
                build.setCommonSettings(settings);
            }
        }

        this.conditions = [];

        if (!matched) { return }

        let base2 = build.getBuildData();
        let post = base2.getActivePostEffects();

        let diff = Stats.diff(base.stats, base2.stats);
        let sdiff = diffSettings(base.settings, base2.settings);

        if (Object.keys(diff).length || Object.keys(sdiff).length || post.length) {
            return {
                type: 'condition',
                stats: diff,
                settings: sdiff,
                postEffects: post,
            };
        }
    }

    processBlock(build, items, insideBlock) {
        let compiledItems = [];
        let itemsList = [];

        let enabled = items.filter((i) => {return !i.disabled});
        if (enabled.length && enabled[0].type != 'condition') {
            itemsList.push({
                type: 'condition',
                static: 1,
                getSettings: () => {return {}},
            });
        }

        for (const item of items) {
            itemsList.push(item);

            if (item.type == 'feature' && this.features[item.feature]) {
                for (let feature of this.features[item.feature]) {
                    if (feature && feature.getRotationAfterItems) {
                        let subItems = feature.getRotationAfterItems(item, {insideBlock: insideBlock});
                        for (const subItem of subItems) {
                            itemsList.push(subItem);
                        }
                    }
                }
            }
        }

        for (const item of itemsList) {
            if (item.disabled) { continue }

            if (item.type != 'condition') {
                let condItem = this.processConditions(build);
                if (condItem) {
                    compiledItems.push(condItem);
                }
            }

            if (item.type == 'feature') {
                let feature = this.features[item.feature];

                if (feature) {
                    ++this.featuresTotal;

                    let resultItem = {
                        type: item.type,
                        feature: feature,
                        featureName: item.feature,
                        count: item.count,
                        reaction: item.reaction,
                    };

                    compiledItems.push(resultItem);
                } else {
                    compiledItems.push({type: 'invalid'});
                }
            } else if (item.type == 'condition') {
                this.conditions.push(item);
            } else if (item.type == 'repeat') {
                let subItems = this.processBlock(build, item.items, 1);
                if (subItems) {
                    compiledItems.push({
                        type: item.type,
                        count: item.count,
                        items: subItems,
                    });
                }
            } else if (item.type == 'uptime') {
                let subItems = this.processBlock(build, item.features, 1);
                if (!subItems) continue;

                let subConditions = this.processBlock(build, item.conditions, 1);
                if (subConditions.length == 0) {
                    compiledItems.push({
                        type: 'repeat',
                        count: 1,
                        items: subItems,
                    });
                } else {
                    compiledItems.push({
                        type: item.type,
                        percent: item.percent,
                        conditions: subConditions,
                        items: subItems,
                    });
                }
            }
        }

        let condItem = this.processConditions(build);
        if (condItem) {
            compiledItems.push(condItem);
        }

        return compiledItems;
    }

    buildInfoBlock() {
        let block = {
            type: 'info',
        };
        let hasInfo = 0;

        if (this.sideEffectStats.length) {
            hasInfo = 1;
            block.sideEffectStats = this.sideEffectStats;
        }


        if (!hasInfo) return;
        return block;
    }

    compile() {
        this.features = this.buildFeaturesList();
        this.featuresTotal = 0;
        this.conditions = [];
        this.sideEffectStats = [];

        let items = [].concat(this.rotation.getItems());
        items.unshift({
            type: 'condition',
            static: 1,
            getSettings: () => {return {}},
        });

        let compiledItems = this.processBlock(this.build.cloneWithArtifactSettings(), items);

        if (this.featuresTotal == 0) {
            return null;
        }

        let infoBlock = this.buildInfoBlock();
        if (infoBlock) {
            compiledItems.unshift(infoBlock);
        }

        return new FeatureRotation({
            name: this.rotation.name,
            items: compiledItems,
        });
    }
}

function diffSettings(settings1, settings2) {
    let diff = {};

    for (let key of Object.keys(settings2)) {
        if (settings1[key] === undefined || settings1[key] != settings2[key]) {
            diff[key] = settings2[key];
        }
    }

    for (let key of Object.keys(settings1)) {
        if (settings2[key] === undefined) {
            diff[key] = undefined;
        }
    }

    return diff;
}
